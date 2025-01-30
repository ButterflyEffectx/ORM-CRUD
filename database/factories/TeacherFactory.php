<?php

namespace Database\Factories;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Teacher>
 */
class TeacherFactory extends Factory
{
    protected $model = Teacher::class;

    public function definition()
    {
        return [
            'teacher_code' => 'TCH' . $this->faker->unique()->numerify('#####'),
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'specialization' => $this->faker->randomElement(['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science']),
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }
}
