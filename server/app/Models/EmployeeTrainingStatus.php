<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeTrainingStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'name',
        'status',
    ];
}
