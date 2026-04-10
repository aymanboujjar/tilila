<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MediaSidebarSetting extends Model
{
    protected $fillable = [
        'trending_topics',
        'resource_links',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'trending_topics' => 'array',
            'resource_links' => 'array',
        ];
    }
}
