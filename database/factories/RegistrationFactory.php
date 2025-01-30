<?php

namespace Database\Factories;
use App\Models\Registration;
use App\Models\Student;
use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Registration>
 */
class RegistrationFactory extends Factory
{
    protected $model = Registration::class;

    public function definition()
    {
        return [
            'student_id' => Student::factory(),
            'course_id' => Course::factory(),
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected']),
            'grade' => $this->faker->optional()->randomFloat(2, 0, 4),
            'notes' => $this->faker->optional()->sentence(),
        ];
    }
}
