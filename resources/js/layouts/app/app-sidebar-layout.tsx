import { usePage } from '@inertiajs/react';
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({ children }: AppLayoutProps) {
    const { auth } = usePage().props;
    const isAuthenticated = Boolean(auth?.user);

    return (
        <AppShell variant={isAuthenticated ? 'sidebar' : 'header'}>
            {isAuthenticated && <AppSidebar />}
            <AppContent
                variant={isAuthenticated ? 'sidebar' : 'header'}
                className="overflow-x-hidden"
            >
                {isAuthenticated && (
                    <div className="border-border/60 flex h-12 shrink-0 items-center border-b bg-muted px-3 lg:hidden">
                        <SidebarTrigger className="-ml-1" />
                    </div>
                )}
                {children}
            </AppContent>
        </AppShell>
    );
}
