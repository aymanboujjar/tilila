import { usePage } from '@inertiajs/react';
import TransText from '@/components/TransText';
import { PartnerLogoTile } from '@/components/PartnerSection';
import { partnerStrip } from '@/lib/programPartners';

export default function TililaPartnersFullSection() {
    const { partners = [] } = usePage().props;
    const displayed = partnerStrip(partners);

    if (!displayed.length) {
        return null;
    }

    return (
        <section className="border-t border-border bg-twhite py-12">
            <div className="mx-auto max-w-7xl px-4">
                <h2 className="text-2xl font-bold text-tblack">
                    <TransText en="Partners" fr="Partenaires" ar="الشركاء" />
                </h2>
                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {displayed.map((partner) => (
                        <PartnerLogoTile
                            key={partner.id}
                            name={partner.name}
                            logoUrl={partner.logo_url}
                            tall
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
