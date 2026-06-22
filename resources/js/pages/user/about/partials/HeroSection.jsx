import TransText from '@/components/TransText';

const HERO_IMAGE = '/assets/about/about5.jpg';
const LOGO = '/assets/logo.png';

export default function HeroSection() {
    return (
        <section
            id="overview"
            className="scroll-mt-28 bg-twhite"
        >
            <div className="grid lg:grid-cols-2">
                <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 lg:py-16 xl:px-20">
                    <p className="text-[11px] font-bold tracking-[0.24em] text-beta-blue uppercase">
                        <TransText
                            en="About Tilila"
                            fr="À propos de Tilila"
                            ar="عن تيليلا"
                        />
                    </p>
                    <h1 className="mt-5 text-xl leading-[1.15] font-extrabold tracking-tight text-[#1a237e] uppercase sm:text-2xl lg:text-[1.65rem] xl:text-[1.85rem]">
                        <TransText
                            en="Tilila: SOREAD 2M equity, diversity and inclusion programme"
                            fr="Tilila : le programme Équité, Diversité et Inclusion de SOREAD 2M"
                            ar="تيليلا : برنامج المساواة والتنوع والإدماج لـ SOREAD 2M"
                        />
                    </h1>

                    <div className="mt-7 space-y-5 text-sm leading-[1.75] text-[#1a237e]/90 sm:text-[15px]">
                        <p>
                            <TransText
                                en="Tilila is the Equity, Diversity and Inclusion (EDI) programme led by SOREAD 2M."
                                fr="Tilila est le programme Équité, Diversité et Inclusion (EDI) porté par SOREAD 2M."
                                ar="تيليلا هو برنامج المساواة والتنوع والإدماج (EDI) الذي تقوده SOREAD 2M."
                            />
                        </p>
                        <p>
                            <TransText
                                en="Through awareness-raising, highlighting best practices and supporting talent, Tilila helps promote more inclusive communication and evolve representations in media, advertising and public space."
                                fr="À travers des actions de sensibilisation, de valorisation des bonnes pratiques et d'accompagnement des talents, Tilila contribue à promouvoir une communication plus inclusive et à faire évoluer les représentations dans les médias, la publicité et l'espace public."
                                ar="من خلال التوعية وإبراز الممارسات الفضلى ومرافقة المواهب، تساهم تيليلا في تعزيز تواصل أكثر شمولاً وتطوير التمثيلات في الإعلام والإعلان والفضاء العام."
                            />
                        </p>
                        <p>
                            <TransText
                                en="Convinced that images, stories and media content play an essential role in shifting mindsets, Tilila encourages fairer, more balanced models that better represent Moroccan society's diversity."
                                fr="Convaincu que les images, les récits et les contenus médiatiques jouent un rôle essentiel dans l'évolution des mentalités, Tilila encourage l'émergence de modèles plus justes, plus équilibrés et plus représentatifs de la diversité de la société marocaine."
                                ar="إذ يؤمن بأن الصور والسرديات والمحتوى الإعلامي يلعب دوراً أساسياً في تطور العقليات، تشجع تيليلا ظهور نماذج أكثر عدلاً وتوازناً وأكثر تمثيلاً لتنوع المجتمع المغربي."
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
                        className="absolute inset-y-0 left-0 w-[35%] bg-linear-to-r from-twhite via-twhite/90 to-transparent lg:w-[42%]"
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
                            className="h-11 w-auto object-contain"
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
