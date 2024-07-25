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
        Schema::create('property_services', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('comp_Name');
            $table->string('address');
            $table->string('city');
            $table->string('email');
            $table->string('contact_Num');
            $table->string('service');
            $table->string('image');
            $table->timestamp('expired_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('property_services');
    }
};
