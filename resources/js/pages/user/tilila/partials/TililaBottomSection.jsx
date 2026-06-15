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

const INSTITUTIONAL = TILILA_AWARDS_PARTNERS.slice(0, 3);
const MEDIA = TILILA_AWARDS_PARTNERS.slice(3);

export default function TililaBottomSection({ news = [] }) {
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
                        <p className="mt-6 text-sm leading-relaxed text-tgray">
                            <TransText
                                en="Browse past editions: winners, jury, photos and videos are available inside each edition page."
                                fr="Parcourez les éditions passées : lauréats, jury, photos et vidéos sont disponibles dans chaque fiche édition."
                                ar="تصفح الدورات السابقة: الفائزون ولجنة التحكيم والصور والفيديوهات متاحة داخل صفحة كل دورة."
                            />
                        </p>
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
                            {[...INSTITUTIONAL, ...MEDIA].map((p) => (
                                <div
                                    key={p.id}
                                    className="flex items-center justify-center py-2"
                                >
                                    <PartnerLogoTile
                                        name={p.name}
                                        logoUrl={p.logoUrl}
                                        tall
                                    />
                                </div>
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
