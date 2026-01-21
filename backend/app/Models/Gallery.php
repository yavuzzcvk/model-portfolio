<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Gallery extends Model
{
    protected $fillable = ['image', 'video', 'file_path', 'is_published', 'order'];

    protected $casts = [
        'is_published' => 'boolean',
    ];

    protected $appends = [
        'image_url',
        'video_url',
        'file_url',
    ];

    public function mediaItems(): HasMany
    {
        return $this->hasMany(GalleryMediaItem::class)->orderBy('order');
    }

    public function getImageUrlAttribute()
    {
        if (!$this->image) return null;
        return asset('storage/' . $this->image);
    }

    public function getVideoUrlAttribute()
    {
        if (!$this->video) return null;
        return asset('storage/' . $this->video);
    }

    public function getFileUrlAttribute()
    {
        if (!$this->file_path) return null;
        return asset('storage/' . $this->file_path);
    }
}


