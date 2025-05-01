<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    // Get all departments
    public function index()
    {
        $departments = Department::all();
        return response()->json([
            'success' => true,
            'data' => $departments,
        ]);
    }

    // Store a new department
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $department = Department::create([
            'name' => $request->name,
        ]);

        return response()->json([
            'success' => true,
            'data' => $department,
            'message' => 'Department created successfully.',
        ]);
    }

    // Show a specific department
    public function show($id)
    {
        $department = Department::find($id);

        if (!$department) {
            return response()->json(['success' => false, 'message' => 'Department not found'], 404);
        }

        return response()->json(['success' => true, 'data' => $department]);
    }

    // Update a department
    public function update(Request $request, $id)
    {
        $department = Department::find($id);

        if (!$department) {
            return response()->json(['success' => false, 'message' => 'Department not found'], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $department->update(['name' => $request->name]);

        return response()->json([
            'success' => true,
            'data' => $department,
            'message' => 'Department updated successfully.',
        ]);
    }

    // Delete a department
    public function destroy($id)
    {
        $department = Department::find($id);

        if (!$department) {
            return response()->json(['success' => false, 'message' => 'Department not found'], 404);
        }

        $department->delete();

        return response()->json([
            'success' => true,
            'message' => 'Department deleted successfully.',
        ]);
    }
}
