<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'employeeId' => $this->employeeId,
            'lastName' => $this->lastName,
            'firstName' => $this->firstName,
            'middleName' => $this->middleName,
            'position' => $this->position,
            'department' => $this->department,
            'dateHired' => $this->dateHired->toDateString(),
            'email' => $this->email,
            'created_at' => $this->created_at,
        ];
    }
}
