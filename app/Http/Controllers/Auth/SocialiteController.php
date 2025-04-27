<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class SocialiteController extends Controller
{
    public function redirectToProvider($provider)
    {
        /** @var Provider $driver */
        $driver = Socialite::driver($provider);

        return $driver->stateless()->redirect();
    }

    public function handleProviderCallback($provider)
    {
        /** @var Provider $driver */
        $driver = Socialite::driver($provider);

        $socialUser = $driver->stateless()->user();

        $user = User::firstOrCreate(
            ['email' => $socialUser->getEmail()],
            ['name' => $socialUser->getName()]
        );

        Auth::login($user);

        $token = $user->createToken('socialite-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user,
        ]);
    }
}
