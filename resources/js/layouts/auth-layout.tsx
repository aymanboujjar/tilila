import AuthSidebarLayout from '@/layouts/auth/auth-sidebar-layout';

export default function AuthLayout({
    title = '',
    description = '',
    children,
}: {
    title?: string;
    description?: string;
    children: React.ReactNode;
}) {
    return (
        <AuthSidebarLayout title={title} description={description}>
            {children}
        </AuthSidebarLayout>
    );
}
