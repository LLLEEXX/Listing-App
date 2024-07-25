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
        Schema::create('rent__condos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained()->onDelete('cascade');
            $table->string('Listing_Status');
            $table->string('PropTitle');
            $table->text('PropDesc');
            $table->string('PropBuildingName');
            $table->integer('PropBaths');
            $table->integer('PropBeds');
            $table->integer('PropRate');
            $table->string('PropFurnish');
            $table->string('otherInclusions')->nullable();
            $table->string('PropPetAllowed');
            $table->string('PropAdd');
            $table->string('PropCity');
            $table->string('PropNeighborhood');
            $table->string('PropGoogleLink', 1000)->nullable();
            $table->json('selectedAmenities')->nullable();
            $table->json('selectedInclusions')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rent__condos');
    }
};
