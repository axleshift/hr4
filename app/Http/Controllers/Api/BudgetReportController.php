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
        $reports = BudgetReport::with(['program'])->get();
        return BudgetReportResource::collection($reports);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'form_id' => 'nullable|string',
            'program_id' => 'required|exists:programs,id',
            'total_cost' => 'nullable|numeric',
            'monthly_allocated_budget' => 'required|numeric', // New validation rule
            'status' => 'nullable|string',
        ]);

        $validated['total_cost'] = $validated['total_cost'] ?? 0;
        $validated['status'] = $validated['status'] ?? 'Pending';  // Default to 'Pending' if not provided

        $report = BudgetReport::create($validated);
        return new BudgetReportResource($report->load(['program']));
    }

    public function update(Request $request, BudgetReport $budgetReport)
    {
        $validated = $request->validate([
            'status' => 'nullable|string',
            'total_cost' => 'nullable|numeric',
            'monthly_allocated_budget' => 'nullable|numeric', // Allow updating this field
        ]);

        $budgetReport->update($validated);
        return new BudgetReportResource($budgetReport->load(['program']));
    }

    public function destroy(BudgetReport $budgetReport)
    {
        $budgetReport->delete();
        return response()->noContent();
    }
}
