<?php

namespace App\Http\Controllers\Expert;

use App\Http\Controllers\Controller;
use App\Models\Expert;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('expert/dashboard', [
            'expert' => $this->resolveExpert($request),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function resolveExpert(Request $request): array
    {
        $expert = Expert::query()->where('user_id', $request->user()->id)->firstOrFail();

        return [
            'id' => $expert->id,
            'name' => $expert->name,
            'title' => $expert->title,
            'email' => $expert->email,
            'status' => $expert->status,
            'country' => $expert->country,
            'location' => $expert->location,
            'updated_at' => optional($expert->updated_at)?->toISOString(),
        ];
    }
}
