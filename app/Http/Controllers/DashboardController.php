<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth as FacadesAuth;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactFormMail;

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
    
}
