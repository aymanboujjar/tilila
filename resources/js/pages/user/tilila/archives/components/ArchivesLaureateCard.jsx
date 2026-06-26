import { Link } from '@inertiajs/react';
import { Award } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';
import { archiveImageFitClass } from '@/pages/user/tilila/utils/archivesImageUtils';

export default function ArchivesLaureateCard({ card }) {
    const { t } = useTranslation();
    const fitClass = archiveImageFitClass({
        isLogo: card.isLogo,
        isTrophy: card.isTrophy,
    });

    return (
        <Link href={card.detailsUrl} className="group block h-full">
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-twhite shadow-[0_4px_24px_rgba(68,25,168,0.06)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(68,25,168,0.1)]">
                <div className="relative aspect-[16/10] overflow-hidden bg-alpha-blue">
                    {card.photoSrc ? (
                        <img
                            src={card.photoSrc}
                            alt=""
                            className={`absolute inset-0 h-full w-full transition duration-500 group-hover:scale-[1.02] ${fitClass}`}
                            loading="lazy"
                            decoding="async"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <Award
                                className="size-10 text-beta-blue/40"
                                strokeWidth={1.25}
                                aria-hidden
                            />
                        </div>
                    )}
                </div>

                <div className="flex flex-1 flex-col gap-1.5 p-4">
                    {card.trophy ? (
                        <p className="text-[10px] font-extrabold tracking-wide text-beta-blue uppercase sm:text-[11px]">
                            {card.trophy}
                        </p>
                    ) : null}
                    <p className="text-sm font-extrabold text-tblack sm:text-base">
                        {card.name}
                    </p>
                    {card.agency ? (
                        <p className="text-xs text-tgray">
                            {t('tilila.archives.hub.agency')}: {card.agency}
                        </p>
                    ) : null}
                </div>
            </article>
        </Link>
    );
}
