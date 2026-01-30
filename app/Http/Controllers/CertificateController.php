<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Http\Requests\StoreCertificateRequest;
use App\Http\Requests\UpdateCertificateRequest;
use App\Http\Resources\CertificateResource;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class CertificateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $certificates = Certificate::orderBy('id', 'desc')->paginate(10)->onEachSide(1);
        return inertia('Certificate/Index', [
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
            $file = $request->file('certificate_image');

            // Nama file unik + rapi
            $name = Str::uuid()->toString();
            $dir  = 'certificate_images';

            // Baca image
            $img = Image::read($file->getRealPath());

            // Resize max width 1600px (biar tetap tajam tapi ringan)
            $img->scaleDown(width: 1600);

            // Simpan sebagai WEBP (quality 75–85 biasanya ideal)
            $webpPath = "{$dir}/{$name}.webp";
            Storage::disk('public')->put($webpPath, (string) $img->toWebp(80));

            // Optional: thumbnail
            // $thumb = Image::read($file->getRealPath())->scaleDown(width: 500);
            // $thumbPath = "{$dir}/{$name}_thumb.webp";
            // Storage::disk('public')->put($thumbPath, (string) $thumb->toWebp(75));

            // Simpan path ke DB
            $data['certificate_image'] = $webpPath;
            // $data['certificate_thumb'] = $thumbPath; // kalau kolom ini ada
        }

        Certificate::create($data);

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
        // \Log::info('Request all:', $request->all());
        // \Log::info('Files:', $request->allFiles());

        $data['title'] = $request->title;

        if ($request->hasFile('certificate_image')) {
            if ($certificate->certificate_image) {
                Storage::disk('public')->delete($certificate->certificate_image);
            }

            $file = $request->file('certificate_image');

            $name = Str::uuid()->toString();
            $dir  = 'certificate_images';

            $img = Image::read($file->getRealPath());
            $img->scaleDown(width: 1600);
            $webpPath = "{$dir}/{$name}.webp";
            Storage::disk('public')->put($webpPath, (string) $img->toWebp(80));

            $data['certificate_image'] = $webpPath;
        } else {
            $data['certificate_image'] = $certificate->certificate_image;
        }

        $certificate->update($data);

        return redirect()->route('certificate.index')->with('successEdit', 'Project was edited!');
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
