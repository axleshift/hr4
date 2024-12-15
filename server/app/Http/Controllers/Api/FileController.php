<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    // Store uploaded file
    // FileController.php

// FileController

    public function store(Request $request)
    {
        $validated = $request->validate([
            'file' => 'required|file|mimes:docx,txt,html|max:5120',
            'title' => 'required|string', // Validate title
            'content' => 'required|string',
        ]);

        $path = $request->file('file')->store('uploads', 'public');

        $file = File::create([
            'original_name' => $request->file('file')->getClientOriginalName(),
            'file_type' => $request->file('file')->getClientMimeType(),
            'path' => $path,
            'title' => $request->title, // Save the title in the database
        ]);

        return response()->json(['message' => 'File uploaded successfully!', 'file' => $file], 201);
    }



public function getFileCount()
{
    $fileCount = File::count(); // Get the total number of files in the database
    return response()->json(['count' => $fileCount]);
}


    // Retrieve file information and content
    public function show($id)
    {
        $file = File::findOrFail($id);

        // Retrieve the file content from storage
        $fileContent = Storage::disk('public')->get($file->path);

        return response()->json([
            'file' => $file,
            'content' => base64_encode($fileContent), // Base64 encode the file content
        ]);
    }
}
