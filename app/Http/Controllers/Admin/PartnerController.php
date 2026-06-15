<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Partner;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PartnerController extends Controller
{
    public function index(Request $request): Response
    {
        $program = $request->query('program');
        $group = $request->query('group');

        $query = Partner::query()->orderBy('program')->orderBy('sort')->orderBy('id');
        if ($program) {
            $query->where(function ($q) use ($program) {
                $q->where('program', $program)->orWhere('program', 'both');
            });
        }
        if ($group) {
            $query->where('group', $group);
        }

        return Inertia::render('admin/partners/index', [
            'partners' => $query->paginate(30)->withQueryString(),
            'filters' => [
                'program' => $program,
                'group' => $group,
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/partners/form', [
            'partner' => null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        if ($request->hasFile('logo')) {
            $data['logo_path'] = $request->file('logo')->storePublicly('partners', 'public');
        }
        $data['is_published'] = $request->boolean('is_published');
        Partner::query()->create($data);

        return redirect()->route('admin.partners.index')
            ->with('success', 'Partner created.');
    }

    public function edit(Partner $partner): Response
    {
        return Inertia::render('admin/partners/form', [
            'partner' => $partner,
        ]);
    }

    public function update(Request $request, Partner $partner): RedirectResponse
    {
        $data = $this->validated($request);
        if ($request->hasFile('logo')) {
            $data['logo_path'] = $request->file('logo')->storePublicly('partners', 'public');
        }
        $data['is_published'] = $request->boolean('is_published');
        $partner->update($data);

        return redirect()->route('admin.partners.index')
            ->with('success', 'Partner updated.');
    }

    public function destroy(Partner $partner): RedirectResponse
    {
        $partner->delete();

        return redirect()->route('admin.partners.index')
            ->with('success', 'Partner deleted.');
    }

    /** @return array<string, mixed> */
    private function validated(Request $request): array
    {
        return $request->validate([
            'program' => ['required', 'string', 'in:tilila,tililab,both'],
            'group' => ['required', 'string', 'in:featured,institutional,media,program,organiser,strip'],
            'name' => ['required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'array'],
            'subtitle.en' => ['nullable', 'string'],
            'subtitle.fr' => ['nullable', 'string'],
            'subtitle.ar' => ['nullable', 'string'],
            'meta' => ['nullable', 'array'],
            'url' => ['nullable', 'url', 'max:2048'],
            'sort' => ['nullable', 'integer', 'min:0'],
            'logo_path' => ['nullable', 'string', 'max:2048'],
            'is_published' => ['sometimes', 'boolean'],
            'logo' => ['nullable', 'image', 'max:5120'],
        ]);
    }
}
