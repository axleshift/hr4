<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use App\Models\Program;
use App\Models\Course;
use App\Models\Training;
class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Ensure roles exist
        $superAdminRole = Role::firstOrCreate(['name' => 'superadmin']);
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $staffRole = Role::firstOrCreate(['name' => 'staff']);
        $employeeRole = Role::firstOrCreate(['name' => 'employee']);
        
        // Create users with different roles and departments
        User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'sadmin@gmail.com',
            'password' => bcrypt('superadmin123'),
            'role_id' => $superAdminRole->id,
        ]);

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin123'),
            'role_id' => $adminRole->id,
        ]);

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

        // Programs
        $managementProgram = Program::create([
            'title' => 'Management Development Program',
            'description' => 'A program designed to enhance managerial skills.',
        ]);

        $customerServiceProgram = Program::create([
            'title' => 'Customer Service Excellence',
            'description' => 'Focused on enhancing customer interactions.',
        ]);

        // Courses
        $leadershipEssentials = Course::create([
            'title' => 'Leadership Essentials',
            'description' => 'Fundamentals of team leadership and people management.',
            'program_id' => $managementProgram->id,
        ]);

        $strategicPlanning = Course::create([
            'title' => 'Strategic Planning',
            'description' => 'Developing and executing strategic plans.',
            'program_id' => $managementProgram->id,
        ]);

        $effectiveCommunication = Course::create([
            'title' => 'Effective Communication',
            'description' => 'Improving internal and external communication.',
            'program_id' => $customerServiceProgram->id,
        ]);

        $handlingCustomers = Course::create([
            'title' => 'Handling Difficult Customers',
            'description' => 'Conflict resolution and customer de-escalation techniques.',
            'program_id' => $customerServiceProgram->id,
        ]);

        // Trainings (without start_time and end_time)
        Training::create([
            'event_location' => 'Conference Room A',
            'schedule' => '2025-05-01',
            'program_id' => $managementProgram->id,
            'course_id' => $leadershipEssentials->id,
        ]);

        Training::create([
            'event_location' => 'Zoom',
            'schedule' => '2025-05-10',
            'program_id' => $managementProgram->id,
            'course_id' => $strategicPlanning->id,
        ]);

        Training::create([
            'event_location' => 'Room 205',
            'schedule' => '2025-05-15',
            'program_id' => $customerServiceProgram->id,
            'course_id' => $effectiveCommunication->id,
        ]);

        Training::create([
            'event_location' => 'Google Meet',
            'schedule' => '2025-05-20',
            'program_id' => $customerServiceProgram->id,
            'course_id' => $handlingCustomers->id,
        ]);
    }
}
