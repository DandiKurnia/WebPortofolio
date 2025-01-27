<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth as FacadesAuth;

class DashboardController extends Controller
{
    public function index() {
        $user = FacadesAuth::user();
        $certificate = Certificate::query()->count();
        $project = Project::query()->count();
        return inertia("Dashboard", compact(
            "user",
            "certificate",
            "project"
        ));
    }
}
