<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the tasks.
     */
    public function index()
    {
        return Inertia::render('Welcome', [
            'tasks' => Task::orderBy('created_at', 'desc')->get(),
        ]);
    }

    /**
     * Store a newly created task in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        Task::create([
            'title' => $request->title,
            'is_completed' => false,
        ]);

        return back();
    }

    /**
     * Update the specified task in storage.
     */
    public function update(Request $request, Task $task)
    {
        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'is_completed' => 'sometimes|boolean',
        ]);

        $task->update($request->only(['title', 'is_completed']));

        return back();
    }

    /**
     * Remove the specified task from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return back();
    }

    /**
     * Clear all completed tasks.
     */
    public function clearCompleted()
    {
        Task::where('is_completed', true)->delete();

        return back();
    }
}
