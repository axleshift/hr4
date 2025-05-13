<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use App\Models\Program;
use App\Models\Course;
use App\Models\Training;
use App\Models\Department;

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
        $managementProgram = Program::firstOrCreate([
            'title' => 'Management Development Program'
        ], [
            'description' => 'A program designed to enhance managerial skills.'
        ]);

        $customerServiceProgram = Program::firstOrCreate([
            'title' => 'Customer Service Excellence'
        ], [
            'description' => 'Focused on enhancing customer interactions within freight and logistics services.'
        ]);

        $inventoryProgram = Program::firstOrCreate([
            'title' => 'Inventory and Supply Chain Management'
        ], [
            'description' => 'Covers inventory control and supply chain optimization for freight operations.'
        ]);

        $dataTechProgram = Program::firstOrCreate([
            'title' => 'Freight Data and Technology Program'
        ], [
            'description' => 'Focuses on using digital tools and data analytics in freight logistics.'
        ]);

        // Courses
        $leadershipEssentials = Course::firstOrCreate([
            'title' => 'Leadership Essentials',
            'program_id' => $managementProgram->id,
        ], [
            'description' => 'Fundamentals of team leadership and people management.'
        ]);

        $strategicPlanning = Course::firstOrCreate([
            'title' => 'Strategic Planning',
            'program_id' => $managementProgram->id,
        ], [
            'description' => 'Developing and executing strategic plans.'
        ]);

        $effectiveCommunication = Course::firstOrCreate([
            'title' => 'Effective Communication',
            'program_id' => $customerServiceProgram->id,
        ], [
            'description' => 'Improving internal and external communication in a freight environment.'
        ]);

        $handlingCustomers = Course::firstOrCreate([
            'title' => 'Handling Difficult Customers',
            'program_id' => $customerServiceProgram->id,
        ], [
            'description' => 'Conflict resolution and customer de-escalation techniques.'
        ]);

        $inventoryControl = Course::firstOrCreate([
            'title' => 'Inventory Control Techniques',
            'program_id' => $inventoryProgram->id,
        ], [
            'description' => 'Learn methods for stock management, cycle counting, and reducing shrinkage.'
        ]);

        $demandForecasting = Course::firstOrCreate([
            'title' => 'Demand Forecasting and Planning',
            'program_id' => $inventoryProgram->id,
        ], [
            'description' => 'Using data to anticipate demand and align inventory accordingly.'
        ]);

        $supplyChainOptimization = Course::firstOrCreate([
            'title' => 'Supply Chain Optimization',
            'program_id' => $inventoryProgram->id,
        ], [
            'description' => 'Streamlining supplier coordination, lead times, and freight procurement.'
        ]);

        $freightManagementSystems = Course::firstOrCreate([
            'title' => 'Freight Management Systems (FMS)',
            'program_id' => $dataTechProgram->id,
        ], [
            'description' => 'Overview of software used for tracking, scheduling, and documentation in freight.'
        ]);

        $dataAnalyticsForLogistics = Course::firstOrCreate([
            'title' => 'Data Analytics for Logistics',
            'program_id' => $dataTechProgram->id,
        ], [
            'description' => 'Using dashboards and KPIs to make operational decisions.'
        ]);

        $digitalDocumentation = Course::firstOrCreate([
            'title' => 'Digital Documentation and E-BOLs',
            'program_id' => $dataTechProgram->id,
        ], [
            'description' => 'Training on electronic Bills of Lading and digital record-keeping.'
        ]);

        // Departments (Add departments to reference in training records)
        $humanResourceDept = Department::firstOrCreate(['name' => 'Human Resource']);
        $operationsDept = Department::firstOrCreate(['name' => 'Operations']);
        $logisticsDept = Department::firstOrCreate(['name' => 'Logistics']);
        $dispatchDept = Department::firstOrCreate(['name' => 'Dispatch']);

        // Trainings
        Training::create([
            'event_location' => 'Conference Room A',
            'schedule' => '2025-05-01',
            'delivery_method' => 'In-person',
            'department_id' => $humanResourceDept->id,
            'program_id' => $managementProgram->id,
            'course_id' => $leadershipEssentials->id,
        ]);

        Training::create([
            'event_location' => 'Zoom',
            'schedule' => '2025-05-10',
            'delivery_method' => 'Online',
            'department_id' => $operationsDept->id,
            'program_id' => $managementProgram->id,
            'course_id' => $strategicPlanning->id,
        ]);

        Training::create([
            'event_location' => 'Room 205',
            'schedule' => '2025-05-15',
            'delivery_method' => 'In-person',
            'department_id' => $logisticsDept->id,
            'program_id' => $customerServiceProgram->id,
            'course_id' => $effectiveCommunication->id,
        ]);

        Training::create([
            'event_location' => 'Google Meet',
            'schedule' => '2025-05-20',
            'delivery_method' => 'Online',
            'department_id' => $dispatchDept->id,
            'program_id' => $customerServiceProgram->id,
            'course_id' => $handlingCustomers->id,
        ]);
    }
}
