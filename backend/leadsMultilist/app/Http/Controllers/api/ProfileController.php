<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use App\Models\Profile;
use App\Lib\DataManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Api\ApiController;


class ProfileController extends ApiController
{

    public function __construct(){

        $this->middleware('auth:api');
    }

    public function getAllProfiles(){

          $profiles = Profile::all();

          return $this->showAny($profiles,200);
    }



    public function updateProfile(Request $request,$id){

        $user = User::find($id);

        if(!$user){

             return $this->errorResponse("User not found",404);
        }


        if($user->id  !== $request->user()->id){

             return $this->errorResponse('Access denied',409);
        }


        $validator = Validator::make($request->all(),[
             'fullname' => 'required|string',
             'email' => 'required|string|email:rfc,dns|max:100',
             'location' => 'required|string',
             'adresse' => 'required|string',
             'bio' => 'nullable|string',
             'avatar'=> 'required'
        ]);


        if($validator->fails()){

            return $this->errorResponse($validator->errors(),400);
        }


            if ($request->hasFile('avatar')) {

                 $avatar = $request->avatar;
                 $filename = time().'.'.$avatar->getClientOriginalName();
                 $path=$request->avatar->storeAs('avatar', $filename,'public');



                 $user->fullname =  $request->fullname;
                 $user->email = $request->email;
                 $user->profile->avatar=$path;
                 $user->profile->adresse=$request->adresse;
                 $user->profile->location = $request->location;
                 $user->profile->bio = $request->bio;
                 $user->save();
                 $user->profile->save();

                return $this->showAny([
                    'user' => $user
                     ],200);
        }

}

    public function getInfos($id)
    {

       if(!$id){

        return $this->errorResponse("record not found",409);

       }else {

            $profile = User::find($id)->profile;
            $user = $profile->user;
            return $this->showAny([
                'profile' => $profile,

            ], 200, 'success');
        }
    }

}
