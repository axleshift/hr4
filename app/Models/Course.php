<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'duration', 'program_id'];

    public function program()
    {
        return $this->belongsTo(Program::class);
    }

    public function modules()
    {
        return $this->hasMany(Module::class);
    }

}

