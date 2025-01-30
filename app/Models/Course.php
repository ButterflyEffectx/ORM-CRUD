<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'course_code',
        'name',
        'description',
        'credits',
        'teacher_id',
        'max_students',
        'status'
    ];

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }
}
