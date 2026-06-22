<?php

namespace App\Http\Controllers;

use App\Models\ProgramContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactPageController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('contact/index');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'organization' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:64',
            'subject' => 'required|string|max:64',
            'message' => 'required|string|max:5000',
            'consent' => 'accepted|boolean',
            'locale' => 'nullable|string|max:8',
        ]);

        $program = match ($data['subject']) {
            'tilila' => 'tilila',
            'tililab' => 'tililab',
            default => null,
        };

        $lines = [];
        if (! empty($data['organization'])) {
            $lines[] = 'Organisation: '.$data['organization'];
        }
        if (! empty($data['phone'])) {
            $lines[] = 'Téléphone: '.$data['phone'];
        }
        $lines[] = $data['message'];
        $body = implode("\n", $lines);

        ProgramContactMessage::query()->create([
            'program' => $program,
            'name' => $data['name'],
            'email' => $data['email'],
            'subject' => $data['subject'],
            'message' => $body,
            'locale' => $data['locale'] ?? null,
            'ip' => $request->ip(),
        ]);

        return back()->with(
            'success',
            match ($data['locale'] ?? 'fr') {
                'en' => 'Thank you — your message has been sent.',
                'ar' => 'شكراً — تم إرسال رسالتكم بنجاح.',
                default => 'Merci — votre message a bien été envoyé.',
            },
        );
    }
}
