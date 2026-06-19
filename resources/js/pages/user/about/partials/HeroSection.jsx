import TransText from '@/components/TransText';
import {
    TililaContainer,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

export default function HeroSection() {
    return (
        <TililaSection className="border-b border-border/60 bg-twhite pt-10 pb-12 sm:pt-14 sm:pb-16">
            <TililaContainer>
                <div className="mx-auto max-w-4xl text-center">
                    <p className="text-xs font-bold tracking-[0.22em] text-beta-blue uppercase">
                        <TransText
                            en="About Tilila"
                            fr="À propos de Tilila"
                            ar="عن تيليلا"
                        />
                    </p>
                    <h1 className="mt-4 text-3xl leading-[1.1] font-extrabold tracking-tight text-beta-blue sm:text-4xl lg:text-[2.75rem]">
                        <TransText
                            en="Driving parity & diversity in public discourse"
                            fr="Promouvoir la parité et la diversité dans le débat public"
                            ar="تعزيز المساواة والتنوع في الخطاب العام"
                        />
                    </h1>
                    <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-tgray sm:text-base">
                        <TransText
                            en="Tilila is committed to impactful media engagement and representation. We build a trusted platform that connects media and experts to elevate diverse voices, stories, and solutions."
                            fr="Tilila s’engage pour une représentation et un engagement médiatique à fort impact. Nous construisons une plateforme de confiance qui relie médias et experts afin de mettre en avant des voix, des récits et des solutions diversifiés."
                            ar="تلتزم تيليلا بتعزيز المشاركة الإعلامية المؤثرة والتمثيل العادل. نبني منصة موثوقة تربط الإعلام بالخبراء لرفع الأصوات والقصص والحلول المتنوعة."
                        />
                    </p>
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
