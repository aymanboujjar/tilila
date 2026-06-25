import TransText from '@/components/TransText';
import TililabParticipateForm from '@/pages/user/tililab/partials/TililabParticipateForm';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';

const APPLY_BG = '/assets/tililab/tililab-banner.png';

export default function TililabApplySection() {
    return (
        <section
            id="apply"
            className="relative overflow-hidden bg-linear-to-br from-[#00b5d1] to-[#435b66] py-14 sm:py-16 lg:py-20"
        >
            <img
                src={APPLY_BG}
                alt=""
                className="pointer-events-none absolute inset-y-0 right-0 h-full w-[48%] object-cover object-center opacity-30"
                loading="lazy"
                decoding="async"
            />
            <div
                className="pointer-events-none absolute inset-0 bg-linear-to-r from-[#435b66] from-0% via-[#435b66]/94 via-55% to-[#435b66]/55 to-100%"
                aria-hidden
            />

            <TililaContainer className="relative z-10">
                <div className="text-center">
                    <h2 className="text-xl font-extrabold tracking-[0.14em] text-twhite uppercase sm:text-2xl">
                        <TransText
                            en="Submit application"
                            fr="Déposer une candidature"
                            ar="قدّم ترشيحك"
                        />
                    </h2>
                    <div
                        className="mx-auto mt-3 h-0.5 w-10 rounded-full bg-twhite/60"
                        aria-hidden
                    />
                </div>

                <div className="mx-auto mt-10 max-w-6xl">
                    <TililabParticipateForm embedded />
                </div>
            </TililaContainer>
        </section>
    );
}
