<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use DB;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
        //if (config('app.env') !== 'production') {
        //    DB::listen(function ($query) {
        //        \Log::info("Query Time:{$query->time}s] $query->sql");
        //    });
        //}
    }
}
