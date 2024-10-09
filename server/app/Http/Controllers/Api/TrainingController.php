<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TrainingResource;
use App\Models\Training;
use Illuminate\Http\Request;

class TrainingController extends Controller
{
    public function index()
    {
        return TrainingResource::collection(Training::all());
    }

    public function show(string $id)
    {
        $post = Training::findOrFail($id);
        return new TrainingResource($post);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'training_class' => 'required|string|max:255',
            'agenda' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'schedule' => 'required|date',
            'status' => 'required|string|max:255',
        ]);

        $post = Training::create($validated);
        return new TrainingResource($post);
    }

    public function update(Request $request, string $id)
    {
        $post = Training::findOrFail($id);
        $validated = $request->validate([
            'training_class' => 'sometimes|required|string|max:255',
            'agenda' => 'sometimes|required|string|max:255',
            'location' => 'sometimes|required|string|max:255',
            'schedule' => 'sometimes|required|date',
            'status' => 'sometimes|required|string|max:255',
        ]);

        $post = Training::create($validated);
        return new TrainingResource($post);
    }

    public function destroy(string $id)
    {
        Training::destroy($id);
        return response()->noContent();
    }
}
