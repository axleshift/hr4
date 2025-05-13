<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('budget_reports', function (Blueprint $table) {
            $table->id();
            $table->string('form_id')->nullable();
            $table->foreignId('program_id')->constrained()->onDelete('cascade');
            $table->string('status')->default('Pending');
            $table->timestamps();
        });

    }

    public function down(): void
    {
        Schema::dropIfExists('budget_reports');
    }
};
