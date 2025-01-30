<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Room;
use App\Models\RoomType;
use App\Models\Booking;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seed room types first (if they don't already exist)
        $this->call(RoomTypeSeeder::class); // ตรวจสอบว่า room_types มีข้อมูลในตารางแล้ว

        // Seed rooms with random room_type_id
        Room::factory(10)->create();

        // Seed customers
        Customer::factory(20)->create();

        // Seed bookings
        Booking::factory(30)->create();
    }
}
