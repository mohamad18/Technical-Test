<?php

namespace Core;

class Router
{
    protected $routes = [
        'GET' => [],
        'POST' => []
    ];

    protected $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function get($uri, $action)
    {
        $this->routes['GET'][$uri] = $action;
    }

    public function post($uri, $action)
    {
        $this->routes['POST'][$uri] = $action;
    }

    public function resolve()
    {
        $method = $this->request->method();
        $uri = $this->request->uri();

        foreach ($this->routes[$method] as $route => $action) {
            $pattern = preg_replace('/\{[^\}]+\}/', '([^\/]+)', $route);
            $pattern = "#^" . $pattern . "$#";

            if (preg_match($pattern, $uri, $matches)) {
                array_shift($matches);
                return $this->callAction($action, $matches);
            }
        }

        http_response_code(404);
        echo "404 Not Found";
    }

    protected function callAction($action, $params)
    {
        [$controller, $method] = explode('@', $action);
        if (!class_exists($controller) || !method_exists($controller, $method)) {
            throw new \Exception("Controller atau method tidak ditemukan.");
        }

        $controllerInstance = new $controller;
        call_user_func_array([$controllerInstance, $method], $params);
    }
}
