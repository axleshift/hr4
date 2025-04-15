<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App\Models\User;

class AuthController extends Controller
{

    public function index()
    {
        $users = User::with('role')->get();  // Eager load the role relationship
        return response()->json($users);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $sessionId = $request->session()->getId();
            $user = Auth::user();

            return response()->json([
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role->name ?? 'No Role',
                ],
                'session_id' => $sessionId,
            ]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function verifySession(Request $request)
    {
        $sessionId = $request->input('session_id');

        if (Session::getId() === $sessionId && Auth::check()) {
            $user = Auth::user();

            return response()->json([
                'message' => 'Session is active',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role->name ?? 'No Role',
                ],
            ]);
        }

        return response()->json(['message' => 'Session is inactive or invalid'], 401);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logout successful']);
    }
}
