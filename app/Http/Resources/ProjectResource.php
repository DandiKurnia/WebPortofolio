<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
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
            'link' => $this->link,
            'technologies' => json_decode($this->technologies, true),
            'images' => ProjectImageResource::collection($this->images),
            'created_at' => (new Carbon($this->create_at))->isoFormat('MMM D, Y'),
            'updated_at' => $this->updated_at,
        ];
    }
}
