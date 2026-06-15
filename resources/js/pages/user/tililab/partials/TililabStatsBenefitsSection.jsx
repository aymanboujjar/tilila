import TransText from '@/components/TransText';

const TILILAB_STATS = [
    { fr: '5 éditions', en: '5 editions', ar: '5 دورات' },
    {
        fr: "Plusieurs dizaines de jeunes créateurs accompagnés",
        en: 'Dozens of young creators supported',
        ar: 'عشرات المبدعين الشباب المرافقين',
    },
    {
        fr: 'Plus de 30 projets produits',
        en: '30+ projects produced',
        ar: 'أكثر من 30 مشروعًا منتجًا',
    },
    {
        fr: "Des centaines d'heures de formation et de mentorat",
        en: 'Hundreds of hours of training and mentoring',
        ar: 'مئات الساعات من التدريب والإرشاد',
    },
];

const WHY_PARTICIPATE = [
    {
        fr: 'Développer ses compétences créatives',
        en: 'Develop creative skills',
        ar: 'تطوير المهارات الإبداعية',
    },
    {
        fr: 'Être accompagné par des professionnels',
        en: 'Be mentored by professionals',
        ar: 'المرافقة من قبل محترفين',
    },
    {
        fr: 'Participer à une expérience immersive unique',
        en: 'Join a unique immersive experience',
        ar: 'تجربة غامرة فريدة',
    },
    {
        fr: 'Produire une œuvre audiovisuelle originale',
        en: 'Produce an original audiovisual work',
        ar: 'إنتاج عمل سمعي بصري أصلي',
    },
    {
        fr: 'Gagner en visibilité auprès des médias et professionnels du secteur',
        en: 'Gain visibility with media and industry professionals',
        ar: 'اكتساب ظهور لدى الإعلام ومحترفي القطاع',
    },
];

export default function TililabStatsBenefitsSection() {
    return (
        <section id="stats" className="border-b border-border bg-background py-10 sm:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-2">
                    <div
                        id="why-participate"
                        className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                    >
                        <h3 className="text-lg font-bold text-beta-blue">
                            <TransText
                                en="Why participate?"
                                fr="Pourquoi participer ?"
                                ar="لماذا المشاركة؟"
                            />
                        </h3>
                        <ul className="mt-5 space-y-3">
                            {WHY_PARTICIPATE.map((item) => (
                                <li
                                    key={item.en}
                                    className="flex items-start gap-3 text-sm text-tgray"
                                >
                                    <span
                                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-beta-blue"
                                        aria-hidden
                                    />
                                    <TransText
                                        en={item.en}
                                        fr={item.fr}
                                        ar={item.ar}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-beta-blue">
                            Tililab
                        </h3>
                        <ul className="mt-5 space-y-3">
                            {TILILAB_STATS.map((item) => (
                                <li
                                    key={item.en}
                                    className="flex items-start gap-3 text-sm text-tgray"
                                >
                                    <span
                                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-beta-blue"
                                        aria-hidden
                                    />
                                    <TransText
                                        en={item.en}
                                        fr={item.fr}
                                        ar={item.ar}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
