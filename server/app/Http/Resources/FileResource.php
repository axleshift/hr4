<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // Find user by username
        $user = User::where('username', $validated['username'])->first();

        // Check if user exists and password matches
        if ($user && $user->password === $validated['password']) {
            // You can return a response or something else here
            return response()->json(['message' => 'Login successful!'], 200);
        }

        return response()->json(['message' => 'Invalid username or password'], 401);
    }
}
