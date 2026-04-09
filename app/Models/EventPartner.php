<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class EventPartner extends Model
{
    protected $fillable = [
        'event_id',
        'name',
        'url',
        'logo_path',
        'sort',
    ];

    protected $appends = ['logo_url'];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function getLogoUrlAttribute(): ?string
    {
        if (! $this->logo_path) {
            return null;
        }

        return Storage::url($this->logo_path);
    }
}
