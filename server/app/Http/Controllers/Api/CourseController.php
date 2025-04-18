<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    // List courses (optional filter by program_id)
    public function index(Request $request)
    {
        $query = Course::query();

        if ($request->has('program_id')) {
            $query->where('program_id', $request->program_id);
        }

        return CourseResource::collection($query->get());
    }

    // Show a specific course
    public function show($id)
    {
        $course = Course::findOrFail($id);
        return new CourseResource($course);
    }

    // Store new course
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'program_id'  => 'required|exists:programs,id',
            'file'        => 'nullable|file|mimes:pdf,doc,docx|max:5120',
        ]);

        $filePath = null;
        $fileName = null;

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads'), $fileName);
            $filePath = 'uploads/' . $fileName;
        }

        $course = Course::create([
            'title'       => $validated['title'],
            'description' => $validated['description'],
            'program_id'  => $validated['program_id'],
            'file_path'   => $filePath,
            'file_name'   => $fileName,
        ]);

        return new CourseResource($course);
    }

    // Delete course and file
    public function destroy($id)
    {
        $course = Course::findOrFail($id);

        if ($course->file_path && file_exists(public_path($course->file_path))) {
            unlink(public_path($course->file_path));
        }

        $course->delete();

        return response()->json(['message' => 'Course deleted successfully']);
    }

    // Preview course file as Base64
    public function preview(Course $course)
    {
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

    // Download course file
    public function download($id)
    {
        $course = Course::findOrFail($id);

        if (!$course->file_path || !file_exists(public_path($course->file_path))) {
            return response()->json(['message' => 'File not found'], 404);
        }

        return response()->download(public_path($course->file_path), $course->file_name);
    }
}
