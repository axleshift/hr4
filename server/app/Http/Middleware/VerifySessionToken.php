<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class VerifySessionToken
{
    public function handle(Request $request, Closure $next)
    {
        $sessionId = $request->header('Session-ID') ?? $request->input('session_id');

        if (!$sessionId || Session::getId() !== $sessionId || !Auth::check()) {
            return response()->json(['message' => 'Unauthorized. Invalid session.'], 401);
        }

        return $next($request);
    }
}
