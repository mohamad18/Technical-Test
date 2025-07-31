<?php

namespace App\Controllers;

use Core\Controller;
use App\Models\User;

class HomeController extends Controller
{
    public function index()
    {
        return $this->view('home', ['title' => 'Home']);
    }

    public function show($id)
    {
        $user = User::find($id);
        return $this->view('home', ['title' => 'User Detail', 'user' => $user]);
    }

    public function store()
    {
        $name = $_POST['name'] ?? 'Guest';
        // Simulasi penyimpanan
        return $this->view('home', ['title' => 'User Created', 'name' => $name]);
    }
}
