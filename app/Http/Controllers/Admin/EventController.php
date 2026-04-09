<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = Event::query()->orderByDesc('updated_at');

        if ($search = trim((string) $request->query('search', ''))) {
            $like = '%'.$search.'%';
            $query->where(function ($q) use ($like) {
                foreach (['en', 'fr', 'ar'] as $lang) {
                    $q->orWhere("title->{$lang}", 'like', $like)
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

        return Inertia::render('admin/events/index', [
            'events' => $query->paginate(15)->withQueryString(),
            'filters' => [
                'search' => $request->query('search', ''),
                'type' => $request->query('type', ''),
                'status' => $request->query('status', ''),
            ],
            'types' => $this->types(),
            'statuses' => $this->statuses(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('admin/events/create', [
            'types' => $this->types(),
            'statuses' => $this->statuses(),
            'visibilities' => $this->visibilities(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        $data['slug'] = $this->uniqueSlugFromEnglishTitle($data['title']['en']);

        Event::create($data);

        return redirect()->route('admin.events.index')->with('success', 'Event created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event): Response
    {
        $event->load([
            'participants' => fn ($q) => $q->latest()->limit(2000),
        ]);

        $total = $event->participants->count();

        return Inertia::render('admin/events/show', [
            'event' => $event,
            'stats' => [
                'total_attendees' => $total,
                'confirmed' => $total,
                'pending' => 0,
                'capacity_filled' => 0,
                'ticket_revenue' => ['label' => 'FREE', 'note' => null],
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event): Response
    {
        return Inertia::render('admin/events/edit', [
            'event' => $event,
            'types' => $this->types(),
            'statuses' => $this->statuses(),
            'visibilities' => $this->visibilities(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event): RedirectResponse
    {
        $data = $this->validated($request, $event);

        if (($data['title']['en'] ?? '') !== ($event->title['en'] ?? '')) {
            $data['slug'] = $this->uniqueSlugFromEnglishTitle($data['title']['en'], $event->id);
        }

        $event->update($data);

        return redirect()->route('admin.events.index')->with('success', 'Event updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event): RedirectResponse
    {
        $event->delete();

        return redirect()->route('admin.events.index')->with('success', 'Event deleted.');
    }

    /**
     * @return list<string>
     */
    private function types(): array
    {
        return ['tilitalk', 'trophy', 'workshop', 'other'];
    }

    /**
     * @return list<string>
     */
    private function statuses(): array
    {
        return ['draft', 'upcoming', 'live', 'finished', 'archived'];
    }

    /**
     * @return list<string>
     */
    private function visibilities(): array
    {
        return ['public', 'private'];
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request, ?Event $event = null): array
    {
        $validated = $request->validate([
            'type' => 'required|string|max:32',
            'status' => 'required|string|max:32',
            'visibility' => 'required|string|max:16',
            'title' => 'required|array',
            'title.en' => 'required|string|max:255',
            'title.fr' => 'nullable|string|max:255',
            'title.ar' => 'nullable|string|max:255',
            'location' => 'nullable|array',
            'location.en' => 'nullable|string|max:255',
            'location.fr' => 'nullable|string|max:255',
            'location.ar' => 'nullable|string|max:255',
            'description' => 'nullable|array',
            'description.en' => 'nullable|string|max:5000',
            'description.fr' => 'nullable|string|max:5000',
            'description.ar' => 'nullable|string|max:5000',
            'date' => 'nullable|date',
            'time' => 'nullable|date_format:H:i',
            'timezone' => 'nullable|string|max:16',
        ]);

        $validated['location'] = $validated['location'] ?? ['en' => '', 'fr' => '', 'ar' => ''];
        $validated['description'] = $validated['description'] ?? ['en' => '', 'fr' => '', 'ar' => ''];
        $validated['timezone'] = $validated['timezone'] ?? ($event?->timezone ?? 'GMT+1');

        return $validated;
    }

    private function uniqueSlugFromEnglishTitle(string $englishTitle, ?int $ignoreId = null): string
    {
        $base = Str::slug($englishTitle);
        if ($base === '') {
            $base = 'event';
        }

        $slug = $base;
        $n = 1;

        while (
            Event::query()
                ->when($ignoreId !== null, fn ($q) => $q->where('id', '!=', $ignoreId))
                ->where('slug', $slug)
                ->exists()
        ) {
            $slug = $base.'-'.$n++;
        }

        return $slug;
    }
}
