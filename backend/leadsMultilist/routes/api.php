<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\ProfileController;


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

Route::group([
    'middleware' => 'api',
    'prefix' => 'v1'
], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::get('/data',[ProfileController::class,'getData']);

    Route::group(['middleware' => ['auth:api']], function(){

        Route::post('/logout',[AuthController::class,'logout']);
        Route::get('/userprofile/{id}',[ProfileController::class,'getInfos']);
        Route::get('/allProfiles',[ProfileController::class,'getAllProfiles']);
        Route::put('/profile/{id}/update',[ProfileController::class,'updateProfile']);
    });
});
