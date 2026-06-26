import { Link } from '@inertiajs/react';
import { Award } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

const CARD_CLASS =
    'flex h-[18rem] flex-col overflow-hidden rounded-2xl border border-border/50 bg-twhite shadow-[0_4px_24px_rgba(68,25,168,0.06)] transition duration-300 hover:-translate-y-0.5 hover:border-beta-blue/20 hover:shadow-[0_8px_32px_rgba(68,25,168,0.1)] sm:h-[19rem]';

const LOGO_ZONE_CLASS =
    'flex h-32 w-full shrink-0 items-center justify-center bg-twhite p-4 sm:h-[8.75rem] sm:p-5';

export default function ArchivesLaureateCard({ card, showYear = false }) {
    const { t } = useTranslation();

    return (
        <Link href={card.detailsUrl} className="group block h-full">
            <article className={CARD_CLASS}>
                <div
                    className={
                        card.isLogo || card.isTrophy
                            ? LOGO_ZONE_CLASS
                            : `${LOGO_ZONE_CLASS} bg-alpha-blue/30`
                    }
                >
                    {card.photoSrc ? (
                        <img
                            src={card.photoSrc}
                            alt=""
                            className="max-h-full max-w-full object-contain object-center"
                            loading="lazy"
                            decoding="async"
                        />
                    ) : (
                        <Award
                            className="size-10 text-beta-blue/40"
                            strokeWidth={1.25}
                            aria-hidden
                        />
                    )}
                </div>

                <div className="flex min-h-0 flex-1 flex-col gap-1 border-t border-border/30 p-4">
                    {card.trophy ? (
                        <p className="line-clamp-2 text-[10px] font-extrabold tracking-[0.08em] text-beta-blue uppercase sm:text-[11px]">
                            {card.trophy}
                        </p>
                    ) : null}
                    <p className="line-clamp-2 text-sm font-extrabold leading-snug text-tblack sm:text-base">
                        {card.name}
                    </p>
                    {card.agency ? (
                        <p className="line-clamp-2 text-xs leading-relaxed text-tgray">
                            <span className="font-semibold text-tblack/70">
                                {t('tilila.archives.hub.agency')}:
                            </span>{' '}
                            {card.agency}
                        </p>
                    ) : null}
                    {showYear && card.year ? (
                        <p className="mt-auto pt-1 text-[10px] font-bold tracking-wide text-beta-turquoise uppercase">
                            {card.year}
                        </p>
                    ) : null}
                </div>
            </article>
        </Link>
    );
}
