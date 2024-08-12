<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\users;
use App\Models\Task;
use Illuminate\Support\Facades\Log;


class ProfileController extends Controller
{
    public function show()
    {
        $user = Auth::user();
        $tasks = $user->tasks; // Get all tasks for the user

        return response()->json([
            'user' => $user,
            'tasks' => $tasks,
        ]);
    }

    public function update(Request $request)
    {
        try {
            $user = Auth::user();

            // Validate the request
            $request->validate([
                'username' => 'required|string|max:255',
                'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            ]);

            // Update user details
            $user->update([
                'username' => $request->username,
                'email' => $request->email,
            ]);

            return response()->json($user, 200); // Return updated user details with 200 status code

        } catch (\Exception $e) {
            // Log the exception message
            Log::error('User update failed: ' . $e->getMessage());

            // Return a generic error response with 500 status code
            return response()->json(['message' => 'Failed to update user'], 500);
        }
    }
}
