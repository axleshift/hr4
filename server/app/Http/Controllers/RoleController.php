<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::all(['id', 'name']);

        return response()->json([
            'data' => $roles,
        ]);
    }
}
