import { Link } from '@inertiajs/react';
import {
    BarChart3,
    Calendar,
    FileText,
    Globe2,
    LayoutGrid,
    Megaphone,
    Settings,
    Trophy,
    Users,
} from 'lucide-react';

import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { dashboard } from '@/routes';
import { home } from '@/routes';
import { index as eventsIndex } from '@/routes/events';
import { index as gouvernanceIndex } from '@/routes/gouvernance';
import { index as opportunitiesIndex } from '@/routes/opportunities';
import { edit as profileEdit } from '@/routes/profile';
import type { NavItem } from '@/types';

const dashboardItem: NavItem = {
    title: 'Dashboard',
    href: dashboard.url(),
    icon: LayoutGrid,
};

const moduleItems: NavItem[] = [
    {
        title: 'Experts',
        href: '/admin/experts',
        icon: Users,
    },
    {
        title: 'Tililab Editions',
        href: '/admin/tililab/editions',
        icon: Trophy,
    },
    {
        title: 'Tilila Editions',
        href: '/admin/tilila/editions',
        icon: Trophy,
    },
    {
        title: 'Tilila Submissions',
        href: '/admin/tilila/participants',
        icon: Users,
    },
    {
        title: 'Tililab Participants',
        href: '/admin/tililab/participants',
        icon: Users,
    },
    // {
    //     title: 'Media',
    //     href: '/admin/media',
    //     icon: FileText,
    // },
    {
        title: 'Opportunities',
        href: '/admin/opportunities',
        icon: Megaphone,
    },
    {
        title: 'Events',
        href: "/admin/events",
        icon: Calendar,
    },
    // {
    //     title: 'Community',
    //     href: home.url(),
    //     icon: Globe2,
    // },
];

const strategicItems: NavItem[] = [
    // {
    //     title: 'Tililab Analytics',
    //     href: '/admin/tililab/analytics',
    //     icon: BarChart3,
    // },
    {
        title: 'Settings',
        href: profileEdit.url(),
        icon: Settings,
    },
];

function SidebarNavLinks({ items }: { items: NavItem[] }) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <SidebarMenu>
            {items.map((item) => {
                const Icon = item.icon;

                return (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={isCurrentUrl(item.href)}
                            tooltip={{ children: item.title }}
                        >
                            <Link href={item.href} prefetch>
                                {Icon && <Icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                );
            })}
        </SidebarMenu>
    );
}

export function AppSidebar() {
    const { isCurrentUrl } = useCurrentUrl();
    const DashboardIcon = dashboardItem.icon;

    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader className="gap-3 border-b border-sidebar-border p-4">
                <Link
                    href={dashboard.url()}
                    prefetch
                    className="flex items-start gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
                >
                    <span className="bg-beta-blue/20 flex size-10 shrink-0 items-center justify-center rounded-lg">
                        <img
                            src="/assets/logo.webp"
                            alt=""
                            className="size-7 object-contain"
                        />
                    </span>
                    <span className="group-data-[collapsible=icon]:hidden grid min-w-0 flex-1 text-left leading-tight">
                        <span className="text-twhite truncate text-sm font-bold tracking-tight">
                            TILILA Impact
                        </span>
                        <span className="text-sidebar-foreground/60 mt-0.5 truncate text-xs font-medium">
                            Strategic Pilotage
                        </span>
                    </span>
                </Link>
            </SidebarHeader>

            <SidebarContent className="gap-0 px-2 py-4">
                <SidebarGroup className="py-0">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                isActive={isCurrentUrl(dashboardItem.href)}
                                tooltip={{ children: dashboardItem.title }}
                            >
                                <Link href={dashboardItem.href} prefetch>
                                    {DashboardIcon ? <DashboardIcon /> : null}
                                    <span>{dashboardItem.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup className="mt-4 py-0">
                    <SidebarGroupLabel>Modules</SidebarGroupLabel>
                    <SidebarNavLinks items={moduleItems} />
                </SidebarGroup>

                <SidebarGroup className="mt-4 py-0">
                    <SidebarGroupLabel>Strategic</SidebarGroupLabel>
                    <SidebarNavLinks items={strategicItems} />
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border bg-sidebar-accent/50 p-2">
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
