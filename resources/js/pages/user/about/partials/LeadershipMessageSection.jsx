import TransText from '@/components/TransText';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';

export default function LeadershipMessageSection({
    id,
    eyebrow,
    paragraphs,
    signature,
    className = 'bg-beta-white',
    imageSrc,
}) {
    return (
        <section id={id} className={`scroll-mt-28 py-14 sm:py-16 ${className}`}>
            <TililaContainer>
                <div
                    className={
                        imageSrc
                            ? 'grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-16'
                            : 'mx-auto max-w-3xl'
                    }
                >
                    <div
                        className={
                            imageSrc
                                ? 'flex flex-col justify-center lg:pe-4'
                                : undefined
                        }
                    >
                        <div
                            className="mb-4 h-1 w-10 bg-beta-blue"
                            aria-hidden
                        />
                        <p className="text-[11px] font-bold tracking-[0.24em] text-beta-blue uppercase">
                            {eyebrow}
                        </p>

                        <div className="mt-7 space-y-5 border-s-4 border-beta-blue/30 ps-6 sm:ps-8">
                            {paragraphs.map((paragraph) => (
                                <p
                                    key={paragraph.fr}
                                    className="text-sm leading-[1.8] text-[#1a237e]/90 sm:text-[15px]"
                                >
                                    <TransText {...paragraph} />
                                </p>
                            ))}
                        </div>

                        <p className="mt-8 text-sm font-bold text-[#1a237e] sm:text-base">
                            <TransText {...signature} />
                        </p>
                    </div>

                    {imageSrc ? (
                        <div className="relative min-h-[220px] overflow-hidden sm:min-h-[280px] lg:min-h-0 lg:h-full">
                            <img
                                src={imageSrc}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover object-top"
                                loading="lazy"
                            />
                        </div>
                    ) : null}
                </div>
            </TililaContainer>
        </section>
    );
}
