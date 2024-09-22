<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnnouncementResource;
use App\Models\Announcement;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    public function index()
    {
        return AnnouncementResource::collection(Announcement::all());
    }

    public function show($id)
    {
        $post = Announcement::findOrFail($id);
        return new AnnouncementResource($post);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $post = Announcement::create($validated);
        return new AnnouncementResource($post);
    }

    public function update(Request $request, $id)
    {
        $post = Announcement::findOrFail($id);
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
        ]);

        $post->update($validated);
        return new AnnouncementResource($post);
    }

    public function destroy($id)
    {
        Announcement::destroy($id);
        return response()->noContent();
    }
}
