<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Opportunity extends Model
{
    protected $fillable = [
        'slug',
        'type',
        'status',
        'title',
        'org',
        'location',
        'excerpt',
        'deadline',
        'views',
        'applications_count',
        'applications_limit',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'title' => 'array',
            'org' => 'array',
            'location' => 'array',
            'excerpt' => 'array',
            'deadline' => 'date:Y-m-d',
            'views' => 'integer',
            'applications_count' => 'integer',
            'applications_limit' => 'integer',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function applications(): HasMany
    {
        return $this->hasMany(OpportunityApplication::class);
    }
}

