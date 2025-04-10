<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Role;

class RolesController extends Controller
{
    /**
     * Fetch all roles.
     */
    public function index()
    {
        $roles = Role::all();
        return response()->json($roles);
    }
}
