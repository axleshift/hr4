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
        'status',
    ];

    public function program()
    {
        return $this->belongsTo(Program::class);
    }
}

