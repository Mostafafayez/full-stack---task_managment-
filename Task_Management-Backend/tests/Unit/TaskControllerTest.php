<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use App\Models\Users;
use App\Models\Task;

class TaskControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_return_tasks_for_authenticated_user()
    {
        $user = Users::factory()->create();
        Auth::login($user);

        $task = Task::factory()->create(['users_id' => $user->id]);

        $response = $this->actingAs($user)->get('/api/tasks');

        $response->assertStatus(200);
        $response->assertJsonFragment(['title' => $task->title]);
    }

    // أضف اختبارات أخرى للبحث والتصفية
}
