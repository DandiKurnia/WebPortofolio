<?php

namespace App\Http\Controllers;

use App\Http\Resources\CertificateResource;
use App\Http\Resources\ProjectResource;
use App\Models\Certificate;
use App\Models\Project;
use Illuminate\Http\Request;

class LandingPageConroller extends Controller
{
    public function home() {
        $project = Project::paginate(4);
        $certificate = Certificate::all();
        return inertia('Landing/Home', [
            'projects' => ProjectResource::collection($project),
            'certificates' => CertificateResource::collection($certificate),
        ]);
    }

    public function project() {
        $project = Project::all();
        return inertia('Landing/Project', [
            'projects' => ProjectResource::collection($project),
        ]);
    }
}
