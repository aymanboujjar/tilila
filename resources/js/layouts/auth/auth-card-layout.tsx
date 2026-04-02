import type { PropsWithChildren } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center bg-beta-white px-4 py-10 sm:px-6">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.05),transparent_55%)]"
            />

            <div className="relative flex w-full max-w-md flex-col gap-6">
                <div className="flex flex-col gap-6">
                    <Card className="rounded-2xl border-border/70 bg-twhite shadow-sm">
                        <CardHeader className="px-8 pt-8 pb-0 text-center">
                            <CardTitle className="text-2xl font-extrabold text-tblack">
                                {title}
                            </CardTitle>
                            <CardDescription className="text-sm leading-relaxed text-tgray">
                                {description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="px-8 py-8">
                            {children}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
