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

        // Create users with different roles
        User::factory()->create(['name' => 'Super Admin', 'email' => 'sadmin@gmail.com', 'password' => bcrypt('superadmin123'), 'role_id' => $superAdminRole->id]);
        User::factory()->create(['name' => 'Admin', 'email' => 'admin@gmail.com', 'password' => bcrypt('admin123'), 'role_id' => $adminRole->id]);
        User::factory()->create(['name' => 'Manager', 'email' => 'staff1@gmail.com', 'password' => bcrypt('staff123'), 'role_id' => $staffRole->id]);
        User::factory()->create(['name' => 'Trainer', 'email' => 'staff2@gmail.com', 'password' => bcrypt('staff123'), 'role_id' => $staffRole->id]);
        User::factory()->create(['name' => 'Cristy', 'email' => 'employee1@gmail.com', 'password' => bcrypt('employee123'), 'role_id' => $employeeRole->id]);
        User::factory()->create(['name' => 'Malabad', 'email' => 'employee2@gmail.com', 'password' => bcrypt('employee123'), 'role_id' => $employeeRole->id]);
        User::factory()->create(['name' => 'Guma', 'email' => 'employee3@gmail.com', 'password' => bcrypt('employee123'), 'role_id' => $employeeRole->id]);
        User::factory()->create(['name' => 'Tidoso', 'email' => 'employee4@gmail.com', 'password' => bcrypt('employee123'), 'role_id' => $employeeRole->id]);

        // Programs
        $managementProgram = Program::create(['title' => 'Management Development Program', 'description' => 'A program designed to enhance managerial skills.']);
        $customerServiceProgram = Program::create(['title' => 'Customer Service Excellence', 'description' => 'Focused on enhancing customer interactions within freight and logistics services.']);
        $inventoryProgram = Program::create(['title' => 'Inventory and Supply Chain Management', 'description' => 'Covers inventory control and supply chain optimization for freight operations.']);
        $dataTechProgram = Program::create(['title' => 'Freight Data and Technology Program', 'description' => 'Focuses on using digital tools and data analytics in freight logistics.']);
        $onboardingProgram = Program::create(['title' => 'Employee Onboarding Program', 'description' => 'Introduction and orientation for new freight and logistics employees.']);

        // Courses
        $leadershipEssentials = Course::create(['title' => 'Leadership Essentials', 'description' => 'Fundamentals of team leadership and people management.', 'program_id' => $managementProgram->id]);
        $strategicPlanning = Course::create(['title' => 'Strategic Planning', 'description' => 'Developing and executing strategic plans in logistics and operations.', 'program_id' => $managementProgram->id]);

        $effectiveCommunication = Course::create(['title' => 'Effective Communication', 'description' => 'Improving internal and external communication in a freight environment.', 'program_id' => $customerServiceProgram->id]);
        $handlingCustomers = Course::create(['title' => 'Handling Difficult Customers', 'description' => 'Conflict resolution and customer de-escalation techniques.', 'program_id' => $customerServiceProgram->id]);

        Course::create(['title' => 'Inventory Control Techniques', 'description' => 'Learn methods for stock management, cycle counting, and reducing shrinkage.', 'program_id' => $inventoryProgram->id]);
        Course::create(['title' => 'Demand Forecasting and Planning', 'description' => 'Using data to anticipate demand and align inventory accordingly.', 'program_id' => $inventoryProgram->id]);
        Course::create(['title' => 'Supply Chain Optimization', 'description' => 'Streamlining supplier coordination, lead times, and freight procurement.', 'program_id' => $inventoryProgram->id]);

        Course::create(['title' => 'Freight Management Systems (FMS)', 'description' => 'Overview of software used for tracking, scheduling, and documentation in freight.', 'program_id' => $dataTechProgram->id]);
        Course::create(['title' => 'Data Analytics for Logistics', 'description' => 'Using dashboards and KPIs to make operational decisions.', 'program_id' => $dataTechProgram->id]);
        Course::create(['title' => 'Digital Documentation and E-BOLs', 'description' => 'Training on electronic Bills of Lading and digital record-keeping.', 'program_id' => $dataTechProgram->id]);

        $companyPolicies = Course::create(['title' => 'Company Policies', 'description' => 'Overview of company rules, code of conduct, and employee handbook.', 'program_id' => $onboardingProgram->id]);
        $workplaceSafety = Course::create(['title' => 'Workplace Safety', 'description' => 'Training on safety practices, emergency protocols, and injury prevention.', 'program_id' => $onboardingProgram->id]);
        $introToFreightOps = Course::create(['title' => 'Introduction to Freight Operations', 'description' => 'Basic understanding of freight logistics, handling, and routing.', 'program_id' => $onboardingProgram->id]);

        // Trainings
        Training::create(['event_location' => 'Conference Room A', 'schedule' => '2025-05-01', 'delivery_method' => 'In-person', 'department_id' => 'Human Resource', 'program_id' => $managementProgram->id, 'course_id' => $leadershipEssentials->id]);
        Training::create(['event_location' => 'Zoom', 'schedule' => '2025-05-10', 'delivery_method' => 'Online', 'department_id' => 'Operations', 'program_id' => $managementProgram->id, 'course_id' => $strategicPlanning->id]);
        Training::create(['event_location' => 'Room 205', 'schedule' => '2025-05-15', 'delivery_method' => 'In-person', 'department_id' => 'Logistics', 'program_id' => $customerServiceProgram->id, 'course_id' => $effectiveCommunication->id]);
        Training::create(['event_location' => 'Google Meet', 'schedule' => '2025-05-20', 'delivery_method' => 'Online', 'department_id' => 'Dispatch', 'program_id' => $customerServiceProgram->id, 'course_id' => $handlingCustomers->id]);

        Training::create(['event_location' => 'Training Room 1', 'schedule' => '2025-05-25', 'delivery_method' => 'In-person', 'department_id' => 'Human Resource', 'program_id' => $onboardingProgram->id, 'course_id' => $companyPolicies->id]);
        Training::create(['event_location' => 'Training Room 2', 'schedule' => '2025-05-26', 'delivery_method' => 'In-person', 'department_id' => 'Human Resource', 'program_id' => $onboardingProgram->id, 'course_id' => $workplaceSafety->id]);
        Training::create(['event_location' => 'Training Room 3', 'schedule' => '2025-05-27', 'delivery_method' => 'In-person', 'department_id' => 'Logistics', 'program_id' => $onboardingProgram->id, 'course_id' => $introToFreightOps->id]);
    }
}
