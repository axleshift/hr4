<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index(Request $request) {
        $query = Course::query();
    
        if ($request->has('program_id')) {
            $query->where('program_id', $request->program_id);
        }
    
        return response()->json(['data' => $query->get()]);
    }
    

    public function show($id)
    {
        // Show a single course by its ID
        $course = Course::findOrFail($id);
        return new CourseResource($course);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'program_id' => 'required|exists:programs,id',
        ]);

        $course = Course::create($request->all());

        return response()->json($course, 201);
    }


    public function update(Request $request, $id)
    {
        // Find the course by its ID
        $course = Course::findOrFail($id);

        // Validate the incoming data
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
        ]);

        // Update the course and return the updated resource
        $course->update($validated);
        return new CourseResource($course);
    }

    public function destroy($id)
    {
        // Find the course and delete it
        Course::destroy($id);
        return response()->noContent();
    }
}
