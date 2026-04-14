import type { PropsWithChildren } from 'react';

import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AuthSidebar } from '@/components/auth-sidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { AuthLayoutProps } from '@/types';

export default function AuthSidebarLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <AppShell variant="sidebar">
            <AuthSidebar />
            <AppContent variant="sidebar" className="bg-beta-white overflow-x-hidden">
                <header className="flex h-14 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-4 lg:hidden">
                    <SidebarTrigger className="-ml-1" />
                </header>
                <div className="flex flex-1 flex-col items-center justify-center p-6 md:p-10">
                    <div className="w-full max-w-md space-y-8">
                        {(title || description) && (
                            <div className="text-center">
                                {title ? (
                                    <h1 className="text-tblack text-2xl font-semibold tracking-tight">
                                        {title}
                                    </h1>
                                ) : null}
                                {description ? (
                                    <p className="text-tgray mt-2 text-sm leading-relaxed">
                                        {description}
                                    </p>
                                ) : null}
                            </div>
                        )}
                        {children}
                    </div>
                </div>
            </AppContent>
        </AppShell>
    );
}
