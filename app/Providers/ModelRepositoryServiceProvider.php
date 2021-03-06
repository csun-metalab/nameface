<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class ModelRepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(
            'App\ModelRepositoryInterfaces\UserModelRepositoryInterface',
            'App\ModelRepositories\UserModelRepository'
        );
        $this->app->bind(
            'App\ModelRepositoryInterfaces\ClassInstructorsTableRepositoryInterface',
            'App\ModelRepositories\ClassInstructorsTableRepository'
        );
        $this->app->bind(
            'App\ModelRepositoryInterfaces\TermModelRepositoryInterface',
            'App\ModelRepositories\TermModelRepository'
        );
    }
}
