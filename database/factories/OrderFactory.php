<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\ProductCustomer;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition()
    {
        return [
            'customer_id' => ProductCustomer::factory(),
            'order_number' => 'ORD-' . fake()->unique()->numberBetween(1000, 9999),
            'total_amount' => fake()->randomFloat(2, 100, 5000),
            'status' => fake()->randomElement(['pending', 'processing', 'completed', 'cancelled']),
            'notes' => fake()->optional(0.3)->sentence(),
            'ordered_at' => fake()->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
