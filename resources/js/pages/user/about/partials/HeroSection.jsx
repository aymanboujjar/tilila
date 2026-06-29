import TransText from '@/components/TransText';

const HERO_IMAGE = '/assets/about/about1.jpg';

export default function HeroSection() {
    return (
        <section
            id="overview"
            className="scroll-mt-28 bg-twhite relative min-h-[320px] sm:min-h-[400px] lg:min-h-[600px] flex items-stretch"
        >
            {/* 
                Background image, shown clearly, 
                with more of the image's top revealed 
                (backgroundPosition 'center top' vs default 'center center')
            */}
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
            {/* Optional subtle gradient on left for text readability */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-twhite/70 via-twhite/20 to-transparent" aria-hidden />
            
            <div className="relative z-20 flex flex-col justify-center w-full lg:w-1/2 px-6 py-12 sm:px-10 lg:px-14 lg:py-16 xl:px-20">
         
                <h1 className="mt-5 text-xl leading-[1.15] font-extrabold tracking-tight text-black uppercase sm:text-2xl lg:text-[1.65rem] xl:text-[1.85rem]">
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
            <div className="hidden lg:block lg:w-1/2" aria-hidden />
        </section>
    );
}
