<?php

// app/Models/EmployeeTraining.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeTraining extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_name',
        'employee_id',
        'role',
        'department',
        'date',
        'status',
    ];
}
