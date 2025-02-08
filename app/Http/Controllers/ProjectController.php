<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\ProjectImage;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::paginate(10)->onEachSide(1);
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
            foreach ($request->file('images') as $image) {
                $path = $image->store('public/project_images');
                ProjectImage::create([
                    'project_id' => $project->id,
                    'image_path' => 'project_images/' . basename($path),
                ]);
                \Log::info("New image added with path: $path");
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
        \Log::info('Masuk ke ProjectController update method');
    
        try {
            $data = $request->validated();
            \Log::info('Update Project', ['request' => $data]);
    
            $data['technologies'] = json_encode($data['technologies']);
            $project->update($data);
            \Log::info('Project updated', ['project' => $project]);
    
            // Debugging: Periksa semua request data
            \Log::info('Full request data:', $request->all());
    
            // 🔹 Tangkap `imagesToDelete`
            $imagesToDelete = $request->input('imagesToDelete', []);
    
            // Jika `imagesToDelete` adalah string JSON, decode dulu
            if (is_string($imagesToDelete)) {
                $imagesToDelete = json_decode($imagesToDelete, true);
            }
    
            if (!is_array($imagesToDelete)) {
                $imagesToDelete = [];
            }
    
            \Log::info('After fix - imagesToDelete:', ['imagesToDelete' => $imagesToDelete]);
    
            // Hapus gambar jika ada
            if (!empty($imagesToDelete)) {
                foreach ($imagesToDelete as $imageId) {
                    $image = ProjectImage::find($imageId);
                    if ($image) {
                        Storage::delete('public/' . $image->image_path);
                        $image->delete();
                        \Log::info("Deleted image ID: $imageId");
                    }
                }
            } else {
                \Log::warning("imagesToDelete is empty or not received properly.");
            }

            // 🔹 Tangkap `newImages`
            $newImages = $request->file('newImages', []);

            if (!empty($newImages)) {
                foreach ($newImages as $image) {
                    // Menyimpan gambar ke dalam storage
                    $path = $image->store('project_images', 'public');
                    
                    // Menambahkan path gambar baru ke database
                    $project->images()->create([
                        'image_path' => $path,
                    ]);
                    
                    \Log::info("New image added with path: $path");
                }
            } else {
                \Log::warning("No new images uploaded.");
            }

    
            return redirect()->route('project.index')->with('successEdit', 'Project updated successfully');
        } catch (\Exception $e) {
            \Log::error('Error updating project', ['error' => $e->getMessage()]);
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
                \Log::warning('Deleted project image with path: ' . $image->image_path);
            }
            
            // Hapus semua entri gambar terkait dari database
            ProjectImage::where('project_id', $project->id)->delete();
        } else {
            \Log::warning('No images found for project ID: ' . $project->id);
        }
    
        // Hapus proyek dari database
        $project->delete();
    
        return redirect()->route('project.index')->with('successDelete', "Project \"$title\" was deleted");
    }
}
