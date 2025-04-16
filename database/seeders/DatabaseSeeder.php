<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use App\Models\Program;
use App\Models\Course;
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
            'password' => bcrypt('superadmin123'), // Secure password
            'role_id' => $superAdminRole->id, // Assign role
        ]);

        // Create an Admin
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin123'), // Secure password
            'role_id' => $adminRole->id, // Assign role
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

        // Create 3 Employees
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
        $managementProgram = Program::create([
            'title' => 'Management Development Program',
            'description' => 'A program designed to enhance managerial skills.',
        ]);

        $customerServiceProgram = Program::create([
            'title' => 'Customer Service Excellence',
            'description' => 'Focused on enhancing customer interactions.',
        ]);

        // Seed courses
        Course::create([
            'title' => 'Time Management Mastery',
            'description' => 'Learn how to manage time effectively.',
            'duration' => '4 weeks',
            'program_id' => $managementProgram->id,
        ]);

        Course::create([
            'title' => 'Project Management Basics',
            'description' => 'An introduction to project management principles.',
            'duration' => '6 weeks',
            'program_id' => $customerServiceProgram->id,
        ]);

        // Seed trainings
        DB::table('trainings')->insert([
            [
                'event_title' => 'Leadership Workshop',
                'delivery_method' => 'Online',
                'event_location' => 'Zoom',
                'schedule' => '14:00:00',
                'start_time' => '14:00',
                'end_time' => '16:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_title' => 'Communication Skills Training',
                'delivery_method' => 'On-Site',
                'event_location' => 'Conference Hall B',
                'schedule' => '10:00:00',
                'start_time' => '10:00',
                'end_time' => '12:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
