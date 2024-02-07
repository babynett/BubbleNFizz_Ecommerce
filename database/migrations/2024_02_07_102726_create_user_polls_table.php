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
            $table->string('user_id');
            $table->string('gender');
            $table->string('fragrance');
            $table->string('location');
            $table->string('ingredients');
            $table->string('texture');
            $table->string('design');
            $table->string('age_bracket');
            $table->string('frequency');
            $table->string('bath_type');
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
