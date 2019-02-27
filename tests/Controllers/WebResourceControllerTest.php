<?php

declare(strict_types=1);

namespace Tests\Controllers;

use App\Contracts\WebResourceRetrieverContract;
use App\Http\Controllers\WebResourceController;
use Mockery;
use Tests\TestCase;

class WebResourceControllerTest extends TestCase
{
    public $retriever;

    /**
     * Description: Sets up the test and makes a mock of
     *              WebResourceRetriever.
     */
    public function setUp()
    {
        parent::setUp();
        $this->retriever = Mockery::spy(WebResourceRetrieverContract::class);
    }

    /**
     * @test
     */
    public function getCourses_calls_courses_in_retriever()
    {
        $controller = new WebResourceController($this->retriever);

        $this->retriever
            ->shouldReceive('getCourses')
            ->once();

        $controller->courses('2173');
    }

    /**
     * @test
     */
    public function getRoster_calls_roster_in_retriever()
    {
        $controller = new WebResourceController($this->retriever);

        $this->retriever
            ->shouldReceive('getRoster')
            ->once();

        $controller->roster('2173', 0);
    }

    /**
     * @test
     */
    public function getStudent_makes_call_in_retriever()
    {
        $controller = new WebResourceController($this->retriever);

        $this->retriever
            ->shouldReceive('getStudent')
            ->once();

        $controller->student('sun@ra.com');
    }
}
