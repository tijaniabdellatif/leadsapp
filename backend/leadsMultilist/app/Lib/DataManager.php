<?php
namespace App\Lib;

use App\Models\Profile;
use App\Models\User;

trait DataManager {


    private function getJson($name)
    {
         return json_decode(file_get_contents(\storage_path()."/Data/".$name),true);
    }
    public function userProfile()
    {


        $data = $this->getJson('data.json');
        $profileData = $this->getJson('profile.json');
        $main = [];
        $profiles = [];



            foreach ($data['data'] as $row) {
                array_push($main, $row);
            }

            foreach ($profileData['data'] as $row) {
                  array_push($profiles, $row);
            }



          foreach ($main as $rows) {

             User::create([

                 'id' => $rows['id'],
                 "fullname" => $rows['fullname'],
                 "email" => $rows['email'],
                 "password" => bcrypt($rows['password']),
                 "confirm" => bcrypt($rows['confirm']),
                 "isAdmin" => $rows['isAdmin'],
                 "isMember" => $rows['isMember']
              ]);
          }

          foreach($profiles as $value){

            Profile::create([

                'id' => $value['id'],
                'user_id' => $value['user_id'],
                "bio" => $value['bio'],
                "avatar" => $value['avatar'],
                "designation"=>$value['designation'],
                "location" => $value['location'],
                "adresse" => $value['adresse']
            ]);
          }

    }
}
