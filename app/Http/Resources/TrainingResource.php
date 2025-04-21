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
            'event_location' => $this->event_location,
            'schedule' => $this->schedule,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'program' => new ProgramResource($this->program),
            'course' => new CourseResource($this->course),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
