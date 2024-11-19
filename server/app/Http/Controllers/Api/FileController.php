<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FileResource;
use App\Models\File;
use Illuminate\Http\Request;

class FileController extends Controller
{
    // Get all files
    public function index()
    {
        $files = File::all();
        return FileResource::collection($files);
    }

    // Store a new file
    // Store a new file
    public function store(Request $request)
    {
        $validated = $request->validate([
            'file' => 'required|file|mimes:docx,txt,html|max:5120',
            'module_id' => 'required|exists:modules,id', // Validate module_id
        ]);

        $uploadedFile = $request->file('file');
        $base64Content = base64_encode(file_get_contents($uploadedFile->getRealPath()));

        $file = File::create([
            'original_name' => $uploadedFile->getClientOriginalName(),
            'file_type' => $uploadedFile->getClientMimeType(),
            'base64_content' => $base64Content,
            'module_id' => $validated['module_id'], // Associate with a module
        ]);

        return new FileResource($file);
    }


    // Show a specific file
    public function show(File $file)
    {
        return new FileResource($file);
    }

    // Update a file
    public function update(Request $request, File $file)
    {
        $validated = $request->validate([
            'file' => 'nullable|file|mimes:docx,txt,html|max:5120',
        ]);

        if ($request->hasFile('file')) {
            $uploadedFile = $request->file('file');
            $file->update([
                'original_name' => $uploadedFile->getClientOriginalName(),
                'file_type' => $uploadedFile->getClientMimeType(),
                'base64_content' => base64_encode(file_get_contents($uploadedFile->getRealPath())),
            ]);
        }

        return new FileResource($file);
    }

    // Delete a file
    public function destroy(File $file)
    {
        $file->delete();
        return response()->json(['message' => 'File deleted successfully']);
    }
}
