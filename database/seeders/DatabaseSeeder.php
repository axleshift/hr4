<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Bench Manuel',
            'email' => 'benchmanuel2002@gmail.com',
            'password' => Hash::make('bentong15'),
            'is_admin' => true,
        ]);
    }
}
