<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->string('order_address');
            $table->string('order_apartment');
            $table->string('order_phone_number');
            $table->string('order_shipping');
            $table->string('order_status');
            $table->string('payment');
            $table->string('payment_reference')->nullable();
            $table->string('payment_image')->nullable();
            $table->string('payment_status');
            $table->string('total_quantity');
            $table->string('total_price');
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
        Schema::dropIfExists('orders');
    }
}
