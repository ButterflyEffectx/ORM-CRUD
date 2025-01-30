<?php

namespace Database\Seeders;

use App\Models\Registration;
use Illuminate\Database\Seeder;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Course;

class DirectorySeeder extends Seeder
{
    public function run()
    {
        // Create 10 teachers
        $teachers = Teacher::factory(10)->create();

        // Create 30 students
        $students = Student::factory(30)->create();

        // Create 15 courses, each assigned to a random teacher
        $courses = Course::factory(15)
            ->create([
                'teacher_id' => fn() => $teachers->random()->id
            ]);

        // Create 50 registrations
        foreach ($students as $student) {
            // Each student registers for 2-4 random courses
            $randomCourses = $courses->random(rand(2, 4));

            foreach ($randomCourses as $course) {
                Registration::factory()->create([
                    'student_id' => $student->id,
                    'course_id' => $course->id,
                ]);
            }
        }
    }
}
