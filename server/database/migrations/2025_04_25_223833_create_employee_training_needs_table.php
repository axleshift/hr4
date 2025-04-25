<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('employee_training_needs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('employeeID')->unique();
            $table->enum('state', ['internship', 'fulltime', 'newhired']);
            $table->enum('status', ['trained', 'not trained'])->default('not trained');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employee_training_needs');
    }
};
