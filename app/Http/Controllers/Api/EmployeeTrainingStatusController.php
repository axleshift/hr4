<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EmployeeTrainingStatus;
use App\Models\Employee;
use App\Http\Resources\EmployeeTrainingStatusResource;
use Illuminate\Http\Request;

class EmployeeTrainingStatusController extends Controller
{
    // Show the training status for a specific employee
    public function show($employeeId)
    {
        $employee = Employee::findOrFail($employeeId);
        $trainingStatus = $employee->trainingStatus; // Relationship defined in Employee model

        if (!$trainingStatus) {
            return response()->json(['message' => 'Training status not found'], 404);
        }

        return new EmployeeTrainingStatusResource($trainingStatus);
    }

    // Store a new training status for an employee
    public function store(Request $request, $employeeId)
    {
        $request->validate([
            'name' => 'required|string|in:pending,ongoing,passed,failed',  // Validate status
        ]);

        $employee = Employee::findOrFail($employeeId);
        
        $trainingStatus = $employee->trainingStatus()->create([
            'name' => $request->name,
        ]);

        return new EmployeeTrainingStatusResource($trainingStatus);
    }

    // Update the training status of a specific employee
    public function update(Request $request, $employeeId)
    {
        $request->validate([
            'name' => 'required|string|in:pending,ongoing,passed,failed',  // Validate status
        ]);

        $employee = Employee::findOrFail($employeeId);
        $trainingStatus = $employee->trainingStatus; // Assuming employee has one training status

        if (!$trainingStatus) {
            return response()->json(['message' => 'Training status not found'], 404);
        }

        $trainingStatus->update([
            'name' => $request->name,
        ]);

        return new EmployeeTrainingStatusResource($trainingStatus);
    }

    // Delete the training status of a specific employee
    public function destroy($employeeId)
    {
        $employee = Employee::findOrFail($employeeId);
        $trainingStatus = $employee->trainingStatus;

        if (!$trainingStatus) {
            return response()->json(['message' => 'Training status not found'], 404);
        }

        $trainingStatus->delete();

        return response()->json(['message' => 'Training status deleted successfully']);
    }
}
