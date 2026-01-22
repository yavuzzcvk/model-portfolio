<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Measurement extends Model
{
    protected $fillable = [
        'images',
        // Temel ölçüler
        'height_cm',
        'weight_kg',
        // Vücut ölçüleri (inch)
        'chest_in',
        'waist_in',
        'hips_in',
        // Beden / numara
        'shoe_size',
        'shoe_region',
        'suit_size',
        'jacket_size',
        // Fiziksel özellikler
        'eye_color',
        'hair_color',
        'hair_length',
        'skin_tone',
        'body_type',
        // Ayırt edici
        'tattoos',
        'piercings',
    ];

    protected $casts = [
        'images' => 'array',
    ];

    protected $appends = [
        'images_url',
    ];

    public function getImagesUrlAttribute()
    {
        if (!$this->images || !is_array($this->images)) return [];
        return array_map(fn($img) => asset('storage/' . $img), $this->images);
    }
}
