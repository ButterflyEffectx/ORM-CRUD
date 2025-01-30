<?php

namespace Database\Seeders;

use App\Models\ProductCustomer;
use Illuminate\Database\Seeder;

class ProductCustomerSeeder extends Seeder
{
    public function run()
    {
        ProductCustomer::factory(50)->create();
    }
}
