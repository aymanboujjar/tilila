<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MediaItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class MediaController extends Controller
{
    /**
     * @return list<string>
     */
    private function categories(): array
    {
        return [
            'interviews',
            'tililaReplay',
            'impactReports',
            'diversityInsights',
            'expertProfiles',
        ];
    }

    /**
     * @return list<string>
     */
    private function statuses(): array
    {
        return ['draft', 'published', 'archived'];
    }

    /**
     * @return list<string>
     */
    private function visibilities(): array
    {
        return ['public', 'private'];
    }

    public function index(Request $request): Response
    {
        $query = MediaItem::query()->orderByDesc('updated_at');

        if ($search = trim((string) $request->query('search', ''))) {
            $like = '%'.$search.'%';
            $query->where(function ($q) use ($like) {
                foreach (['en', 'fr', 'ar'] as $lang) {
                    $q->orWhere("title->{$lang}", 'like', $like)
                        ->orWhere("excerpt->{$lang}", 'like', $like)
                        ->orWhere("badge->{$lang}", 'like', $like);
                }
                $q->orWhere('slug', 'like', $like)
                    ->orWhere('category_id', 'like', $like)
                    ->orWhere('status', 'like', $like);
            });
        }

        if ($category = $request->query('category')) {
            $query->where('category_id', $category);
        }

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        if ($visibility = $request->query('visibility')) {
            $query->where('visibility', $visibility);
        }

        return Inertia::render('admin/media/index', [
            'items' => $query->paginate(15)->withQueryString(),
            'filters' => [
                'search' => $request->query('search', ''),
                'category' => $request->query('category', ''),
                'status' => $request->query('status', ''),
                'visibility' => $request->query('visibility', ''),
            ],
            'categories' => $this->categories(),
            'statuses' => $this->statuses(),
            'visibilities' => $this->visibilities(),
        ]);
    }

    public function exportCsv(Request $request): StreamedResponse
    {
        $query = MediaItem::query()->orderByDesc('updated_at');

        if ($search = trim((string) $request->query('search', ''))) {
            $like = '%'.$search.'%';
            $query->where(function ($q) use ($like) {
                foreach (['en', 'fr', 'ar'] as $lang) {
                    $q->orWhere("title->{$lang}", 'like', $like)
                        ->orWhere("excerpt->{$lang}", 'like', $like);
                }
                $q->orWhere('slug', 'like', $like)
                    ->orWhere('category_id', 'like', $like)
                    ->orWhere('status', 'like', $like);
            });
        }
        if ($category = $request->query('category')) {
            $query->where('category_id', $category);
        }
        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }
        if ($visibility = $request->query('visibility')) {
            $query->where('visibility', $visibility);
        }

        $filename = 'media-items-'.now()->format('Ymd-His').'.csv';

        return response()->streamDownload(function () use ($query): void {
            $out = fopen('php://output', 'w');
            if ($out === false) {
                return;
            }

            fwrite($out, "\xEF\xBB\xBF");
            $delimiter = ';';

            fputcsv($out, [
                'id',
                'slug',
                'category_id',
                'status',
                'visibility',
                'title_en',
                'excerpt_en',
                'image_path',
                'updated_at',
            ], $delimiter);

            $query->chunkById(200, function ($rows) use ($out, $delimiter): void {
                foreach ($rows as $item) {
                    /** @var MediaItem $item */
                    fputcsv($out, [
                        $item->id,
                        (string) $item->slug,
                        (string) $item->category_id,
                        (string) $item->status,
                        (string) $item->visibility,
                        (string) ($item->title['en'] ?? ''),
                        (string) ($item->excerpt['en'] ?? ''),
                        (string) ($item->image_path ?? ''),
                        optional($item->updated_at)?->toIso8601String() ?? '',
                    ], $delimiter);
                }
            });

            fclose($out);
        }, $filename, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/media/create', [
            'categories' => $this->categories(),
            'statuses' => $this->statuses(),
            'visibilities' => $this->visibilities(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        $data['slug'] = $this->uniqueSlugFromEnglishTitle($data['title']['en']);

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('media-items', 'public');
        } else {
            $data['image_path'] = $data['image_path'] ?? null;
        }

        MediaItem::create($data);

        return redirect()->route('admin.media.index')->with('success', 'Media item created.');
    }

    public function show(MediaItem $medium): Response
    {
        return Inertia::render('admin/media/show', [
            'item' => $medium,
        ]);
    }

    public function edit(MediaItem $medium): Response
    {
        return Inertia::render('admin/media/edit', [
            'item' => $medium,
            'updateUrl' => route('admin.media.update', $medium),
            'categories' => $this->categories(),
            'statuses' => $this->statuses(),
            'visibilities' => $this->visibilities(),
        ]);
    }

    public function update(Request $request, MediaItem $medium): RedirectResponse
    {
        $data = $this->validated($request, $medium);

        if (($data['title']['en'] ?? '') !== ($medium->title['en'] ?? '')) {
            $data['slug'] = $this->uniqueSlugFromEnglishTitle($data['title']['en'], $medium->id);
        }

        if ($request->hasFile('image')) {
            if (is_string($medium->image_path) && $medium->image_path !== '') {
                Storage::disk('public')->delete($medium->image_path);
            }
            $data['image_path'] = $request->file('image')->store('media-items', 'public');
        } elseif (! array_key_exists('image_path', $data) || $data['image_path'] === null || $data['image_path'] === '') {
            $data['image_path'] = $medium->image_path;
        }

        $medium->update($data);

        return redirect()->route('admin.media.index')->with('success', 'Media item updated.');
    }

    public function destroy(MediaItem $medium): RedirectResponse
    {
        if (is_string($medium->image_path) && $medium->image_path !== '') {
            Storage::disk('public')->delete($medium->image_path);
        }
        $medium->delete();

        return redirect()->route('admin.media.index')->with('success', 'Media item deleted.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request, ?MediaItem $item = null): array
    {
        $validated = $request->validate([
            'category_id' => 'required|string|max:64',
            'status' => 'required|string|max:32',
            'visibility' => 'required|string|max:16',
            'badge' => 'nullable|array',
            'badge.en' => 'nullable|string|max:255',
            'badge.fr' => 'nullable|string|max:255',
            'badge.ar' => 'nullable|string|max:255',
            'title' => 'required|array',
            'title.en' => 'required|string|max:255',
            'title.fr' => 'nullable|string|max:255',
            'title.ar' => 'nullable|string|max:255',
            'excerpt' => 'nullable|array',
            'excerpt.en' => 'nullable|string|max:2000',
            'excerpt.fr' => 'nullable|string|max:2000',
            'excerpt.ar' => 'nullable|string|max:2000',
            'meta' => 'nullable|array',
            'meta.en' => 'nullable|string|max:255',
            'meta.fr' => 'nullable|string|max:255',
            'meta.ar' => 'nullable|string|max:255',
            'cta' => 'nullable|array',
            'cta.en' => 'nullable|string|max:255',
            'cta.fr' => 'nullable|string|max:255',
            'cta.ar' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:8192',
            'image_path' => 'nullable|string|max:500',
        ]);

        $validated['badge'] = $validated['badge'] ?? ['en' => '', 'fr' => '', 'ar' => ''];
        $validated['excerpt'] = $validated['excerpt'] ?? ['en' => '', 'fr' => '', 'ar' => ''];
        $validated['meta'] = $validated['meta'] ?? ['en' => '', 'fr' => '', 'ar' => ''];
        $validated['cta'] = $validated['cta'] ?? ['en' => '', 'fr' => '', 'ar' => ''];

        unset($validated['image']);

        return $validated;
    }

    private function uniqueSlugFromEnglishTitle(string $englishTitle, ?int $ignoreId = null): string
    {
        $base = Str::slug($englishTitle);
        if ($base === '') {
            $base = 'media';
        }

        $slug = $base;
        $n = 1;

        while (
            MediaItem::query()
                ->when($ignoreId !== null, fn ($q) => $q->where('id', '!=', $ignoreId))
                ->where('slug', $slug)
                ->exists()
        ) {
            $slug = $base.'-'.$n++;
        }

        return $slug;
    }
}

