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
        } else {
            const ext = path.extname(ent.name);

            if (exts.has(ext)) {
                files.push(path.join(dir, ent.name).replace(/\\/g, '/'));
            }
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
            const name = m[1];
            pages.add(`resources/js/pages/${name}.jsx`);
            pages.add(`resources/js/pages/${name}.tsx`);
            pages.add(`resources/js/pages/${name}/index.jsx`);
            pages.add(`resources/js/pages/${name}/index.tsx`);
        }

        for (const m of c.matchAll(/Route::inertia\([^,]+,\s*['"]([^'"]+)['"]/g)) {
            const name = m[1];
            pages.add(`resources/js/pages/${name}.jsx`);
            pages.add(`resources/js/pages/${name}/index.jsx`);
        }
    }

    return pages;
}

const files = walk(root);
const allContent = files
    .map((f) => ({ f, c: fs.readFileSync(f, 'utf8') }))
    .filter(
        (x) =>
            !x.f.includes('/routes/') &&
            !x.f.includes('/actions/') &&
            !x.f.includes('/wayfinder/'),
    );

const inertiaPages = collectInertiaPages();
const combinedSource = allContent.map((x) => x.c).join('\n');

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

function moduleKeys(file) {
    const rel = file
        .replace(/^resources\/js\//, '')
        .replace(/\.(jsx?|tsx?)$/, '');
    const noExt = rel;
    const base = path.basename(file, path.extname(file));

    return [noExt, `@/${noExt}`, base];
}

const unused = [];

for (const { f } of allContent) {
    if (keepAlways.has(f) || isInertiaPage(f)) {
continue;
}

    const keys = moduleKeys(f);
    let referenced = false;

    for (const key of keys) {
        const patterns = [
            `from '${key}'`,
            `from "${key}"`,
            `import('${key}'`,
            `import("${key}"`,
            `import(\n    '${key}'`,
            `import(\n        '${key}'`,
            `import('@/${key.replace(/^@\//, '')}'`,
        ];

        if (key.startsWith('@/')) {
            patterns.push(`from '${key}'`, `from "${key}"`, `import('${key}'`, `import("${key}"`);
        }

        const bare = key.replace(/^@\//, '');
        patterns.push(`'@/${bare}'`, `"@/${bare}"`, `'${bare}'`, `"${bare}"`);

        for (const pat of patterns) {
            if (combinedSource.includes(pat)) {
                referenced = true;
                break;
            }
        }

        if (referenced) {
break;
}
    }

    if (!referenced) {
unused.push(f);
}
}

unused.sort();
console.log(`UNUSED COUNT: ${unused.length}`);

for (const f of unused) {
console.log(f);
}
