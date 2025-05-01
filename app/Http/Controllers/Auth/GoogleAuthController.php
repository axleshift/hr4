<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Throwable;

class GoogleAuthController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();

    }

    public function callbackGoogle(Request $request)
    {
        try {
            // Use Socialite without the stateless method
            $google_user = Socialite::driver('google')->user();

            $user = User::where('google_id', $google_user->getId())->first();

            if (!$user) {
                // If the user doesn't exist, create a new one
                $new_user = User::create([
                    'name' => $google_user->getName(),
                    'email' => $google_user->getEmail(),
                    'google_id' => $google_user->getId(),
                ]);

                Auth::login($new_user);

                return redirect()->intended('dashboard');
            }

            // If the user exists, log them in
            Auth::login($user);
            return redirect()->intended('dashboard');
        } catch (Throwable $th) {
            // Handle errors
            dd('Something went wrong', $th->getMessage());
        }
    }

}
