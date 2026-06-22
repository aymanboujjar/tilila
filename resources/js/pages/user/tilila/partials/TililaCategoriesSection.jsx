import { Trophy } from 'lucide-react';
import TransText from '@/components/TransText';

const SECTION_BG = '#05051a';
const TROPHY_IMG = '/assets/tilila/trophee-tilila.png';

const UNIFIED_GRADIENT = `linear-gradient(to right, ${SECTION_BG} 0%, ${SECTION_BG} 30%, rgba(5, 5, 26, 0.96) 38%, rgba(18, 10, 38, 0.9) 46%, rgba(32, 18, 62, 0.72) 54%, rgba(45, 25, 80, 0.45) 62%, rgba(55, 32, 92, 0.18) 70%, transparent 80%)`;

const CATEGORIES = [
    {
        fr: 'Hommage Tilila',
        en: 'Hommage Tilila',
        ar: 'تكريم تيليلا',
    },
    {
        fr: 'Prix du Jury',
        en: 'Jury Prize',
        ar: 'جائزة لجنة التحكيم',
    },
    {
        fr: "Prix d'Honneur",
        en: 'Honour Prize',
        ar: 'جائزة الشرف',
    },
    {
        frTop: 'Prix de la Communication Engagée –',
        frBottom: 'ONLINE',
        enTop: 'Engaged Communication Prize –',
        enBottom: 'ONLINE',
        arTop: 'جائزة التواصل الملتزم –',
        arBottom: 'ONLINE',
    },
    {
        frTop: 'Prix de la Communication Engagée –',
        frBottom: 'OFFLINE',
        enTop: 'Engaged Communication Prize –',
        enBottom: 'OFFLINE',
        arTop: 'جائزة التواصل الملتزم –',
        arBottom: 'OFFLINE',
    },
];

function CategoryLabel({ cat }) {
    if (cat.frTop) {
        return (
            <TransText
                en={
                    <>
                        {cat.enTop}
                        <br />
                        {cat.enBottom}
                    </>
                }
                fr={
                    <>
                        {cat.frTop}
                        <br />
                        {cat.frBottom}
                    </>
                }
                ar={
                    <>
                        {cat.arTop}
                        <br />
                        {cat.arBottom}
                    </>
                }
            />
        );
    }

    return <TransText en={cat.en} fr={cat.fr} ar={cat.ar} />;
}

function CategoryCard({ cat }) {
    return (
        <article className="flex min-h-[120px] min-w-[100px] flex-1 flex-col items-center justify-center rounded-lg border border-twhite/10 bg-[#0a0a23]/50 px-2 py-4 text-center backdrop-blur-sm sm:min-h-[140px] sm:min-w-0 sm:px-3 sm:py-5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#D4AF37] text-[#D4AF37] sm:size-11">
                <Trophy
                    className="size-4 sm:size-[18px]"
                    strokeWidth={1.5}
                    aria-hidden
                />
            </span>
            <p className="mt-3 text-[9px] leading-snug font-medium text-twhite sm:text-[10px]">
                <CategoryLabel cat={cat} />
            </p>
        </article>
    );
}

function SectionTitle() {
    return (
        <h2 className="text-base font-extrabold tracking-widest text-twhite uppercase sm:text-lg">
            <span className="inline-block border-b-[3px] border-[#00CED1] pb-0.5">
                <TransText en="The" fr="Les" ar="ال" />
            </span>
            <span className="ms-1.5">
                <TransText en="categories" fr="catégories" ar="فئات" />
            </span>
        </h2>
    );
}

export default function TililaCategoriesSection() {
    return (
        <section
            id="categories"
            className="relative overflow-hidden sm:min-h-[300px] lg:min-h-[360px]"
            style={{ backgroundColor: SECTION_BG }}
        >
            <img
                src={TROPHY_IMG}
                alt=""
                className="pointer-events-none absolute top-0 right-0 z-0 h-full w-[72%] object-cover sm:w-[68%] lg:w-[58%]"
                style={{ objectPosition: '22% center' }}
                loading="lazy"
            />

            <div
                className="pointer-events-none absolute inset-0 z-[1]"
                style={{ background: UNIFIED_GRADIENT }}
                aria-hidden
            />

            <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 py-8 sm:px-7 sm:py-10 lg:px-9 lg:py-12 xl:px-11">
                <SectionTitle />

                <div className="mt-6 flex gap-2 overflow-x-auto sm:mt-7 sm:gap-3 lg:max-w-[72%] lg:overflow-visible xl:max-w-[70%] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {CATEGORIES.map((cat) => (
                        <CategoryCard
                            key={cat.fr ?? cat.frTop + cat.frBottom}
                            cat={cat}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
