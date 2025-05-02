<?php

namespace App\Http\Controllers\Api;

use App\Models\Employee;
use App\Models\EmployeeTrainingStatus;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EmployeeStatusController extends Controller
{
    // List employees with their training status
    public function index()
    {
        $employees = Employee::with('trainingStatus')->get();

        return response()->json([
            'data' => $employees,
        ]);
    }

    // Update an employee's training status
    public function updateStatus(Request $request, $employeeId)
    {
        $request->validate([
            'status' => 'required|in:pending,ongoing,passed,failed',
        ]);

        $employee = Employee::where('employeeId', $employeeId)->firstOrFail();

        $trainingStatus = $employee->trainingStatus;

        if ($trainingStatus) {
            $trainingStatus->update(['status' => $request->status]);
        } else {
            $trainingStatus = EmployeeTrainingStatus::create([
                'employee_id' => $employee->employeeId,
                'status' => $request->status,
            ]);
        }

        return response()->json([
            'message' => 'Status updated successfully',
            'trainingStatus' => $trainingStatus,
        ]);
    }
}
