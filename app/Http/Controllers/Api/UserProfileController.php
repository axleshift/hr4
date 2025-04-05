<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserProfileController extends Controller
{
    // Fetch all users (including profile fields)
    public function index()
    {
        // Retrieve all users with the new fields
        $users = User::all();

        return response()->json([
            'data' => $users
        ]);
    }

    // Fetch user profile by ID
    public function show($id)
    {
        // Ensure user has access to the profile (optional, can be based on authorization)
        $user = User::findOrFail($id);

        return response()->json([
            'data' => $user
        ]);
    }

    // Update user profile
    public function update(Request $request, $id)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'employee_type' => 'nullable|string',
            'employment_status' => 'nullable|string',
            'date_of_hire' => 'nullable|date',
            'gender' => 'nullable|string',
            'phone_number' => 'nullable|string',
            'address' => 'nullable|string',
            'department' => 'nullable|string', // Added validation for department
        ]);

        // Fetch user and update their profile
        $user = User::findOrFail($id);
        $user->update($validated);

        return response()->json([
            'message' => 'Profile updated successfully',
            'data' => $user
        ]);
    }

    // Debug roles to check if roles are loaded correctly
    public function debugRoles()
    {
        $users = User::with('role')->get();

        foreach ($users as $user) {
            echo "{$user->name} - Role ID: {$user->role_id} - Role: " . ($user->role->name ?? 'NULL') . "\n";
        }
    }
}
