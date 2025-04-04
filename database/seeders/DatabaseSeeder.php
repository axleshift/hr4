<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use App\Models\Program;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Ensure roles exist before assigning them
        $superAdminRole = Role::firstOrCreate(['name' => 'superadmin']);
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $staffRole = Role::firstOrCreate(['name' => 'staff']);
        $employeeRole = Role::firstOrCreate(['name' => 'employee']);

        // Create a Super Admin
        User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'sadmin@gmail.com',
            'password' => bcrypt('superadmin123'),
            'role_id' => $superAdminRole->id,
            'employee_type' => 'Full-Time',
            'employment_status' => 'Active',
            'date_of_hire' => now()->subYears(5)->format('Y-m-d'),
            'gender' => 'Male',
            'phone_number' => '1234567890',
            'address' => '123 Admin Street, Admin City',
            'department' => 'Administration',
        ]);

        // Create an Admin
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin123'),
            'role_id' => $adminRole->id,
            'employee_type' => 'Full-Time',
            'employment_status' => 'Active',
            'date_of_hire' => now()->subYears(3)->format('Y-m-d'),
            'gender' => 'Female',
            'phone_number' => '9876543210',
            'address' => '456 Admin Avenue, Admin City',
            'department' => 'Administration',
        ]);

        // Create 2 Staff members
        User::factory()->create([
            'name' => 'Manager',
            'email' => 'staff1@gmail.com',
            'password' => bcrypt('staff123'),
            'role_id' => $staffRole->id,
            'employee_type' => 'Full-Time',
            'employment_status' => 'Active',
            'date_of_hire' => now()->subYears(4)->format('Y-m-d'),
            'gender' => 'Male',
            'phone_number' => '5551234567',
            'address' => '789 Staff Lane, Staff City',
            'department' => 'Management',
        ]);

        User::factory()->create([
            'name' => 'Trainer',
            'email' => 'staff2@gmail.com',
            'password' => bcrypt('staff123'),
            'role_id' => $staffRole->id,
            'employee_type' => 'Part-Time',
            'employment_status' => 'On Leave',
            'date_of_hire' => now()->subMonths(6)->format('Y-m-d'),
            'gender' => 'Female',
            'phone_number' => '5557654321',
            'address' => '321 Trainer Road, Trainer City',
            'department' => 'Training',
        ]);

        // Create 3 Employees
        User::factory()->create([
            'name' => 'Cristy',
            'email' => 'employee1@gmail.com',
            'password' => bcrypt('employee123'),
            'role_id' => $employeeRole->id,
            'employee_type' => 'Full-Time',
            'employment_status' => 'Active',
            'date_of_hire' => now()->subMonths(2)->format('Y-m-d'),
            'gender' => 'Female',
            'phone_number' => '5552345678',
            'address' => '123 Employee Street, City A',
            'department' => 'Customer Service',
        ]);

        User::factory()->create([
            'name' => 'Malabad',
            'email' => 'employee2@gmail.com',
            'password' => bcrypt('employee123'),
            'role_id' => $employeeRole->id,
            'employee_type' => 'Part-Time',
            'employment_status' => 'Active',
            'date_of_hire' => now()->subYears(1)->format('Y-m-d'),
            'gender' => 'Male',
            'phone_number' => '5558765432',
            'address' => '456 Employee Avenue, City B',
            'department' => 'Operations',
        ]);

        User::factory()->create([
            'name' => 'Guma',
            'email' => 'employee3@gmail.com',
            'password' => bcrypt('employee123'),
            'role_id' => $employeeRole->id,
            'employee_type' => 'Full-Time',
            'employment_status' => 'On Leave',
            'date_of_hire' => now()->subMonths(9)->format('Y-m-d'),
            'gender' => 'Male',
            'phone_number' => '5553456789',
            'address' => '789 Employee Boulevard, City C',
            'department' => 'Operations',
        ]);

        User::factory()->create([
            'name' => 'Tidoso',
            'email' => 'employee4@gmail.com',
            'password' => bcrypt('employee123'),
            'role_id' => $employeeRole->id,
            'employee_type' => 'Full-Time',
            'employment_status' => 'Active',
            'date_of_hire' => now()->subMonths(3)->format('Y-m-d'),
            'gender' => 'Female',
            'phone_number' => '5559876543',
            'address' => '321 Employee Circle, City D',
            'department' => 'Customer Service',
        ]);

        // Seed programs
        $managementProgram = Program::create([
            'title' => 'Management Development Program',
            'description' => 'A program designed to enhance managerial skills.',
        ]);

        $customerServiceProgram = Program::create([
            'title' => 'Customer Service Excellence',
            'description' => 'Focused on enhancing customer interactions.',
        ]);
    }
}
