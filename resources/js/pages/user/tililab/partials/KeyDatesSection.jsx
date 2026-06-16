import {
    Calendar,
    Clapperboard,
    Gavel,
    GraduationCap,
    Megaphone,
    Trophy,
    Users,
} from 'lucide-react';
import TransText from '@/components/TransText';

function formatDeadline(iso) {
    if (!iso) {
        return null;
    }

    try {
        return new Date(iso).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    } catch {
        return null;
    }
}

const KEY_DATES = [
    {
        icon: Megaphone,
        month: 'Mai 2026',
        fr: 'Ouverture des candidatures',
        en: 'Applications open',
        ar: 'فتح باب الترشح',
    },
    {
        icon: Users,
        month: 'Juin 2026',
        fr: 'Pré-sélection',
        en: 'Pre-selection',
        ar: 'الفرز الأولي',
    },
    {
        icon: GraduationCap,
        month: 'Juillet 2026',
        fr: 'Masterclass',
        en: 'Masterclass',
        ar: 'ماستركلاس',
    },
    {
        icon: Clapperboard,
        month: 'Août 2026',
        fr: 'Bootcamp créatif',
        en: 'Creative bootcamp',
        ar: 'المعسكر الإبداعي',
    },
    {
        icon: Gavel,
        month: 'Octobre 2026',
        fr: 'Jury & Tililab Trophy',
        en: 'Jury & Tililab Trophy',
        ar: 'لجنة التحكيم وكأس تيليلاب',
    },
    {
        icon: Trophy,
        month: 'Novembre 2026',
        fr: 'Cérémonie Tilila Awards',
        en: 'Tilila Awards ceremony',
        ar: 'حفل تيليلا أووردز',
    },
];

export default function KeyDatesSection({ edition = null }) {
    const deadline = formatDeadline(edition?.applications_close_at);

    return (
        <section
            id="calendar"
            className="border-b border-border bg-alpha-blue/40 py-10 sm:py-12"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-tblack sm:text-3xl">
                    <TransText
                        en="Key dates 2026"
                        fr="Dates clés 2026"
                        ar="التواريخ الرئيسية 2026"
                    />
                </h2>

                {deadline ? (
                    <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-beta-blue/30 bg-background px-4 py-2 text-sm font-semibold text-beta-blue">
                        <Calendar className="size-4" aria-hidden />
                        <TransText
                            en={`Application deadline: ${deadline}`}
                            fr={`Date limite : ${deadline}`}
                            ar={`الموعد النهائي: ${deadline}`}
                        />
                    </p>
                ) : (
                    <p className="mt-4 text-sm text-tgray">
                        <TransText
                            en="Applications open until July 31, 2026"
                            fr="Candidatures ouvertes jusqu'au 31 juillet 2026"
                            ar="التقديم مفتوح حتى 31 يوليو 2026"
                        />
                    </p>
                )}

                <div className="relative mt-10">
                    <div
                        className="absolute top-8 right-0 left-0 hidden h-0.5 border-t-2 border-dashed border-beta-blue/30 lg:block"
                        aria-hidden
                    />
                    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
                        {KEY_DATES.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li
                                    key={item.en}
                                    className="relative flex flex-col items-center text-center"
                                >
                                    <div className="relative z-10 flex size-16 items-center justify-center rounded-full border-2 border-beta-blue bg-background text-beta-blue shadow-sm">
                                        <Icon className="size-6" aria-hidden />
                                    </div>
                                    <p className="mt-4 text-xs font-bold tracking-widest text-beta-blue uppercase">
                                        {item.month}
                                    </p>
                                    <h3 className="mt-2 text-sm font-semibold text-tblack">
                                        <TransText
                                            en={item.en}
                                            fr={item.fr}
                                            ar={item.ar}
                                        />
                                    </h3>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </section>
    );
}
