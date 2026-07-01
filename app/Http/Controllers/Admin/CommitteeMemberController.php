<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CommitteeMember;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CommitteeMemberController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/committee-members/index', [
            'members' => CommitteeMember::query()
                ->orderBy('sort')
                ->orderBy('id')
                ->paginate(30),
            'stats' => [
                'total' => CommitteeMember::query()->count(),
                'published' => CommitteeMember::query()->where('is_published', true)->count(),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/committee-members/form', [
            'member' => null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);

        if ($request->hasFile('photo')) {
            $data['photo_path'] = $request->file('photo')->storePublicly('committee-members', 'public');
        }

        $data['is_published'] = $request->boolean('is_published');

        CommitteeMember::query()->create($data);

        return redirect()->route('admin.committee-members.index')
            ->with('success', 'Committee member created.');
    }

    public function edit(CommitteeMember $committee_member): Response
    {
        return Inertia::render('admin/committee-members/form', [
            'member' => $committee_member,
        ]);
    }

    public function update(Request $request, CommitteeMember $committee_member): RedirectResponse
    {
        $data = $this->validated($request);

        if ($request->hasFile('photo')) {
            $data['photo_path'] = $request->file('photo')->storePublicly('committee-members', 'public');
        }

        $data['is_published'] = $request->boolean('is_published');

        $committee_member->update($data);

        return redirect()->route('admin.committee-members.index')
            ->with('success', 'Committee member updated.');
    }

    public function destroy(CommitteeMember $committee_member): RedirectResponse
    {
        $committee_member->delete();

        return redirect()->route('admin.committee-members.index')
            ->with('success', 'Committee member deleted.');
    }

    /** @return array<string, mixed> */
    private function validated(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'bio' => ['nullable', 'array'],
            'bio.en' => ['nullable', 'string', 'max:1000'],
            'bio.fr' => ['nullable', 'string', 'max:1000'],
            'bio.ar' => ['nullable', 'string', 'max:1000'],
            'photo_path' => ['nullable', 'string', 'max:2048'],
            'photo' => ['nullable', 'image', 'max:5120'],
            'sort' => ['nullable', 'integer', 'min:0'],
            'is_published' => ['sometimes', 'boolean'],
        ]);
    }
}
