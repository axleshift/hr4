<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeTrainingStatusResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'employee_id' => $this->employee_id,
            'name' => $this->name,  // Training status (e.g., pending, ongoing)
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
