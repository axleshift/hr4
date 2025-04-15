<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use App\Models\Program;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Ensure roles exist before assigning them
        $superAdminRole = Role::firstOrCreate(['name' => 'superadmin']);
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $staffRole = Role::firstOrCreate(['name' => 'staff']);
        $employeeRole = Role::firstOrCreate(['name' => 'employee']);

        // Create Super Admin
        User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'sadmin@gmail.com',
            'password' => bcrypt('superadmin123'),
            'role_id' => $superAdminRole->id,
        ]);

        // Create Admin
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin123'),
            'role_id' => $adminRole->id,
        ]);

        // Create 2 Staff members
        User::factory()->create([
            'name' => 'Manager',
            'email' => 'staff1@gmail.com',
            'password' => bcrypt('staff123'),
            'role_id' => $staffRole->id,
        ]);

        User::factory()->create([
            'name' => 'Trainer',
            'email' => 'staff2@gmail.com',
            'password' => bcrypt('staff123'),
            'role_id' => $staffRole->id,
        ]);

        // Create 4 Employees
        User::factory()->create([
            'name' => 'Cristy',
            'email' => 'employee1@gmail.com',
            'password' => bcrypt('employee123'),
            'role_id' => $employeeRole->id,
        ]);

        User::factory()->create([
            'name' => 'Malabad',
            'email' => 'employee2@gmail.com',
            'password' => bcrypt('employee123'),
            'role_id' => $employeeRole->id,
        ]);

        User::factory()->create([
            'name' => 'Guma',
            'email' => 'employee3@gmail.com',
            'password' => bcrypt('employee123'),
            'role_id' => $employeeRole->id,
        ]);

        User::factory()->create([
            'name' => 'Tidoso',
            'email' => 'employee4@gmail.com',
            'password' => bcrypt('employee123'),
            'role_id' => $employeeRole->id,
        ]);

        // Seed programs
        Program::create([
            'title' => 'Management Development Program',
            'description' => 'A program designed to enhance managerial skills.',
        ]);

        Program::create([
            'title' => 'Customer Service Excellence',
            'description' => 'Focused on enhancing customer interactions.',
        ]);
    }
}
