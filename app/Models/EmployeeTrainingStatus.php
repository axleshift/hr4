<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeTrainingStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'name', // status like pending, ongoing, passed, failed
    ];

    // Defining the inverse relationship to the Employee model
    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }
}
