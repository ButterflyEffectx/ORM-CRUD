<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Product;
use App\Models\OrderDetails;
use Illuminate\Database\Seeder;

class OrderDetailSeeder extends Seeder
{
    public function run()
    {
        $orders = Order::all();
        $products = Product::all();

        foreach ($orders as $order) {
            $orderDetails = OrderDetails::factory()
                ->count(rand(1, 5))
                ->create([
                    'order_id' => $order->id,
                    'product_id' => function () use ($products) {
                        return $products->random()->id;
                    }
                ]);

            // Update order total amount
            $order->update([
                'total_amount' => $orderDetails->sum('subtotal')
            ]);
        }
    }
}
