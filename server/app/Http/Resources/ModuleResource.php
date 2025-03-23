<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ModuleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'description' => $this->description,
            'file_name'   => $this->file_name,
            'file_url'    => $this->file_path ? asset('storage/' . $this->file_path) : null, // Generates correct public URL
        ];
    }


}
