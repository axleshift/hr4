<?php

namespace App\Http\Controllers\Api;

use App\Models\Employee;
use App\Models\EmployeeTrainingStatus;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EmployeeTrainingStatusController extends Controller
{
    public function index()
    {
        $employees = Employee::with('trainingStatus')->get();
        return response()->json($employees);
    }

    public function update(Request $request, $employeeId)
    {
        $request->validate(['status' => 'required|string']);

        $trainingStatus = EmployeeTrainingStatus::updateOrCreate(
            ['employee_id' => $employeeId],
            ['status' => $request->status]
        );

        return response()->json([
            'message' => 'Status updated successfully',
            'data' => $trainingStatus,
        ]);
    }
}
