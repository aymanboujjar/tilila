import { Link } from '@inertiajs/react';
import { ArrowRight, Archive } from 'lucide-react';
import TransText from '@/components/TransText';
import { PartnerLogoTile } from '@/components/PartnerSection';
import { TILILA_AWARDS_PARTNERS } from '@/data/tilila-awards-partners';
import { PROGRAM_PARTNERS } from '@/data/program-partners';
import { useTranslation } from '@/contexts/TranslationContext';

const ARCHIVE_LINKS = {
    tilila: [
        { fr: 'Lauréats', en: 'Winners', ar: 'الفائزون', href: '#past-editions' },
        { fr: 'Campagnes primées', en: 'Awarded campaigns', ar: 'الحملات الفائزة', href: '#past-editions' },
        { fr: 'Marques', en: 'Brands', ar: 'العلامات', href: '#past-editions' },
        { fr: 'Agences', en: 'Agencies', ar: 'الوكالات', href: '#past-editions' },
        { fr: 'Jurys', en: 'Juries', ar: 'لجان التحكيم', href: '#past-editions' },
        { fr: 'Photos', en: 'Photos', ar: 'صور', href: '#past-editions' },
        { fr: 'Vidéos', en: 'Videos', ar: 'فيديوهات', href: '#past-editions' },
    ],
    tililab: [
        { fr: 'Lauréats', en: 'Winners', ar: 'الفائزون', href: '#past-editions' },
        { fr: 'Projets produits', en: 'Produced projects', ar: 'المشاريع المنتجة', href: '#past-editions' },
        { fr: 'Bootcamp', en: 'Bootcamp', ar: 'المعسكر', href: '#past-editions' },
        { fr: 'Galerie', en: 'Gallery', ar: 'المعرض', href: '#past-editions' },
        { fr: 'Vidéos', en: 'Videos', ar: 'فيديوهات', href: '#past-editions' },
    ],
};

export default function ProgramBottomSection({
    program,
    news = [],
    editionsSlot = null,
}) {
    const { locale } = useTranslation();
    const isTilila = program === 'tilila';
    const partners = isTilila ? TILILA_AWARDS_PARTNERS : PROGRAM_PARTNERS;
    const archiveLinks = ARCHIVE_LINKS[program] ?? [];

    const textFor = (obj) =>
        obj?.[locale] || obj?.fr || obj?.en || obj?.ar || '';

    return (
        <section className="border-t border-border bg-twhite py-12 sm:py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-3">
                    <div id="news">
                        <h2 className="text-lg font-bold text-tblack">
                            <TransText
                                en="News"
                                fr="Actualités"
                                ar="أخبار"
                            />
                        </h2>
                        {news.length > 0 ? (
                            <ul className="mt-5 space-y-4">
                                {news.slice(0, 3).map((item) => (
                                    <li key={item.id}>
                                        <Link
                                            href={`/actualites/${item.slug}`}
                                            className="group flex gap-3"
                                        >
                                            {item.cover_image_url ? (
                                                <img
                                                    src={item.cover_image_url}
                                                    alt=""
                                                    className="size-16 shrink-0 rounded-lg object-cover"
                                                />
                                            ) : null}
                                            <div>
                                                <p className="text-sm font-semibold text-tblack group-hover:text-beta-blue">
                                                    {textFor(item.title)}
                                                </p>
                                                {item.published_at ? (
                                                    <p className="mt-1 text-xs text-tgray">
                                                        {new Date(
                                                            item.published_at,
                                                        ).toLocaleDateString(
                                                            'fr-FR',
                                                        )}
                                                    </p>
                                                ) : null}
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mt-4 text-sm text-tgray">
                                <TransText
                                    en="No news published yet."
                                    fr="Aucune actualité publiée pour le moment."
                                    ar="لا توجد أخبار منشورة حاليًا."
                                />
                            </p>
                        )}
                        <Link
                            href={`/actualites?program=${program}`}
                            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-beta-blue hover:underline"
                        >
                            <TransText
                                en="View all news"
                                fr="Voir toutes les actualités"
                                ar="عرض كل الأخبار"
                            />
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>

                    <div id="past-editions">
                        <h2 className="flex items-center gap-2 text-lg font-bold text-tblack">
                            <Archive className="size-5 text-beta-blue" />
                            <TransText
                                en="Archives & awards"
                                fr="Archives & palmarès"
                                ar="الأرشيف والجوائز"
                            />
                        </h2>
                        <ul className="mt-5 space-y-2">
                            {archiveLinks.map((link) => (
                                <li key={link.en}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-tgray transition hover:text-beta-blue"
                                    >
                                        <TransText
                                            en={link.en}
                                            fr={link.fr}
                                            ar={link.ar}
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                        {editionsSlot}
                    </div>

                    <div id="partners-preview">
                        <h2 className="text-lg font-bold text-tblack">
                            <TransText
                                en="Our partners"
                                fr="Nos partenaires"
                                ar="شركاؤنا"
                            />
                        </h2>
                        <div className="mt-5 grid grid-cols-2 gap-3">
                            {partners.slice(0, 6).map((partner) => (
                                <PartnerLogoTile
                                    key={partner.id}
                                    name={partner.name}
                                    logoUrl={partner.logoUrl}
                                    tall
                                />
                            ))}
                        </div>
                        <a
                            href="#partners"
                            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-beta-blue hover:underline"
                        >
                            <TransText
                                en="View all partners"
                                fr="Voir tous les partenaires"
                                ar="عرض كل الشركاء"
                            />
                            <ArrowRight className="size-4" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
