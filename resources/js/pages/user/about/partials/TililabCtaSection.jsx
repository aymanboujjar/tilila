import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import TransText from '@/components/TransText';
import {
    TililaContainer,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

export default function TililabCtaSection() {
    return (
        <TililaSection
            id="tililab"
            className="scroll-mt-28 border-b border-border/60 bg-beta-white"
        >
            <TililaContainer>
                <div className="overflow-hidden rounded-2xl bg-linear-to-r from-beta-turquoise via-[#00b4d8] to-[#0096c7] shadow-lg">
                    <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-10">
                        <div className="flex items-center justify-center lg:col-span-4">
                            <div className="flex w-full max-w-[220px] items-center justify-center rounded-xl bg-[#f7f4e8] px-4 py-5">
                                <img
                                    src="/assets/tililab/tililab-banner.png"
                                    alt="Tililab"
                                    className="h-auto w-full object-contain"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        <div className="lg:col-span-8">
                            <p className="text-xs font-bold tracking-[0.2em] text-twhite/90 uppercase">
                                <TransText
                                    en="Tililab"
                                    fr="Tililab"
                                    ar="تيليلاب"
                                />
                            </p>
                            <h2 className="mt-2 text-2xl font-extrabold text-twhite sm:text-3xl">
                                <TransText
                                    en="Explore the Tililab program"
                                    fr="Découvrir le programme Tililab"
                                    ar="اكتشف برنامج تيليلاب"
                                />
                            </h2>
                            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-twhite/90 sm:text-base">
                                <TransText
                                    en="Discover the guidelines, key dates, and previous winners. Tililab supports projects that amplify parity and diversity in media."
                                    fr="Découvrez les directives, les dates clés et les lauréats précédents. Tililab soutient des projets qui renforcent la parité et la diversité dans les médias."
                                    ar="اطّلع على الإرشادات والتواريخ الرئيسية والفائزين السابقين. يدعم تيليلاب المشاريع التي تعزز المساواة والتنوع في الإعلام."
                                />
                            </p>

                            <Link
                                href="/tililab"
                                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-twhite px-6 py-3 text-xs font-bold tracking-[0.12em] text-beta-blue uppercase transition hover:bg-twhite/90"
                            >
                                <TransText
                                    en="Visit Tililab"
                                    fr="Visiter Tililab"
                                    ar="زيارة تيليلاب"
                                />
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
