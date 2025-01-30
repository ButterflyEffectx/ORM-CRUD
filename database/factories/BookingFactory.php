<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Room;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookingFactory extends Factory
{
    public function definition(): array
    {
        return [
            'customer_id' => Customer::factory(),
            'room_id' => Room::factory(),
            'check_in_date' => $this->faker->dateTimeBetween('+1 days', '+10 days'),
            'check_out_date' => $this->faker->dateTimeBetween('+11 days', '+20 days'),
        ];
    }
}
