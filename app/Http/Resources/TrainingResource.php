<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrainingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'event_title' => $this->event_title,
            'delivery_method' => $this->delivery_method,
            'event_location' => $this->event_location,
            'schedule' => $this->schedule,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'program_id' => $this->program_id,
            'program_name' => $this->program->title ?? null,
            'course_id' => $this->course_id,
            'course_name' => $this->course->title ?? null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
