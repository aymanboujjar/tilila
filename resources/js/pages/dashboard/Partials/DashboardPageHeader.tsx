import { Bell, Download, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function DashboardPageHeader() {
    return (
        <div className="flex flex-col gap-4 border-b border-border/60 pb-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-3">
                <SidebarTrigger className="text-tgray hidden shrink-0 lg:-ml-1 lg:flex" />
                <h1 className="text-tblack min-w-0 text-xl font-semibold tracking-tight md:text-2xl">
                    Global Impact Dashboard
                </h1>
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:max-w-2xl lg:justify-end">
                <div className="relative min-w-0 flex-1">
                    <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                    <Input
                        type="search"
                        placeholder="Search data, reports..."
                        className="bg-background border-border/80 h-10 pl-10"
                        aria-label="Search dashboard data and reports"
                    />
                </div>
                <div className="flex shrink-0 items-center gap-2">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-tgray relative"
                        aria-label="Notifications"
                    >
                        <Bell className="size-5" />
                        <span className="bg-alpha-danger absolute top-1.5 right-1.5 size-2 rounded-full" />
                    </Button>
                    <Button
                        type="button"
                        className="bg-beta-blue hover:bg-beta-blue/90 text-twhite gap-2 shadow-sm"
                    >
                        <Download className="size-4" />
                        Download Report
                    </Button>
                </div>
            </div>
        </div>
    );
}
