<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('employee_trainings', function (Blueprint $table) {
            $table->id();
            $table->string('employee_name');
            $table->string('employee_id')->unique();
            $table->string('role');
            $table->string('department');
            $table->date('date');
            $table->string('status')->default('Pending'); // e.g. Completed, Ongoing, etc.
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('employee_trainings');
    }
};
