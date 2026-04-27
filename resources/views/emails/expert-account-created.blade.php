<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Expert Back Office Access</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
    <h2 style="margin-bottom: 12px;">Your expert application has been accepted</h2>

    <p>Hello {{ $user->name }},</p>
    <p>
        Your expert application was accepted. You can now access your expert back office to edit your information.
    </p>

    <p><strong>Login URL:</strong> <a href="{{ url('/login') }}">{{ url('/login') }}</a></p>
    <p><strong>Email:</strong> {{ $user->email }}</p>

    @if($temporaryPassword)
        <p><strong>Temporary password:</strong> {{ $temporaryPassword }}</p>
        <p>Please sign in and change your password from Security settings.</p>
    @else
        <p>Your account already existed. If needed, you can reset your password from the login page.</p>
    @endif

    <p>
        After login, open your expert dashboard at
        <a href="{{ url('/expert/dashboard') }}">{{ url('/expert/dashboard') }}</a>.
    </p>

    <p style="margin-top: 20px;">Best regards,<br>TILILA Team</p>
</body>
</html>
