<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

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
        $course = Course::findOrFail($id);
        return new CourseResource($course);
    }

    public function store(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'program_id' => 'required|exists:programs,id',
            'file' => 'nullable|file|mimes:pdf,doc,docx|max:5120', // Handle file upload if present
        ]);

        // Handle file upload
        $filePath = null;
        $fileName = null;

        if ($request->hasFile('file')) {
            // Store file using Laravel's Storage facade for better handling
            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads'), $fileName);
            $filePath = 'uploads/' . $fileName;
        }

        // Create a new course
        $course = Course::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'program_id' => $validated['program_id'],
            'file_path' => $filePath,
            'file_name' => $fileName,
        ]);

        return response()->json(new CourseResource($course), Response::HTTP_CREATED);
    }

    public function update(Request $request, $id)
    {
        // Find the course by its ID
        $course = Course::findOrFail($id);

        // Validate the incoming request
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'file' => 'nullable|file|mimes:pdf,doc,docx|max:5120', // Validate file if provided
        ]);

        // Handle file upload if a new file is provided
        if ($request->hasFile('file')) {
            // Delete the old file if it exists
            if ($course->file_path && Storage::exists('public/' . $course->file_path)) {
                Storage::delete('public/' . $course->file_path);
            }

            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('courses', $fileName, 'public');

            $validated['file_path'] = $filePath;
            $validated['file_name'] = $fileName;
        }

        // Update the course
        $course->update($validated);

        return response()->json(new CourseResource($course));
    }

    public function destroy($id)
    {
        // Find the course by its ID
        $course = Course::findOrFail($id);

        // Delete the course file if it exists
        if ($course->file_path && Storage::exists('public/' . $course->file_path)) {
            Storage::delete('public/' . $course->file_path);
        }

        // Delete the course from the database
        $course->delete();

        return response()->noContent();
    }

    public function getCoursePreview($courseId)
    {
        $course = Course::find($courseId);
        
        // Check if course exists and has a file
        if (!$course || !$course->file_path || !Storage::exists('public/' . $course->file_path)) {
            return response()->json(['message' => 'File not found.'], 404);
        }

        // Get the file path
        $path = storage_path('app/public/' . $course->file_path);

        // Get file contents
        $fileContent = file_get_contents($path);

        // Encode the file content into base64
        $base64 = base64_encode($fileContent);

        // Determine the MIME type (PDF or DOCX for example)
        $mimeType = mime_content_type($path);

        // Return the base64 encoded file and mime type
        return response()->json([
            'base64' => "data:$mimeType;base64,$base64",
            'mime_type' => $mimeType,
            'file_name' => $course->file_name,
        ]);
    }

    // Download the course file
    public function download($id)
    {
        $course = Course::findOrFail($id);

        if (!$course->file_path || !Storage::exists('public/' . $course->file_path)) {
            return response()->json(['message' => 'File not found'], Response::HTTP_NOT_FOUND);
        }

        return response()->download(storage_path('app/public/' . $course->file_path), $course->file_name);
    }
}
