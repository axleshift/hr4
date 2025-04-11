<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeTrainingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'employee_name' => $this->employee_name,
            'employee_id' => $this->employee_id,
            'role' => $this->role,
            'department' => $this->department,
            'date' => $this->date,
            'status' => $this->status,
        ];
    }
}
