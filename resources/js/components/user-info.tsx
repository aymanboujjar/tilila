import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import type { User } from '@/types';

function formatRoleLabel(role: string | undefined): string | undefined {
    if (!role) {
        return undefined;
    }

    return role
        .split(/[_\s]+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
}

export function UserInfo({
    user,
    showEmail = false,
    variant = 'default',
}: {
    user: User;
    showEmail?: boolean;
    /** `sidebar`: light text on dark sidebar shell */
    variant?: 'default' | 'sidebar';
}) {
    const getInitials = useInitials();
    const roleLabel = formatRoleLabel(user.role);
    const isSidebar = variant === 'sidebar';

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback
                    className={
                        isSidebar
                            ? 'rounded-lg bg-sidebar-accent text-sidebar-accent-foreground'
                            : 'rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white'
                    }
                >
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
                <span
                    className={
                        isSidebar
                            ? 'truncate font-medium text-twhite'
                            : 'truncate font-medium'
                    }
                >
                    {user.name}
                </span>
                {isSidebar && roleLabel ? (
                    <span className="truncate text-xs text-sidebar-foreground/60">
                        {roleLabel}
                    </span>
                ) : null}
                {showEmail && (
                    <span
                        className={
                            isSidebar
                                ? 'truncate text-xs text-sidebar-foreground/70'
                                : 'truncate text-xs text-muted-foreground'
                        }
                    >
                        {user.email}
                    </span>
                )}
            </div>
        </>
    );
}
