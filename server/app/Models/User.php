<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    // Fillable fields for mass assignment
    protected $fillable = ['name', 'email', 'password'];

    // Hidden fields to avoid exposing sensitive data
    protected $hidden = ['password', 'remember_token'];
}
