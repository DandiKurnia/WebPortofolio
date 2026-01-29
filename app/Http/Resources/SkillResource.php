<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class SkillResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'image' => $this->image ? Storage::url($this->image) : null,
            'created_at' => (new Carbon($this->create_at))->isoFormat('MMM D, Y'),
            'updated_at' => (new Carbon($this->update_at))->isoFormat('MMM D, Y'),
        ];
    }
}
