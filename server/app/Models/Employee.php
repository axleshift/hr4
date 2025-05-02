<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'employeeId',
        'lastName',
        'firstName',
        'middleName',
        'position',
        'department',
        'dateHired',
        'email',
    ];

    protected $casts = [
        'dateHired' => 'date',
    ];

    public function trainingStatus()
    {
        return $this->hasOne(EmployeeTrainingStatus::class, 'employee_id', 'employeeId');
    }
}
