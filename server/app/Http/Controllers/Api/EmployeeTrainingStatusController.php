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
        // Get all employees along with their training status
        $employees = Employee::with('trainingStatus')->get();

        // Return the response in JSON format
        return response()->json($employees);
    }
}
