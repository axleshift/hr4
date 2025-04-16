<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EmployeeTraining;
use App\Http\Resources\EmployeeTrainingResource;
use Illuminate\Http\Request;

class EmployeeTrainingController extends Controller
{
    public function index()
    {
        return EmployeeTrainingResource::collection(EmployeeTraining::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_name' => 'required|string',
            'employee_id' => 'required|string|unique:employee_trainings,employee_id',
            'role' => 'required|string',
            'department' => 'required|string',
            'date' => 'required|date',
            'status' => 'required|string',
        ]);

        $training = EmployeeTraining::create($validated);

        return new EmployeeTrainingResource($training);
    }

    public function show(EmployeeTraining $employeeTraining)
    {
        return new EmployeeTrainingResource($employeeTraining);
    }

    public function update(Request $request, EmployeeTraining $employeeTraining)
    {
        $validated = $request->validate([
            'employee_name' => 'string',
            'employee_id' => 'string|unique:employee_trainings,employee_id,' . $employeeTraining->id,
            'role' => 'string',
            'department' => 'string',
            'date' => 'date',
            'status' => 'string',
        ]);

        $employeeTraining->update($validated);

        return new EmployeeTrainingResource($employeeTraining);
    }

    public function destroy(EmployeeTraining $employeeTraining)
    {
        $employeeTraining->delete();

        return response()->noContent();
    }
}

