<?php

namespace Database\Factories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->text,
            'due_date' => $this->faker->date,
            'priority' => $this->faker->randomElement(['low', 'medium', 'high']),
            'users_id' => \App\Models\users::factory(), // إنشاء مستخدم افتراضي لهذا المهام
        ];
    }
}
