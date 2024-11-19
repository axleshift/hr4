<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    protected $fillable = [
        'original_name',
        'file_type',
        'base64_content',
        'module_id',
    ];

    // Define the relationship with Module
    public function module()
    {
        return $this->belongsTo(Module::class);
    }
}
