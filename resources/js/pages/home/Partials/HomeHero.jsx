import TransText from '@/components/TransText';
import {
    TililaBtnOutline,
    TililaBtnPrimary,
    TililaContainer,
    TILILA_HERO_BTN,
    TILILA_HERO_CTA_ROW,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

const HERO_BG = '/assets/tilila/hero-7eme-edition.png';
const TROPHY = '/assets/tilila/trophee-tilila.png';

export default function HomeHero() {
    return (
        <TililaSection
            id="hero"
            className="bg-twhite pt-10 pb-12 sm:pt-14 sm:pb-16"
        >
            <TililaContainer>
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <h1 className="text-3xl leading-[1.12] font-extrabold tracking-tight text-beta-blue sm:text-4xl lg:text-[2.65rem]">
                            <TransText
                                en="Every creation tells a story. Every story shapes a perspective. Every new perspective can help society evolve."
                                fr="Chaque création raconte une histoire. Chaque histoire façonne un regard. Chaque nouveau regard peut faire évoluer une société."
                                ar="كل إبداع يحكي قصة. كل قصة تشكّل نظرة. وكل نظرة جديدة يمكن أن تساهم في تطور المجتمع."
                            />
                        </h1>

                        <p className="mt-6 max-w-xl text-sm leading-relaxed text-tgray sm:text-base">
                            <TransText
                                en="Through Tilila Awards and Tililab, SOREAD 2M celebrates those who put creativity at the service of change."
                                fr="À travers les Tilila Awards et Tililab, SOREAD 2M célèbre celles et ceux qui choisissent de mettre la créativité au service du changement."
                                ar="عبر تيليلا أووردز وتيليلاب، تحتفي SOREAD 2M بمن يضعون الإبداع في خدمة التغيير."
                            />
                        </p>

                        <div className={`mt-8 ${TILILA_HERO_CTA_ROW}`}>
                            <TililaBtnPrimary
                                href="/tilila/participate"
                                className={TILILA_HERO_BTN}
                            >
                                <TransText
                                    en="Submit application"
                                    fr="Déposer une candidature"
                                    ar="قدّم ترشيحك"
                                />
                            </TililaBtnPrimary>
                            <TililaBtnOutline
                                href="/tilila/reglement/download"
                                className={TILILA_HERO_BTN}
                            >
                                <TransText
                                    en="Download regulations"
                                    fr="Télécharger le règlement"
                                    ar="تحميل النظام"
                                />
                            </TililaBtnOutline>
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
                        <div
                            className="relative overflow-hidden rounded-2xl shadow-xl"
                            style={{
                                clipPath:
                                    'polygon(10% 0, 100% 0, 100% 100%, 0 100%)',
                            }}
                        >
                            <video
                                className="aspect-[4/3] w-full object-cover brightness-[0.92] sm:aspect-video"
                                src="/storage/tilila/media/teaser-2022.mp4"
                                poster={HERO_BG}
                                autoPlay
                                muted
                                loop
                                playsInline
                                controls={false}
                                preload="auto"
                            />
                        </div>
                    </div>
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
