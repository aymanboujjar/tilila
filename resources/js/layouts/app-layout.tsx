import { usePage } from '@inertiajs/react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types';

export default function AppLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    const { auth } = usePage().props as { auth?: { user?: { role?: string } } };
    const isAuthenticated = Boolean(auth?.user);

    if (!isAuthenticated) {
        return (
            <div className="flex min-h-screen flex-col bg-background">
                <Navbar />
                <main className="flex-1 pt-16">{children}</main>
                <Footer />
            </div>
        );
    }

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            {children}
        </AppLayoutTemplate>
    );
}
