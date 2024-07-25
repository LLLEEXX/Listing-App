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
        Schema::create('buy_condos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained()->onDelete('cascade');
            $table->string('Actions');
            $table->string('PropBuildingName');
            $table->integer('PropBaths');
            $table->integer('PropBeds');
            $table->string('PropFurnish');
            $table->string('PropBalcony');
            $table->string('PropParking');
            $table->date('PropMoveInDate')->nullable();
            $table->string('LengthOfStay')->nullable();
            $table->string('Nationality')->nullable();
            $table->integer('Occupants')->nullable();
            $table->string('PetTypes')->nullable();
            $table->integer('PropFromRange');
            $table->integer('PropToRange');
            $table->string('PropCity');
            $table->string('PropNeigborhood');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('buy_condos');
    }
};
