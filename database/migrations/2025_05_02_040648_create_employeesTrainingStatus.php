<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('EmployeeTrainingStatus', function (Blueprint $table) {
            $table->id();
            $table->string('employee_id')->unique();
            $table->string('status')->default('pending');
            $table->timestamps();

            $table->foreign('employee_id')->references('employeeId')->on('employees')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('EmployeeTrainingStatus');
    }
};
