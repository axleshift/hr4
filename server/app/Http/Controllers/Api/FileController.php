<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FileResource;
use App\Models\File;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'file' => 'required|file|mimes:docx,txt,html|max:5120',
            'module_id' => 'required|exists:modules,id',
        ]);

        $uploadedFile = $request->file('file');
        $base64Content = base64_encode(file_get_contents($uploadedFile->getRealPath()));

        $file = File::create([
            'original_name' => $uploadedFile->getClientOriginalName(),
            'file_type' => $uploadedFile->getClientMimeType(),
            'base64_content' => $base64Content,
            'module_id' => $validated['module_id'],
        ]);

        return new FileResource($file);
    }

    public function show(File $file)
    {
        return new FileResource($file);
    }

    public function getFilesForModule($moduleId)
    {
        $files = File::where('module_id', $moduleId)->get();
        return FileResource::collection($files);
    }

    public function destroy(File $file)
    {
        $file->delete();
        return response()->json(['message' => 'File deleted successfully']);
    }
}

