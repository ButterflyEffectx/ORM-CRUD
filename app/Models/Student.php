<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'student_code',
        'first_name',
        'last_name',
        'email',
        'phone',
        'birth_date',
        'address',
        'status'
    ];

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }
}
