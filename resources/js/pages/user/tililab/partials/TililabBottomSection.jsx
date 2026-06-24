import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import ProgramPartnersGrouped from '@/components/ProgramPartnersGrouped';
import TransText from '@/components/TransText';
import {
    TililaContainer,
    TililaSection,
    TililaSectionHeading,
} from '@/pages/user/tilila/partials/TililaUi';

export default function TililabBottomSection() {
    return (
        <TililaSection
            id="partners"
            className="border-t border-border/60 bg-beta-white"
        >
            <TililaContainer>
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
                    <div id="past-editions">
                        <TililaSectionHeading
                            title={
                                <TransText
                                    en="Archives & laureates"
                                    fr="Archives & lauréats"
                                    ar="الأرشيف والفائزون"
                                />
                            }
                        />
                        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
                            <img
                                src="/assets/tililab/tililab-logo.png"
                                alt=""
                                className="h-48 w-40 rounded-lg border border-border bg-twhite object-contain p-4 shadow-lg"
                            />
                            <ul className="space-y-2 text-sm font-semibold text-tblack">
                                <li>• Lauréats</li>
                                <li>• Projets produits</li>
                                <li>• Bootcamp</li>
                                <li>• Galerie</li>
                                <li>• Vidéos</li>
                            </ul>
                        </div>
                        <Link
                            href="/tililab/participate"
                            className="mt-6 inline-flex items-center gap-1 text-xs font-bold tracking-wide text-beta-blue uppercase hover:underline"
                        >
                            <TransText
                                en="Explore past editions"
                                fr="Explorer les éditions passées"
                                ar="استكشف الدورات السابقة"
                            />
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>

                    <div>
                        <TililaSectionHeading
                            title={
                                <TransText
                                    en="Our partners"
                                    fr="Nos partenaires"
                                    ar="شركاؤنا"
                                />
                            }
                        />
                        <div className="mt-6">
                            <ProgramPartnersGrouped
                                program="tililab"
                                compact
                            />
                        </div>
                    </div>
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
