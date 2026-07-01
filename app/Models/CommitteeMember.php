<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class CommitteeMember extends Model
{
    protected $fillable = [
        'name',
        'bio',
        'photo_path',
        'sort',
        'is_published',
    ];

    protected $casts = [
        'bio' => 'array',
        'is_published' => 'boolean',
    ];

    protected $appends = ['photo_url'];

    public function getPhotoUrlAttribute(): ?string
    {
        if (! $this->photo_path) {
            return null;
        }

        if (str_starts_with($this->photo_path, '/')) {
            return $this->photo_path;
        }

        return Storage::url($this->photo_path);
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query
            ->where('is_published', true)
            ->orderBy('sort')
            ->orderBy('id');
    }
}
