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
        fr: 'Le candidat doit présenter un portfolio, une réalisation audiovisuelle antérieure ou un projet personnel démontrant son intérêt pour la création de contenus.',
        en: 'Candidates must submit a portfolio, prior audiovisual work or a personal project demonstrating their interest in content creation.',
        ar: 'يجب على المرشح تقديم ملف أعمال أو عمل سمعي بصري سابق أو مشروع شخصي يُظهر اهتمامه بصناعة المحتوى.',
    },
    {
        icon: Languages,
        fr: 'Les projets peuvent être soumis en arabe, amazighe ou français.',
        en: 'Projects may be submitted in Arabic, Amazigh or French.',
        ar: 'يمكن تقديم المشاريع بالعربية أو الأمازيغية أو الفرنسية.',
    },
    {
        icon: Gavel,
        fr: "Les candidatures reçues feront l'objet d'une phase de présélection par le jury. Seuls les candidats retenus à l'issue de cette étape seront admis à participer au Bootcamp Tililab et à poursuivre le concours jusqu'à sa phase finale.",
        en: 'Applications will undergo a pre-selection phase by the jury. Only shortlisted candidates will be admitted to the Tililab Bootcamp and continue to the final stage.',
        ar: 'ستخضع الترشيحات لمرحلة فرز أولي من طرف لجنة التحكيم. يُقبل في معسكر تيليلاب ومتابعة المسابقة المرشحون المختارون فقط.',
    },
];

export default function TililabAdmissionJurySection() {
    return (
        <TililaSection id="admission" className="bg-beta-white">
            <TililaContainer>
                <div className="text-center">
                    <h2 className="text-xl font-extrabold tracking-[0.12em] text-beta-blue uppercase sm:text-2xl">
                        <TransText
                            en="Admission conditions"
                            fr="Conditions d'admission"
                            ar="شروط القبول"
                        />
                    </h2>
                    <div
                        className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-beta-turquoise"
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
                                <span className="inline-flex size-14 items-center justify-center rounded-full border border-beta-turquoise/25 bg-alpha-blue text-beta-turquoise">
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
