<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            DirectorySeeder::class,
            RoomTypeSeeder::class,  // เรียก RoomTypeSeeder ก่อน
            RoomSeeder::class,
            ProductSeeder::class,
            CustomerSeeder::class,
            ProductCustomerSeeder::class,
            OrderSeeder::class,
            OrderDetailSeeder::class,      // แล้วค่อยเรียก RoomSeeder
        ]);
    }
}
