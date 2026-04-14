<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class OpportunityApplication extends Model
{
    protected $fillable = [
        'opportunity_id',
        'full_name',
        'email',
        'phone',
        'country',
        'current_role',
        'organization',
        'years_experience',
        'motivation',
        'resume_path',
        'portfolio_path',
        'portfolio_link',
        'locale',
        'ip',
        'user_agent',
    ];

    protected $appends = ['resume_url', 'portfolio_url'];

    public function opportunity(): BelongsTo
    {
        return $this->belongsTo(Opportunity::class);
    }

    public function getResumeUrlAttribute(): ?string
    {
        if (!$this->resume_path) {
            return null;
        }
        return Storage::url($this->resume_path);
    }

    public function getPortfolioUrlAttribute(): ?string
    {
        if (!$this->portfolio_path) {
            return null;
        }
        return Storage::url($this->portfolio_path);
    }
}
