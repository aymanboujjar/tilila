<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EventParticipant extends Model
{
    protected $fillable = [
        'event_id',
        'full_name',
        'email',
        'phone',
        'locale',
        'ip',
        'user_agent',
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }
}
