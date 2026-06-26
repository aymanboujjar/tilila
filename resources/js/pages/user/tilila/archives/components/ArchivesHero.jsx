import { useMemo } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import {
    HERO_UNDER_NAV,
    TililaContainer,
} from '@/pages/user/tilila/partials/TililaUi';

const HERO_IMAGE = '/assets/tilila/hero-7eme-edition.png';

export default function ArchivesHero({ editionCount = 0 }) {
    const { t } = useTranslation();

    const countLabel = useMemo(() => {
        if (!editionCount) return null;
        return `${editionCount} ${t('tilila.archives.editionsCount')}`;
    }, [editionCount, t]);

    return (
        <section
            className={`${HERO_UNDER_NAV} min-h-[300px] sm:min-h-[360px] lg:min-h-[400px]`}
        >
            <img
                src={HERO_IMAGE}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="eager"
            />
            <div className="absolute inset-0 bg-linear-to-r from-beta-blue/94 via-brand-light-purple/85 to-beta-blue/50" />

            <TililaContainer className="relative flex min-h-[inherit] items-center py-14 sm:py-16 lg:py-20">
                <div className="max-w-3xl text-twhite">
                    <p className="text-[11px] font-bold tracking-[0.28em] text-beta-turquoise uppercase">
                        {t('tilila.archives.heritage')}
                    </p>
                    <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
                        <span className="inline-block border-b-4 border-beta-turquoise pb-1">
                            Archives
                        </span>
                        <span className="ms-2">& Palmarès</span>
                    </h1>
                    <p className="mt-5 max-w-2xl text-sm leading-relaxed text-twhite/90 sm:text-base lg:text-[17px]">
                        {t('tilila.archives.subtitle')}
                    </p>
                    {countLabel ? (
                        <p className="mt-5 inline-flex items-center rounded-full border border-twhite/25 bg-twhite/10 px-4 py-2 text-xs font-bold tracking-wide text-twhite uppercase backdrop-blur-sm">
                            {countLabel}
                        </p>
                    ) : null}
                </div>
            </TililaContainer>
        </section>
    );
}
