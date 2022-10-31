<?php

namespace App\Http\Controllers\api;

use App\Models\Profile;
use App\Lib\DataManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Api\ApiController;

class ProfileController extends ApiController
{


    public function getInfos(Request $request) {


        $validator = Validator::make($request->all(), [
           "id" => 'required|integer'
        ]);

        if ($validator->fails() ){

              return $this->errorResponse($validator->errors(),401);
        } else {

            $user = Profile::find($request->id)->with('user')->get();
            return $this->showAny($user, 200, 'success');
        }
    }

}
