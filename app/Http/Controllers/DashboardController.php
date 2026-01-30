<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\Project;
use App\Models\Resume;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth as FacadesAuth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use App\Mail\ContactFormMail;
use App\Http\Requests\StoreResumeRequest;
use App\Http\Requests\UpdateResumeRequest;
use App\Models\Skill;

class DashboardController extends Controller
{
    public function index()
    {
        $user = FacadesAuth::user();
        $certificate = Certificate::query()->count();
        $project = Project::query()->count();
        $resume = Resume::latest()->first();
        $skill = Skill::query()->count();
        return inertia("Dashboard/Index", [
            "user" => $user,
            "certificate" => $certificate,
            "project" => $project,
            "resume" => $resume,
            "skill" => $skill,
            "successCreated" => session("success"),
        ]);
    }

    public function sendEmail(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'message' => 'required'
        ]);

        Mail::to('dandikurnia608@gmail.com')->send(new ContactFormMail($data));

        return redirect()->back()->with('success', 'Email sent successfully');
    }

    public function resumePreview(Resume $resume)
    {
        return response()->file(public_path('storage/' . $resume->file));
    }

    public function resumeStore(StoreResumeRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('file')) {
            $data['file'] = $request->file('file')->store('resumes', 'public');
        }

        Resume::create($data);

        return redirect()->back()->with('success', 'Resume uploaded successfully');
    }

    public function resumeUpdate(UpdateResumeRequest $request, Resume $resume)
    {
        $data = $request->validated();

        if ($request->hasFile('file')) {
            if ($resume->file) {
                Storage::disk('public')->delete($resume->file);
            }
            $data['file'] = $request->file('file')->store('resumes', 'public');
        }

        $resume->update($data);

        return redirect()->back()->with('success', 'Resume updated successfully');
    }
}
