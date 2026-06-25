import {
    FolderOpen,
    Gavel,
    GraduationCap,
    Languages,
    UserCheck,
} from 'lucide-react';
import TransText from '@/components/TransText';
import { TililaContainer, TililaSection } from '@/pages/user/tilila/partials/TililaUi';

const CONDITIONS = [
    {
        icon: UserCheck,
        fr: 'Le concours est ouvert à toute personne résidant au Maroc et âgée de moins de 30 ans.',
        en: 'The competition is open to anyone residing in Morocco under 30 years of age.',
        ar: 'المسابقة مفتوحة لكل شخص مقيم في المغرب دون سن 30.',
    },
    {
        icon: GraduationCap,
        fr: "Aucune condition de diplôme ou d'expérience professionnelle n'est exigée.",
        en: 'No diploma or professional experience is required.',
        ar: 'لا يُشترط دبلوم أو خبرة مهنية.',
    },
    {
        icon: FolderOpen,
        fr: "Les candidats doivent soumettre un portfolio, une réalisation audiovisuelle antérieure ou un projet personnel témoignant d’un intérêt pour la création de contenus.",
        en: "Candidates must submit a portfolio, previous audiovisual work, or a personal project demonstrating an interest in content creation.",
        ar: "يجب على المترشحين تقديم ملف أعمال أو عمل سمعي بصري سابق أو مشروع شخصي يُظهر اهتمامًا بصناعة المحتوى.",
    },
    {
        icon: Languages,
        fr: 'Les projets peuvent être envoyés en arabe, amazighe ou français.',
        en: 'Projects may be submitted in Arabic, Amazigh, or French.',
        ar: 'يمكن إرسال المشاريع بالعربية أو الأمازيغية أو الفرنسية.',
    },
    {
        icon: Gavel,
        fr: "Les candidatures feront l’objet d’une présélection par le jury. Seuls les candidats retenus participeront au Bootcamp Tililab et poursuivront l’aventure jusqu’à la phase finale du concours.",
        en: "Applications will undergo a pre-selection by the jury. Only selected candidates will participate in the Tililab Bootcamp and continue to the final stage of the competition.",
        ar: "ستخضع الترشيحات لمرحلة فرز أولي من طرف لجنة التحكيم. فقط المرشحون المختارون سيشاركون في معسكر تيليلاب وسيواصلون المغامرة حتى المرحلة النهائية من المسابقة.",
    },
];

export default function TililabAdmissionJurySection() {
    return (
        <TililaSection id="admission" className="bg-beta-white">
            <TililaContainer>
                <div className="text-center">
                    <h2 className="text-xl font-extrabold tracking-[0.12em] text-tililab-slate uppercase sm:text-2xl">
                        <TransText
                            en="Admission conditions"
                            fr="CONDITIONS DE SOUMISSION"
                            ar="شروط القبول"
                        />
                    </h2>
                    <div
                        className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-tililab-cyan"
                        aria-hidden
                    />
                </div>

                <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
                    {CONDITIONS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.fr}
                                className="flex flex-col items-center text-center"
                            >
                                <span className="inline-flex size-14 items-center justify-center rounded-full border border-tililab-cyan/25 bg-alpha-tililab text-tililab-cyan">
                                    <Icon
                                        className="size-6 stroke-[1.5]"
                                        aria-hidden
                                    />
                                </span>
                                <p className="mt-4 text-sm leading-relaxed text-tgray">
                                    <TransText
                                        en={item.en}
                                        fr={item.fr}
                                        ar={item.ar}
                                    />
                                </p>
                            </div>
                        );
                    })}
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
