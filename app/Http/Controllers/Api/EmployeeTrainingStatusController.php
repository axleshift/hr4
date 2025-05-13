<?php

namespace App\Http\Controllers\Api;

use App\Models\EmployeeTrainingStatus;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EmployeeTrainingStatusController extends Controller
{
    public function index()
    {
        $statuses = EmployeeTrainingStatus::all();
        return response()->json($statuses);
    }

    public function update(Request $request, $employeeId)
    {
        $request->validate([
            'status' => 'required|in:pending,in progress,completed',
            'name' => 'required|string', // name should come from frontend or external API
        ]);

        $trainingStatus = EmployeeTrainingStatus::updateOrCreate(
            ['employee_id' => $employeeId],
            [
                'name' => $request->name,
                'status' => $request->status,
            ]
        );

        return response()->json([
            'message' => 'Status updated successfully',
            'data' => $trainingStatus,
        ]);
    }
}
