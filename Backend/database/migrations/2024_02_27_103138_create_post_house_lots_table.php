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
        Schema::create('post_house_lots', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained()->onDelete('cascade');
            $table->string('Listing_Status');
            $table->string('PropTitle');
            $table->text('PropDesc');
            $table->string('PropCommVill');
            $table->string('PropHouseLotType')->nullable();
            $table->integer('PropSize');
            $table->integer('PropBaths')->nullable();
            $table->integer('PropBeds')->nullable();
            $table->integer('PropLotArea')->nullable();
            $table->integer('PropFloorArea')->nullable();
            $table->integer('PropRate');
            $table->string('PropFurnish');
            $table->string('PropPetAllowed');
            $table->string('PropAdd');
            $table->string('PropCity');
            $table->string('PropNeighborhood');
            $table->string('PropGoogleLink', 1000);
            $table->json('selectedAmenities')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_house_lots');
    }
};
