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
            'employeeID' => $this->employeeID,
            'name' => $this->name,
            'position' => $this->position,
            'department' => $this->department,
            'dateHired' => $this->dateHired->toDateString(),
            'email' => $this->email,
            'created_at' => $this->created_at,
        ];
    }
}
