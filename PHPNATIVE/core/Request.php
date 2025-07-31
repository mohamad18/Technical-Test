<?php

namespace Core;

class Request
{
    public function method()
    {
        return $_SERVER['REQUEST_METHOD'];
    }

    public function uri()
    {
        $uri = $_SERVER['REQUEST_URI'];
        return parse_url($uri, PHP_URL_PATH);
    }

    public function input($key)
    {
        return $_POST[$key] ?? null;
    }
}
