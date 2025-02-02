<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    
    protected $casts = [
        'technologies' => 'array',
    ];

    public function images()
    {
        return $this->hasMany(ProjectImage::class);
    }
}
