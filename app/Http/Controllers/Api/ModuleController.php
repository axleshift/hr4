<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ModuleResource;
use App\Models\Module;
use Illuminate\Http\Request;

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
        ]);

        $imageBase64 = null;

        // Convert uploaded image to Base64
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageBase64 = base64_encode(file_get_contents($image->getRealPath()));
        }

        // Create the new module
        $module = Module::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? '',
            'image_path' => $imageBase64,
        ]);

        return new ModuleResource($module);
    }


    /**
     * Resize image to specific width and height using GD library
     */
    private function resizeImage($image, $width, $height)
    {
        $srcImage = null;
        $imageType = $image->getClientOriginalExtension();

        // Create a GD image resource based on file type
        if (in_array($imageType, ['jpeg', 'jpg'])) {
            $srcImage = imagecreatefromjpeg($image->getRealPath());
        } elseif ($imageType === 'png') {
            $srcImage = imagecreatefrompng($image->getRealPath());
        }

        if (!$srcImage) {
            throw new \Exception('Unsupported image type.');
        }

        // Create a blank canvas for the resized image
        $resizedImage = imagecreatetruecolor($width, $height);

        // Preserve transparency for PNG
        if ($imageType === 'png') {
            imagealphablending($resizedImage, false);
            imagesavealpha($resizedImage, true);
        }

        // Resize the source image to fit the new dimensions
        imagecopyresampled(
            $resizedImage, $srcImage, 
            0, 0, 0, 0, 
            $width, $height, 
            imagesx($srcImage), imagesy($srcImage)
        );

        // Output the resized image to a string
        ob_start();
        if (in_array($imageType, ['jpeg', 'jpg'])) {
            imagejpeg($resizedImage);
        } elseif ($imageType === 'png') {
            imagepng($resizedImage);
        }
        $imageData = ob_get_clean();

        // Cleanup
        imagedestroy($srcImage);
        imagedestroy($resizedImage);

        return $imageData;
    }


    // Show a specific module
    public function show(Module $module)
    {
        return new ModuleResource($module->load('files'));
    }

    // Update a module
    public function update(Request $request, Module $module)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|file|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Handle image upload and convert to Base64
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $module->image_path = base64_encode(file_get_contents($image->getRealPath()));
        }

        $module->update($validated);

        return new ModuleResource($module);
    }

    // Delete a module
    public function destroy(Module $module)
    {
        $module->delete();
        return response()->json(['message' => 'Module deleted successfully']);
    }
}