@php
    /** @var \App\Models\TililaContestParticipant $participant */
@endphp
<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Accusé de réception — Trophée Tilila</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.5; color: #111;">
<div style="max-width: 640px; margin: 0 auto; padding: 24px;">
    <h2 style="margin: 0 0 12px;">Accusé de réception — Trophée Tilila</h2>

    <p style="margin: 0 0 12px;">
        Bonjour {{ $participant->first_name }} {{ $participant->last_name }},
    </p>

    <p style="margin: 0 0 12px;">
        Nous confirmons la bonne réception de votre formulaire de participation au <strong>Trophée Tilila</strong>.
    </p>

    <div style="margin: 16px 0; padding: 12px 14px; background: #f6f7f9; border: 1px solid #e5e7eb; border-radius: 10px;">
        <div><strong>Année</strong>: {{ now()->year }}</div>
        @if($participant->submission_title)
            <div><strong>Titre</strong>: {{ $participant->submission_title }}</div>
        @endif
        @if($participant->submission_link)
            <div><strong>Lien</strong>: {{ $participant->submission_link }}</div>
        @endif
        <div><strong>Date</strong>: {{ $participant->created_at?->format('Y-m-d H:i') }}</div>
    </div>

    <p style="margin: 0;">
        Merci, <br>
        L’équipe Tilila
    </p>
</div>
</body>
</html>

