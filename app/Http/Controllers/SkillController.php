<?php

namespace App\Http\Controllers;

use App\Http\Resources\SkillResource;
use App\Http\Requests\StoreSkillRequest;
use App\Http\Requests\UpdateSkillRequest;
use App\Models\Skill;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;

class SkillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $skills = Skill::orderBy('id', 'desc')->paginate(10)->onEachSide(1);
        return inertia('Skill/Index', [
            "skills" => SkillResource::collection($skills),
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
    public function store(StoreSkillRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $file = $request->file('image');

            $nameImage = Str::uuid()->toString();
            $dir = 'skill_images';

            $img = Image::read($file->getRealPath());
            $img->scaleDown(width: 1600);
            $webpPath = "{$dir}/{$nameImage}.webp";
            Storage::disk('public')->put($webpPath, (string) $img->toWebp(80));

            $data['image'] = $webpPath;
        }

        Skill::create($data);

        return back()->with([
            'successCreated' => 'Skill was created!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSkillRequest $request, Skill $skill)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            if ($skill->image) {
                Storage::disk('public')->delete($skill->image);
            }

            $file = $request->file('image');

            $nameImage = Str::uuid()->toString();
            $dir = 'skill_images';

            $img = Image::read($file->getRealPath());
            $img->scaleDown(width: 1600);
            $webpPath = "{$dir}/{$nameImage}.webp";
            Storage::disk('public')->put($webpPath, (string) $img->toWebp(80));

            $data['image'] = $webpPath;
        }

        $skill->update($data);

        return back()->with([
            'successEdit' => 'Skill was edited!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Skill $skill)
    {
        $title = $skill->title;
        $image = $skill->image;
        $skill->delete();

        if ($image) {
            Storage::disk('public')->delete($image);
        }

        return back()->with([
            'successDelete' => "Skill {$title} was deleted!"
        ]);
    }
}
