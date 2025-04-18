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
            'event_title' => 'required|string|max:255',
            'event_location' => 'required|string|max:255',
            'schedule' => 'required|date',
            'start_time' => 'required|string',
            'end_time' => 'required|string',
            'program_id' => 'required|exists:programs,id',
            'course_id' => 'required|exists:courses,id',
        ]);
        
        $training = Training::create($validated);
        return new TrainingResource($training);        
    }

    public function update(Request $request, string $id)
    {
        $training = Training::findOrFail($id);
        $validated = $request->validate([
            'event_title' => 'sometimes|required|string|max:255',
            'event_location' => 'sometimes|required|string|max:255',
            'schedule' => 'sometimes|required|date',
            'start_time' => 'sometimes|required|string',
            'end_time' => 'sometimes|required|string',
            'program_id' => 'sometimes|required|exists:programs,id',
            'course_id' => 'sometimes|required|exists:courses,id',
        ]);

        $training->update($validated);
        return new TrainingResource($training);
    }

    public function destroy(string $id)
    {
        Training::destroy($id);
        return response()->noContent();
    }
}
