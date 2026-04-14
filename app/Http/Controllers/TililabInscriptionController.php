<?php

namespace App\Http\Controllers;

use App\Models\TililaParticipant;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TililabInscriptionController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'first_name' => ['required', 'string', 'max:120'],
            'last_name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:255', Rule::unique('tililab_participants', 'email')],
            'phone' => ['nullable', 'string', 'max:64'],
            'job_title' => ['nullable', 'string', 'max:255'],
            'organization' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:64'],
            'country' => ['nullable', 'string', 'max:16'],
            'bio' => ['nullable', 'string', 'max:300'],
            'locale' => ['nullable', 'string', 'max:8'],

            // Store an external link (SwissTransfer, Drive, etc.), not the uploaded file.
            'original_video_link' => ['required', 'url', 'max:2048'],
        ]);

        TililaParticipant::query()->create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'job_title' => $data['job_title'] ?? null,
            'organization' => $data['organization'] ?? null,
            'city' => $data['city'] ?? null,
            'country' => $data['country'] ?? null,
            'bio' => $data['bio'] ?? null,
            'original_video_link' => $data['original_video_link'],
            'locale' => $data['locale'] ?? null,
            'ip' => $request->ip(),
            'user_agent' => substr((string) $request->userAgent(), 0, 1000),
        ]);

        return back()->with('success', 'Inscription submitted.');
    }
}

