<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class RoomTypeFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement(['Standard', 'Deluxe', 'Suite']),
            'price_per_night' => $this->faker->randomFloat(2, 50, 300),
        ];
    }
}
