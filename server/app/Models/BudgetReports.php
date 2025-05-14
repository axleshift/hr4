<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BudgetReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'form_id',
        'program_id',
        'total_cost',
        'monthly_allocated_budget',
        'status',
    ];

    public function program()
    {
        return $this->belongsTo(Program::class);
    }
}
