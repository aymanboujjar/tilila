<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Partner extends Model
{
    protected $fillable = [
        'program',
        'group',
        'name',
        'subtitle',
        'meta',
        'logo_path',
        'url',
        'sort',
        'is_published',
    ];

    protected $casts = [
        'subtitle' => 'array',
        'meta' => 'array',
        'is_published' => 'boolean',
    ];

    protected $appends = ['logo_url'];

    public function getLogoUrlAttribute(): ?string
    {
        if (! $this->logo_path) {
            return null;
        }

        if (str_starts_with($this->logo_path, '/')) {
            return $this->logo_path;
        }

        return Storage::url($this->logo_path);
    }

    public function scopePublishedForProgram($query, string $program)
    {
        return $query
            ->where('is_published', true)
            ->where(function ($q) use ($program) {
                $q->where('program', $program)->orWhere('program', 'both');
            })
            ->orderBy('sort')
            ->orderBy('id');
    }
}
