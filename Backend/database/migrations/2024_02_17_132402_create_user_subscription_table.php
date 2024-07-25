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
            Schema::create('user_subscription', function (Blueprint $table) {
                $table->id();
                $table->foreignUuid('user_id')->constrained()->onDelete('cascade');
                $table->foreignId('subscription_plan_id')->constrained('subscription_plan');
                $table->unsignedInteger('red_coins')->default(0);
                $table->unsignedInteger('silver_coins')->default(0);
                $table->unsignedInteger('rental_listing')->default(0);
                $table->unsignedInteger('sale_listing')->default(0);
                $table->timestamps();
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_subscription');
    }
};
