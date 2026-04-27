<?php

namespace App\Http\Controllers;

use App\Models\ExpertApplication;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ExpertApplicationController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('experts/become');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('expert_applications', 'email')->where(
                    fn ($q) => $q->where('status', 'pending')
                ),
            ],
            'phone' => ['nullable', 'string', 'max:64'],
            'country' => ['nullable', 'string', 'max:120'],
            'city' => ['nullable', 'string', 'max:120'],
            'current_title' => ['required', 'string', 'max:255'],
            'expertise' => ['required', 'string', 'max:2000'],
            'bio' => ['required', 'string', 'max:5000'],
            'linkedin_url' => ['nullable', 'url', 'max:2048'],
            'portfolio_url' => ['nullable', 'url', 'max:2048'],
            'locale' => ['nullable', 'string', 'max:8'],
            'cv' => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:5120'],
        ], [
            'email.unique' => 'You already have a pending application with this email.',
        ]);

        $cvPath = null;
        if ($request->hasFile('cv')) {
            $cvPath = $request->file('cv')->store('expert-applications/cv', 'public');
        }

        ExpertApplication::query()->create([
            'full_name' => $data['full_name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'country' => $data['country'] ?? null,
            'city' => $data['city'] ?? null,
            'current_title' => $data['current_title'] ?? null,
            'expertise' => $data['expertise'] ?? null,
            'bio' => $data['bio'] ?? null,
            'linkedin_url' => $data['linkedin_url'] ?? null,
            'portfolio_url' => $data['portfolio_url'] ?? null,
            'cv_path' => $cvPath,
            'locale' => $data['locale'] ?? null,
            'ip' => $request->ip(),
            'user_agent' => substr((string) $request->userAgent(), 0, 1000),
            'status' => 'pending',
        ]);

        return back()->with('success', 'Your expert request was submitted successfully.');
    }
}
