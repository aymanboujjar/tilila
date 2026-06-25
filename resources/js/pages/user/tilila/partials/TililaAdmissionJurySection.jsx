import { lazy, Suspense, useState } from 'react';
import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    Award,
    Mail,
    MessageSquare,
    Monitor,
    Newspaper,
    Radio,
    Smartphone,
    Trophy,
    Tv,
} from 'lucide-react';
import TransText from '@/components/TransText';
import { storagePhotoSrc } from '@/pages/user/tilila/partials/EditionDetailContent';
import { TililaContainer, TililaSection } from '@/pages/user/tilila/partials/TililaUi';

const TililaJuryMembersModal = lazy(
    () => import('@/pages/user/tilila/partials/TililaJuryMembersModal'),
);

const MEDIA_CHANNELS = [
    { Icon: Tv, labelFr: 'TV', labelEn: 'TV', labelAr: 'تلفزيون' },
    { Icon: Monitor, labelFr: 'Digital', labelEn: 'Digital', labelAr: 'رقمي' },
    // { Icon: Radio, labelFr: 'Radio', labelEn: 'Radio', labelAr: 'إذاعة' },
    { Icon: Newspaper, labelFr: 'Presse', labelEn: 'Press', labelAr: 'صحافة' },
    {
        Icon: Smartphone,
        labelFr: 'Affichage',
        labelEn: 'OOH',
        labelAr: 'إشهار',
    },
];

function ColumnIcon({ children, className = '' }) {
    return (
        <span
            className={`inline-flex size-14 items-center justify-center rounded-full sm:size-16 ${className}`}
        >
            {children}
        </span>
    );
}

function JuryComingSoon() {
    return (
        <p className="mt-8 text-sm font-medium text-beta-blue/90">
            <TransText
                en="The jury will be listed soon."
                fr="Le jury sera bientôt affiché."
                ar="سيتم عرض أعضاء لجنة التحكيم قريباً."
            />
        </p>
    );
}

function JuryPreview({ members }) {
    if (members.length === 0) {
        return null;
    }

    return (
        <div className="mt-8 flex flex-wrap gap-3">
            {members.slice(0, 4).map((member, i) => {
                const photo = storagePhotoSrc(member?.photo_path);

                return (
                    <div
                        key={`${member?.full_name ?? 'member'}-${i}`}
                        className="size-14 overflow-hidden rounded-full border-2 border-beta-blue/15 bg-muted/40 sm:size-16"
                    >
                        {photo ? (
                            <img
                                src={photo}
                                alt={member?.full_name || ''}
                                className="h-full w-full object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
}

export default function TililaAdmissionJurySection({
    jury = [],
    hasCurrentEdition = false,
}) {
    const members = Array.isArray(jury) ? jury : [];
    const showJury = hasCurrentEdition && members.length > 0;
    const showJuryComingSoon = hasCurrentEdition && members.length === 0;
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <TililaSection id="admission" className="bg-twhite">
            <TililaContainer>
                <div className="grid gap-12 lg:grid-cols-3 lg:gap-10 xl:gap-14">
                    <article>
                        <ColumnIcon className="bg-alpha-blue text-beta-turquoise">
                            <Trophy className="size-7" strokeWidth={1.5} aria-hidden />
                        </ColumnIcon>
                        <h3 className="mt-5 text-sm font-extrabold tracking-wide text-beta-turquoise uppercase sm:text-base">
                            <TransText
                                en="Admission conditions"
                                fr="CONDITIONS DE SOUMISSION"
                                ar="شروط القبول"
                            />
                        </h3>
                        <div className="mt-5 space-y-4 text-sm leading-relaxed text-tgray">
                            <p>
                                <TransText
                                    en="The competition is open to all Moroccan advertisers and agencies in the following categories:"
                                    fr="Le concours est ouvert à l’ensemble des annonceurs et agences marocains dans les catégories suivantes :"
                                    ar="المسابقة مفتوحة أمام جميع المعلنين والوكالات المغربية ضمن الفئات التالية:"
                                />
                            </p>
                            <p>
                                <TransText
                                    en="- Television: TV spots and television commercials broadcast on 2M's channels."
                                    fr="- Télévision : Spots publicitaires et créations télévisuelles diffusés sur les antennes de 2M."
                                    ar="- التلفزيون: إعلانات تلفزيونية وإعلانات تلفزيونية مبثوثة على قنوات 2M."
                                />
                            </p>
                            <p>
                                <TransText
                                    en="- Online: Campaigns and advertising content broadcast on digital platforms (social media, video platforms, websites and interactive formats)."
                                    fr="- Online : Campagnes et productions publicitaires diffusées sur les canaux digitaux (réseaux sociaux, plateformes vidéo, sites web et formats interactifs)"
                                    ar="- الرقمي: حملات وإعلانات إعلانية منشورة على المنصات الرقمية (منصات التواصل الاجتماعي، المنصات الفيديوية، المواقع الإلكترونية والتنسيقات التفاعلية)."
                                />
                            </p>
                            <p>
                                <TransText
                                    en="- Offline: Advertising works and communication devices broadcast via out-of-home, print or radio."
                                    fr="- Offline : Œuvres publicitaires et dispositifs de communication diffusés via l’affichage, la presse écrite ou la radio"
                                    ar="- الخارجي: عملات إعلانية وأجهزة التواصل المنشورة عبر الإشهار الخارجي أو الصحافة المكتوبة أو الإذاعة."
                                />
                            </p>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-5 sm:gap-6">
                            {MEDIA_CHANNELS.map(
                                ({ Icon, labelFr, labelEn, labelAr }) => (
                                    <div
                                        key={labelEn}
                                        className="flex min-w-[52px] flex-col items-center gap-2"
                                    >
                                        <Icon
                                            className="size-6 text-beta-turquoise sm:size-7"
                                            strokeWidth={1.5}
                                            aria-hidden
                                        />
                                        <span className="text-[10px] font-bold tracking-wide text-beta-turquoise uppercase">
                                            <TransText
                                                en={labelEn}
                                                fr={labelFr}
                                                ar={labelAr}
                                            />
                                        </span>
                                    </div>
                                ),
                            )}
                        </div>
                    </article>

                    <article id="jury" className="scroll-mt-28">
                        <ColumnIcon className="bg-beta-blue/10 text-beta-blue">
                            <Award className="size-7" strokeWidth={1.5} aria-hidden />
                        </ColumnIcon>
                        <h3 className="mt-5 text-sm font-extrabold tracking-wide text-beta-blue uppercase sm:text-base">
                            <TransText
                                en="The jury"
                                fr="Le jury"
                                ar="لجنة التحكيم"
                            />
                        </h3>
                        <div className="mt-5 space-y-4 text-sm leading-relaxed text-tgray">
                            <p>
                                <TransText
                                    en="The Tilila Awards jury is made up of recognised figures from media, communication, creative industries, institutions, research and civil society. It evaluates applications based on creative quality, relevance, impact and contribution to equity, diversity and inclusion values."
                                    fr="Le jury de Tilila Awards réunit des experts issus des médias, de la communication, de la création, des institutions, de la recherche et de la société civile. Il évalue les candidatures selon leur créativité, leur pertinence, leur impact et leur contribution à l’inclusion."
                                    ar="تتكون لجنة تحكيم تيليلا أووردز من شخصيات معروفة من الإعلام والتواصل والإبداع والمؤسسات والبحث والمجتمع المدني. تقيّم الترشحات بناءً على الجودة الإبداعية والملاءمة والأثر والمساهمة في قيم المساواة والتنوع والإدماج."
                                />
                            </p>
                       
                        </div>

                        <JuryPreview members={members} />

                        {showJuryComingSoon ? <JuryComingSoon /> : null}

                        {showJury ? (
                            <button
                                type="button"
                                onClick={() => setModalOpen(true)}
                                className="mt-8 inline-flex items-center gap-2 rounded-lg border-2 border-beta-blue bg-transparent px-5 py-2.5 text-xs font-bold tracking-[0.1em] text-beta-blue uppercase transition hover:bg-alpha-blue"
                            >
                                <TransText
                                    en="Discover the jury"
                                    fr="Découvrir le jury"
                                    ar="اكتشف لجنة التحكيم"
                                />
                                <ArrowRight className="size-4" aria-hidden />
                            </button>
                        ) : null}
                    </article>

                    <article>
                        <ColumnIcon className="bg-alpha-blue text-beta-turquoise">
                            <MessageSquare
                                className="size-7"
                                strokeWidth={1.5}
                                aria-hidden
                            />
                        </ColumnIcon>
                        <h3 className="mt-5 text-sm font-extrabold tracking-wide text-beta-turquoise uppercase sm:text-base">
                            <TransText
                                en="A question?"
                                fr="Une question ?"
                                ar="سؤال؟"
                            />
                        </h3>
                        <p className="mt-5 text-sm leading-relaxed text-tgray">
                            <TransText
                                en="Our team is available to answer your questions about Tilila Awards."
                                fr="Notre équipe est à votre disposition pour répondre à vos questions sur les Tilila Awards."
                                ar="فريقنا متاح للإجابة على أسئلتكم حول تيليلا أووردز."
                            />
                        </p>
                        {/* <a
                            href="mailto:contact@tilila.org"
                            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-beta-turquoise transition hover:brightness-110"
                        >
                            <Mail className="size-4" aria-hidden />
                            contact@tilila.org
                        </a> */}
                        <div className="mt-8">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-lg bg-beta-turquoise px-5 py-2.5 text-xs font-bold tracking-[0.1em] text-twhite uppercase transition hover:brightness-110"
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
            </TililaContainer>

            {modalOpen ? (
                <Suspense fallback={null}>
                    <TililaJuryMembersModal
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                        members={members}
                    />
                </Suspense>
            ) : null}
        </TililaSection>
    );
}
