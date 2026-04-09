<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Opportunity;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class OpportunityController extends Controller
{
    /**
     * Types used by the public opportunities directory mock data.
     *
     * @return list<string>
     */
    private function types(): array
    {
        return ['panel_discussion', 'media_call', 'grant', 'residency'];
    }

    /**
     * @return list<string>
     */
    private function statuses(): array
    {
        return ['open', 'closing_soon', 'closed', 'filled'];
    }

    public function index(Request $request): Response
    {
        $query = Opportunity::query()->orderByDesc('updated_at');

        if ($search = trim((string) $request->query('search', ''))) {
            $like = '%'.$search.'%';
            $query->where(function ($q) use ($like) {
                foreach (['en', 'fr', 'ar'] as $lang) {
                    $q->orWhere("title->{$lang}", 'like', $like)
                        ->orWhere("org->{$lang}", 'like', $like)
                        ->orWhere("location->{$lang}", 'like', $like);
                }
                $q->orWhere('type', 'like', $like)
                    ->orWhere('status', 'like', $like)
                    ->orWhere('slug', 'like', $like);
            });
        }

        if ($type = $request->query('type')) {
            $query->where('type', $type);
        }

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        return Inertia::render('admin/opportunities/index', [
            'opportunities' => $query->paginate(15)->withQueryString(),
            'filters' => [
                'search' => $request->query('search', ''),
                'type' => $request->query('type', ''),
                'status' => $request->query('status', ''),
            ],
            'types' => $this->types(),
            'statuses' => $this->statuses(),
        ]);
    }

    public function exportCsv(Request $request): StreamedResponse
    {
        $query = Opportunity::query()->orderByDesc('updated_at');

        if ($search = trim((string) $request->query('search', ''))) {
            $like = '%'.$search.'%';
            $query->where(function ($q) use ($like) {
                foreach (['en', 'fr', 'ar'] as $lang) {
                    $q->orWhere("title->{$lang}", 'like', $like)
                        ->orWhere("org->{$lang}", 'like', $like)
                        ->orWhere("location->{$lang}", 'like', $like);
                }
                $q->orWhere('type', 'like', $like)
                    ->orWhere('status', 'like', $like)
                    ->orWhere('slug', 'like', $like);
            });
        }
        if ($type = $request->query('type')) {
            $query->where('type', $type);
        }
        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        $filename = 'opportunities-'.now()->format('Ymd-His').'.csv';

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
                'type',
                'status',
                'title_en',
                'org_en',
                'location_en',
                'deadline',
                'views',
                'applications_count',
                'applications_limit',
            ], $delimiter);

            $query->chunkById(200, function ($rows) use ($out, $delimiter): void {
                foreach ($rows as $opp) {
                    /** @var \App\Models\Opportunity $opp */
                    fputcsv($out, [
                        $opp->id,
                        (string) $opp->slug,
                        (string) $opp->type,
                        (string) $opp->status,
                        (string) ($opp->title['en'] ?? ''),
                        (string) ($opp->org['en'] ?? ''),
                        (string) ($opp->location['en'] ?? ''),
                        $opp->deadline?->format('Y-m-d') ?? '',
                        (int) ($opp->views ?? 0),
                        (int) ($opp->applications_count ?? 0),
                        $opp->applications_limit !== null ? (int) $opp->applications_limit : '',
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
        return Inertia::render('admin/opportunities/create', [
            'types' => $this->types(),
            'statuses' => $this->statuses(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        $data['slug'] = $this->uniqueSlugFromEnglishTitle($data['title']['en']);

        Opportunity::create($data);

        return redirect()->route('admin.opportunities.index')->with('success', 'Opportunity created.');
    }

    public function edit(Opportunity $opportunity): Response
    {
        $opportunity->load([
            'applications' => fn ($q) => $q->latest()->limit(200),
        ]);

        return Inertia::render('admin/opportunities/edit', [
            'opportunity' => $opportunity,
            'types' => $this->types(),
            'statuses' => $this->statuses(),
        ]);
    }

    public function update(Request $request, Opportunity $opportunity): RedirectResponse
    {
        $data = $this->validated($request, $opportunity);

        if (($data['title']['en'] ?? '') !== ($opportunity->title['en'] ?? '')) {
            $data['slug'] = $this->uniqueSlugFromEnglishTitle($data['title']['en'], $opportunity->id);
        }

        $opportunity->update($data);

        return redirect()->route('admin.opportunities.index')->with('success', 'Opportunity updated.');
    }

    public function destroy(Opportunity $opportunity): RedirectResponse
    {
        $opportunity->delete();

        return redirect()->route('admin.opportunities.index')->with('success', 'Opportunity deleted.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request, ?Opportunity $opportunity = null): array
    {
        $validated = $request->validate([
            'type' => 'required|string|max:32',
            'status' => 'required|string|max:32',
            'title' => 'required|array',
            'title.en' => 'required|string|max:255',
            'title.fr' => 'nullable|string|max:255',
            'title.ar' => 'nullable|string|max:255',
            'org' => 'nullable|array',
            'org.en' => 'nullable|string|max:255',
            'org.fr' => 'nullable|string|max:255',
            'org.ar' => 'nullable|string|max:255',
            'location' => 'nullable|array',
            'location.en' => 'nullable|string|max:255',
            'location.fr' => 'nullable|string|max:255',
            'location.ar' => 'nullable|string|max:255',
            'excerpt' => 'nullable|array',
            'excerpt.en' => 'nullable|string|max:2000',
            'excerpt.fr' => 'nullable|string|max:2000',
            'excerpt.ar' => 'nullable|string|max:2000',
            'deadline' => 'nullable|date',
            'views' => 'sometimes|integer|min:0',
            'applications_count' => 'sometimes|integer|min:0',
            'applications_limit' => 'nullable|integer|min:0',
        ]);

        // Normalize optional tri-lang objects (avoid nulls in the frontend).
        $validated['org'] = $validated['org'] ?? ['en' => '', 'fr' => '', 'ar' => ''];
        $validated['location'] = $validated['location'] ?? ['en' => '', 'fr' => '', 'ar' => ''];
        $validated['excerpt'] = $validated['excerpt'] ?? ['en' => '', 'fr' => '', 'ar' => ''];
        $validated['views'] = $validated['views'] ?? ($opportunity?->views ?? 0);
        $validated['applications_count'] = $validated['applications_count'] ?? ($opportunity?->applications_count ?? 0);

        return $validated;
    }

    private function uniqueSlugFromEnglishTitle(string $englishTitle, ?int $ignoreId = null): string
    {
        $base = Str::slug($englishTitle);
        if ($base === '') {
            $base = 'opportunity';
        }

        $slug = $base;
        $n = 1;

        while (
            Opportunity::query()
                ->when($ignoreId !== null, fn ($q) => $q->where('id', '!=', $ignoreId))
                ->where('slug', $slug)
                ->exists()
        ) {
            $slug = $base.'-'.$n++;
        }

        return $slug;
    }
}

