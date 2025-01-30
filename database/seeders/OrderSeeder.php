<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\ProductCustomer;
use App\Models\Product;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run()
    {
        // ดึง customer IDs ที่มีอยู่จริงจาก ProductCustomer
        $customerIds = ProductCustomer::pluck('id')->toArray();

        if (empty($customerIds)) {
            throw new \Exception('No customers found in database.');
        }

        // สร้าง orders โดยใช้ customer_id ที่มีอยู่จริง
        foreach(range(1, 30) as $index) {
            Order::create([
                'customer_id' => $customerIds[array_rand($customerIds)],  // สุ่มเลือก customer_id ที่มีอยู่จริง
                'order_number' => 'ORD-' . str_pad($index, 4, '0', STR_PAD_LEFT),
                'total_amount' => rand(100, 5000) + (rand(0, 99) / 100),
                'status' => fake()->randomElement(['pending', 'processing', 'completed', 'cancelled']),
                'notes' => fake()->optional()->sentence(),
                'ordered_at' => fake()->dateTimeBetween('-1 year', 'now'),
            ]);
        }
    }
}
