import { Calendar, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

type Period = '7d' | '30d' | '12m';

const kpis = [
    {
        title: 'Total Experts',
        value: '1,240',
        trend: '+15%',
        trendPositive: true,
        steady: false,
        icon: Users,
        iconClass: 'bg-alpha-blue text-beta-blue',
    },
    {
        title: 'Media Connections',
        value: '342',
        trend: '+8.5%',
        trendPositive: true,
        steady: false,
        icon: TrendingUp,
        iconClass: 'bg-beta-purple text-alpha-purple',
    },
    {
        title: 'Active Opportunities',
        value: '45',
        trend: 'Steady',
        trendPositive: null,
        steady: true,
        icon: Calendar,
        iconClass: 'bg-beta-yellow text-alpha-yellow',
    },
    {
        title: 'Active Community Members',
        value: '850',
        trend: '+24%',
        trendPositive: true,
        steady: false,
        icon: Users,
        iconClass: 'bg-beta-green text-alpha-green',
    },
] as const;

export function StrategicOverviewKpis() {
    const [period, setPeriod] = useState<Period>('12m');

    return (
        <section className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-tblack text-lg font-semibold">
                        Strategic overview
                    </h2>
                    <p className="text-tgray text-sm">
                        Impact performance across modules
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <ToggleGroup
                        type="single"
                        value={period}
                        onValueChange={(v) => v && setPeriod(v as Period)}
                        variant="outline"
                        size="sm"
                        className="bg-background"
                    >
                        <ToggleGroupItem value="7d" aria-label="Last 7 days">
                            7D
                        </ToggleGroupItem>
                        <ToggleGroupItem value="30d" aria-label="Last 30 days">
                            30D
                        </ToggleGroupItem>
                        <ToggleGroupItem value="12m" aria-label="Last 12 months">
                            12M
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-2"
                    >
                        <Calendar className="size-4" />
                        Filter Period
                    </Button>
                </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {kpis.map((kpi) => {
                    const Icon = kpi.icon;

                    return (
                        <Card
                            key={kpi.title}
                            className="border-border/70 shadow-sm"
                        >
                            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                <CardTitle className="text-tgray text-sm font-medium">
                                    {kpi.title}
                                </CardTitle>
                                <div
                                    className={cn(
                                        'flex size-9 items-center justify-center rounded-lg',
                                        kpi.iconClass,
                                    )}
                                >
                                    <Icon className="size-4" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-tblack text-2xl font-bold tracking-tight">
                                    {kpi.value}
                                </p>
                                <CardDescription className="mt-1 flex items-center gap-1 text-xs">
                                    {kpi.steady ? (
                                        <span className="text-tgray font-medium">
                                            {kpi.trend}
                                        </span>
                                    ) : (
                                        <>
                                            <span
                                                className={cn(
                                                    'font-medium',
                                                    kpi.trendPositive
                                                        ? 'text-alpha-green'
                                                        : 'text-alpha-danger',
                                                )}
                                            >
                                                {kpi.trend}
                                            </span>
                                            {kpi.trendPositive && (
                                                <TrendingUp className="text-alpha-green size-3.5" />
                                            )}
                                        </>
                                    )}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
}
