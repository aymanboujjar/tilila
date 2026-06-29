import { usePage } from '@inertiajs/react';
import Footer from '@/components/Footer';
import HeroCarousel, {
    shouldShowHeroCarousel,
} from '@/components/HeroCarousel';
import TililaSiteHeader from '@/components/TililaSiteHeader';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { shouldUseTransparentHeader } from '@/lib/transparentHero';
import type { BreadcrumbItem } from '@/types';

export default function AppLayout({
    breadcrumbs = [],
    title,
    description,
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    title?: string;
    description?: string;
    children: React.ReactNode;
}) {
    const page = usePage();
    const role = (page.props.auth?.user?.role as string | undefined) ?? null;
    const currentPath = new URL(
        page.url,
        typeof window !== 'undefined'
            ? window.location.origin
            : 'http://localhost',
    ).pathname;
    const isSettingsPage = currentPath.startsWith('/settings/');
    const isBackOfficePage =
        currentPath.startsWith('/admin/') ||
        currentPath.startsWith('/expert/') ||
        (isSettingsPage && (role === 'admin' || role === 'expert'));

    if (!isBackOfficePage) {
        const slides = (page.props.hero_slides as unknown[]) ?? [];
        const showHero = shouldShowHeroCarousel(currentPath, slides);
        const transparentHeader = shouldUseTransparentHeader(
            currentPath,
            slides,
        );

        return (
            <div className="flex min-h-screen flex-col bg-twhite text-tblack">
                <TililaSiteHeader />
                <main
                    className={`flex-1 ${transparentHeader ? '' : 'pt-[72px]'}`}
                >
                    {showHero ? <HeroCarousel /> : null}
                    {children}
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <AppLayoutTemplate
            breadcrumbs={breadcrumbs}
            title={title}
            description={description}
        >
            {children}
        </AppLayoutTemplate>
    );
}
