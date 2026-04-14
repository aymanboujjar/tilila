<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TililabEdition extends Model
{
    protected $table = 'tililab_editions';

    protected $fillable = [
        'year',
        'edition_label',
        'theme',
        'winners',
        'jury',
        'winners_url',
        'jury_url',
        'gallery_url',
        'gallery_images',
        'has_gallery',
        'sort',
    ];

    protected $casts = [
        'edition_label' => 'array',
        'theme' => 'array',
        'winners' => 'array',
        'jury' => 'array',
        'gallery_images' => 'array',
        'has_gallery' => 'boolean',
    ];
}

