<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Event extends Model
{
    protected $fillable = [
        'slug',
        'type',
        'status',
        'visibility',
        'title',
        'location',
        'description',
        'date',
        'time',
        'timezone',
        'cover_image_path',
        'replay_video_url',
        'agenda',
        'list_payload',
        'details_payload',
    ];

    protected $appends = ['cover_image_url'];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'title' => 'array',
            'location' => 'array',
            'description' => 'array',
            'date' => 'date:Y-m-d',
            'list_payload' => 'array',
            'details_payload' => 'array',
            'agenda' => 'array',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function getCoverImageUrlAttribute(): ?string
    {
        if (! $this->cover_image_path) {
            return null;
        }

        return Storage::url($this->cover_image_path);
    }

    public function participants(): HasMany
    {
        return $this->hasMany(EventParticipant::class);
    }

    public function partners(): HasMany
    {
        return $this->hasMany(EventPartner::class);
    }

    public function media(): HasMany
    {
        return $this->hasMany(EventMedia::class);
    }

    public function speakers(): HasMany
    {
        return $this->hasMany(EventSpeaker::class)->orderBy('sort');
    }
}
