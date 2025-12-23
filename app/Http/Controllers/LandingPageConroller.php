<?php

namespace App\Http\Controllers;

use App\Http\Resources\CertificateResource;
use App\Http\Resources\ProjectResource;
use App\Models\Certificate;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Models\Resume;

class LandingPageConroller extends Controller
{
    public function home()
    {
        $project = Project::paginate(4);
        $certificate = Certificate::all();
        $resume = Resume::latest()->first();
        return inertia('Landing/Home', [
            'projects' => ProjectResource::collection($project),
            'certificates' => CertificateResource::collection($certificate),
            'resume' => $resume,
        ]);
    }

    public function project()
    {
        $project = Project::all();
        return inertia('Landing/Project', [
            'projects' => ProjectResource::collection($project),
        ]);
    }
}
