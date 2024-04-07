<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserPollsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_polls', function (Blueprint $table) {
            $table->id();
            $table->string('user_id')->nullable();
            $table->string('gender')->nullable();
            $table->string('fragrance')->nullable();
            $table->string('location')->nullable();
            $table->string('ingredients')->nullable();
            $table->string('texture')->nullable();
            $table->string('design')->nullable();
            $table->string('age_bracket')->nullable();
            $table->string('frequency')->nullable();
            $table->string('bath_type')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_polls');
    }
}
