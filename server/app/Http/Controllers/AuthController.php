<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
    }

    public function login(Request $request)
    {
        // Validate the login form data
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        // Attempt to log the user in using credentials
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password], $request->remember)) {
            // If successful, redirect to the dashboard
            return redirect()->route('dashboard');
        }

        // If login fails, redirect back with error
        return redirect()->back()->withErrors(['email' => 'Invalid credentials.'])->withInput();
    }

    // Handle logout request
    public function logout()
    {
        Auth::logout(); // Log the user out
        return redirect()->route('login'); // Redirect to login page
    }

    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }
}
