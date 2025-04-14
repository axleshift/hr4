<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('department')->nullable(); // e.g., HR, IT, Finance

            $table->string('employee_type')->nullable(); // e.g., Full-Time, Part-Time, etc.
            $table->string('employment_status')->nullable(); // e.g., Active, On Leave, etc.
            $table->date('date_of_hire')->nullable();
            $table->string('gender')->nullable(); // e.g., Male, Female, Other
            $table->string('phone_number')->nullable();
            $table->text('address')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'department',
                'employee_type',
                'employment_status',
                'date_of_hire',
                'gender',
                'phone_number',
                'address',
            ]);
        });
    }
};
