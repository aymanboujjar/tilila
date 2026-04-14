<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TililabParticipant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class TililabAnalyticsController extends Controller
{
    public function index(Request $request): Response
    {
        $total = TililabParticipant::query()->count();
        $last7Days = TililabParticipant::query()
            ->where('created_at', '>=', now()->subDays(7))
            ->count();

        $byCountry = TililabParticipant::query()
            ->select('country', DB::raw('count(*) as count'))
            ->groupBy('country')
            ->orderByDesc('count')
            ->limit(12)
            ->get()
            ->map(fn ($r) => ['country' => $r->country ?? '—', 'count' => (int) $r->count])
            ->values();

        $daily = TililabParticipant::query()
            ->where('created_at', '>=', now()->subDays(30))
            ->select(DB::raw('DATE(created_at) as day'), DB::raw('count(*) as count'))
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderBy('day')
            ->get()
            ->map(fn ($r) => ['day' => (string) $r->day, 'count' => (int) $r->count])
            ->values();

        // Fill missing days with 0 counts for charts.
        $dailyMap = $daily->keyBy('day');
        $filledDaily = collect();
        for ($i = 29; $i >= 0; $i--) {
            $day = now()->subDays($i)->toDateString();
            $filledDaily->push([
                'day' => $day,
                'count' => (int) (($dailyMap[$day]['count'] ?? 0)),
            ]);
        }

        return Inertia::render('admin/tililab/analytics/index', [
            'kpis' => [
                'total' => $total,
                'last7Days' => $last7Days,
            ],
            'byCountry' => $byCountry,
            'daily' => $filledDaily->values(),
        ]);
    }
}

