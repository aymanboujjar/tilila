import TransText from '@/components/TransText';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';
import { COMMITTEE_HISTORY } from '@/pages/user/about/partials/about-data';

function HistoryMilestone({ item, isTop }) {
    const content = (
        <>
            <p className="text-[10px] font-extrabold text-beta-blue sm:text-xs lg:text-sm">
                {item.year}
            </p>
            <p className="mt-1 text-[9px] leading-snug text-[#1a237e]/90 sm:text-[11px] sm:leading-relaxed lg:text-xs">
                <TransText en={item.en} fr={item.fr} ar={item.ar} />
            </p>
        </>
    );

    return (
        <li className="relative flex min-h-full min-w-0 flex-1 flex-col">
            <span
                className="absolute top-1/2 left-1/2 z-10 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-beta-blue ring-4 ring-beta-white sm:size-3"
                aria-hidden
            />

            <div className="flex flex-1 flex-col justify-end px-0.5 pb-5 text-center sm:px-1 sm:pb-6">
                {isTop ? content : null}
            </div>

            <div className="flex flex-1 flex-col justify-start px-0.5 pt-5 text-center sm:px-1 sm:pt-6">
                {isTop ? null : content}
            </div>
        </li>
    );
}

export default function HistorySection() {
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

                <div className="relative mt-10 min-h-[240px] sm:min-h-[280px] lg:min-h-[320px]">
                    <div
                        className="pointer-events-none absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-beta-blue/25"
                        aria-hidden
                    />

                    <ol className="relative flex min-h-[240px] w-full sm:min-h-[280px] lg:min-h-[320px]">
                        {COMMITTEE_HISTORY.map((item, index) => (
                            <HistoryMilestone
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
