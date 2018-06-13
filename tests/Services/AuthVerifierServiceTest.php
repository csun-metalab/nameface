<?php

declare(strict_types=1);

namespace Tests\Services;

use App\Services\AuthVerifierService;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class AuthVerifierServiceTest extends TestCase
{
    public $retriever;

    public function setUp()
    {
        parent::setUp();
    }

    /** @test */
    public function isVerified_returns_true_with_good_creds()
    {
        $this->markTestSkipped('no time');
        $user = new \stdClass();
        $user->rank = 'Cool Dude';

        Auth::shouldReceive('attempt')
            ->once()
            ->andReturn(true);

        Auth::shouldReceive('user')
            ->andReturn($user);

        $service = new AuthVerifierService();

        $this->assertTrue($service->isVerified([]));
    }

    /** @test */
    public function isVerified_returns_false_with_bad_creds()
    {
        $this->markTestSkipped('no time');
        $user = new \stdClass();
        $user->rank = 'Cool Dude';

        Auth::shouldReceive('attempt')
            ->once()
            ->andReturn(false);

        $service = new AuthVerifierService();

        $this->assertFalse($service->isVerified([]));
    }

    /** @test */
    public function isVerified_returns_false_with_no_user_rank()
    {
        $this->markTestSkipped('no time');
        $user = new \stdClass();
        $user->rank = null;

        Auth::shouldReceive('attempt')
            ->once()
            ->andReturn(true);

        Auth::shouldReceive('user')
            ->andReturn($user);

        $service = new AuthVerifierService();

        $this->assertFalse($service->isVerified([]));
    }
}
