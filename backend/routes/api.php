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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//
// Passport Routes
//
Route::post('register', 'API\PassportController@register');
Route::post('login', 'API\PassportController@login');

Route::group(['middleware'=>'auth:api'], function(){
    Route::get('logout', 'API\PassportController@logout');
    Route::get('getUserDetails', 'API\PassportController@getDetails');
});

//
// DEV CRUD Users
//

Route::get('dev/user/{id}', 'UserController@showUser');
Route::get('dev/user', 'UserController@listUsers');
Route::post('dev/user', 'UserController@createUser');
Route::put('dev/user/{id}', 'UserController@updateUser');
Route::delete('dev/user/{id}', 'UserController@deleteUser');

//
// DEV CRUD Posts
//

Route::get('dev/post/{id}', 'PostController@showPost');
Route::get('dev/post', 'PostController@listPosts');
Route::post('dev/post', 'PostController@createPost');
Route::put('dev/post/{id}', 'PostController@updatePost');
Route::delete('dev/post/{id}', 'PostController@deletePost');

//
// DEV CRUD Comments
//

Route::get('dev/comment/{id}', 'CommentController@showComment');
Route::get('dev/comment', 'CommentController@listComments');
Route::post('dev/comment', 'CommentController@createComment');
Route::put('dev/comment/{id}', 'CommentController@updateComment');
Route::delete('dev/comment/{id}', 'CommentController@deleteComment');

//
// Seguir outros usuários
//

Route::put('follow/{following_id}/{follower_id}', 'UserController@follow');
Route::put('unfollow/{following_id}/{follower_id}', 'UserController@unfollow');

//
// Curtir posts
//

Route::put('like/{user_id}/{post_id}', 'UserController@like');
Route::put('unlike/{user_id}/{post_id}', 'UserController@unlike');