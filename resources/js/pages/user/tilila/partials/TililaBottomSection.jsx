import { Link, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import TransText from '@/components/TransText';
import { PartnerLogoTile } from '@/components/PartnerSection';
import { partnersPreviewGrid } from '@/lib/programPartners';
import {
    TililaContainer,
    TililaSection,
    TililaSectionHeading,
} from '@/pages/user/tilila/partials/TililaUi';

export default function TililaBottomSection() {
    const { partners = [] } = usePage().props;
    const displayed = partnersPreviewGrid(partners, 'tilila');

    return (
        <TililaSection className="border-t border-border/60 bg-beta-white">
            <TililaContainer>
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
                    <div id="past-editions">
                        <TililaSectionHeading
                            title={
                                <TransText
                                    en="Archives & awards"
                                    fr="Archives & palmarès"
                                    ar="الأرشيف والجوائز"
                                />
                            }
                        />
                        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
                            <img
                                src="/assets/logo.png"
                                alt=""
                                className="h-48 w-40 rounded-lg border border-border object-cover shadow-lg"
                                style={{
                                    background:
                                        'linear-gradient(180deg,#4b2675 0%,#2e1861 100%)',
                                }}
                            />
                            <ul className="space-y-2 text-sm font-semibold text-tblack">
                                <li>• Lauréats</li>
                                <li>• Campagnes primées</li>
                                <li>• Marques</li>
                                <li>• Agences</li>
                                <li>• Jurys</li>
                                <li>• Photos</li>
                                <li>• Vidéos</li>
                            </ul>
                        </div>
                        <Link
                            href="/tilila/archives"
                            className="mt-6 inline-flex items-center gap-1 text-xs font-bold tracking-wide text-beta-blue uppercase hover:underline"
                        >
                            <TransText
                                en="View all archives"
                                fr="Voir toutes les archives"
                                ar="عرض كل الأرشيف"
                            />
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>

                    <div id="partners">
                        <TililaSectionHeading
                            title={
                                <TransText
                                    en="Our partners"
                                    fr="Nos partenaires"
                                    ar="شركاؤنا"
                                />
                            }
                        />
                        <div className="mt-6 grid grid-cols-3 gap-4">
                            {displayed.map((p) => (
                                <div
                                    key={p.id}
                                    className="flex items-center justify-center py-2"
                                >
                                    <PartnerLogoTile
                                        name={p.name}
                                        logoUrl={p.logo_url}
                                        tall
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
