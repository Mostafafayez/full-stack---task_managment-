<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use App\Models\Users;
use App\Models\Task;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_filter_tasks_by_due_date()
    {
        $user = Users::factory()->create();
        Auth::login($user);

        Task::factory()->create(['title' => 'Task with due date', 'due_date' => '2024-08-15', 'users_id' => $user->id]);

        $response = $this->actingAs($user)
                         ->get('/api/tasks?due_date=2024-08-15');

        $response->assertStatus(200);
        $response->assertJsonFragment(['title' => 'Task with due date']);
    }

    /** @test */
    public function it_can_filter_tasks_by_priority()
    {
        $user = Users::factory()->create();
        Auth::login($user);

        Task::factory()->create(['title' => 'High priority task', 'priority' => 'high', 'users_id' => $user->id]);

        $response = $this->actingAs($user)
                         ->get('/api/tasks?priority=high');

        $response->assertStatus(200);
        $response->assertJsonFragment(['title' => 'High priority task']);
    }

    // أضف اختبارات أخرى للبحث حسب العنوان والتصفح
}
