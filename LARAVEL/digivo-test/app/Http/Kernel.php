<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as BaseKernel;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Foundation\Http\Middleware\ValidatePostSize;
use Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull;
use Illuminate\Foundation\Http\Middleware\TrimStrings;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Http\Middleware\SetCacheHeaders;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class Kernel extends BaseKernel
{
    /**
     * Middleware global (semua request HTTP).
     */
    protected array $middleware = [
        ValidatePostSize::class,
        TrimStrings::class,
        ConvertEmptyStringsToNull::class,
        HandlePrecognitiveRequests::class,
    ];

    /**
     * Middleware group (web dan api).
     */
    protected array $middlewareGroups = [
        'web' => [
            \Illuminate\Cookie\Middleware\EncryptCookies::class,
            AddQueuedCookiesToResponse::class,
            StartSession::class,
            ShareErrorsFromSession::class,
            SubstituteBindings::class,
        ],

        'api' => [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            SubstituteBindings::class,
        ],
    ];

    /**
     * Route middleware (alias untuk route).
     */
    protected array $middlewareAliases = [
        'auth' => Authenticate::class,
        'bindings' => SubstituteBindings::class,
        'cache.headers' => SetCacheHeaders::class,
        // contoh custom
        'auth.token' => \App\Http\Middleware\AuthToken::class,
    ];
}
