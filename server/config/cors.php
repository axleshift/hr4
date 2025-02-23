<?php

return [
    'paths' => [
        'api/*',                // Apply CORS to API routes
    ],

    'allowed_methods' => ['*'],  // Allow all HTTP methods (GET, POST, etc.)

    'allowed_origins' => [
        'http://localhost:3000', // Your frontend's URL
    ],

    'allowed_origins_patterns' => [], // Optional regex patterns for allowed origins

    'allowed_headers' => ['*'],  // Allow all headers

    'exposed_headers' => [],  // No headers are explicitly exposed

    'max_age' => 0,  // Disable caching for preflight requests

    'supports_credentials' => true, // Required for session-based authentication
];