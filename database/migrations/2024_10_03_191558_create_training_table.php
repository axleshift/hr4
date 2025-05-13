<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->text('description');
            $table->timestamps();
        });

        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->text('description');
            $table->string('file_path')->nullable();
            $table->string('file_name')->nullable();
            $table->foreignId('program_id')->constrained('programs')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('trainings', function (Blueprint $table) {
        $table->id();
        $table->string('event_location');
        $table->date('schedule');
        $table->string('delivery_method');
        $table->string('department_id');
        $table->foreignId('program_id')->constrained('programs')->onDelete('cascade');
        $table->foreignId('course_id')->constrained('courses')->onDelete('cascade');
        $table->timestamps();
        });
        
    }

    public function down(): void
    {
        Schema::dropIfExists('trainings');
        Schema::dropIfExists('courses');
        Schema::dropIfExists('programs');
    }
};
