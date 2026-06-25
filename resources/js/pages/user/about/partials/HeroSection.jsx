import TransText from '@/components/TransText';

const HERO_IMAGE = '/assets/about/about.jpg';
const LOGO = '/assets/logo.png';

export default function HeroSection() {
    return (
        <section id="overview" className="scroll-mt-28 bg-twhite">
            <div className="grid lg:grid-cols-2">
                <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 lg:py-16 xl:px-20">
                    <p className="text-[11px] font-bold tracking-[0.24em] text-beta-blue uppercase">
                        <TransText
                            en="About"
                            fr="Rubrique à propos"
                            ar="قسم التعريف"
                        />
                    </p>
                    <h1 className="mt-5 text-xl leading-[1.15] font-extrabold tracking-tight text-[#1a237e] uppercase sm:text-2xl lg:text-[1.65rem] xl:text-[1.85rem]">
                        <TransText
                            en="Tilila: SOREAD 2M’s Equity, Diversity and Inclusion programme"
                            fr="Tilila : le programme Équité, Diversité et Inclusion de SOREAD 2M"
                            ar="تيليلا : برنامج المساواة والتنوع والإدماج لـ SOREAD 2M"
                        />
                    </h1>

                    <div className="mt-7 space-y-5 text-sm leading-[1.75] text-[#1a237e]/90 sm:text-[15px]">
                        <p>
                            <TransText
                                en="Discover SOREAD 2M’s citizen commitment, the Parity and Diversity Committee and the Tilila programme — equity, diversity and inclusion at the heart of our media action."
                                fr="Découvrez l'engagement citoyen de SOREAD 2M, le Comité Parité et Diversité et le programme Tilila — équité, diversité et inclusion au cœur de notre action médiatique."
                                ar="اكتشفوا التزام SOREAD 2M المواطن، ولجنة المساواة والتنوع وبرنامج تيليلا — المساواة والتنوع والإدماج في صميم عملنا الإعلامي."
                            />
                        </p>
                    </div>
                </div>

                <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-[520px]">
                    <img
                        src={HERO_IMAGE}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        loading="eager"
                    />
                    <div
                        className="absolute inset-y-0 left-0 w-[30%] bg-linear-to-r from-twhite via-twhite/60 to-transparent lg:w-[5%]"
                        aria-hidden
                    />

                    <div
                        className="absolute right-0 bottom-0 flex items-center gap-4 bg-[#1a237e] py-5 pr-8 pl-12 sm:pr-12 sm:pl-16"
                        style={{
                            clipPath:
                                'polygon(8% 0, 100% 0, 100% 100%, 0 100%)',
                        }}
                    >
                        <img
                            src={LOGO}
                            alt="Tilila"
                            className="h-8 w-auto object-contain"
                        />
                        <p className="text-[9px] font-bold tracking-[0.2em] text-twhite uppercase sm:text-[10px]">
                            <TransText
                                en="Equity • Diversity • Inclusion"
                                fr="Équité • Diversité • Inclusion"
                                ar="مساواة • تنوع • إدماج"
                            />
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
