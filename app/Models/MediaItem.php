<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class MediaItem extends Model
{
    protected $fillable = [
        'slug',
        'category_id',
        'status',
        'visibility',
        'badge',
        'title',
        'excerpt',
        'reading_label',
        'location_label',
        'featured_expert_id',
        'trending_topics',
        'resource_links',
        'meta',
        'cta',
        'image_path',
    ];

    /**
     * Fixed CTA copy for all media cards (not editable in admin).
     *
     * @return array{en: string, fr: string, ar: string}
     */
    public static function defaultCta(): array
    {
        return [
            'en' => 'Watch replay →',
            'fr' => 'Voir le replay →',
            'ar' => 'شاهد الإعادة →',
        ];
    }

    protected $appends = ['image_url'];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'badge' => 'array',
            'title' => 'array',
            'excerpt' => 'array',
            'reading_label' => 'array',
            'location_label' => 'array',
            'trending_topics' => 'array',
            'resource_links' => 'array',
            'meta' => 'array',
            'cta' => 'array',
        ];
    }

    public function featuredExpert(): BelongsTo
    {
        return $this->belongsTo(Expert::class, 'featured_expert_id');
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function getImageUrlAttribute(): ?string
    {
        if (! $this->image_path) {
            return null;
        }

        if (is_string($this->image_path) && preg_match('#^https?://#', $this->image_path)) {
            return $this->image_path;
        }

        return Storage::url($this->image_path);
    }
}
