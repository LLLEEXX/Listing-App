<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'id' => Str::uuid(),
            'fullname' => 'Admin User',
            'password' => Hash::make('11111111'),
            'username' => 'Property Web Hub',
            'nationality' => 'Filipino',
            'mobileNum' => '0999999',
            'email' => 'admin@example.com',
            'gender' => 'Gender',
            'role' => 'admin',
            'recieveUpdate' => false,
            'termsandCon' => true,
            'email_verified_at' => now(),
            'updated_at' => now(), 
            'created_at' => now(), 
        ]);

        DB::table('users')->insert([
            'id' => Str::uuid(),
            'fullname' => 'user',
            'password' => Hash::make('11111111'),
            'username' => 'user',
            'nationality' => 'Filipino',
            'mobileNum' => '0999999',
            'email' => 'user@gmail.com',
            'gender' => 'Male',
            'role' => 'user',
            'recieveUpdate' => false,
            'termsandCon' => true,
            'email_verified_at' => now(),
            'updated_at' => now(), 
            'created_at' => now(), 
        ]);
    }
}
