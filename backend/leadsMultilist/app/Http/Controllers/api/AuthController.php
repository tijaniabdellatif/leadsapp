<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Validator;

class AuthController extends ApiController
{

    public function __construct() {

        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function register(Request $request) {

        $validator = Validator::make($request->all(), [
            'fullname' => 'required|string|between:2,100',
            'email' => 'required|string|email:rfc,dns|max:100|unique:users',
            'password' => 'required|string|min:8',
            'confirm' => 'required|string|same:password'
        ]);
        if($validator->fails()){
            return $this->errorResponse($validator->errors(),400);
        }

        $user = User::create(array_merge(
                    $validator->validated(),
                    [
                        'password' => bcrypt($request->password),
                        'confirm' => bcrypt($request->confirm),
                        'isMember' => 1,
                        'isAdmin' => 0
                    ]
                ));

        return $this->showAny($user,200);

    }


    public function login(Request $request) {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {

            return $this->errorResponse($validator->errors(), 422);
        }

        $user = DB::table('users')->where('email','=',$request->email)->first();


        if (!$user) {

            return $this->errorResponse(['error' => 'User does not exists'], 404);
        }
        if($user) {


               if(!Hash::check($request->password, $user->password)){

                return $this->errorResponse(['error' => 'Bad password'], 403);
            }

            if (!$token = auth()->attempt($validator->validated())) {
                return response()->json(['error' => 'You are not authorized'], 401);
            }

            return $this->showAny($this->createNewToken($token),200,'Logged successfully');

        }





    }


    protected function createNewToken($token) {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => 24 * 60 * 60 * 60 * 1000,
            'user' => auth()->user()
        ]);
    }

    public function logout() {
        auth()->logout();
        return $this->showAny('You have successfully logged out',200);
    }

    // public function refresh() {
    //     return $this->createNewToken(auth()->user()->setRememberToken());
    // }

}
