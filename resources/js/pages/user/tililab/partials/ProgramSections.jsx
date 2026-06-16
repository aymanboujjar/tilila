import { Link, usePage } from '@inertiajs/react';
import TransText from '@/components/TransText';
import RegulationCta from '@/components/program/RegulationCta';
import { PartnerLogoTile, PartnerTier } from '@/components/PartnerSection';
import { partnersInGroup } from '@/lib/programPartners';
import { TILILAB_FAQ_ITEMS } from '@/pages/user/tililab/partials/faq-items';

function SectionShell({ id, title, subtitle, children }) {
    return (
        <section id={id} className="mx-auto max-w-7xl px-4 py-10">
            <div className="max-w-3xl">
                <h2 className="text-2xl font-semibold tracking-tight text-tblack sm:text-3xl">
                    {title}
                </h2>
                {subtitle ? (
                    <p className="mt-3 text-sm leading-6 text-tgray">
                        {subtitle}
                    </p>
                ) : null}
            </div>
            <div className="mt-7">{children}</div>
        </section>
    );
}

export function TililabConceptSection() {
    return (
        <SectionShell
            id="concept"
            title={<TransText en="Concept" fr="Concept" ar="المفهوم" />}
            subtitle={
                <TransText
                    en="A program to detect, train and support young Moroccan creative talents."
                    fr="Un programme de détection, de formation et d’accompagnement des jeunes talents créatifs marocains."
                    ar="برنامج لاكتشاف وتدريب ومرافقة المواهب الإبداعية الشابة في المغرب."
                />
            }
        >
            <div className="space-y-6 rounded-2xl border border-border bg-background p-6 text-sm leading-relaxed text-tgray">
                <p>
                    <TransText
                        en="Tililab is more than a competition: it is a movement toward better representation in advertising. Young creatives are challenged to design narratives and visual strategies that respect parity, diversity, and inclusion."
                        fr="Tililab est plus qu’un concours : c’est un mouvement vers une meilleure représentation dans la publicité. Les jeunes créatifs sont mis au défi de concevoir des récits et stratégies visuelles respectueux de la parité, de la diversité et de l’inclusion."
                        ar="تيليلاب أكثر من مسابقة: حركة نحو تمثيل أفضل في الإعلان. يُتحدى المبدعون الشباب لصياغة سرديات واستراتيجيات بصرية تحترم المساواة والتنوع والإدماج."
                    />
                </p>
                <div>
                    <div className="font-semibold text-tblack">
                        <TransText
                            en="Who can apply?"
                            fr="Qui peut postuler ?"
                            ar="من يمكنه التقديم؟"
                        />
                    </div>
                    <ul className="mt-3 list-inside list-disc space-y-2">
                        <li>
                            <TransText
                                en="Young creatives under 30 years old"
                                fr="Jeunes créatifs de moins de 30 ans"
                                ar="مبدعون شباب دون 30 سنة"
                            />
                        </li>
                        <li>
                            <TransText
                                en="Creative and communication backgrounds"
                                fr="Profils création et communication"
                                ar="خلفيات إبداعية واتصال"
                            />
                        </li>
                        <li>
                            <TransText
                                en="Teams of 1–3 people (design, illustration, copywriting, messaging)"
                                fr="Équipes de 1 à 3 (design, illustration, rédaction, messaging)"
                                ar="فرق من 1 إلى 3 (تصميم، رسم، كتابة، رسائل)"
                            />
                        </li>
                    </ul>
                </div>
                <div>
                    <div className="font-semibold text-tblack">
                        <TransText
                            en="Program journey"
                            fr="Parcours du programme"
                            ar="مسار البرنامج"
                        />
                    </div>
                    <ul className="mt-3 list-inside list-disc space-y-2">
                        <li>
                            <TransText
                                en="National call for applications"
                                fr="Appel national à candidatures"
                                ar="نداء وطني للترشح"
                            />
                        </li>
                        <li>
                            <TransText
                                en="Pre-bootcamp selection"
                                fr="Présélection pré-bootcamp"
                                ar="فرز قبل المعسكر"
                            />
                        </li>
                        <li>
                            <TransText
                                en="Intensive bootcamp in Marrakech with professionals"
                                fr="Bootcamp intensif à Marrakech avec des professionnels"
                                ar="معسكر مكثف بمراكش مع محترفين"
                            />
                        </li>
                        <li>
                            <TransText
                                en="Final spot production & winner chosen by the Tilila jury"
                                fr="Production du spot final & lauréat choisi par le jury Tilila"
                                ar="إنتاج الإعلان النهائي واختيار الفائز من لجنة تيليلا"
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </SectionShell>
    );
}

export function TililabWhyParticipateSection() {
    const items = [
        {
            en: 'Develop creative skills',
            fr: 'Développer ses compétences créatives',
            ar: 'تطوير المهارات الإبداعية',
        },
        {
            en: 'Be mentored by professionals',
            fr: 'Être accompagné par des professionnels',
            ar: 'المرافقة من قبل محترفين',
        },
        {
            en: 'Join a unique immersive experience',
            fr: 'Participer à une expérience immersive unique',
            ar: 'تجربة غامرة فريدة',
        },
        {
            en: 'Produce an original audiovisual work',
            fr: 'Produire une œuvre audiovisuelle originale',
            ar: 'إنتاج عمل سمعي بصري أصلي',
        },
        {
            en: 'Gain visibility with media and industry professionals',
            fr: 'Gagner en visibilité auprès des médias et professionnels du secteur',
            ar: 'اكتساب ظهور لدى الإعلام ومحترفي القطاع',
        },
    ];
    return (
        <SectionShell
            id="why-participate"
            title={
                <TransText
                    en="Why participate?"
                    fr="Pourquoi participer ?"
                    ar="لماذا المشاركة؟"
                />
            }
        >
            <ul className="grid gap-3 sm:grid-cols-2">
                {items.map((item) => (
                    <li
                        key={item.en}
                        className="rounded-2xl border border-border bg-background p-4 text-sm text-tgray"
                    >
                        <TransText en={item.en} fr={item.fr} ar={item.ar} />
                    </li>
                ))}
            </ul>
        </SectionShell>
    );
}

export function TililabJourneySection() {
    const steps = [
        { en: 'Call for applications', fr: 'Appel à candidatures', ar: 'نداء للترشح' },
        { en: 'Pre-selection', fr: 'Pré-sélection', ar: 'الفرز الأولي' },
        { en: 'Masterclass', fr: 'Masterclass', ar: 'ماستركلاس' },
        { en: 'Creative bootcamp', fr: 'Bootcamp créatif', ar: 'المعسكر الإبداعي' },
        { en: 'Production', fr: 'Production', ar: 'الإنتاج' },
        { en: 'Jury', fr: 'Jury', ar: 'لجنة التحكيم' },
        { en: 'Tililab Trophy', fr: 'Tililab Trophy', ar: 'كأس تيليلاب' },
    ];
    return (
        <SectionShell
            id="journey"
            title={
                <TransText
                    en="Tililab journey"
                    fr="Parcours Tililab"
                    ar="مسار تيليلاب"
                />
            }
        >
            <ol className="relative grid gap-4 sm:grid-cols-3 lg:grid-cols-7">
                {steps.map((step, i) => (
                    <li
                        key={step.en}
                        className="relative flex flex-col items-center rounded-2xl border border-border bg-card p-4 text-center shadow-sm"
                    >
                        <span className="flex size-8 items-center justify-center rounded-full bg-beta-blue text-xs font-bold text-twhite">
                            {i + 1}
                        </span>
                        <p className="mt-3 text-sm font-semibold text-tblack">
                            <TransText en={step.en} fr={step.fr} ar={step.ar} />
                        </p>
                    </li>
                ))}
            </ol>
        </SectionShell>
    );
}

export function TililabAdmissionSection() {
    const conditions = [
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
            fr: 'Le candidat doit présenter un portfolio, une réalisation audiovisuelle antérieure ou un projet personnel démontrant son intérêt pour la création de contenus.',
            en: 'Candidates must submit a portfolio, prior audiovisual work or a personal project demonstrating interest in content creation.',
            ar: 'يجب على المرشح تقديم ملف أعمال أو عمل سمعي بصري سابق أو مشروع شخصي يظهر اهتمامه بإنشاء المحتوى.',
        },
        {
            fr: 'Les projets peuvent être soumis en arabe, amazighe ou français.',
            en: 'Projects may be submitted in Arabic, Amazigh or French.',
            ar: 'يمكن تقديم المشاريع بالعربية أو الأمازيغية أو الفرنسية.',
        },
        {
            fr: "Les candidatures reçues feront l'objet d'une phase de présélection par le jury. Seuls les candidats retenus à l'issue de cette étape seront admis à participer au Bootcamp Tililab et à poursuivre le concours jusqu'à sa phase finale.",
            en: 'Applications will undergo a pre-selection phase by the jury. Only shortlisted candidates will be admitted to the Tililab Bootcamp and continue to the final phase.',
            ar: 'ستخضع الترشيحات لمرحلة فرز أولي من لجنة التحكيم. يُقبل في المعسكر ويُتابع المسابقة حتى النهائي المرشحون المختارون فقط.',
        },
    ];

    return (
        <SectionShell
            id="admission"
            title={
                <TransText
                    en="Admission conditions"
                    fr="Conditions d'admission"
                    ar="شروط القبول"
                />
            }
        >
            <ul className="max-w-3xl space-y-4">
                {conditions.map((item) => (
                    <li
                        key={item.en}
                        className="flex items-start gap-3 text-sm leading-relaxed text-tgray"
                    >
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-beta-blue text-xs font-bold text-twhite">
                            ✓
                        </span>
                        <TransText en={item.en} fr={item.fr} ar={item.ar} />
                    </li>
                ))}
            </ul>
        </SectionShell>
    );
}

export function TililabPrizesSection() {
    const rewards = [
        { en: 'Tililab Bootcamp participation', fr: 'Participation au Bootcamp Tililab', ar: 'المشاركة في معسكر تيليلاب' },
        { en: 'Tililab Trophy', fr: 'Tililab Trophy', ar: 'كأس تيليلاب' },
        { en: 'Work tool from SOREAD 2M', fr: 'Outil de travail offert par SOREAD 2M', ar: 'أداة عمل من SOREAD 2M' },
        { en: 'Professional mentoring by LionsGeek', fr: 'Accompagnement professionnel par LionsGeek', ar: 'مرافقة مهنية من LionsGeek' },
        { en: 'Project broadcast on 2M Group platforms', fr: 'Diffusion du projet sur les plateformes du Groupe 2M', ar: 'بث المشروع على منصات مجموعة 2M' },
    ];

    return (
        <SectionShell
            id="prizes"
            title={<TransText en="Rewards" fr="Récompenses" ar="المكافآت" />}
        >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {rewards.map((r) => (
                    <div
                        key={r.en}
                        className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm"
                    >
                        <span className="text-xl" aria-hidden>🏆</span>
                        <p className="text-sm font-semibold text-tblack">
                            <TransText en={r.en} fr={r.fr} ar={r.ar} />
                        </p>
                    </div>
                ))}
            </div>
            <div className="mt-8 text-center">
                <RegulationCta href="/tililab/reglement" />
            </div>
        </SectionShell>
    );
}

export function TililabCriteriaSection() {
    return (
        <SectionShell
            id="criteria"
            title={
                <TransText
                    en="Evaluation criteria"
                    fr="Critères d’évaluation"
                    ar="معايير التقييم"
                />
            }
            subtitle={
                <TransText
                    en="How projects are reviewed during the bootcamp and final jury."
                    fr="Comment les projets sont évalués pendant le bootcamp et devant le jury final."
                    ar="كيف تُقيَّم المشاريع خلال المعسكر ولدى لجنة التحكيم."
                />
            }
        >
            <ul className="grid gap-3 text-sm text-tgray sm:grid-cols-2">
                {[
                    {
                        en: 'Creative idea & insight',
                        fr: 'Idée créative & insight',
                        ar: 'فكرة إبداعية ورؤية',
                    },
                    {
                        en: 'Parity, diversity & inclusion',
                        fr: 'Parité, diversité & inclusion',
                        ar: 'مساواة وتنوع وإدماج',
                    },
                    {
                        en: 'Craft & production quality',
                        fr: 'Exécution & qualité de production',
                        ar: 'إتقان وجودة الإنتاج',
                    },
                    {
                        en: 'Emotional impact & social message',
                        fr: 'Impact émotionnel & message social',
                        ar: 'أثر عاطفي ورسالة اجتماعية',
                    },
                ].map((c) => (
                    <li
                        key={c.en}
                        className="rounded-2xl border border-border bg-background p-4"
                    >
                        <TransText en={c.en} fr={c.fr} ar={c.ar} />
                    </li>
                ))}
            </ul>
        </SectionShell>
    );
}

export function TililabJurySection({ editions = [] }) {
    const sorted = [...(Array.isArray(editions) ? editions : [])].sort(
        (a, b) => Number(b.year) - Number(a.year),
    );

    return (
        <SectionShell
            id="jury"
            title={<TransText en="Jury" fr="Jury" ar="لجنة التحكيم" />}
            subtitle={
                <TransText
                    en="Main jury members by Tililab edition. The final winner is chosen by the Tilila Awards jury during the awards ceremony."
                    fr="Principaux membres du jury par édition Tililab. Le lauréat final est choisi par le jury des Tilila Awards lors de la cérémonie."
                    ar="أعضاء لجنة التحكيم الرئيسيون حسب دورة تيليلاب. يُختار الفائز النهائي من لجنة تروفي تيليلا خلال الحفل."
                />
            }
        >
            <div className="max-w-3xl rounded-2xl border border-gold/25 bg-linear-to-br from-gold/5 to-beta-blue/5 p-6 text-sm leading-relaxed text-tgray">
                <TransText
                    en="Tililab editions often share the Tilila Awards jury for the final decision. Below are the main names mentioned in official communications, edition by edition."
                    fr="Les éditions Tililab partagent souvent le jury des Tilila Awards pour la décision finale. Ci-dessous, les principaux noms cités dans les communications officielles, édition par édition."
                    ar="غالباً ما تشترك دورات تيليلاب في لجنة تروفي تيليلا للقرار النهائي. فيما يلي الأسماء الرئيسية الواردة في التواصل الرسمي، دورة بدورة."
                />
            </div>

            <div className="mt-8 space-y-6">
                {sorted.length === 0 ? (
                    <p className="text-sm text-tgray">
                        <TransText
                            en="Jury information will appear here once editions are published."
                            fr="Les informations jury apparaîtront ici une fois les éditions publiées."
                            ar="ستظهر معلومات اللجنة هنا عند نشر الدورات."
                        />
                    </p>
                ) : (
                    sorted.map((edition) => {
                        const year = Number(edition.year);
                        const jury = Array.isArray(edition.jury)
                            ? edition.jury
                            : [];
                        const label = edition.edition_label ?? {
                            en: `${year}`,
                            fr: `${year}`,
                            ar: `${year}`,
                        };
                        const editionId = edition.id;
                        const hasEditionPage =
                            editionId && !String(editionId).startsWith('hist-');

                        return (
                            <div
                                key={editionId ?? year}
                                className="rounded-2xl border border-border bg-background p-6 shadow-sm ring-1 ring-border/50"
                            >
                                <p className="text-xs font-bold tracking-[0.18em] text-beta-blue uppercase">
                                    <TransText
                                        en={label.en ?? ''}
                                        fr={label.fr ?? ''}
                                        ar={label.ar ?? ''}
                                    />
                                </p>

                                {jury.length === 0 ? (
                                    <p className="mt-4 text-sm text-tgray italic">
                                        <TransText
                                            en="Not fully detailed in public communications."
                                            fr="Non détaillé publiquement de façon exhaustive."
                                            ar="غير مفصّل علناً بشكل كامل."
                                        />
                                    </p>
                                ) : (
                                    <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        {jury.map((person, idx) => {
                                            const photoSrc = person?.photo_path
                                                ? `/storage/${person.photo_path}`
                                                : '';

                                            return (
                                                <li
                                                    key={`${person?.full_name ?? 'juror'}-${idx}`}
                                                    className="rounded-xl border border-border bg-white px-4 py-3 shadow-sm"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="size-14 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                                                            {photoSrc ? (
                                                                <img
                                                                    src={
                                                                        photoSrc
                                                                    }
                                                                    alt=""
                                                                    className="h-full w-full object-cover"
                                                                    loading="lazy"
                                                                    decoding="async"
                                                                />
                                                            ) : null}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="text-sm font-semibold text-tblack">
                                                                {person?.full_name ??
                                                                    ''}
                                                            </div>
                                                            {(person?.bio?.en ||
                                                                person?.bio
                                                                    ?.fr) && (
                                                                <div className="mt-1 text-xs text-tgray">
                                                                    <TransText
                                                                        en={
                                                                            person
                                                                                .bio
                                                                                ?.en ??
                                                                            ''
                                                                        }
                                                                        fr={
                                                                            person
                                                                                .bio
                                                                                ?.fr ??
                                                                            ''
                                                                        }
                                                                        ar={
                                                                            person
                                                                                .bio
                                                                                ?.ar ??
                                                                            ''
                                                                        }
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}

                                {hasEditionPage ? (
                                    <Link
                                        href={`/tililab/editions/${editionId}#jury`}
                                        className="mt-4 inline-block text-sm font-semibold text-beta-blue hover:underline"
                                    >
                                        <TransText
                                            en="Open edition page"
                                            fr="Voir la fiche édition"
                                            ar="صفحة الدورة"
                                        />
                                    </Link>
                                ) : null}
                            </div>
                        );
                    })
                )}
            </div>
        </SectionShell>
    );
}

function TililabFaqAnswer({ item }) {
    const bodyClass = [
        'mt-3 text-sm leading-relaxed text-tgray',
        item.preline ? 'whitespace-pre-line' : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={bodyClass}>
            <TransText en={item.a.en} fr={item.a.fr} ar={item.a.ar} />
            {item.link ? (
                <>
                    {' '}
                    <Link
                        href={item.link}
                        className="font-semibold text-beta-blue hover:underline"
                    >
                        <TransText
                            en={item.linkLabel?.en ?? 'Form'}
                            fr={item.linkLabel?.fr ?? 'Formulaire'}
                            ar={item.linkLabel?.ar ?? 'الاستمارة'}
                        />
                    </Link>
                </>
            ) : null}
            {item.externalLink ? (
                <div className="mt-2">
                    <a
                        href={item.externalLink}
                        className="font-semibold text-beta-blue hover:underline"
                    >
                        <TransText
                            en={item.externalLabel?.en ?? 'Link'}
                            fr={item.externalLabel?.fr ?? 'Lien'}
                            ar={item.externalLabel?.ar ?? 'رابط'}
                        />
                    </a>
                </div>
            ) : null}
        </div>
    );
}

export function TililabFaqSection() {
    return (
        <SectionShell
            id="faq"
            title={<TransText en="FAQ" fr="FAQ" ar="الأسئلة الشائعة" />}
            subtitle={
                <TransText
                    en="Everything candidates need to know about Tililab."
                    fr="L’essentiel pour les candidats Tililab."
                    ar="ما يحتاج المرشحون معرفته عن تيليلاب."
                />
            }
        >
            <div className="space-y-3">
                {TILILAB_FAQ_ITEMS.map((item, index) => (
                    <details
                        key={item.id}
                        className="rounded-2xl border border-border bg-background p-5"
                        open={index === 0}
                    >
                        <summary className="cursor-pointer text-sm font-semibold text-tblack">
                            <TransText
                                en={item.q.en}
                                fr={item.q.fr}
                                ar={item.q.ar}
                            />
                        </summary>
                        <TililabFaqAnswer item={item} />
                    </details>
                ))}
            </div>
        </SectionShell>
    );
}

function TililabPartnerSubtitle({ partner }) {
    const role = partner.meta?.role;
    const edition = partner.meta?.edition;
    if (!role) {
        return null;
    }

    return (
        <>
            <TransText en={role.en} fr={role.fr} ar={role.ar} />
            {edition ? (
                <span className="mt-1 block font-medium text-beta-blue">
                    <TransText
                        en={edition.en}
                        fr={edition.fr}
                        ar={edition.ar}
                    />
                </span>
            ) : null}
        </>
    );
}

export function TililabSponsorsSection() {
    const { partners = [] } = usePage().props;
    const organiser = partnersInGroup(partners, 'organiser')[0];
    const programPartners = partnersInGroup(partners, 'program');
    const mediaPartners = partnersInGroup(partners, 'media');
    return (
        <SectionShell
            id="sponsors"
            title={
                <TransText
                    en=" Sponsors & partners"
                    fr="Sponsors & partenaires"
                    ar="الرعاة والشركاء"
                />
            }
            subtitle={
                <TransText
                    en="Concours Tililab by 2M — bootcamp hosts, incubation, and media partners across editions."
                    fr="Concours Tililab par 2M — hôtes du bootcamp, incubation et partenaires médias selon les éditions."
                    ar="مسابقة تيليلاب من 2M — مضيفو المعسكر، الاحتضان وشركاء الإعلام حسب الدورات."
                />
            }
        >
            <div className="max-w-3xl rounded-2xl border border-gold/25 bg-linear-to-br from-gold/5 to-beta-blue/5 p-6 text-sm leading-relaxed text-tgray">
                <TransText
                    en="Tililab is a 2M initiative for young creatives under 30. It relies on program partners (pre-bootcamp host, winner incubation) and recurring media partners — not traditional commercial sponsors."
                    fr="Tililab est une initiative 2M pour les jeunes créatifs de moins de 30 ans. Le concours s’appuie sur des partenaires de programme (hôte du pré-bootcamp, incubation du lauréat) et des partenaires médias récurrents — sans sponsors commerciaux classiques."
                    ar="تيليلاب مبادرة من 2M للمبدعين دون 30 سنة. تعتمد على شركاء البرنامج (مضيف ما قبل المعسكر، احتضان الفائز) وشركاء إعلام متكررين — وليس رعاة تجاريين تقليديين."
                />
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <PartnerTier
                    badge={
                        <TransText
                            en="Main organiser"
                            fr="Organisateur principal"
                            ar="المنظم الرئيسي"
                        />
                    }
                    title={
                        <TransText
                            en="2M — Concours Tililab"
                            fr="2M — Concours Tililab"
                            ar="2M — مسابقة تيليلاب"
                        />
                    }
                    description={
                        organiser?.meta?.role ? (
                            <TransText
                                en={organiser.meta.role.en}
                                fr={organiser.meta.role.fr}
                                ar={organiser.meta.role.ar}
                            />
                        ) : (
                            <TransText
                                en="Organizer — creative bootcamp alongside Tilila Awards"
                                fr="Organisateur — bootcamp créatif en marge des Tilila Awards"
                                ar="المنظم — معسكر إبداعي إلى جانب تيليلا أووردز"
                            />
                        )
                    }
                >
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <div className="flex justify-center rounded-2xl border border-border bg-white px-6 py-6 shadow-sm">
                            <img
                                src="/assets/tililab/tililab-logo.png"
                                alt="Tililab logo"
                                className="h-20 w-20 object-contain sm:h-24 sm:w-24"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <div className="flex flex-1 justify-center rounded-2xl border border-border bg-white px-8 py-8 shadow-sm">
                            <img
                                src={organiser?.logo_url ?? '/assets/organizer-logo.png'}
                                alt="2M logo"
                                className="h-24 w-full max-w-xs object-contain sm:h-28"
                                loading="eager"
                                decoding="async"
                            />
                        </div>
                    </div>
                </PartnerTier>

                <PartnerTier
                    badge={
                        <TransText
                            en="Program partners"
                            fr="Partenaires du programme"
                            ar="شركاء البرنامج"
                        />
                    }
                    title={
                        <TransText
                            en="Bootcamp & incubation"
                            fr="Bootcamp & incubation"
                            ar="المعسكر والاحتضان"
                        />
                    }
                    description={
                        <TransText
                            en="Key partners who host pre-selection or support the laureate after the competition."
                            fr="Partenaires clés qui accueillent la présélection ou accompagnent le lauréat après le concours."
                            ar="شركاء أساسيون يستضيفون التصفية أو يدعمون الفائز بعد المسابقة."
                        />
                    }
                >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {programPartners.map((partner) => (
                            <PartnerLogoTile
                                key={partner.id}
                                name={partner.name}
                                logoUrl={partner.logo_url}
                                tall
                                subtitle={
                                    <TililabPartnerSubtitle partner={partner} />
                                }
                            />
                        ))}
                    </div>
                </PartnerTier>
            </div>

            <div className="mt-6">
                <PartnerTier
                    badge={
                        <TransText
                            en="Media & communication partners"
                            fr="Partenaires médias & communication"
                            ar="شركاء إعلام واتصال"
                        />
                    }
                    title={
                        <TransText
                            en="5th edition (2025) and recent editions"
                            fr="5e édition (2025) et éditions récentes"
                            ar="الدورة الخامسة (2025) والدورات الأخيرة"
                        />
                    }
                    description={
                        <TransText
                            en="Supporting media partners — involvement may vary slightly per edition; roles and highlights reflect official Tililab partnerships."
                            fr="Partenaires médias de soutien — l’implication peut varier légèrement selon l’édition ; rôles et éditions selon les partenariats officiels Tililab."
                            ar="شركاء إعلام داعمون — قد تختلف المشاركة قليلاً حسب الدورة؛ الأدوار والدورات وفق شراكات تيليلاب الرسمية."
                        />
                    }
                >
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {mediaPartners.map((partner) => (
                            <PartnerLogoTile
                                key={partner.id}
                                name={partner.name}
                                logoUrl={partner.logo_url}
                                subtitle={
                                    <TililabPartnerSubtitle partner={partner} />
                                }
                            />
                        ))}
                    </div>
                    <p className="mt-4 text-xs text-tgray">
                        <TransText
                            en="Lionsgeek hosted the pre-bootcamp for the 5th edition (2025)."
                            fr="Lionsgeek a accueilli le pré-bootcamp pour la 5e édition (2025)."
                            ar="استضاف Lionsgeek ما قبل المعسكر للدورة الخامسة (2025)."
                        />
                    </p>
                </PartnerTier>
            </div>
        </SectionShell>
    );
}
