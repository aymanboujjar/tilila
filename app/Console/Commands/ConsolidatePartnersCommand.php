<?php

namespace App\Console\Commands;

use App\Support\PartnerConsolidation;
use Illuminate\Console\Command;

class ConsolidatePartnersCommand extends Command
{
    protected $signature = 'partners:consolidate';

    protected $description = 'Move partner logos to storage and merge duplicate rows';

    public function handle(): int
    {
        $result = PartnerConsolidation::run();

        $this->info("Migrated {$result['migrated']} logo(s) to storage.");
        $this->info("Merged {$result['merged']} duplicate row(s).");
        $this->info("{$result['remaining']} partner(s) remaining.");

        return self::SUCCESS;
    }
}
