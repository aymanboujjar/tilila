<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TililabParticipant extends Model
{
    protected $table = 'tililab_participants';

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'job_title',
        'organization',
        'city',
        'country',
        'bio',
        'original_video_link',
        'locale',
        'ip',
        'user_agent',
    ];
}

