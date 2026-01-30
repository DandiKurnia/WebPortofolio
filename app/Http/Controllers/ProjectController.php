<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\ProjectImage;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Intervention\Image\Laravel\Facades\Image;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::orderBy('id', 'desc')->paginate(10)->onEachSide(1);
        return inertia("Project/Index", [
            "projects" => ProjectResource::collection($projects),
            "success" => session("successCreated"),
            "successEdit" => session("successEdit"),
            "successDelete" => session("successDelete")
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia("Project/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $data['technologies'] = json_encode($data['technologies']);
        $project = Project::create($data);

        if ($request->hasFile('images')) {
            $dir = 'project_images';

            foreach ($request->file('images') as $image) {
                $name = (string) Str::uuid();

                $img = Image::read($image->getRealPath());
                $img->scaleDown(width: 1600);

                $webpPath = "{$dir}/{$name}.webp";
                Storage::disk('public')->put($webpPath, (string) $img->toWebp(80));

                ProjectImage::create([
                    'project_id' => $project->id,
                    'image_path' => $webpPath, // simpan webp
                ]);
            }
        }

        return redirect()->route('project.index')->with('successCreated', 'Project was created!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        return inertia("Project/Show", [
            "projects" => new ProjectResource($project),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia("Project/Edit", [
            "project" => new ProjectResource($project)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {

        try {
            $data = $request->validated();

            $data['technologies'] = json_encode($data['technologies'] ?? []);
            $project->update($data);

            $imagesToDelete = $request->input('imagesToDelete', []);
            if (is_string($imagesToDelete)) {
                $imagesToDelete = json_decode($imagesToDelete, true);
            }
            if (!is_array($imagesToDelete)) {
                $imagesToDelete = [];
            }

            foreach ($imagesToDelete as $imageId) {
                $image = $project->images()->whereKey($imageId)->first();
                if ($image) {
                    Storage::disk('public')->delete($image->image_path);
                    $image->delete();
                }
            }

            $newImages = $request->file('newImages');

            if ($newImages) {
                $newImages = is_array($newImages) ? $newImages : [$newImages];

                $dir = 'project_images';

                foreach ($newImages as $image) {
                    $name = (string) Str::uuid();

                    $img = Image::read($image->getRealPath());
                    $img->scaleDown(width: 1600);

                    $webpPath = "{$dir}/{$name}.webp";
                    Storage::disk('public')->put($webpPath, (string) $img->toWebp(80));

                    $project->images()->create([
                        'image_path' => $webpPath,
                    ]);
                }
            }
            return redirect()->route('project.index')->with('successEdit', 'Project updated successfully');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors('Error updating project');
        }
    }




    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $title = $project->title;

        // Ambil semua gambar yang terkait dengan proyek
        $projectImages = ProjectImage::where('project_id', $project->id)->get();

        if ($projectImages->isNotEmpty()) {
            foreach ($projectImages as $image) {
                Storage::delete('public/' . $image->image_path); // Hapus file dari storage
            }

            // Hapus semua entri gambar terkait dari database
            ProjectImage::where('project_id', $project->id)->delete();
        }

        // Hapus proyek dari database
        $project->delete();

        return redirect()->route('project.index')->with('successDelete', "Project \"$title\" was deleted");
    }
}
