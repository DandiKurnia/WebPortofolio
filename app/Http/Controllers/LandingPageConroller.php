<?php

namespace App\Http\Controllers;

use App\Http\Resources\CertificateResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\SkillResource;
use App\Models\Certificate;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Models\Resume;
use App\Models\Skill;

class LandingPageConroller extends Controller
{
    public function home()
    {
        $project = Project::orderBy('created_at', 'asc')->paginate(2);
        $certificate = Certificate::all();
        $resume = Resume::latest()->first();
        $skill = Skill::all();
        return inertia('Landing/Home', [
            'projects' => ProjectResource::collection($project),
            'certificates' => CertificateResource::collection($certificate),
            'resume' => $resume,
            'skills' => SkillResource::collection($skill),
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
