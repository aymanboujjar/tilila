import fs from 'fs';
import path from 'path';

const root = 'resources/js';
const exts = new Set(['.js', '.jsx', '.ts', '.tsx']);
const skipDirs = new Set(['routes', 'actions', 'wayfinder', 'node_modules']);
const keepAlways = new Set([
    'resources/js/app.tsx',
    'resources/js/ssr.tsx',
    'resources/js/wayfinder.ts',
    'resources/js/types/global.d.ts',
    'resources/js/types/index.ts',
    'resources/js/types/vite-env.d.ts',
    'resources/js/types/translation.ts',
]);

function walk(dir, files = []) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
        if (ent.isDirectory()) {
            if (skipDirs.has(ent.name)) {
continue;
}

            walk(path.join(dir, ent.name), files);
        } else if (exts.has(path.extname(ent.name))) {
            files.push(path.join(dir, ent.name).replace(/\\/g, '/'));
        }
    }

    return files;
}

function collectInertiaPages() {
    const pages = new Set();
    const phpFiles = [];

    function walkPhp(dir) {
        for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
            const p = path.join(dir, ent.name);

            if (ent.isDirectory()) {
walkPhp(p);
} else if (ent.name.endsWith('.php')) {
phpFiles.push(p);
}
        }
    }

    walkPhp('routes');
    walkPhp('app');

    for (const php of phpFiles) {
        const c = fs.readFileSync(php, 'utf8');

        for (const m of c.matchAll(/Inertia::render\(['"]([^'"]+)['"]/g)) {
            addPage(pages, m[1]);
        }

        for (const m of c.matchAll(/Route::inertia\([^,]+,\s*['"]([^'"]+)['"]/g)) {
            addPage(pages, m[1]);
        }
    }

    return pages;
}

function addPage(set, name) {
    set.add(`resources/js/pages/${name}.jsx`);
    set.add(`resources/js/pages/${name}.tsx`);
    set.add(`resources/js/pages/${name}/index.jsx`);
    set.add(`resources/js/pages/${name}/index.tsx`);
}

function moduleKeys(file) {
    const rel = file.replace(/^resources\/js\//, '').replace(/\.(jsx?|tsx?)$/, '');
    const base = path.basename(file, path.extname(file));
    const dir = path.dirname(rel);

    return { rel, base, dir, keys: [rel, `@/${rel}`, base] };
}

function isReferenced(targetFile, fromFile, content) {
    const { rel, base, dir } = moduleKeys(targetFile);
    const fromDir = path.dirname(fromFile.replace(/^resources\/js\//, ''));

    const candidates = new Set([
        `@/${rel}`,
        rel,
        `./${base}`,
        `../${base}`,
    ]);

    // Resolve relative path from importer directory
    try {
        const resolved = path
            .normalize(path.join(fromDir, base))
            .replace(/\\/g, '/');
        candidates.add(resolved);
        candidates.add(`@/${resolved}`);
    } catch {
        // ignore
    }

    for (let i = 0; i < 6; i++) {
        const up = `${'../'.repeat(i)}${path.posix.join(...dir.split('/').slice(-(dir.split('/').length - i)))}/${base}`.replace(/\/+/g, '/');
        candidates.add(up);
    }

    for (const key of candidates) {
        const bare = key.replace(/^@\//, '');
        const patterns = [
            `from '${key}'`,
            `from "${key}"`,
            `from '@/${bare}'`,
            `from "@/${bare}"`,
            `import('${key}'`,
            `import("${key}"`,
            `import('@/${bare}'`,
            `import("@/${bare}"`,
            `import(\n    '@/${bare}'`,
            `import(\n        '@/${bare}'`,
            `import(\n    () => import('@/${bare}'`,
            `import(\n    () => import("@/${bare}"`,
        ];

        if (patterns.some((p) => content.includes(p))) {
return true;
}
    }

    return false;
}

const files = walk(root);
const inertiaPages = collectInertiaPages();
const fileContents = new Map(
    files.map((f) => [f, fs.readFileSync(f, 'utf8')]),
);

function isInertiaPage(f) {
    if (inertiaPages.has(f)) {
return true;
}

    const rel = f
        .replace('resources/js/pages/', '')
        .replace(/\.(jsx|tsx)$/, '')
        .replace(/\/index$/, '');

    for (const p of inertiaPages) {
        const pr = p
            .replace('resources/js/pages/', '')
            .replace(/\.(jsx|tsx)$/, '')
            .replace(/\/index$/, '');

        if (rel === pr) {
return true;
}
    }

    return false;
}

const orphans = [];

for (const f of files) {
    if (keepAlways.has(f) || isInertiaPage(f)) {
continue;
}

    if (f.includes('/routes/') || f.includes('/actions/') || f.includes('/wayfinder/')) {
continue;
}

    let referenced = false;

    for (const [other, content] of fileContents) {
        if (other === f) {
continue;
}

        if (isReferenced(f, other, content)) {
            referenced = true;
            break;
        }
    }

    if (!referenced) {
orphans.push(f);
}
}

orphans.sort();
console.log(`ORPHANS: ${orphans.length}`);

for (const f of orphans) {
console.log(f);
}
