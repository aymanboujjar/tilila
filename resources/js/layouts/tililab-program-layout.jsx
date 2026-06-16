import Footer from '@/components/Footer';
import TililabAwardsHeader from '@/pages/user/tililab/partials/TililabAwardsHeader';

export default function TililabProgramLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-twhite text-tblack">
            <TililabAwardsHeader />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
