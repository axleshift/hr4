<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'file_name' => $this->file_name, // Add file name here
            'file_url' => $this->file_path ? asset($this->file_path) : null, // File URL
            'program' => new ProgramResource($this->program), // Include program details
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
