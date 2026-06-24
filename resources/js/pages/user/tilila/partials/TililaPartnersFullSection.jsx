import ProgramPartnersGrouped from '@/components/ProgramPartnersGrouped';
import TransText from '@/components/TransText';

export default function TililaPartnersFullSection() {
    return (
        <section className="border-t border-border bg-twhite py-12">
            <div className="mx-auto max-w-7xl px-4">
                <h2 className="text-2xl font-bold text-tblack">
                    <TransText en="Partners" fr="Partenaires" ar="الشركاء" />
                </h2>
                <div className="mt-8">
                    <ProgramPartnersGrouped program="tilila" />
                </div>
            </div>
        </section>
    );
}
