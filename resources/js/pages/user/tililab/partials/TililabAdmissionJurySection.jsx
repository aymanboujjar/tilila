import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import TransText from '@/components/TransText';
import TililaJuryMembersModal from '@/pages/user/tilila/partials/TililaJuryMembersModal';
import { storagePhotoSrc } from '@/pages/user/tilila/partials/EditionDetailContent';
import {
    TililaBtnGhost,
    TililaCheckItem,
    TililaContainer,
    TililaSection,
    TililaSectionHeading,
} from '@/pages/user/tilila/partials/TililaUi';

const CONDITIONS = [
    {
        fr: 'Le concours est ouvert à toute personne résidant au Maroc et âgée de moins de 30 ans.',
        en: 'The competition is open to anyone residing in Morocco under 30 years of age.',
        ar: 'المسابقة مفتوحة لكل شخص مقيم في المغرب دون سن 30.',
    },
    {
        fr: "Aucune condition de diplôme ou d'expérience professionnelle n'est exigée.",
        en: 'No diploma or professional experience is required.',
        ar: 'لا يُشترط دبلوم أو خبرة مهنية.',
    },
    {
        fr: 'Le candidat doit présenter un portfolio, une réalisation audiovisuelle ou un projet personnel.',
        en: 'Candidates must submit a portfolio, audiovisual work or a personal project.',
        ar: 'يجب على المرشح تقديم ملف أعمال أو عمل سمعي بصري أو مشروع شخصي.',
    },
    {
        fr: 'Les projets peuvent être soumis en arabe, amazighe ou français.',
        en: 'Projects may be submitted in Arabic, Amazigh or French.',
        ar: 'يمكن تقديم المشاريع بالعربية أو الأمازيغية أو الفرنسية.',
    },
];

const PLACEHOLDER_COUNT = 7;

function JuryPreview({ members }) {
    if (members.length === 0) {
        return (
            <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className="size-16 rounded-full bg-muted sm:size-20" />
                        <div className="mt-3 h-2.5 w-14 rounded bg-muted" />
                        <div className="mt-2 h-2 w-20 rounded bg-muted/70" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
            {members.map((member, i) => {
                const photo = storagePhotoSrc(member?.photo_path);

                return (
                    <div
                        key={`${member?.full_name ?? 'member'}-${i}`}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="size-16 overflow-hidden rounded-full border border-border bg-muted sm:size-20">
                            {photo ? (
                                <img
                                    src={photo}
                                    alt={member?.full_name || ''}
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                />
                            ) : null}
                        </div>
                        <p className="mt-3 line-clamp-2 text-xs font-semibold text-tblack">
                            {member?.full_name}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

export default function TililabAdmissionJurySection({ jury = [] }) {
    const members = Array.isArray(jury) ? jury : [];
    const [modalOpen, setModalOpen] = useState(false);
    const showPlaceholders = members.length === 0;

    return (
        <TililaSection id="admission" className="border-t border-border/60 bg-twhite">
            <TililaContainer>
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <TililaSectionHeading
                            title={
                                <TransText
                                    en="Admission conditions"
                                    fr="Conditions d'admission"
                                    ar="شروط القبول"
                                />
                            }
                        />
                        <ul className="mt-8 space-y-4">
                            {CONDITIONS.map((item) => (
                                <TililaCheckItem key={item.en}>
                                    <TransText
                                        en={item.en}
                                        fr={item.fr}
                                        ar={item.ar}
                                    />
                                </TililaCheckItem>
                            ))}
                        </ul>
                        <div className="mt-8">
                            <TililaBtnGhost href="/tililab/reglement">
                                <TransText
                                    en="View full regulations"
                                    fr="Consulter le règlement intégral"
                                    ar="اطلع على النظام الكامل"
                                />
                            </TililaBtnGhost>
                        </div>
                    </div>

                    <div id="jury">
                        <TililaSectionHeading
                            title={
                                <TransText
                                    en="The 2026 jury"
                                    fr="Le Jury 2026"
                                    ar="لجنة التحكيم 2026"
                                />
                            }
                        />
                        {showPlaceholders ? (
                            <p className="mt-6 text-sm leading-relaxed text-tgray">
                                <TransText
                                    en="The Tililab 2026 jury shares the Tilila Awards panel. Members will be announced here soon."
                                    fr="Le jury Tililab 2026 partage le jury des Tilila Awards. Les membres seront annoncés ici prochainement."
                                    ar="تشارك لجنة تيليلاب 2026 لجنة تيليلا أووردز. سيتم الإعلان عن الأعضاء هنا قريبًا."
                                />
                            </p>
                        ) : null}

                        <JuryPreview members={members} />

                        <div className="mt-8">
                            <button
                                type="button"
                                onClick={() => setModalOpen(true)}
                                className="inline-flex items-center justify-center gap-2 rounded-lg border border-beta-blue px-5 py-2.5 text-xs font-bold tracking-[0.1em] text-beta-blue uppercase transition hover:bg-alpha-blue"
                            >
                                <TransText
                                    en="Discover jury members"
                                    fr="Découvrir les membres du jury"
                                    ar="اكتشف أعضاء لجنة التحكيم"
                                />
                                <ArrowRight className="size-4" aria-hidden />
                            </button>
                        </div>
                    </div>
                </div>
            </TililaContainer>

            <TililaJuryMembersModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                members={members}
            />
        </TililaSection>
    );
}
