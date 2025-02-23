<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class training extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_title',
        'delivery_method',
        'event_location',
        'schedule',
        'start_time',
        'end_time',
    ];
}
