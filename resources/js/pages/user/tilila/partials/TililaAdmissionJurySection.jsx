import { useState } from 'react';
import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    FileText,
    Mail,
    Monitor,
    Newspaper,
    Radio,
    Tv,
    Users,
} from 'lucide-react';
import TransText from '@/components/TransText';
import TililaJuryMembersModal from '@/pages/user/tilila/partials/TililaJuryMembersModal';
import { storagePhotoSrc } from '@/pages/user/tilila/partials/EditionDetailContent';
import {
    TililaBtnGhost,
    TililaContainer,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

const MEDIA_ICONS = [Tv, Monitor, Radio, Newspaper, FileText];

function JuryPreview({ members }) {
    if (members.length === 0) {
        return (
            <div className="mt-6 flex justify-center gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="size-14 rounded-full bg-muted sm:size-16"
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="mt-6 flex flex-wrap justify-center gap-3">
            {members.slice(0, 4).map((member, i) => {
                const photo = storagePhotoSrc(member?.photo_path);
                return (
                    <div
                        key={`${member?.full_name ?? 'member'}-${i}`}
                        className="size-14 overflow-hidden rounded-full border-2 border-beta-blue/20 sm:size-16"
                    >
                        {photo ? (
                            <img
                                src={photo}
                                alt={member?.full_name || ''}
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        ) : (
                            <div className="h-full w-full bg-muted" />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default function TililaAdmissionJurySection({ jury = [] }) {
    const members = Array.isArray(jury) ? jury : [];
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <TililaSection
            id="admission"
            className="border-t border-border/60 bg-beta-white"
        >
            <TililaContainer>
                <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
                    <article className="rounded-2xl border border-border/70 bg-twhite p-6 shadow-sm">
                        <span className="inline-flex size-11 items-center justify-center rounded-full bg-alpha-blue text-beta-turquoise">
                            <FileText className="size-5" aria-hidden />
                        </span>
                        <h3 className="mt-4 text-sm font-extrabold tracking-wide text-beta-turquoise uppercase">
                            <TransText
                                en="Admission conditions"
                                fr="Conditions d'admission"
                                ar="شروط القبول"
                            />
                        </h3>
                        <div className="mt-4 space-y-4 text-sm leading-relaxed text-tgray">
                            <p>
                                <TransText
                                    en="The competition is open to all Moroccan advertisers."
                                    fr="Le concours est ouvert à tous les annonceurs marocains."
                                    ar="المسابقة مفتوحة لجميع المعلنين المغاربة."
                                />
                            </p>
                            <p>
                                <TransText
                                    en="Eligible campaigns are those broadcast on television, digital media, out-of-home, print or radio, in Arabic, Amazigh or French, regardless of sector."
                                    fr="Sont éligibles les campagnes publicitaires diffusées en télévision, sur les supports digitaux, en affichage, en presse écrite ou en radio, en langue arabe, amazighe ou française, quel que soit le secteur d'activité concerné."
                                    ar="تُقبل الحملات الإعلانية المبثة في التلفزيون أو الوسائط الرقمية أو الإشهار الخارجي أو الصحافة أو الإذاعة، بالعربية أو الأمازيغية أو الفرنسية، بغض النظر عن القطاع."
                                />
                            </p>
                            <p>
                                <TransText
                                    en="Submitted campaigns must reflect Tilila values and promote equity, diversity and inclusion, including gender parity and/or inclusion of people with disabilities."
                                    fr="Les campagnes soumises doivent s'inscrire dans les valeurs portées par le programme Tilila et contribuer à promouvoir l'équité, la diversité et l'inclusion, notamment la parité femmes-hommes et/ou l'inclusion des personnes en situation de handicap."
                                    ar="يجب أن تتماشى الحملات المقدمة مع قيم برنامج تيليلا وتعزز المساواة والتنوع والإدماج، بما في ذلك المساواة بين الجنسين و/أو إدماج الأشخاص في وضعية إعاقة."
                                />
                            </p>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {MEDIA_ICONS.map((Icon, i) => (
                                <span
                                    key={i}
                                    className="inline-flex size-9 items-center justify-center rounded-lg border border-border/60 bg-beta-white text-beta-blue"
                                >
                                    <Icon className="size-4" aria-hidden />
                                </span>
                            ))}
                        </div>
                    </article>

                    <article
                        id="jury"
                        className="scroll-mt-28 rounded-2xl border border-border/70 bg-twhite p-6 shadow-sm"
                    >
                        <span className="inline-flex size-11 items-center justify-center rounded-full bg-alpha-blue text-beta-blue">
                            <Users className="size-5" aria-hidden />
                        </span>
                        <h3 className="mt-4 text-sm font-extrabold tracking-wide text-beta-blue uppercase">
                            <TransText
                                en="The jury"
                                fr="Le jury"
                                ar="لجنة التحكيم"
                            />
                        </h3>
                        <div className="mt-4 space-y-4 text-sm leading-relaxed text-tgray">
                            <p>
                                <TransText
                                    en="The Tilila Awards jury is made up of recognised figures from media, communication, creative industries, institutions, research and civil society."
                                    fr="Le Jury des Tilila Awards est composé de personnalités reconnues issues du monde des médias, de la communication, de la création, des institutions, de la recherche et de la société civile."
                                    ar="تتكون لجنة تحكيم تيليلا أووردز من شخصيات معروفة من الإعلام والتواصل والإبداع والمؤسسات والبحث والمجتمع المدني."
                                />
                            </p>
                            <p>
                                <TransText
                                    en="It evaluates applications based on creative quality, relevance, impact and contribution to equity, diversity and inclusion values."
                                    fr="Il évalue les candidatures sur la base de leur qualité créative, de leur pertinence, de leur impact et de leur contribution aux valeurs d'équité, de diversité et d'inclusion."
                                    ar="تقيّم الترشحات بناءً على الجودة الإبداعية والملاءمة والأثر والمساهمة في قيم المساواة والتنوع والإدماج."
                                />
                            </p>
                        </div>

                        <JuryPreview members={members} />

                        <button
                            type="button"
                            onClick={() => setModalOpen(true)}
                            className="mx-auto mt-6 flex items-center justify-center gap-2 rounded-lg bg-beta-blue px-5 py-2.5 text-xs font-bold tracking-wide text-twhite uppercase transition hover:bg-brand-light-purple"
                        >
                            <TransText
                                en="Discover the jury"
                                fr="Découvrir le jury"
                                ar="اكتشف لجنة التحكيم"
                            />
                            <ArrowRight className="size-4" aria-hidden />
                        </button>
                    </article>

                    <article className="rounded-2xl border border-border/70 bg-twhite p-6 shadow-sm">
                        <span className="inline-flex size-11 items-center justify-center rounded-full bg-alpha-blue text-beta-blue">
                            <Mail className="size-5" aria-hidden />
                        </span>
                        <h3 className="mt-4 text-sm font-extrabold tracking-wide text-beta-blue uppercase">
                            <TransText
                                en="A question?"
                                fr="Une question ?"
                                ar="سؤال؟"
                            />
                        </h3>
                        <p className="mt-4 text-sm leading-relaxed text-tgray">
                            <TransText
                                en="Our team is available to answer your questions about Tilila Awards."
                                fr="Notre équipe est à votre disposition pour répondre à vos questions sur les Tilila Awards."
                                ar="فريقنا متاح للإجابة على أسئلتكم حول تيليلا أووردز."
                            />
                        </p>
                        <a
                            href="mailto:contact@tilila.org"
                            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-beta-blue"
                        >
                            <Mail className="size-4" aria-hidden />
                            contact@tilila.org
                        </a>
                        <div className="mt-6">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-beta-turquoise px-5 py-2.5 text-xs font-bold tracking-wide text-twhite uppercase transition hover:brightness-110"
                            >
                                <TransText
                                    en="Contact us"
                                    fr="Nous contacter"
                                    ar="تواصل معنا"
                                />
                                <ArrowRight className="size-4" aria-hidden />
                            </Link>
                        </div>
                    </article>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <TililaBtnGhost href="/tilila#jury">
                        <TransText
                            en="Presentation"
                            fr="Présentation"
                            ar="عرض تقديمي"
                        />
                    </TililaBtnGhost>
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
