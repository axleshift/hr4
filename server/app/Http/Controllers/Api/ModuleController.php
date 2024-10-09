<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Resources\ModuleResource;
use App\Models\Module;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'file' => 'nullable|file|mimes:pdf,docx',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Handle file upload for module
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('modules/files');
            $validatedData['file_path'] = $filePath;
        }

        // Handle image upload for module
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('modules/images');
            $validatedData['image_path'] = $imagePath;
        }

        // Save the module to the database
        $post = Module::create($validatedData);
        return new ModuleResource($post);

        return response()->json(['message' => 'Module created successfully!'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Module::destroy($id);
        return response()->noContent();
    }
}
