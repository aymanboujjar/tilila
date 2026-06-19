import TransText from '@/components/TransText';
import {
    TililaContainer,
    TililaSection,
    TililaSectionHeading,
} from '@/pages/user/tilila/partials/TililaUi';
import { useTranslation } from '@/contexts/TranslationContext';

const HERO_IMAGE = '/assets/tilila/hero-7eme-edition.png';

const stats = [
    {
        value: '2013',
        en: 'CPD Committee at 2M',
        fr: 'Création du CPD 2M',
        ar: 'لجنة المساواة والتنوع بـ2M',
    },
    {
        value: '2018',
        en: 'First Tilila Awards edition',
        fr: '1re édition des Tilila Awards',
        ar: 'الدورة الأولى للجائزة',
    },
    {
        value: '7',
        en: 'Editions to date (2025: rural women)',
        fr: 'Éditions à ce jour (2025 : femmes rurales)',
        ar: 'دورات حتى اليوم (2025: نساء ريفيات)',
    },
];

export default function MissionSection() {
    const { locale } = useTranslation();
    const imageAlt =
        locale === 'ar'
            ? 'لقاء مهني حول الإعلام والتواصل'
            : locale === 'fr'
              ? 'Réunion professionnelle autour des médias'
              : 'Professional meeting about media and communication';

    return (
        <TililaSection
            id="mission"
            className="scroll-mt-28 border-b border-border/60 bg-twhite"
        >
            <TililaContainer>
                <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                    <div className="lg:col-span-6">
                        <div className="overflow-hidden rounded-2xl border border-border/70 shadow-lg">
                            <img
                                src={HERO_IMAGE}
                                alt={imageAlt}
                                className="aspect-[4/3] w-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-6">
                        <p className="text-xs font-bold tracking-[0.22em] text-beta-turquoise uppercase">
                            <TransText
                                en="History & committee"
                                fr="Histoire & comité"
                                ar="التاريخ واللجنة"
                            />
                        </p>

                        <TililaSectionHeading
                            className="mt-3"
                            title={
                                <TransText
                                    en="Comité Parité et Diversité — 2M"
                                    fr="Comité Parité et Diversité — 2M"
                                    ar="لجنة المساواة والتنوع — 2M"
                                />
                            }
                        />

                        <p className="mt-4 text-sm leading-relaxed text-tgray sm:text-base">
                            <TransText
                                en="The Comité Parité et Diversité 2M was created in 2013. Its mission is to promote gender equality, the image of women in media, and diversity across 2M’s programmes and content, while combating all forms of discrimination."
                                fr="Le Comité Parité et Diversité de 2M a été créé en 2013. Sa mission : promouvoir l’égalité femmes-hommes, l’image des femmes dans les médias et la diversité dans les programmes et contenus de 2M, tout en luttant contre toutes les formes de discrimination."
                                ar="أُنشئت لجنة المساواة والتنوع بقناة 2M سنة 2013. مهمتها تعزيز المساواة بين الجنسين وصورة المرأة في الإعلام والتنوع في برامج ومضامين القناة، مع مواجهة كل أشكال التمييز."
                            />
                        </p>

                        <p className="mt-4 text-sm leading-relaxed text-tgray sm:text-base">
                            <TransText
                                en="Tilila Awards was launched in 2018 as one of the Committee’s flagship initiatives. The award celebrates advertising that reflects society fairly and responsibly—and keeps growing as a reference for the sector."
                                fr="Le Tilila Awards a été lancé en 2018 comme initiative phare du Comité. Il met en lumière une publicité qui reflète la société avec équité et responsabilité—et s’impose comme une référence pour le secteur."
                                ar="أُطلقت جائزة تيليلا سنة 2018 كإحدى الركائز الرئيسية للجنة. تُكرّم إعلاناً يعكس المجتمع بعدالة ومسؤولية—وتواصل النمو كمرجع للقطاع."
                            />
                        </p>

                        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                            {stats.map((item) => (
                                <div
                                    key={`${item.value}-${item.en}`}
                                    className="rounded-xl border border-border/60 bg-beta-white px-4 py-5 text-center"
                                >
                                    <div className="text-2xl font-extrabold text-beta-blue">
                                        {item.value}
                                    </div>
                                    <div className="mt-1 text-xs leading-snug text-tgray">
                                        <TransText
                                            en={item.en}
                                            fr={item.fr}
                                            ar={item.ar}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
