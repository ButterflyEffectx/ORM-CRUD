<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\RoomType;

class RoomTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // ลบข้อมูลในตาราง
        \DB::table('room_types')->truncate();

        // เปิดการตรวจสอบ foreign key อีกครั้ง
        \DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        RoomType::create([
            'name' => 'Standard',
            'price_per_night' => 100,
        ]);

        RoomType::create([
            'name' => 'Deluxe',
            'price_per_night' => 200,
        ]);

        RoomType::create([
            'name' => 'Suite',
            'price_per_night' => 300,
        ]);
    }
}
