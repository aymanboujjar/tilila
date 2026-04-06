<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expert extends Model
{
    protected $fillable = [
        'slug',
        'name',
        'title',
        'tags',
        'location',
        'country',
        'industries',
        'languages',
        'gradient',
        'badge',
        'status',
        'email',
        'avatar',
        'details',
        'last_activity_at',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'name' => 'array',
            'title' => 'array',
            'tags' => 'array',
            'location' => 'array',
            'industries' => 'array',
            'languages' => 'array',
            'details' => 'array',
            'last_activity_at' => 'datetime',
        ];
    }

    public function isPublished(): bool
    {
        return $this->status === 'published';
    }

    /**
     * Shape expected by public React experts directory.
     *
     * @return array<string, mixed>
     */
    public function toDirectoryArray(): array
    {
        return [
            'id' => $this->slug,
            'name' => $this->name,
            'title' => $this->title,
            'tags' => $this->tags ?? [],
            'location' => $this->location ?? ['en' => '', 'fr' => '', 'ar' => ''],
            'country' => $this->country,
            'industries' => $this->industries ?? [],
            'languages' => $this->languages ?? [],
            'gradient' => $this->gradient ?? 'from-beta-green via-alpha-green/25 to-beta-blue/35',
            'badge' => $this->badge,
        ];
    }
}
