<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Http\Resources\AccountResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AccountController extends Controller
{
    public function index()
    {
        $accounts = Account::all();
        return AccountResource::collection($accounts);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:accounts,email',
            'password' => 'required|min:6',
            'role' => 'required|string',
            'department' => 'required|string',
        ]);

        $account = Account::create([
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'department' => $validated['department'],
        ]);

        return new AccountResource($account);
    }

    public function show($id)
    {
        $account = Account::findOrFail($id);
        return new AccountResource($account);
    }

    public function update(Request $request, $id)
    {
        $account = Account::findOrFail($id);

        $validated = $request->validate([
            'email' => 'required|email|unique:accounts,email,' . $account->id,
            'password' => 'sometimes|min:6',
            'role' => 'required|string',
            'department' => 'required|string',
        ]);

        if ($request->has('password')) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $account->update($validated);

        return new AccountResource($account);
    }

    public function destroy($id)
    {
        $account = Account::findOrFail($id);
        $account->delete();

        return response()->json(['message' => 'Account deleted successfully']);
    }
}
