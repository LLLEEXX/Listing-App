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
        Schema::create('buy_lots', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained()->onDelete('cascade');
            $table->string('Actions');
            $table->string('PropLotPref');
            $table->string('PropLotUse');
            $table->integer('PropSize');
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
        Schema::dropIfExists('buy_lots');
    }
};
