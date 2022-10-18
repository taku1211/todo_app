<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*ユーザー登録・ログイン・ログアウト・認証 */
Route::post('/register', [App\Http\Controllers\Auth\RegisterController::class, 'register'])->name('register');
Route::post('/login', [App\Http\Controllers\Auth\LoginController::class, 'login'])->name('login');
Route::post('/logout', [App\Http\Controllers\Auth\LoginController::class, 'logout'])->name('logout');
Route::post('/user', function(){return Auth::user();})->name('user');

/*ユーザー情報更新*/
Route::post('/updateName', [App\Http\Controllers\TodosController::class, 'updateName'])->name('updateName');
Route::post('/updateEmail', [App\Http\Controllers\TodosController::class, 'updateEmail'])->name('updateEmail');
Route::post('/updatePassword', [App\Http\Controllers\TodosController::class, 'updatePassword'])->name('updatePassword');
Route::post('/forgetPassword', [App\Http\Controllers\TodosController::class, 'forgetPassword'])->name('forgetPassword');
Route::post('/deleteUser', [App\Http\Controllers\TodosController::class, 'deleteUser'])->name('deleteUser');




/*登録機能*/
Route::post('/registerList', [App\Http\Controllers\TodosController::class, 'registerList'])->name('registerList');
Route::post('/registerCategory', [App\Http\Controllers\TodosController::class,'registerCategory'])->name('registerCategory');
Route::post('/registerTodo',[App\Http\Controllers\TodosController::class,'registerTodo'])->name('registerTodo');
Route::post('/registerTodoWithImg',[App\Http\Controllers\TodosController::class,'registerTodoWithImg'])->name('registerTodoWithImg');



/*データ更新機能*/
Route::post('/updateTodo',[App\Http\Controllers\TodosController::class,'updateTodo'])->name('updateTodo');
Route::post('/updateTodoWithImg',[App\Http\Controllers\TodosController::class,'updateTodoWithImg'])->name('updateTodoWithImg');
Route::post('/updateList',[App\Http\Controllers\TodosController::class,'updateList'])->name('updateList');
Route::post('/updateCategory',[App\Http\Controllers\TodosController::class,'updateCategory'])->name('updateCategory');
Route::post('/deleteCategory',[App\Http\Controllers\TodosController::class,'deleteCategory'])->name('deleteCategory');
Route::post('/deleteList',[App\Http\Controllers\TodosController::class,'deleteList'])->name('deleteList');
Route::post('/deleteTodoRelateCategory',[App\Http\Controllers\TodosController::class,'deleteTodoRelateCategory'])->name('deleteTodoRelateCategory');
Route::post('/deleteCategoryRelateList',[App\Http\Controllers\TodosController::class,'deleteCategoryRelateList'])->name('deleteCategoryRelateList');
Route::post('/deleteTodoRelateList',[App\Http\Controllers\TodosController::class,'deleteTodoRelateList'])->name('deleteTodoRelateList');



/*データ取得*/
Route::get('/lists', [App\Http\Controllers\TodosController::class, 'indexList'])->name('indexList');
Route::post('/categorys', [App\Http\Controllers\TodosController::class, 'indexCategory'])->name('indexCategory');
Route::post('/allCategorys', [App\Http\Controllers\TodosController::class, 'indexAllCategorys'])->name('indexAllCategorys');
Route::post('/countAllTodo', [App\Http\Controllers\TodosController::class, 'countAllTodo'])->name('countAllTodo');
Route::post('/getImg', [App\Http\Controllers\TodosController::class, 'getImgFile'])->name('getImgFile');

/*tokenリセット */
Route::get('/reflesh-token', function (Illuminate\Http\Request $request) {
    $request->session()->regenerateToken();

    return response()->json();
});

