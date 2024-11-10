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

    // Create a new module
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif',
            'file' => 'nullable|mimes:pdf,docx|max:2048',
        ]);

        $module = new Module();

        $module->title = $request->title;
        $module->description = $request->description;

        // Handle image upload
        if ($request->hasFile('image')) {
            $module->image_path = $request->file('image')->store('modules/images', 'public');
        }

        // Handle file upload
        if ($request->hasFile('file')) {
            $module->file_path = $request->file('file')->store('modules/files', 'public');
        }

        $module->save();

        return new ModuleResource($module);
    }

    // Show a specific module
    public function show(Module $module)
    {
        return new ModuleResource($module);
    }

    // Update a specific module
    public function update(Request $request, Module $module)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif',
            'file' => 'nullable|mimes:pdf,docx|max:2048',
        ]);

        $module->title = $request->title;
        $module->description = $request->description;

        // Handle image upload
        if ($request->hasFile('image')) {
            if ($module->image_path) {
                Storage::disk('public')->delete($module->image_path);
            }
            $module->image_path = $request->file('image')->store('modules/images', 'public');
        }

        // Handle file upload
        if ($request->hasFile('file')) {
            if ($module->file_path) {
                Storage::disk('public')->delete($module->file_path);
            }
            $module->file_path = $request->file('file')->store('modules/files', 'public');
        }

        $module->save();

        return new ModuleResource($module);
    }

    // Delete a specific module
    public function destroy(Module $module)
    {
        // Delete files from storage if they exist
        if ($module->image_path) {
            Storage::disk('public')->delete($module->image_path);
        }
        if ($module->file_path) {
            Storage::disk('public')->delete($module->file_path);
        }

        $module->delete();

        return response()->json(null, 204);
    }
}
