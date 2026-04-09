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
        $event = Event::query()
            ->with([
                'speakers' => fn ($q) => $q->orderBy('sort')->orderBy('id'),
                'partners' => fn ($q) => $q->orderBy('sort')->orderBy('id'),
                'media' => fn ($q) => $q->orderBy('sort')->orderBy('id'),
            ])
            ->findOrFail($id);

        return Inertia::render('events/[id]', [
            'event' => $this->publicListPayloadForShow($event),
            'details' => $this->publicDetailsPayloadForShow($event),
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

    /**
     * List-card shaped payload for the public details page (matches {@see index()}).
     *
     * @return array<string, mixed>
     */
    private function publicListPayloadForShow(Event $event): array
    {
        if (is_array($event->list_payload) && $event->list_payload !== []) {
            return [
                ...$event->list_payload,
                'id' => $event->id,
            ];
        }

        return [
            'id' => $event->id,
            'type' => $event->type,
            'badge' => null,
            'dateIso' => $event->date?->format('Y-m-d'),
            'dateTimeIso' => null,
            'startTime' => $event->time ? substr((string) $event->time, 0, 5) : null,
            'endTime' => null,
            'tzLabel' => $event->timezone,
            'title' => $event->title ?? ['en' => '', 'fr' => '', 'ar' => ''],
            'excerpt' => $event->description ?? ['en' => '', 'fr' => '', 'ar' => ''],
            'location' => $event->location ?? ['en' => '', 'fr' => '', 'ar' => ''],
            'isOnline' => false,
            'categoryLabel' => null,
            'imageSrc' => null,
            'cta' => [
                'label' => ['en' => 'View', 'fr' => 'Voir', 'ar' => 'عرض'],
                'kind' => 'secondary',
                'href' => '#',
            ],
        ];
    }

    /**
     * Details sections for the public details page: JSON seed payload and/or DB columns + relations.
     *
     * @return array<string, mixed>
     */
    private function publicDetailsPayloadForShow(Event $event): array
    {
        $seeded = is_array($event->details_payload) && $event->details_payload !== []
            ? $event->details_payload
            : [];

        if ($seeded === []) {
            return $this->buildDetailsPayloadFromEventRecord($event);
        }

        $merged = $seeded;

        if ($event->speakers->isNotEmpty()) {
            $merged['speakers'] = $this->speakersForPublicDetails($event);
        }
        if ($event->partners->isNotEmpty()) {
            $merged['partners'] = $this->partnersForPublicDetails($event);
        }
        if ($event->media->isNotEmpty()) {
            $merged['gallery'] = $this->galleryForPublicDetails($event);
        }

        return $merged;
    }

    /**
     * @return array<string, mixed>
     */
    private function buildDetailsPayloadFromEventRecord(Event $event): array
    {
        $desc = $event->description;
        $paragraphs = [];
        if (is_array($desc)) {
            $any = false;
            foreach (['en', 'fr', 'ar'] as $lang) {
                if (trim((string) ($desc[$lang] ?? '')) !== '') {
                    $any = true;
                    break;
                }
            }
            if ($any) {
                $paragraphs = [$desc];
            }
        }

        return [
            'hero' => [
                'badge' => null,
                'dateLabel' => $this->formatPublicEventDateLabel($event),
                'locationLabel' => null,
                'title' => null,
                'subtitle' => null,
            ],
            'about' => [
                'title' => 'About the Event',
                'paragraphs' => $paragraphs,
            ],
            'speakers' => $this->speakersForPublicDetails($event),
            'agenda' => [
                'title' => 'Agenda',
                'items' => [],
            ],
            'partners' => $this->partnersForPublicDetails($event),
            'gallery' => $this->galleryForPublicDetails($event),
            'registration' => [
                'badge' => null,
                'title' => 'Event Registration',
                'description' => null,
                'submitLabel' => 'Complete Registration',
            ],
        ];
    }

    private function formatPublicEventDateLabel(Event $event): ?string
    {
        if (! $event->date) {
            return null;
        }

        $parts = [$event->date->format('M j, Y')];
        if ($event->time) {
            $parts[] = substr((string) $event->time, 0, 5);
        }
        if (is_string($event->timezone) && $event->timezone !== '') {
            $parts[] = $event->timezone;
        }

        return implode(' · ', $parts);
    }

    /**
     * @return array{title: string, items: list<array{name: string, role: string, image: string|null}>}
     */
    private function speakersForPublicDetails(Event $event): array
    {
        return [
            'title' => 'Speakers',
            'items' => $event->speakers
                ->map(fn ($s) => [
                    'name' => (string) $s->full_name,
                    'role' => (string) ($s->role ?? ''),
                    'image' => $s->photo_url,
                ])
                ->values()
                ->all(),
        ];
    }

    /**
     * @return array{title: string, items: list<array{name: string, url: string|null, logo: string|null}>}
     */
    private function partnersForPublicDetails(Event $event): array
    {
        return [
            'title' => 'Partners',
            'items' => $event->partners
                ->map(fn ($p) => [
                    'name' => (string) $p->name,
                    'url' => $p->url ? (string) $p->url : null,
                    'logo' => $p->logo_url,
                ])
                ->values()
                ->all(),
        ];
    }

    /**
     * @return array{title: string, items: list<array{label: string, isMore?: bool, src?: string|null}>}
     */
    private function galleryForPublicDetails(Event $event): array
    {
        return [
            'title' => 'Photo Gallery',
            'items' => $event->media
                ->map(fn ($m) => [
                    'label' => (string) ($m->original_name ?: 'Photo'),
                    'src' => $m->url,
                ])
                ->values()
                ->all(),
        ];
    }
}
