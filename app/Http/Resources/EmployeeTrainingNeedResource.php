<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeTrainingNeedResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'employeeID' => $this->employeeID,
            'state' => $this->state,
            'status' => $this->status,
            'user_id' => $this->user_id,
            'name' => $this->user->name ?? null,
            'role' => $this->user->role->name ?? null,
            'department' => $this->user->department->name ?? null,
        ];
    }
}
