<?php

namespace App\Http\Controllers\Api;

use App\Models\Employee;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\EmployeeResource;

class EmployeeController extends Controller
{
    public function index()
    {
        return EmployeeResource::collection(Employee::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'employeeId' => 'required|unique:employees,employeeId',
            'lastName' => 'required|string|max:255',
            'firstName' => 'required|string|max:255',
            'middleName' => 'nullable|string|max:255',
            'position' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'dateHired' => 'required|date',
            'email' => 'required|email|unique:employees,email',
        ]);

        $employee = Employee::create($data);

        return new EmployeeResource($employee);
    }

    public function show(Employee $employee)
    {
        return new EmployeeResource($employee);
    }

    public function update(Request $request, Employee $employee)
    {
        $data = $request->validate([
            'employeeId' => 'sometimes|required|unique:employees,employeeId,' . $employee->id,
            'lastName' => 'sometimes|required|string|max:255',
            'firstName' => 'sometimes|required|string|max:255',
            'middleName' => 'nullable|string|max:255',
            'position' => 'sometimes|required|string|max:255',
            'department' => 'sometimes|required|string|max:255',
            'dateHired' => 'sometimes|required|date',
            'email' => 'sometimes|required|email|unique:employees,email,' . $employee->id,
        ]);

        $employee->update($data);

        return new EmployeeResource($employee);
    }

    public function storeExternalEmployees(Request $request)
    {
        $employees = $request->validate([
            'employees' => 'required|array',
            'employees.*.employeeId' => 'required|string',
            'employees.*.lastName' => 'required|string',
            'employees.*.firstName' => 'required|string',
            'employees.*.position' => 'required|string',
            'employees.*.department' => 'required|string',
            'employees.*.dateHired' => 'required|date',
            'employees.*.email' => 'required|email',
        ]);

        $savedEmployees = [];
        foreach ($employees['employees'] as $employeeData) {
            $savedEmployees[] = Employee::updateOrCreate(
                ['employeeId' => $employeeData['employeeId']],
                $employeeData
            );
        }

        return response()->json([
            'message' => 'Employees successfully saved.',
            'data' => EmployeeResource::collection($savedEmployees),
        ]);
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();

        return response()->json(['message' => 'Employee deleted successfully']);
    }
}
