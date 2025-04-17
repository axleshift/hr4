<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
    'title', 
    'description', 
    'file_path',
    'file_name', 
    'program_id',
    ];

    public function program()
    {
        return $this->belongsTo(Program::class);
    }
}

