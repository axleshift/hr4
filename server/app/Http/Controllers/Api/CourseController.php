<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index(Request $request)
    {
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
            'file' => 'nullable|file|mimes:pdf,doc,docx|max:5120', // Handle file upload if present
        ]);

        // File upload logic
        $filePath = null;
        $fileName = null;

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads'), $fileName);
            $filePath = 'uploads/' . $fileName;
        }

        // Create a new course with file details
        $course = Course::create([
            'title' => $request->title,
            'description' => $request->description,
            'program_id' => $request->program_id,
            'file_path' => $filePath,
            'file_name' => $fileName,
        ]);

        return new CourseResource($course);
    }


    public function update(Request $request, $id)
    {
        // Find the course by its ID
        $course = Course::findOrFail($id);

        // Validate and prepare the data for update
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
        ]);

        // Handle file upload if new file is provided
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads'), $fileName);
            $filePath = 'uploads/' . $fileName;
            $validated['file_path'] = $filePath;
            $validated['file_name'] = $fileName;
        }

        // Update the course with the validated data
        $course->update($validated);
        return new CourseResource($course);
    }

    public function destroy($id)
    {
        // Find the course by its ID
        $course = Course::findOrFail($id);

        // Delete the course's file if it exists
        if ($course->file_path && file_exists(public_path($course->file_path))) {
            unlink(public_path($course->file_path));
        }

        // Delete the course from the database
        $course->delete();

        return response()->noContent();
    }

    // Preview the course file as Base64
    public function preview($id)
    {
        $course = Course::findOrFail($id);

        if (!$course->file_path || !file_exists(public_path($course->file_path))) {
            return response()->json(['message' => 'File not found'], 404);
        }

        $filePath = public_path($course->file_path);
        $fileContents = file_get_contents($filePath);
        $mimeType = mime_content_type($filePath);
        $base64 = base64_encode($fileContents);

        return response()->json([
            'file_name' => $course->file_name,
            'mime_type' => $mimeType,
            'base64'    => "data:$mimeType;base64,$base64",
        ]);
    }

    // Download the course file
    public function download($id)
    {
        $course = Course::findOrFail($id);

        if (!$course->file_path || !file_exists(public_path($course->file_path))) {
            return response()->json(['message' => 'File not found'], 404);
        }

        return response()->download(public_path($course->file_path), $course->file_name);
    }
}
