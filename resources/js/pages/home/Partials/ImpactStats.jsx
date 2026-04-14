import React, { useMemo } from 'react';
import TransText from '@/components/TransText';

export default function ImpactStats({ stats }) {
    const items = useMemo(() => {
        const s = stats || {};
        const toNum = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : 0);
        return [
            {
                value: String(toNum(s.tilila_editions)),
                en: 'Tilila editions',
                fr: 'Éditions Tilila',
                ar: 'دورات تيليلا',
            },
            {
                value: String(toNum(s.tililab_editions)),
                en: 'Tililab editions',
                fr: 'Éditions Tililab',
                ar: 'دورات تيليلاب',
            },
            {
                value: String(toNum(s.tililab_participants)),
                en: 'Tililab participants',
                fr: 'Participants Tililab',
                ar: 'مشاركات/مشاركون تيليلاب',
            },
            {
                value: String(toNum(s.tilila_submissions)),
                en: 'Tilila submissions',
                fr: 'Participations Tilila',
                ar: 'مشاركات تيليلا',
            },
        ];
    }, [stats]);

    return (
        <section className="bg-beta-blue text-white">
            <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-4">
                    <div>
                        <div className="text-sm font-semibold opacity-95">
                            <TransText
                                en="Our Impact in Numbers"
                                fr="Notre impact en chiffres"
                                ar="أثرنا بالأرقام"
                            />
                        </div>
                        <div className="mt-1 text-xs opacity-90">
                            <TransText
                                en="Live data from your editions and submissions."
                                fr="Données en direct depuis vos éditions et participations."
                                ar="بيانات مباشرة من الدورات والمشاركات."
                            />
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {items.map((stat, idx) => (
                                <div
                                    key={`${stat.en}-${idx}`}
                                    className="rounded-xl bg-white/10 px-5 py-4 ring-1 ring-white/15"
                                >
                                    <div className="text-2xl font-extrabold tracking-tight">
                                        {stat.value}
                                    </div>
                                    <div className="mt-1 text-xs opacity-90">
                                        <TransText
                                            en={stat.en}
                                            fr={stat.fr}
                                            ar={stat.ar}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
