<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'email',
        'phone',
        'address',
        'instagram',
        'twitter',
        'facebook',
        'linkedin',
        'youtube',
        'tiktok',
        'github',
    ];
}
