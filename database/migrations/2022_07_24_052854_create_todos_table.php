<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTodosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('todos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('list_id');
            $table->unsignedBigInteger('category_id');
            $table->string('name', 255);
            $table->text('detail')->nullable();
            $table->date('todo_date')->nullable();
            $table->time('todo_time')->nullable();
            $table->integer('cycle')->nullable();
            $table->string('place', 255)->nullable();
            $table->integer('priority')->nullable();
            $table->string('filename', 255)->nullable();
            $table->boolean('fixed_flg')->default(false);
            $table->boolean('delete_flg')->default(false);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('list_id')->references('id')->on('lists');
            $table->foreign('category_id')->references('id')->on('categorys');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('todos');
    }
}
