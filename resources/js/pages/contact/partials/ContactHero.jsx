import TransText from '@/components/TransText';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';

const HERO_IMAGE = '/assets/tilila/editions/edition-2025.png';

export default function ContactHero() {
    return (
        <section className="relative min-h-[300px] overflow-hidden sm:min-h-[360px] lg:min-h-[400px]">
            <img
                src={HERO_IMAGE}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#1a1045]/94 via-[#2e1861]/82 to-[#2e1861]/50" />

            <TililaContainer className="relative flex min-h-[inherit] items-center py-14 sm:py-16 lg:py-20">
                <div className="max-w-3xl text-twhite">
                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
                        <span className="inline-block border-b-4 border-beta-turquoise pb-1">
                            <TransText
                                fr="Contact"
                                en="Contact"
                                ar="تواصل"
                            />
                        </span>
                    </h1>
                    <p className="mt-5 max-w-2xl text-sm leading-relaxed text-twhite/90 sm:text-base lg:text-[17px]">
                        <TransText
                            fr="Une question sur les Tilila Awards, Tililab ou le programme Tilila ?"
                            en="A question about Tilila Awards, Tililab or the Tilila programme?"
                            ar="سؤال حول تيليلا أووردز أو تيليلاب أو برنامج تيليلا؟"
                        />
                    </p>
                    <p className="mt-2 text-sm text-twhite/85 sm:text-base">
                        <TransText
                            fr="Notre équipe est à votre écoute."
                            en="Our team is here to help."
                            ar="فريقنا في خدمتكم."
                        />
                    </p>
                </div>
            </TililaContainer>
        </section>
    );
}
