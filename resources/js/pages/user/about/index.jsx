import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import TransText from '@/components/TransText';
import AppLayout from '@/layouts/app-layout';
import CommitteeSection from '@/pages/user/about/partials/CommitteeSection';
import HeroSection from '@/pages/user/about/partials/HeroSection';
import HistorySection from '@/pages/user/about/partials/HistorySection';
import LeadershipMessageSection from '@/pages/user/about/partials/LeadershipMessageSection';
import MembersSection from '@/pages/user/about/partials/MembersSection';
import SoreadPresentationSection from '@/pages/user/about/partials/SoreadPresentationSection';
import { useTranslation } from '@/contexts/TranslationContext';

const DIRECTOR_PARAGRAPHS = [
    {
        fr: 'Les médias ont une responsabilité qui dépasse l’information et le divertissement. Ils contribuent à façonner les représentations, à nourrir le débat public et à renforcer le vivre-ensemble.',
        en: 'Media have a responsibility that goes beyond information and entertainment. They help shape representations, feed public debate and strengthen living together.',
        ar: 'تحمل وسائل الإعلام مسؤولية تتجاوز الإعلام والترفيه. فهي تساهم في تشكيل التمثيلات وإثراء النقاش العام وتعزيز العيش المشترك.',
    },
    {
        fr: 'À SOREAD 2M, l’équité, la diversité et l’inclusion sont les piliers de notre engagement citoyen. À travers nos contenus, nos initiatives et les actions portées par notre Comité Parité et Diversité, nous œuvrons pour une représentation plus juste de la société marocaine, dans le respect de la dignité humaine et de l’égalité des chances.',
        en: 'At SOREAD 2M, equity, diversity and inclusion are the pillars of our citizen commitment. Through our content, our initiatives and the actions led by our Parity and Diversity Committee, we work for a fairer representation of Moroccan society, respecting human dignity and equal opportunities.',
        ar: 'في SOREAD 2M، المساواة والتنوع والإدماج ركائز التزامنا المواطن. عبر محتوانا ومبادراتنا وإجراءات لجنة المساواة والتنوع، نعمل من أجل تمثيل أكثر عدلاً للمجتمع المغربي، مع احترام الكرامة الإنسانية وتكافؤ الفرص.',
    },
    {
        fr: 'Notre ambition est claire : faire évoluer les regards, déconstruire les stéréotypes et promouvoir une société où chacune et chacun trouve sa place.',
        en: 'Our ambition is clear: to shift perspectives, deconstruct stereotypes and promote a society where everyone finds their place.',
        ar: 'طموحنا واضح: تطوير النظرات، وتفكيك الصور النمطية وتعزيز مجتمع يجد فيه كل فرد مكانه.',
    },
    {
        fr: 'Parce que la diversité est une richesse, l’inclusion une nécessité et l’équité un levier de progrès, nous poursuivons cet engagement aux côtés de nos collaborateurs, de nos partenaires et de tous les acteurs du changement.',
        en: 'Because diversity is a strength, inclusion a necessity and equity a lever for progress, we pursue this commitment alongside our staff, our partners and all agents of change.',
        ar: 'لأن التنوع ثروة والإدماج ضرورة والمساواة رافعة للتقدم، نواصل هذا الالتزام إلى جانب متعاونينا وشركائنا وجميع فاعلي التغيير.',
    },
];

const PRESIDENT_PARAGRAPHS = [
    {
        fr: 'Depuis sa création, le Comité Parité et Diversité de 2M œuvre pour faire de l’équité, de la diversité et de l’inclusion des réalités concrètes.',
        en: 'Since its creation, the 2M Parity and Diversity Committee has worked to make equity, diversity and inclusion concrete realities.',
        ar: 'منذ إنشائها، تعمل لجنة المساواة والتنوع لـ 2M على جعل المساواة والتنوع والإدماج واقعاً ملموساً.',
    },
    {
        fr: 'Notre mission est d’encourager des représentations plus justes dans les médias, de promouvoir l’égalité des chances et de contribuer à une meilleure visibilité de toutes les composantes de la société.',
        en: 'Our mission is to encourage fairer representations in the media, promote equal opportunities and contribute to better visibility for all parts of society.',
        ar: 'مهمتنا تشجيع تمثيلات أكثر عدلاً في الإعلام، وتعزيز تكافؤ الفرص والمساهمة في إبراز أفضل لجميع مكونات المجتمع.',
    },
    {
        fr: 'Pour y parvenir, nous concevons des programmes innovants, encourageons le dialogue et mobilisons un réseau de partenaires engagés.',
        en: 'To achieve this, we design innovative programmes, encourage dialogue and mobilise a network of committed partners.',
        ar: 'ولتحقيق ذلك، نصمم برامج مبتكرة ونشجع الحوار ونحشد شبكة من الشركاء الملتزمين.',
    },
    {
        fr: 'À travers chacune de nos actions, nous contribuons à faire émerger de nouveaux récits, à déconstruire les stéréotypes et à faire évoluer les mentalités.',
        en: 'Through each of our actions, we help bring forth new narratives, deconstruct stereotypes and evolve mindsets.',
        ar: 'من خلال كل إجراءاتنا، نساهم في إبراز سرديات جديدة وتفكيك الصور النمطية وتطوير العقليات.',
    },
    {
        fr: 'Nous avons la conviction que le changement se construit collectivement, grâce à l’engagement de toutes et de tous.',
        en: 'We are convinced that change is built collectively, through the commitment of everyone.',
        ar: 'نؤمن بأن التغيير يُبنى جماعياً، بفضل التزام الجميع.',
    },
];

function scrollToHashSection() {
    const hash = window.location.hash.replace(/^#/, '');
    if (!hash) {
        return;
    }

    const target = document.getElementById(hash);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

export default function About() {
    useEffect(() => {
        scrollToHashSection();
    }, []);

    return (
        <>
            <AboutHead />
            <div className="bg-twhite">
                <HeroSection />
                <LeadershipMessageSection
                    id="director"
                    className="bg-beta-white"
                    imageSrc="/assets/about/about5.jpg"
                    eyebrow={
                        <TransText
                            en="Message from the Director General"
                            fr="Mot du Directeur Général"
                            ar="كلمة المدير العام"
                        />
                    }
                    paragraphs={DIRECTOR_PARAGRAPHS}
                    signature={{
                        en: 'Salim CHEIKH, Director General 2M',
                        fr: 'Salim CHEIKH, Directeur Général 2M',
                        ar: 'Salim CHEIKH، المدير العام لـ 2M',
                    }}
                />
                <SoreadPresentationSection />
                <CommitteeSection />
                <HistorySection />
                <LeadershipMessageSection
                    id="president"
                    className="bg-twhite"
                    imageSrc="/assets/about/about4.jpg"
                    eyebrow={
                        <TransText
                            en="Message from the Chair"
                            fr="Mot de la Présidente"
                            ar="كلمة الرئيسة"
                        />
                    }
                    paragraphs={PRESIDENT_PARAGRAPHS}
                    signature={{
                        en: 'Khadija BOUJANOUI, Chair of the Parity and Diversity Committee 2M',
                        fr: 'Khadija BOUJANOUI, Présidente du Comité Parité et Diversité 2M',
                        ar: 'Khadija BOUJANOUI، رئيسة لجنة المساواة والتنوع 2M',
                    }}
                />
                <MembersSection />
            </div>
        </>
    );
}

About.layout = (page) => <AppLayout>{page}</AppLayout>;

function AboutHead() {
    const { t } = useTranslation();
    return <Head title={t('about.headTitle')} />;
}
