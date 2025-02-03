<?php

namespace Database\Factories;

use App\Models\RoomType;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoomFactory extends Factory
{
    public function definition(): array
    {
        return [
            'room_type_id' => $this->faker->randomElement([1, 2, 3]),
            'room_number' => $this->faker->unique()->numberBetween(100, 999),
            'is_available' => $this->faker->boolean,
        ];
    }
}
