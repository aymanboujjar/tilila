import TransText from '@/components/TransText';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';

const HERO_IMAGE = '/assets/tilila/editions/edition-2025.png';

export default function FaqHero() {
    return (
        <section className="relative min-h-[320px] overflow-hidden sm:min-h-[380px] lg:min-h-[420px]">
            <img
                src={HERO_IMAGE}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#1a1045]/94 via-[#2e1861]/82 to-[#2e1861]/50" />

            <TililaContainer className="relative flex min-h-[inherit] items-center py-14 sm:py-16 lg:py-20">
                <div className="max-w-3xl text-twhite">
                    <p className="text-xs font-bold tracking-[0.28em] text-twhite/80 uppercase">
                        FAQ
                    </p>
                    <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
                        <TransText
                            fr="Questions fréquentes"
                            en="Frequently asked questions"
                            ar="الأسئلة الشائعة"
                        />
                    </h1>
                    <div
                        className="mt-4 h-1 w-24 rounded-full bg-linear-to-r from-beta-turquoise to-beta-blue"
                        aria-hidden
                    />
                    <p className="mt-5 max-w-2xl text-sm leading-relaxed text-twhite/90 sm:text-base">
                        <TransText
                            fr="Retrouvez ici les réponses aux questions les plus fréquentes concernant les Tilila Awards et Tililab."
                            en="Find answers to the most frequently asked questions about Tilila Awards and Tililab."
                            ar="اعثروا هنا على إجابات الأسئلة الأكثر شيوعاً حول تيليلا أووردز وتيليلاب."
                        />
                    </p>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-twhite/80 sm:text-[15px]">
                        <TransText
                            fr="Que vous soyez annonceur, agence, créateur de contenu ou candidat à Tililab, cette rubrique vous accompagne dans vos démarches et vous aide à préparer votre participation."
                            en="Whether you are an advertiser, agency, content creator or Tililab applicant, this section guides you through the process and helps you prepare your participation."
                            ar="سواء كنتم معلناً أو وكالة أو صانع محتوى أو مرشحاً لتيليلاب، يرافقكم هذا القسم في خطواتكم ويساعدكم على التحضير للمشاركة."
                        />
                    </p>
                </div>
            </TililaContainer>
        </section>
    );
}
