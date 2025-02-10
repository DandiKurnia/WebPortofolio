<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Http\Requests\StoreCertificateRequest;
use App\Http\Requests\UpdateCertificateRequest;
use App\Http\Resources\CertificateResource;
use Illuminate\Support\Facades\Storage;

class CertificateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $certificates = Certificate::paginate(10)->onEachSide(1);
        return inertia('Certificate/Index',[
            "certificates" => CertificateResource::collection($certificates),
            "successCreated" => session("successCreated"),
            "successEdit" => session("successEdit"),
            "successDelete" => session("successDelete")
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCertificateRequest $request)
    {
        $data = $request->validated();
        
        if ($request->hasFile('certificate_image')) {
            $data['certificate_image'] = $request->file('certificate_image')->store('certificate_images','public');
        }
    
        Certificate::create($data);
        \Log::info('Full request data:', $request->all());
        \Log::info('Full request data2:', $data);
        \Log::info('Session successCreated:', [session("successCreated")]);

    
        return to_route('certificate.index')->with([
            'successCreated' => 'Project was created!',
        ]);
        

    }
    

    /**
     * Display the specified resource.
     */
    public function show(Certificate $certificate)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Certificate $certificate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCertificateRequest $request, Certificate $certificate)
    {
        // Debug untuk melihat data yang dikirim
        // dd($request->all());
        \Log::info('Request all:', $request->all());
        \Log::info('Files:', $request->allFiles());
    
        // Simpan title dulu
        $data['title'] = $request->title;
    
        // Jika ada file gambar baru di-upload
        if ($request->hasFile('certificate_image')) {
            // Hapus gambar lama jika ada
            if ($certificate->certificate_image) {
                Storage::disk('public')->delete($certificate->certificate_image);
            }
    
            // Simpan gambar baru
            $data['certificate_image'] = $request->file('certificate_image')->store('certificate_images', 'public');
        } else {
            // Jika tidak ada file baru, gunakan gambar lama
            $data['certificate_image'] = $certificate->certificate_image;
        }
    
        // Update data sertifikat
        $certificate->update($data);
        \Log::info('Session successEdit:', [session("successEdit")]);

    
        return redirect()->route('certificate.index')->with('successEdit', 'Project updated successfully');
    }
    
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Certificate $certificate)
    {
        $title = $certificate->title;
        $certificate->delete();
        if ($certificate->image_path) {
            certificate::disk('public')->deleteDirectory(dirname($certificate->certificate_image));
        }
        return to_route('certificate.index')
            ->with('successDelete', "Project \"$title\" was delete");
    }
}
