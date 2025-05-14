<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BudgetReportResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'form_id' => $this->form_id,
            'program' => new ProgramResource($this->whenLoaded('program')),
            'total_cost' => $this->total_cost,
            'monthly_allocated_budget' => $this->monthly_allocated_budget,
            'status' => $this->status,
        ];
    }

}
