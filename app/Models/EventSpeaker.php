<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class EventSpeaker extends Model
{
    protected $fillable = [
        'event_id',
        'full_name',
        'role',
        'email',
        'photo_path',
        'sort',
    ];

    protected $appends = ['photo_url'];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function getPhotoUrlAttribute(): ?string
    {
        if (! $this->photo_path) {
            return null;
        }

        return Storage::url($this->photo_path);
    }
}
