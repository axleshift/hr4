<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TrainingResource;
use App\Models\Training;
use Illuminate\Http\Request;

class TrainingController extends Controller
{
    public function index(Request $request)
    {
        return TrainingResource::collection(Training::all());
    }

    public function show(string $id)
    {
        $training = Training::with(['program', 'course'])->findOrFail($id);
        return new TrainingResource($training);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'event_location' => 'required|string|max:255',
            'schedule' => 'required|date',
            'delivery_method' => 'required|string|max:50',
            'department_id' => 'required|string|max:100', // Add validation for department_id
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
            'event_location' => 'sometimes|required|string|max:255',
            'schedule' => 'sometimes|required|date',
            'delivery_method' => 'sometimes|required|string|max:50',
            'department_id' => 'sometimes|required|string|max:100', // Add validation for department_id
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
