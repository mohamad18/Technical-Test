<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Core\Router;
use Core\Request;

$router = new Router(new Request());

// Daftar route
$router->get('/', 'App\Controllers\HomeController@index');
$router->get('/user/{id}', 'App\Controllers\HomeController@show');
$router->post('/user', 'App\Controllers\HomeController@store');

$router->resolve();
