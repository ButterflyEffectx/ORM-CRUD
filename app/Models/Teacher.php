<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Teacher extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'teacher_code',
        'first_name',
        'last_name',
        'email',
        'phone',
        'specialization',
        'status'
    ];

    public function courses()
    {
        return $this->hasMany(Course::class);
    }
}
