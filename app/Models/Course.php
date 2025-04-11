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
        'program_id',
        'file_path',
        'file_name',
    ];
    public function program()
    {
        return $this->belongsTo(Program::class);
    }
}
