<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Measurement extends Model
{
    protected $fillable = [
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

}
