import { Trophy } from 'lucide-react';
import TransText from '@/components/TransText';

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

const TROPHY_IMG = '/assets/tilila/trophee-tilila.png';

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
        <article className="flex min-h-[155px] min-w-[108px] flex-1 flex-col items-center justify-center rounded-lg border border-twhite/12 bg-[#0a0a23]/45 px-2.5 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md sm:min-h-[170px] sm:min-w-0 sm:px-3 sm:py-6">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#D4AF37] bg-[#0a0a23]/30 text-[#D4AF37] sm:size-12">
                <Trophy
                    className="size-4 sm:size-5"
                    strokeWidth={1.5}
                    aria-hidden
                />
            </span>
            <p className="mt-4 text-[10px] leading-snug font-medium text-twhite sm:text-[11px]">
                <CategoryLabel cat={cat} />
            </p>
        </article>
    );
}

function SectionTitle() {
    return (
        <h2 className="text-lg font-extrabold tracking-[0.1em] text-twhite uppercase sm:text-xl">
            <span className="inline-block border-b-[3px] border-[#00CED1] pb-1">
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
            className="relative min-h-[360px] overflow-hidden bg-[#0a0a23] sm:min-h-[400px] lg:min-h-[440px]"
        >
            <img
                src={TROPHY_IMG}
                alt=""
                className="absolute inset-0 h-full w-full object-contain object-right"
                loading="lazy"
            />

            <div
                className="absolute inset-0 bg-linear-to-r from-[#0a0a23] from-0% via-[#0a0a23]/88 via-[38%] to-transparent to-[72%]"
                aria-hidden
            />
            <div
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0a0a23]/50 via-transparent to-[#0a0a23]/30"
                aria-hidden
            />

            <div className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14 xl:px-14">
                <div className="max-w-full lg:max-w-[62%] xl:max-w-[58%]">
                    <SectionTitle />

                    <div className="mt-8 flex gap-2.5 overflow-x-auto pb-1 sm:gap-3 lg:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {CATEGORIES.map((cat) => (
                            <CategoryCard
                                key={cat.fr ?? cat.frTop + cat.frBottom}
                                cat={cat}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
