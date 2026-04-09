<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventParticipant;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function index(Request $request): Response
    {
        $events = Event::query()
            ->orderByDesc('updated_at')
            ->limit(200)
            ->get()
            ->map(function (Event $e) {
                // Prefer the saved mock payload shape used by the frontend components.
                if (is_array($e->list_payload) && ($e->list_payload['id'] ?? null)) {
                    return [
                        ...$e->list_payload,
                        // Public routes use numeric IDs: /events/{id}
                        'id' => $e->id,
                    ];
                }

                return [
                    'id' => $e->id,
                    'type' => $e->type,
                    'badge' => null,
                    'dateIso' => $e->date?->format('Y-m-d'),
                    'dateTimeIso' => null,
                    'startTime' => $e->time ? substr((string) $e->time, 0, 5) : null,
                    'endTime' => null,
                    'tzLabel' => $e->timezone,
                    'title' => $e->title ?? ['en' => '', 'fr' => '', 'ar' => ''],
                    'excerpt' => $e->description ?? ['en' => '', 'fr' => '', 'ar' => ''],
                    'location' => $e->location ?? ['en' => '', 'fr' => '', 'ar' => ''],
                    'isOnline' => false,
                    'categoryLabel' => null,
                    'imageSrc' => null,
                    'cta' => ['label' => ['en' => 'View', 'fr' => 'Voir', 'ar' => 'عرض'], 'kind' => 'secondary', 'href' => '#'],
                ];
            });

        return Inertia::render('events/index', [
            'events' => $events,
        ]);
    }

    public function show(int $id): Response
    {
        $event = Event::query()->findOrFail($id);

        $base = is_array($event->list_payload) ? $event->list_payload : null;
        $details = is_array($event->details_payload) ? $event->details_payload : null;

        return Inertia::render('events/[id]', [
            'event' => $base ? [...$base, 'id' => $event->id] : null,
            'details' => $details,
        ]);
    }

    public function register(Request $request, int $id)
    {
        $event = Event::query()->findOrFail($id);

        $data = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:event_participants,email,NULL,id,event_id,'.$event->id,
            'phone' => 'nullable|string|max:64',
            'locale' => 'nullable|string|max:8',
        ]);

        EventParticipant::query()->create([
            'event_id' => $event->id,
            'full_name' => $data['full_name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'locale' => $data['locale'] ?? null,
            'ip' => $request->ip(),
            'user_agent' => substr((string) $request->userAgent(), 0, 1000),
        ]);

        return back()->with('success', 'Registration submitted.');
    }
}
