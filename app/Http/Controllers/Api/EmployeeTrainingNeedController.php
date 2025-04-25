<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EmployeeTrainingNeed;
use App\Http\Resources\EmployeeTrainingNeedResource;
use Illuminate\Http\Request;

class EmployeeTrainingNeedController extends Controller
{
    // GET: /api/training-needs - List all training needs with user info
    public function index()
    {
        $needs = EmployeeTrainingNeed::with('user.role', 'user.department')->get();

        // Use the resource to format each item in the collection
        return EmployeeTrainingNeedResource::collection($needs);
    }

    // GET: /api/training-needs/{id} - Show a single training need
    public function show($id)
    {
        $need = EmployeeTrainingNeed::with('user.role', 'user.department')->findOrFail($id);

        // Return the single resource formatted
        return new EmployeeTrainingNeedResource($need);
    }

    // POST: /api/training-needs - Create a new training need
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'employeeID' => 'required|unique:employee_training_needs,employeeID',
            'state' => 'required|in:internship,fulltime,newhired',
            'status' => 'required|in:trained,not trained',
        ]);

        $need = EmployeeTrainingNeed::create($validated);

        // Return the newly created resource
        return new EmployeeTrainingNeedResource($need->load('user.role', 'user.department'));
    }

    // PUT/PATCH: /api/training-needs/{id} - Update an existing training need
    public function update(Request $request, $id)
    {
        $need = EmployeeTrainingNeed::findOrFail($id);

        $validated = $request->validate([
            'state' => 'sometimes|in:internship,fulltime,newhired',
            'status' => 'sometimes|in:trained,not trained',
        ]);

        $need->update($validated);

        // Return the updated resource
        return new EmployeeTrainingNeedResource($need->load('user.role', 'user.department'));
    }

    // DELETE: /api/training-needs/{id} - Delete a training need
    public function destroy($id)
    {
        $need = EmployeeTrainingNeed::findOrFail($id);
        $need->delete();

        return response()->json(['message' => 'Training need deleted successfully.']);
    }
}
