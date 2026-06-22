import { Link } from '@inertiajs/react';
import { Mail } from 'lucide-react';
import TransText from '@/components/TransText';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';

const BG_IMAGE = '/assets/tilila/hero-7eme-edition.png';

export default function ArchivesContactCta() {
    return (
        <section className="relative overflow-hidden bg-[#120a2e] py-14 sm:py-16">
            <img
                src={BG_IMAGE}
                alt=""
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
                aria-hidden
            />
            <div className="absolute inset-0 bg-[#120a2e]/80" />

            <TililaContainer className="relative text-center">
                <Mail
                    className="mx-auto size-10 text-twhite/90"
                    strokeWidth={1.5}
                    aria-hidden
                />
                <h2 className="mt-5 text-xl font-extrabold tracking-wide text-twhite uppercase sm:text-2xl">
                    <TransText
                        fr="Une question, une information ?"
                        en="A question or need information?"
                        ar="سؤال أو معلومة؟"
                    />
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-sm text-twhite/80 sm:text-base">
                    <TransText
                        fr="Notre équipe est à votre écoute."
                        en="Our team is here to help."
                        ar="فريقنا في خدمتكم."
                    />
                </p>
                <Link
                    href="/about#contact"
                    className="mt-8 inline-flex items-center justify-center rounded-md border-2 border-twhite/80 px-8 py-3 text-xs font-extrabold tracking-[0.14em] text-twhite uppercase transition hover:bg-twhite hover:text-beta-blue"
                >
                    <TransText
                        fr="Nous contacter"
                        en="Contact us"
                        ar="تواصل معنا"
                    />
                </Link>
            </TililaContainer>
        </section>
    );
}
