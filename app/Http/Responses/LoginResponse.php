<?php

namespace App\Http\Responses;

use Illuminate\Http\Request;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request)
    {
        /** @var Request $request */
        $user = $request->user();

        if ($user?->role === 'expert') {
            return redirect()->to('/expert/dashboard');
        }

        if ($user?->role === 'admin') {
            return redirect()->to('/admin/dashboard');
        }

        return redirect()->to('/');
    }
}
