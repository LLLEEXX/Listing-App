<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(SubscriptionPlanSeeder::class);
        DB::table('users')->insert([
            'id' => Str::uuid(),
            'fullname' => 'user',
            'password' => Hash::make('11111111'),
            'username' => 'user',
            'nationality' => 'Filipino',
            'mobileNum' => '0999999',
            'email' => 'user@gmail.com',
            'gender' => 'Male',
            'recieveUpdate' => false,
            'termsandCon' => true,
            'email_verified_at' => now(),
            'updated_at' => now(), 
            'created_at' => now(), 
        ]);
        
        DB::table('users')->insert([
            'id' => Str::uuid(),
            'fullname' => 'admin',
            'password' => Hash::make('11111111'),
            'username' => 'Property Web Hub',
            'nationality' => 'Filipino',
            'mobileNum' => '0999999',
            'email' => 'admin@gmail.com',
            'gender' => 'Male',
            'role' => 'admin',
            'recieveUpdate' => false,
            'termsandCon' => true,
            'email_verified_at' => now(),
            'updated_at' => now(), 
            'created_at' => now(), 
        ]);

        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
