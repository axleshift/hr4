<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserProfileController extends Controller
{

    public function show($id)
    {

        $user = User::with(['role', 'department'])->findOrFail($id);

        return response()->json(['data' => $user]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        
        $validated = $request->validate([
            'department' => 'nullable|string',
            'employee_type' => 'nullable|string',
            'employment_status' => 'nullable|string',
            'date_of_hire' => 'nullable|date',
            'gender' => 'nullable|string',
            'phone_number' => 'nullable|string',
            'address' => 'nullable|string',
        ]);

        
        $user->update($validated);

        
        return response()->json(['data' => $user]);
    }
}
