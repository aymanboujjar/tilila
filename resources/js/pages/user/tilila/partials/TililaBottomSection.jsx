import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import TransText from '@/components/TransText';
import { PartnerLogoTile } from '@/components/PartnerSection';
import { TILILA_AWARDS_PARTNERS } from '@/data/tilila-awards-partners';
import { useTranslation } from '@/contexts/TranslationContext';
import {
    TililaContainer,
    TililaSection,
    TililaSectionHeading,
} from '@/pages/user/tilila/partials/TililaUi';

const ARCHIVE_LINKS = [
    { fr: 'Lauréats', en: 'Winners', ar: 'الفائزون' },
    { fr: 'Campagnes primées', en: 'Awarded campaigns', ar: 'الحملات الفائزة' },
    { fr: 'Marques', en: 'Brands', ar: 'العلامات' },
    { fr: 'Agences', en: 'Agencies', ar: 'الوكالات' },
    { fr: 'Jurys', en: 'Juries', ar: 'لجان التحكيم' },
    { fr: 'Photos', en: 'Photos', ar: 'صور' },
    { fr: 'Vidéos', en: 'Videos', ar: 'فيديوهات' },
];

const INSTITUTIONAL = TILILA_AWARDS_PARTNERS.slice(0, 3);
const MEDIA = TILILA_AWARDS_PARTNERS.slice(3);

export default function TililaBottomSection({ news = [], editionsSlot = null }) {
    const { locale } = useTranslation();
    const textFor = (obj) =>
        obj?.[locale] || obj?.fr || obj?.en || obj?.ar || '';

    return (
        <TililaSection className="border-t border-border/60 bg-beta-white">
            <TililaContainer>
                <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
                    <div id="news">
                        <TililaSectionHeading
                            title={
                                <TransText
                                    en="News"
                                    fr="Actualités"
                                    ar="أخبار"
                                />
                            }
                        />
                        {news.length > 0 ? (
                            <ul className="mt-6 space-y-5">
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
                                                    className="size-[72px] shrink-0 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="size-[72px] shrink-0 rounded-lg bg-muted" />
                                            )}
                                            <div>
                                                <p className="text-sm font-semibold text-tblack group-hover:text-beta-blue">
                                                    {textFor(item.title)}
                                                </p>
                                                {item.published_at ? (
                                                    <p className="mt-1 text-xs text-tgray">
                                                        {new Date(
                                                            item.published_at,
                                                        ).toLocaleDateString('fr-FR')}
                                                    </p>
                                                ) : null}
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mt-6 text-sm text-tgray">
                                <TransText
                                    en="No news published yet."
                                    fr="Aucune actualité publiée pour le moment."
                                    ar="لا توجد أخبار منشورة حاليًا."
                                />
                            </p>
                        )}
                        <Link
                            href="/actualites?program=tilila"
                            className="mt-6 inline-flex items-center gap-1 text-xs font-bold tracking-wide text-beta-blue uppercase hover:underline"
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
                        <TililaSectionHeading
                            title={
                                <TransText
                                    en="Archives & awards"
                                    fr="Archives & palmarès"
                                    ar="الأرشيف والجوائز"
                                />
                            }
                        />
                        <div className="mt-6 flex gap-5">
                            <img
                                src="/assets/tilila/trophee-tilila.png"
                                alt=""
                                className="h-28 w-auto shrink-0 object-contain"
                            />
                            <ul className="space-y-2">
                                {ARCHIVE_LINKS.map((link) => (
                                    <li key={link.en}>
                                        <a
                                            href="#past-editions-carousel"
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
                        </div>
                        <a
                            href="#past-editions-carousel"
                            className="mt-6 inline-flex items-center gap-1 text-xs font-bold tracking-wide text-beta-blue uppercase hover:underline"
                        >
                            <TransText
                                en="View all archives"
                                fr="Voir toutes les archives"
                                ar="عرض كل الأرشيف"
                            />
                            <ArrowRight className="size-4" />
                        </a>
                        {/* {editionsSlot} */}
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
                        <p className="mt-4 text-xs font-bold tracking-wide text-beta-blue uppercase">
                            <TransText
                                en="Institutional"
                                fr="Institutionnels"
                                ar="مؤسساتيون"
                            />
                        </p>
                        <div className="mt-3 grid grid-cols-2 gap-3">
                            {INSTITUTIONAL.map((p) => (
                                <PartnerLogoTile
                                    key={p.id}
                                    name={p.name}
                                    logoUrl={p.logoUrl}
                                    tall
                                />
                            ))}
                        </div>
                        <p className="mt-5 text-xs font-bold tracking-wide text-beta-blue uppercase">
                            <TransText en="Media" fr="Médias" ar="إعلام" />
                        </p>
                        <div className="mt-3 grid grid-cols-2 gap-3">
                            {MEDIA.slice(0, 4).map((p) => (
                                <PartnerLogoTile
                                    key={p.id}
                                    name={p.name}
                                    logoUrl={p.logoUrl}
                                    tall
                                />
                            ))}
                        </div>
                        <a
                            href="#partners-full"
                            className="mt-6 inline-flex items-center gap-1 text-xs font-bold tracking-wide text-beta-blue uppercase hover:underline"
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
            </TililaContainer>
        </TililaSection>
    );
}
