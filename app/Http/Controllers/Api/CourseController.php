<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Http\Request;
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
            'file' => 'nullable|file|mimes:pdf,doc,docx|max:5120',
        ]);

        // Handle file upload
        $filePath = null;
        $fileName = null;

        if ($request->hasFile('file')) {
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

    public function preview($courseId)
    {
        $course = Course::find($courseId);

        if (!$course || !$course->file_path || !file_exists(public_path($course->file_path))) {
            return response()->json(['message' => 'File not found.'], 404);
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

    public function download(Module $module)
    {
        if (!$module->file_path || !file_exists(public_path($module->file_path))) {
            return response()->json(['message' => 'File not found'], 404);
        }

        return response()->download(public_path($module->file_path), $module->file_name);
    }
}
