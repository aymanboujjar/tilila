import { Link, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import ProgramPartnersGrouped from '@/components/ProgramPartnersGrouped';
import TransText from '@/components/TransText';
import TililaPastEditionsCarousel from '@/pages/user/tilila/partials/TililaPastEditionsCarousel';
import {
    TililaContainer,
    TililaSection,
    TililaSectionHeading,
} from '@/pages/user/tilila/partials/TililaUi';
import { useTranslation } from '@/contexts/TranslationContext';

const ARCHIVE_QUICK_LINKS = [
    {
        id: 'statistics',
        en: 'Statistics',
        fr: 'Statistiques',
        ar: 'الإحصائيات',
    },
    { id: 'editions', en: 'Editions', fr: 'Éditions', ar: 'الدورات' },
];

export default function TililaBottomSection() {
    const { editions = [] } = usePage().props;
    const { locale } = useTranslation();

    return (
        <TililaSection className="border-t border-border/60 bg-beta-white">
            <TililaContainer className="space-y-14">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
                    <div id="past-editions">
                        <p className="text-xs font-bold tracking-[0.28em] text-beta-turquoise uppercase">
                            <TransText
                                en="Heritage"
                                fr="Patrimoine"
                                ar="الإرث"
                            />
                        </p>
                        <TililaSectionHeading
                            className="mt-2"
                            title={
                                <TransText
                                    en="Archives & awards"
                                    fr="Archives & palmarès"
                                    ar="الأرشيف والجوائز"
                                />
                            }
                            subtitle={
                                <TransText
                                    en="Latest highlights, past editions, winners and jury — all in one place."
                                    fr="Temps forts, éditions passées, lauréats et jury — tout au même endroit."
                                    ar="أبرز اللحظات والدورات السابقة والفائزون ولجنة التحكيم — في مكان واحد."
                                />
                            }
                        />

                        <div className="mt-6 flex flex-wrap gap-2">
                            {ARCHIVE_QUICK_LINKS.map((link) => (
                                <a
                                    key={link.id}
                                    href={`/tilila/archives#${link.id}`}
                                    className="rounded-full border border-border/70 bg-twhite px-4 py-2 text-xs font-bold text-tblack transition hover:border-beta-blue hover:text-beta-blue"
                                >
                                    {link[locale] || link.fr || link.en}
                                </a>
                            ))}
                        </div>

                        <Link
                            href="/tilila/archives"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-beta-blue px-5 py-2.5 text-xs font-bold tracking-wide text-twhite uppercase transition hover:bg-brand-light-purple"
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
                        <div className="mt-6">
                            <ProgramPartnersGrouped
                                program="tilila"
                                compact
                            />
                        </div>
                    </div>
                </div>
                {/* 
                {editions?.length > 0 ? (
                    <div>
                        <TililaSectionHeading
                            title={
                                <TransText
                                    en="Past editions"
                                    fr="Éditions passées"
                                    ar="دورات سابقة"
                                />
                            }
                        />
                        <div className="mt-6">
                            <TililaPastEditionsCarousel
                                editions={editions}
                                compact
                                showControls
                            />
                        </div>
                    </div>
                ) : null} */}
            </TililaContainer>
        </TililaSection>
    );
}
