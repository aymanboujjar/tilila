import { useTranslation } from '@/contexts/TranslationContext';
import { HERO_UNDER_NAV, TililaContainer } from '@/pages/user/tilila/partials/TililaUi';

const HERO_IMAGE = '/assets/tilila/hero-7eme-edition.png';

export default function ArchivesHero() {
    const { t } = useTranslation();

    return (
        <section
            className={`${HERO_UNDER_NAV} min-h-[300px] sm:min-h-[360px] lg:min-h-[400px]`}
        >
            <img
                src={HERO_IMAGE}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#1a1045]/92 via-[#2e1861]/78 to-[#2e1861]/45" />

            <TililaContainer className="relative flex min-h-[inherit] items-center py-14 sm:py-16 lg:py-20">
                <div className="max-w-3xl text-twhite">
                    <h1 className="text-3xl font-extrabold tracking-tight uppercase sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
                        <span className="inline-block border-b-4 border-beta-turquoise pb-1">
                            Archives
                        </span>
                        <span className="ms-2">& Palmarès</span>
                    </h1>
                    <p className="mt-5 max-w-2xl text-sm leading-relaxed text-twhite/90 sm:text-base lg:text-[17px]">
                        {t('tilila.archives.subtitle')}
                    </p>
                </div>
            </TililaContainer>
        </section>
    );
}
