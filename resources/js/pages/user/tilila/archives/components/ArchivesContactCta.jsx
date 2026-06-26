import { Link } from '@inertiajs/react';
import { ArrowRight, Mail } from 'lucide-react';
import TransText from '@/components/TransText';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';

export default function ArchivesContactCta() {
    return (
        <section className="bg-beta-white py-12 sm:py-14">
            <TililaContainer>
                <div className="overflow-hidden rounded-2xl bg-linear-to-r from-beta-blue to-brand-light-purple px-6 py-10 sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
                    <div className="flex shrink-0 justify-center lg:justify-start">
                        <div className="flex size-16 items-center justify-center rounded-full border-2 border-twhite/30 bg-transparent text-twhite">
                            <Mail
                                className="size-7"
                                strokeWidth={1.5}
                                aria-hidden
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex-1 text-center lg:mt-0 lg:text-start">
                        <h2 className="text-lg font-extrabold text-twhite sm:text-xl">
                            <TransText
                                fr="Une question, une information ?"
                                en="A question or need information?"
                                ar="سؤال أو معلومة؟"
                            />
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-twhite/80 sm:text-[15px]">
                            <TransText
                                fr="Notre équipe est à votre écoute pour toute demande liée aux archives et au palmarès."
                                en="Our team is here to help with any archives or palmarès request."
                                ar="فريقنا في خدمتكم لأي طلب متعلق بالأرشيف أو الجوائز."
                            />
                        </p>
                    </div>

                    <div className="mt-8 flex shrink-0 justify-center lg:mt-0">
                        <Link
                            href="/about#contact"
                            className="inline-flex items-center gap-2 rounded-lg bg-twhite px-6 py-3.5 text-xs font-extrabold tracking-[0.12em] text-beta-turquoise uppercase transition hover:bg-twhite/90 sm:text-sm"
                        >
                            <TransText
                                fr="Nous contacter"
                                en="Contact us"
                                ar="تواصل معنا"
                            />
                            <ArrowRight className="size-4" aria-hidden />
                        </Link>
                    </div>
                </div>
            </TililaContainer>
        </section>
    );
}
