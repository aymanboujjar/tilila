<?php

namespace App\Http\Controllers;

use App\Models\Opportunity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OpportunityController extends Controller
{
    public function index(Request $request): Response
    {
        // Public directory: load enough rows for client-side filtering/sorting.
        // If this grows, we can switch to server-side filters + pagination.
        $opportunities = Opportunity::query()
            ->orderByDesc('updated_at')
            ->limit(200)
            ->get()
            ->map(fn (Opportunity $o) => $this->toListItem($o));

        return Inertia::render('opportunities/index', [
            'opportunities' => $opportunities,
        ]);
    }

    public function show(Opportunity $opportunity): Response
    {
        return Inertia::render('opportunities/[id]', [
            'opportunity' => $this->toDetailsItem($opportunity),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function toListItem(Opportunity $o): array
    {
        return [
            // Frontend currently uses `item.id` inside the URL.
            'id' => $o->slug,
            'type' => $o->type,
            'status' => $o->status,
            'title' => $o->title ?? ['en' => '', 'fr' => '', 'ar' => ''],
            'org' => $o->org ?? ['en' => '', 'fr' => '', 'ar' => ''],
            'location' => $o->location ?? ['en' => '', 'fr' => '', 'ar' => ''],
            'deadline' => $o->deadline?->format('Y-m-d'),
            'posted' => [
                'en' => $o->created_at?->diffForHumans() ?? '',
                'fr' => $o->created_at?->locale('fr')->diffForHumans() ?? '',
                'ar' => $o->created_at?->locale('ar')->diffForHumans() ?? '',
            ],
            'views' => $o->views ?? 0,
            'excerpt' => $o->excerpt ?? ['en' => '', 'fr' => '', 'ar' => ''],
        ];
    }

    /**
     * Provide the shape expected by `resources/js/pages/opportunities/[id].jsx`.
     *
     * @return array<string, mixed>
     */
    private function toDetailsItem(Opportunity $o): array
    {
        $deadline = $o->deadline;
        $deadlineLabel = $deadline ? $deadline->format('Y-m-d') : '';

        return [
            'id' => $o->slug,
            'slug' => $o->slug,
            'type' => $o->type,
            'status' => $o->status,
            'title' => $o->title ?? ['en' => '', 'fr' => '', 'ar' => ''],
            'org' => $o->org ?? ['en' => '', 'fr' => '', 'ar' => ''],
            'location' => $o->location ?? ['en' => '', 'fr' => '', 'ar' => ''],
            'deadline' => $deadline?->format('Y-m-d'),
            'posted' => [
                'en' => $o->created_at?->diffForHumans() ?? '',
                'fr' => $o->created_at?->locale('fr')->diffForHumans() ?? '',
                'ar' => $o->created_at?->locale('ar')->diffForHumans() ?? '',
            ],
            'views' => $o->views ?? 0,
            'excerpt' => $o->excerpt ?? ['en' => '', 'fr' => '', 'ar' => ''],

            // Formerly from `OPPORTUNITY_DETAILS` (mock). Keep keys so UI renders,
            // but derive minimal values from DB columns.
            'details' => [
                'badge' => null,
                'meta' => null,
                'description' => $o->excerpt ?? ['en' => '', 'fr' => '', 'ar' => ''],
                'descriptionLong' => [],
                'programModules' => [],
                'organizer' => [
                    'name' => $o->org ?? ['en' => '', 'fr' => '', 'ar' => ''],
                    'blurb' => ['en' => '', 'fr' => '', 'ar' => ''],
                ],
                'quickInfo' => [
                    'location' => $o->location ?? ['en' => '', 'fr' => '', 'ar' => ''],
                    'duration' => ['en' => '', 'fr' => '', 'ar' => ''],
                    'language' => ['en' => '', 'fr' => '', 'ar' => ''],
                    'cost' => ['en' => '', 'fr' => '', 'ar' => ''],
                ],
                'relatedThemes' => [],
                'eligibility' => [],
                'deadline' => [
                    'label' => [
                        'en' => 'Application Deadline',
                        'fr' => 'Date limite de candidature',
                        'ar' => 'آخر موعد للتقديم',
                    ],
                    'dateLabel' => [
                        'en' => $deadlineLabel,
                        'fr' => $deadlineLabel,
                        'ar' => $deadlineLabel,
                    ],
                ],
                'howToApply' => [],
            ],
        ];
    }
}

