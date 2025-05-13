<?php

namespace App\Http\Controllers\Api;

use App\Models\BudgetReport;
use App\Http\Resources\BudgetReportResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BudgetReportController extends Controller
{
    public function index()
    {
        $reports = BudgetReport::with(['program', 'course'])->get();
        return BudgetReportResource::collection($reports);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'form_id' => 'nullable|string',
            'program_id' => 'required|exists:programs,id',
            'total_cost' => 'nullable|numeric',
            'status' => 'nullable|string',
        ]);

        $validated['total_cost'] = $validated['total_cost'] ?? 0;

        $report = BudgetReport::create($validated);
        return new BudgetReportResource($report->load(['program']));
    }

    public function update(Request $request, BudgetReport $budgetReport)
    {
        $validated = $request->validate([
            'status' => 'nullable|string',
            'total_cost' => 'nullable|numeric',
        ]);

        $budgetReport->update($validated);
        return new BudgetReportResource($budgetReport);
    }

    public function destroy(BudgetReport $budgetReport)
    {
        $budgetReport->delete();
        return response()->noContent();
    }
}
