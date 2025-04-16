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
        'path',
        // pag nilalagyan ko neto nag eerror'title',
    ];
}
