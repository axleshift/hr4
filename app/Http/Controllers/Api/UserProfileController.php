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

    // Fetch user profile by ID (Full profile)
    public function show($id)
    {
        // Ensure user has access to the profile (optional, can be based on authorization)
        $user = User::findOrFail($id);

        return response()->json([
            'data' => $user
        ]);
    }

    // Fetch specific profile (only name, email, and department)
    public function showSpecificProfile($id)
    {
        // Fetch the user with only the fields we need: name, email, and department
        $user = User::with('department') // Load the department relationship
            ->select('id', 'name', 'email') // Select only the fields you need
            ->findOrFail($id);

        // Return only the necessary data (name, email, and department)
        return response()->json([
            'data' => [
                'name' => $user->name,
                'email' => $user->email,
                'department' => $user->department->name ?? 'No Department', // Fallback for missing department
            ],
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
        ]);

        // Fetch user and update their profile
        $user = User::findOrFail($id);
        $user->update($validated);

        return response()->json([
            'message' => 'Profile updated successfully',
            'data' => $user
        ]);
    }
}
