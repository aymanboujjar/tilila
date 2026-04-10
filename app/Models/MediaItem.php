<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class MediaItem extends Model
{
    protected $fillable = [
        'slug',
        'category_id',
        'status',
        'visibility',
        'badge',
        'title',
        'excerpt',
        'meta',
        'cta',
        'image_path',
    ];

    protected $appends = ['image_url'];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'badge' => 'array',
            'title' => 'array',
            'excerpt' => 'array',
            'meta' => 'array',
            'cta' => 'array',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function getImageUrlAttribute(): ?string
    {
        if (! $this->image_path) {
            return null;
        }

        if (is_string($this->image_path) && preg_match('#^https?://#', $this->image_path)) {
            return $this->image_path;
        }

        return Storage::url($this->image_path);
    }
}

