<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App\Models\User;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{

    public function index()
    {
        $users = User::with('role', 'department')->get();

        return response()->json([
            'data' => $users->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role->name ?? 'No Role',
                    'department' => $user->department ? $user->department->name : 'No Department', // Safe check
                ];
            }),
        ]);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        $response = Http::withHeaders([
            'Authorization' => 'Bearer admin1229102',
        ])->post('https://backend-admin.axleshift.com/integ/external-login/HR', [
            'email' => $credentials['email'],
            'password' => $credentials['password'],
        ]);

        if ($response->successful()) {
            $data = $response->json();
            $user = $data['user'];

            $request->session()->regenerate();
            $sessionId = $request->session()->getId();

            return response()->json([
                'user' => [
                    'id' => $user['id'],
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'role' => $user['role'] ?? 'No Role',
                ],
                'session_id' => $sessionId,
            ]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function verifySession(Request $request)
    {
        $sessionId = $request->input('session_id');

        if (Session::getId() === $sessionId) {

            return response()->json([
                'message' => 'Session is active'
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
