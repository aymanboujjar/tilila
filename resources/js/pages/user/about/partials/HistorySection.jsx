import TransText from '@/components/TransText';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';
import { COMMITTEE_HISTORY } from '@/pages/user/about/partials/about-data';

function HistoryMilestoneVertical({ item, isLast }) {
    return (
        <li className={`relative pb-8 ${isLast ? 'pb-0' : ''}`}>
            <span
                className="absolute top-1.5 -start-[calc(2rem+5px)] size-3 rounded-full bg-beta-blue ring-4 ring-beta-white"
                aria-hidden
            />
            <p className="text-sm font-extrabold text-beta-blue">{item.year}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-[#1a237e]/90 sm:text-[15px]">
                <TransText en={item.en} fr={item.fr} ar={item.ar} />
            </p>
        </li>
    );
}

function HistoryMilestoneHorizontal({ item, isTop }) {
    const content = (
        <div className="mx-auto w-[13.5rem] xl:w-[15.5rem] 2xl:w-[10rem]">
            <p className="text-xs font-extrabold text-beta-blue lg:text-sm">
                {item.year}
            </p>
            <p className="mt-1 text-xs leading-snug text-[#1a237e]/90 lg:text-sm lg:leading-relaxed">
                <TransText en={item.en} fr={item.fr} ar={item.ar} />
            </p>
        </div>
    );

    return (
        <li className="relative flex min-h-full min-w-0 flex-1 flex-col overflow-visible">
            <span
                className="absolute top-1/2 left-1/2 z-10 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-beta-blue ring-4 ring-beta-white"
                aria-hidden
            />

            <div className="flex flex-1 flex-col justify-end pb-6 text-center">
                {isTop ? content : null}
            </div>

            <div className="flex flex-1 flex-col justify-start pt-6 text-center">
                {isTop ? null : content}
            </div>
        </li>
    );
}

export default function HistorySection() {
    const lastIndex = COMMITTEE_HISTORY.length - 1;

    return (
        <section
            id="history"
            className="scroll-mt-28 bg-beta-white py-14 sm:py-16"
        >
            <TililaContainer>
                <div className="mb-4 h-1 w-10 bg-beta-blue" aria-hidden />
                <h2 className="text-xl font-extrabold tracking-tight text-[#1a237e] uppercase sm:text-[1.35rem]">
                    <TransText
                        en="Our history"
                        fr="Notre histoire"
                        ar="تاريخنا"
                    />
                </h2>

                <ol className="relative mt-10 space-y-0 border-s-2 border-beta-blue/20 ps-8 lg:hidden">
                    {COMMITTEE_HISTORY.map((item, index) => (
                        <HistoryMilestoneVertical
                            key={item.year}
                            item={item}
                            isLast={index === lastIndex}
                        />
                    ))}
                </ol>

                <div className="relative mt-10 hidden min-h-[300px] overflow-visible lg:block">
                    <div
                        className="pointer-events-none absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-beta-blue/25"
                        aria-hidden
                    />

                    <ol className="relative flex min-h-[300px] w-full overflow-visible">
                        {COMMITTEE_HISTORY.map((item, index) => (
                            <HistoryMilestoneHorizontal
                                key={item.year}
                                item={item}
                                isTop={index % 2 === 0}
                            />
                        ))}
                    </ol>
                </div>
            </TililaContainer>
        </section>
    );
}
