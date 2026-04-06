<?php

namespace App\Http\Controllers;

use App\Models\Expert;
use Inertia\Inertia;
use Inertia\Response;

class ExpertController extends Controller
{
    public function index(): Response
    {
        $experts = Expert::query()
            ->where('status', 'published')
            ->orderBy('slug')
            ->get()
            ->map(fn (Expert $e) => $e->toDirectoryArray());

        return Inertia::render('experts/index', [
            'experts' => $experts,
        ]);
    }

    public function show(Expert $expert): Response
    {
        abort_unless($expert->isPublished(), 404);

        return Inertia::render('experts/[id]', [
            'id' => $expert->id,
            'expert' => $expert->toDirectoryArray(),
            'details' => $expert->details ?? $this->emptyDetails(),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function emptyDetails(): array
    {
        return [
            'headlineTags' => [],
            'bio' => [],
            'quote' => ['en' => '', 'fr' => '', 'ar' => ''],
            'expertise' => [],
            'journey' => [],
            'appearances' => [],
            'articles' => [],
        ];
    }
}
