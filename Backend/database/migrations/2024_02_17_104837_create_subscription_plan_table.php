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
        Schema::create('subscription_plan', function (Blueprint $table) {
            $table->id();
            $table->string('subscription_type');
            $table->unsignedInteger('price');
            $table->unsignedInteger('rental_listing');
            $table->unsignedInteger('sale_listing');
            $table->unsignedInteger('red_coins');
            $table->unsignedInteger('silver_coins');
            $table->string('rental_limit');
            $table->string('sale_limit');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscription_plan');
    }
};
