<?php
// app/Models/Registration.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Registration extends Model
{
    use HasFactory, SoftDeletes;

    // เพิ่มบรรทัดนี้เพื่อระบุชื่อตารางที่ถูกต้อง
    protected $table = 'registrations';

    protected $fillable = [
        'student_id',
        'course_id',
        'status',
        'grade',
        'notes'
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
