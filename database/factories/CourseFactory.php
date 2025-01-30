<?php

namespace Database\Factories;
use App\Models\Course;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    protected $model = Course::class;

    public function definition()
    {
        return [
            'course_code' => 'CRS' . $this->faker->unique()->numerify('#####'),
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->paragraph(),
            'credits' => $this->faker->numberBetween(1, 4),
            'teacher_id' => Teacher::factory(),
            'max_students' => $this->faker->numberBetween(20, 40),
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }
}
