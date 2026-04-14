<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TililaContestParticipant extends Model
{
    protected $table = 'tilila_contest_participants';

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'organization',
        'job_title',
        'city',
        'country',
        'submission_title',
        'submission_description',
        'submission_link',
        'accepted_rules',
        'locale',
        'ip',
        'user_agent',
    ];

    protected $casts = [
        'accepted_rules' => 'boolean',
    ];
}

