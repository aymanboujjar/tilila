<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ExpertAccountCreated extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public User $user,
        public ?string $temporaryPassword,
        public bool $isNewAccount,
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Expert Back Office Access',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.expert-account-created',
        );
    }
}
