<?php

namespace Database\Factories;

use App\Models\OrderDetails;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderDetailsFactory extends Factory
{
    protected $model = OrderDetails::class;

    public function definition()
    {
        $quantity = fake()->numberBetween(1, 5);
        $unit_price = fake()->randomFloat(2, 10, 1000);

        return [
            'order_id' => Order::factory(),
            'product_id' => Product::factory(),
            'quantity' => $quantity,
            'unit_price' => $unit_price,
            'subtotal' => $quantity * $unit_price,
        ];
    }
}
