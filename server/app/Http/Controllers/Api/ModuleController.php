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
        ]);

        $filePath = null;
        $fileName = null;

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filePath = $file->store('uploads', 'public'); // Save in storage/app/public/uploads
            $fileName = $file->getClientOriginalName(); // Get original name
        }

        $module = Module::create([
            'title'       => $validated['title'],
            'description' => $validated['description'] ?? '',
            'file_path'   => $filePath, // Store correct file path
            'file_name'   => $fileName, // Store original file name
        ]);

        return new ModuleResource($module);
    }

    // Show a specific module
    public function show(Module $module)
    {
        return new ModuleResource($module);
    }

    // Update a module
    public function update(Request $request, Module $module)
    {
        $validated = $request->validate([
            'title'       => 'sometimes|required|string|max:255|unique:modules,title,' . $module->id,
            'description' => 'nullable|string',
            'file'        => 'nullable|file|mimes:pdf,doc,docx|max:5120',
        ]);

        // Handle file upload
        if ($request->hasFile('file')) {
            // Delete old file if it exists
            if ($module->file_path) {
                Storage::disk('public')->delete($module->file_path);
            }

            $file = $request->file('file');
            $module->file_path = $file->store('uploads', 'public');
            $module->file_name = $file->getClientOriginalName(); // Update file name
        }

        $module->update([
            'title'       => $validated['title'] ?? $module->title,
            'description' => $validated['description'] ?? $module->description,
        ]);

        return new ModuleResource($module);
    }

    // Download a module file
    public function download(Module $module)
    {
        if (!$module->file_path || !Storage::disk('public')->exists($module->file_path)) {
            return response()->json(['message' => 'File not found'], 404);
        }

        return response()->download(storage_path("app/public/{$module->file_path}"), $module->file_name);
    }

    // Delete a module
    public function destroy(Module $module)
    {
        // Delete stored file if exists
        if ($module->file_path) {
            Storage::disk('public')->delete($module->file_path);
        }

        $module->delete();

        return response()->json(['message' => 'Module deleted successfully']);
    }

    public function listFiles()
    {
        $files = Storage::files('public/upload'); // Get all files in storage/app/public/upload

        $fileList = array_map(function ($file) {
            return [
                'name' => basename($file),
                'url' => Storage::url($file), // Generates a public URL
            ];
        }, $files);

        return response()->json(['data' => $fileList]);
    }

    public function preview(Module $module)
{
    if (!$module->file_path || !Storage::disk('public')->exists($module->file_path)) {
        return response()->json(['message' => 'File not found'], 404);
    }

    // Get file path and MIME type
    $filePath = storage_path("app/public/{$module->file_path}");
    $mimeType = Storage::mimeType("public/{$module->file_path}");

    // Return file as response with inline display
    return response()->file($filePath, [
        'Content-Type' => $mimeType,
        'Content-Disposition' => 'inline; filename="' . $module->file_name . '"',
    ]);
}


}
