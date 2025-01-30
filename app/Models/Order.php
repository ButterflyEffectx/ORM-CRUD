<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'customer_id',
        'order_number',
        'total_amount',
        'status',
        'notes',
        'ordered_at'
    ];

    protected $casts = [
        'ordered_at' => 'datetime',
        'total_amount' => 'decimal:2',
    ];

    public function customer()
    {
        return $this->belongsTo(ProductCustomer::class);
    }

    public function orderDetails()
    {
        return $this->hasMany(OrderDetails::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_details')
            ->withPivot(['quantity', 'unit_price', 'subtotal']);
    }

    // Scope for filtering orders by status
    public function scopeStatus($query, $status)
    {
        return $query->where('status', $status);
    }
}
