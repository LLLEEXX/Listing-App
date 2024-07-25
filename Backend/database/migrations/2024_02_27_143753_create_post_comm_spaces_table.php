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
        Schema::create('post_comm_spaces', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained()->onDelete('cascade');
            $table->string('Listing_Status');
            $table->string('PropTitle');
            $table->text('PropDesc');
            $table->integer('PropSize');
            $table->text('PropPurpose');
            $table->integer('PropRate');
            $table->string('PropAdd');
            $table->string('PropCity');
            $table->string('PropNeighborhood');
            $table->string('PropGoogleLink', 1000);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_comm_spaces');
    }
};
