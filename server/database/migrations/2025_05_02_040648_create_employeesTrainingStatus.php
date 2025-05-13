<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('employee_training_statuses', function (Blueprint $table) {
            $table->id();
            $table->string('employee_id')->unique(); // Unique since one status per employee
            $table->string('name');
            $table->enum('status', ['pending', 'in progress', 'completed'])->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employee_training_statuses');
    }
};
