<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;  // Make sure this is imported
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable // Ensure it extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
