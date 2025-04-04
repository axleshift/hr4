<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    // Define the fillable attributes for the course model
    protected $fillable = [
        'title',          // Course title
        'description',    // Course description
        'program_id',     // Foreign key to the Program
        'file_path',      // Path to the uploaded file
        'file_name',      // The file's name
    ];
    public function program()
    {
        return $this->belongsTo(Program::class);  // Course belongs to a Program
    }
}
