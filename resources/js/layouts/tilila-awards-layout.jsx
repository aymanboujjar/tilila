import TililaAwardsFooter from '@/pages/user/tilila/partials/TililaAwardsFooter';
import TililaAwardsHeader from '@/pages/user/tilila/partials/TililaAwardsHeader';

export default function TililaAwardsLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-twhite text-tblack">
            <TililaAwardsHeader />
            <main className="flex-1">{children}</main>
            <TililaAwardsFooter />
        </div>
    );
}
