<?php

namespace Database\Seeders;

use App\Lib\DataManager;
use Illuminate\Database\Seeder;

class UserProfileSeeder extends Seeder
{

    use DataManager;
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        $this->userProfile();
    }
}
