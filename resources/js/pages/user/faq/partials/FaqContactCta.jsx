import { Link } from '@inertiajs/react';
import { ArrowRight, Mail } from 'lucide-react';
import TransText from '@/components/TransText';
import { FAQ_CONTACT_EMAIL } from '@/pages/user/faq/data/faq-content';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';

export default function FaqContactCta() {
    return (
        <section className="bg-[#f5f6f8] py-12 sm:py-14">
            <TililaContainer>
                <div className="overflow-hidden rounded-2xl bg-[#120a2e] px-6 py-10 sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
                    <div className="flex shrink-0 items-center justify-center lg:justify-start">
                        <div className="flex size-14 items-center justify-center rounded-full bg-twhite text-beta-blue">
                            <Mail className="size-6" strokeWidth={1.5} aria-hidden />
                        </div>
                    </div>

                    <div className="mt-6 flex-1 text-center lg:mt-0 lg:text-start">
                        <h2 className="text-lg font-extrabold text-twhite sm:text-xl">
                            <TransText
                                fr="Besoin d'une information complémentaire ?"
                                en="Need more information?"
                                ar="هل تحتاجون معلومات إضافية؟"
                            />
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-twhite/80 sm:text-[15px]">
                            <TransText
                                fr="Notre équipe reste à votre disposition pour répondre à vos questions concernant les Tilila Awards, Tililab ou le programme Tilila."
                                en="Our team is available to answer your questions about Tilila Awards, Tililab or the Tilila programme."
                                ar="فريقنا في خدمتكم للإجابة عن أسئلتكم المتعلقة بتيليلا أووردز أو تيليلاب أو برنامج تيليلا."
                            />
                        </p>
                        <a
                            href={`mailto:${FAQ_CONTACT_EMAIL}`}
                            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-beta-turquoise transition hover:text-twhite"
                        >
                            <Mail className="size-4" aria-hidden />
                            {FAQ_CONTACT_EMAIL}
                        </a>
                    </div>

                    <div className="mt-8 flex shrink-0 justify-center lg:mt-0">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-lg bg-twhite px-6 py-3.5 text-xs font-extrabold tracking-[0.12em] text-beta-blue uppercase transition hover:bg-beta-blue/10 sm:text-sm"
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
