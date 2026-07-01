import TransText from '@/components/TransText';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';

const HERO_IMAGE = '/assets/about/aboutt.jpeg';

export default function HeroSection() {
    return (
        <section
            id="overview"
            className="relative flex min-h-[460px] scroll-mt-28 flex-col justify-center overflow-x-hidden bg-twhite sm:min-h-[520px] lg:min-h-[560px]"
        >
            <div
                className="absolute inset-0 z-0"
                aria-hidden
                style={{
                    backgroundImage: `url(${HERO_IMAGE})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top 20%',
                    backgroundRepeat: 'no-repeat',
                }}
            />
            <div
                className="absolute inset-0 z-10 bg-gradient-to-r from-twhite/70 via-twhite/20 to-transparent"
                aria-hidden
            />

            <TililaContainer className="relative z-20 w-full py-9 sm:py-10">
                <div className="home-hero-copy w-full max-w-2xl min-w-0">
                    <h1 className="text-xl leading-[1.15] font-extrabold tracking-tight text-black uppercase sm:text-2xl lg:text-[1.65rem] xl:text-[1.85rem]">
                        <TransText
                            en="Tilila: SOREAD 2M’s Equity, Diversity and Inclusion programme"
                            fr="Tilila : le programme Équité, Diversité et Inclusion de SOREAD 2M"
                            ar="تيليلا : برنامج المساواة والتنوع والإدماج لـ SOREAD 2M"
                        />
                    </h1>

                    <div className="mt-7 space-y-5 text-sm leading-[1.75] text-black/90 sm:text-[15px]">
                        <p>
                            <TransText
                                en="Discover SOREAD 2M’s citizen commitment, the Parity and Diversity Committee and the Tilila programme — equity, diversity and inclusion at the heart of our media action."
                                fr="Découvrez l'engagement citoyen de SOREAD 2M, le Comité Parité et Diversité et le programme Tilila — équité, diversité et inclusion au cœur de notre action médiatique."
                                ar="اكتشفوا التزام SOREAD 2M المواطن، ولجنة المساواة والتنوع وبرنامج تيليلا — المساواة والتنوع والإدماج في صميم عملنا الإعلامي."
                            />
                        </p>
                    </div>
                </div>
            </TililaContainer>
        </section>
    );
}
