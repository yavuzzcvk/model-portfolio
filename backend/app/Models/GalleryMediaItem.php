<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GalleryMediaItem extends Model
{
    public const TYPE_IMAGE = 'image';
    public const TYPE_VIDEO = 'video';

    protected $fillable = [
        'gallery_id',
        'media_type',
        'image_path',
        'video_path',
        'is_published',
        'order',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];

    protected $appends = [
        'image_url',
        'video_url',
    ];

    public function gallery(): BelongsTo
    {
        return $this->belongsTo(Gallery::class);
    }

    public function getImageUrlAttribute()
    {
        if (!$this->image_path) return null;
        return asset('storage/' . $this->image_path);
    }

    public function getVideoUrlAttribute()
    {
        if (!$this->video_path) return null;
        return asset('storage/' . $this->video_path);
    }
}
