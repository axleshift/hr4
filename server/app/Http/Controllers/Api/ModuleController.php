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
        $modules = Module::all();
        return ModuleResource::collection($modules);
    }

    // Store a new module
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255|unique:modules,title',
            'description' => 'nullable|string',
            'image' => 'nullable|file|mimes:jpeg,png,jpg|max:2048',
            'file' => 'nullable|file|mimes:pdf,doc,docx|max:5120', // Accept documents up to 5MB
        ]);

        $imagePath = null;
        $filePath = null;

        // Store image
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('uploads', 'public');
        }

        // Store file
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('uploads', 'public');
        }

        // Create the new module
        $module = Module::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? '',
            'image_path' => $imagePath,
            'file_path' => $filePath,
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
            'title' => 'sometimes|required|string|max:255|unique:modules,title,' . $module->id,
            'description' => 'nullable|string',
            'image' => 'nullable|file|mimes:jpeg,png,jpg|max:2048',
            'file' => 'nullable|file|mimes:pdf,doc,docx|max:5120',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($module->image_path) {
                Storage::disk('public')->delete($module->image_path);
            }
            $module->image_path = $request->file('image')->store('uploads', 'public');
        }

        // Handle file upload
        if ($request->hasFile('file')) {
            // Delete old file if exists
            if ($module->file_path) {
                Storage::disk('public')->delete($module->file_path);
            }
            $module->file_path = $request->file('file')->store('uploads', 'public');
        }

        $module->update($validated);

        return new ModuleResource($module);
    }

    // Delete a module
    public function destroy(Module $module)
    {
        // Delete stored files if they exist
        if ($module->image_path) {
            Storage::disk('public')->delete($module->image_path);
        }

        if ($module->file_path) {
            Storage::disk('public')->delete($module->file_path);
        }

        $module->delete();
        return response()->json(['message' => 'Module deleted successfully']);
    }
}
