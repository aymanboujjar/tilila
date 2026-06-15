import { usePage } from '@inertiajs/react';

import TransText from '@/components/TransText';
import { partnersInGroup } from '@/lib/programPartners';

export default function PartnersSection() {
    const { partners = [] } = usePage().props;
    const institutionalPartners = partnersInGroup(partners, 'institutional');

    return (
        <section
            id="partners"
            className="mx-auto max-w-7xl scroll-mt-16 px-4 py-12"
        >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="text-xs font-semibold tracking-widest text-tgray">
                        <TransText
                            en="PARTNERSHIP"
                            fr="PARTENARIAT"
                            ar="الشراكة"
                        />
                    </div>
                    <h2 className="mt-3 text-2xl font-semibold text-tblack">
                        <TransText
                            en="Institutional Partners"
                            fr="Partenaires institutionnels"
                            ar="شركاء مؤسساتيون"
                        />
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-tgray">
                        <TransText
                            en="Building a network of allies advancing parity, diversity, and high-quality public discourse."
                            fr="Construire un réseau d’alliés qui font avancer la parité, la diversité et un débat public de qualité."
                            ar="بناء شبكة من الحلفاء لتعزيز المساواة والتنوع وجودة الخطاب العام."
                        />
                    </p>
                </div>

                <a
                    href="/#partners"
                    className="text-sm font-semibold text-beta-blue hover:underline"
                >
                    <TransText
                        en="Become a Partner"
                        fr="Devenir partenaire"
                        ar="كن شريكًا"
                    />
                </a>
            </div>

            {institutionalPartners.length > 0 ? (
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {institutionalPartners.map((partner) => (
                        <div
                            key={partner.id}
                            className="group flex h-28 items-center justify-center rounded-2xl border border-border bg-white px-6 shadow-sm transition hover:shadow-md"
                        >
                            {partner.logo_url ? (
                                <img
                                    src={partner.logo_url}
                                    alt={`${partner.name} logo`}
                                    className="h-20 w-full max-w-88 object-contain transition group-hover:scale-[1.02]"
                                    loading="lazy"
                                    decoding="async"
                                />
                            ) : (
                                <span className="text-sm font-medium text-tgray">
                                    {partner.name}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            ) : null}
        </section>
    );
}
