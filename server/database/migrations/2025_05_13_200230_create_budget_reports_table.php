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
        $table->decimal('total_cost', 12, 2)->default(0);  // Total cost for this report
        $table->decimal('monthly_allocated_budget', 12, 2)->default(0); // Monthly allocated budget
        $table->string('status')->default('Pending');
        $table->timestamps();
        });

    }

    public function down(): void
    {
        Schema::dropIfExists('budget_reports');
    }
};
