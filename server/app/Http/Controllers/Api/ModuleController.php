<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ModuleResource;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ModuleController extends Controller
{
    // Get all modules
    public function index()
    {
        return ModuleResource::collection(Module::all());
    }

    // Store a new module
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255|unique:modules,title',
            'description' => 'nullable|string',
            'file'        => 'nullable|file|mimes:pdf,doc,docx|max:5120',
            'course_id'   => 'required|exists:courses,id',  // Ensure a valid course_id is provided
        ]);

        $filePath = null;
        $fileName = null;

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads'), $fileName);
            $filePath = 'uploads/' . $fileName;
        }

        $module = Module::create([
            'title'       => $validated['title'],
            'description' => $validated['description'] ?? '',
            'file_path'   => $filePath,
            'file_name'   => $fileName,
            'course_id'   => $validated['course_id'],  // Store the course_id with the module
        ]);

        return new ModuleResource($module);
    }


    // Preview the document as Base64
    public function preview(Module $module)
    {
        if (!$module->file_path || !file_exists(public_path($module->file_path))) {
            return response()->json(['message' => 'File not found'], 404);
        }

        $filePath = public_path($module->file_path);
        $fileContents = file_get_contents($filePath);
        $mimeType = mime_content_type($filePath);
        $base64 = base64_encode($fileContents);

        return response()->json([
            'file_name' => $module->file_name,
            'mime_type' => $mimeType,
            'base64'    => "data:$mimeType;base64,$base64",
        ]);
    }

    // Download a module file
    public function download(Module $module)
    {
        if (!$module->file_path || !file_exists(public_path($module->file_path))) {
            return response()->json(['message' => 'File not found'], 404);
        }

        return response()->download(public_path($module->file_path), $module->file_name);
    }

    // Delete a module
    public function destroy(Module $module)
    {
        if ($module->file_path && file_exists(public_path($module->file_path))) {
            unlink(public_path($module->file_path));
        }

        $module->delete();

        return response()->json(['message' => 'Module deleted successfully']);
    }
}
