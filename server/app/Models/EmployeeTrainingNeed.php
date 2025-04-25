<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EmployeeTrainingNeed extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'employeeID',
        'state',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function trainingNeeds()
    {
        return $this->hasMany(EmployeeTrainingNeed::class);
    }
}
