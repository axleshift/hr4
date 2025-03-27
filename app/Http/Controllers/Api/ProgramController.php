<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProgramResource;
use App\Models\Program;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    public function index()
    {
        $programs = Program::with('courses')->get(); // Fetch Programs with Courses
        return response()->json(['data' => $programs]);
    }


    public function show($id)
    {
        $program = Program::findOrFail($id);
        return new ProgramResource($program);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $program = Program::create($validated);
        return new ProgramResource($program);
    }

    public function update(Request $request, $id)
    {
        $program = Program::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
        ]);

        $program->update($validated);
        return new ProgramResource($program);
    }

    public function destroy($id)
    {
        Program::destroy($id);
        return response()->noContent();
    }
}
