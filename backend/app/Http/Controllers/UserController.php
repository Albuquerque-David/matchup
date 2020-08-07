<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\User;

class UserController extends Controller
{
    public function createUser(UserRequest $request)
    {
        $user = new User;
        $user->createUser($request);
        return response()->json($user, 201);
    }

    public function showUser($id)
    {
        $user = new User;
        $user = $user->showUser($id);
        return response()->json($user, 200);
    }

    public function listUsers()
    {
        $users = new User;
        $users = $users->listUsers();
        return response()->json([$users], 200);
    } 

    public function updateUser(UserRequest $request, $id)
    {
        $user = new User;
        $user->updateUser($request, $id);
        return response()->json($user, 200);
    }

    public function deleteUser($id)
    {
        $user = new User;
        $user->deleteUser($id);
        return response()->json(['Usuário deletado!'], 202);
    }
}
