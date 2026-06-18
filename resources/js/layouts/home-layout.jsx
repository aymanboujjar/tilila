import Footer from '@/components/Footer';
import TililaSiteHeader from '@/components/TililaSiteHeader';

export default function HomeLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-twhite text-tblack">
            <TililaSiteHeader />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
