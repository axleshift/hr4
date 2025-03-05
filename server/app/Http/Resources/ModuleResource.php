<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ModuleResource extends JsonResource
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
            'title' => $this->title,
            'description' => $this->description,
            'file_path' => $this->file_path ? asset('storage/' . $this->file_path) : null,
            'file_name' => $this->file_path ? basename($this->file_path) : null, // Extract filename
            'created_at' => $this->created_at->toDateTimeString(),
        ];
    }
}
