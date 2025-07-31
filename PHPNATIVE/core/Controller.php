<?php

namespace Core;

class Controller
{
    public function view($view, $data = [])
    {
        return View::render($view, $data);
    }
}
