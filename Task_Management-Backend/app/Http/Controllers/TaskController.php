<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\users;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
class TaskController extends Controller
{  public function getTasksForUser(Request $request)
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }

            // تحديد عدد المهام لكل صفحة
            $perPage = $request->input('per_page', 10); // افتراضي: 10 مهام لكل صفحة

            // بناء استعلام للبحث والتصفية
            $query = $user->tasks();

            if ($request->has('title')) {
                $query->findByTitle($request->input('title'));
            }

            if ($request->has('due_date')) {
                $query->whereDate('due_date', $request->input('due_date'));
            }

            if ($request->has('priority')) {
                $query->where('priority', $request->input('priority'));
            }

            // الحصول على المهام المصفحة
            $tasks = $query->paginate($perPage);

            return response()->json($tasks, 200);

        } catch (\Exception $e) {
            Log::error('failed  ' . $e->getMessage());
            return response()->json(['message' => 'failed  process  '], 500);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'priority' => 'nullable|in:low,medium,high',
        ]);

        $task = Task::create([
            'users_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'due_date' => $request->due_date,
            'priority' => $request->priority,
        ]);

        return response()->json($task, 201);
    }

    public function update(Request $request, $id)
    {

        try{
        $task = Task::where('users_id', Auth::id())->findOrFail($id);

        $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'priority' => 'nullable|in:low,medium,high',
            'status' => 'nullable|in:pending,completed',
        ]);

        $task->update($request->all());
    } catch (\Exception $e) {

        log::error(' failed: '.$e->getMessage());}
        return response()->json($task);
    }

    public function destroy($id)
    {
        $task = Task::where('users_id', Auth::id())->findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,completed',
        ]);

        $task = Task::where('users_id', Auth::id())->findOrFail($id);
        $task->status = $request->status;
        $task->save();

        return response()->json($task);
    }
}
