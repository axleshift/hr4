<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeTrainingStatus extends Model
{
    use HasFactory;

    protected $table = 'employeeTrainingStatus';

    protected $fillable = ['employee_id', 'status'];

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id', 'employeeId');
    }
}
