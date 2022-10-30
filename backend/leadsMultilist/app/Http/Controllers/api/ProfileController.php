<?php

namespace App\Http\Controllers\api;

use App\Models\Profile;
use App\Lib\DataManager;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiController;

class ProfileController extends ApiController
{
    

    

    public function getData(){
       
          
           $data = Profile::with('user')->get();

           return $this->showAny($data,200);
          
    }
}
