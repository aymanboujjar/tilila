import TransText from '@/components/TransText';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';

const SOREAD_IMAGE = '/assets/about/about4.jpg';

export default function SoreadPresentationSection() {
    return (
        <section
            id="soread"
            className="scroll-mt-28 bg-twhite py-14 sm:py-16"
        >
            <TililaContainer>
                <div className="grid gap-10 lg:grid-cols-1 lg:items-stretch lg:gap-16">
                    <div className="flex flex-col justify-center lg:pe-4">
                        <p className="text-[11px] font-bold tracking-[0.24em] text-beta-blue uppercase">
                            <TransText
                                en="SOREAD 2M presentation"
                                fr="Présentation SOREAD 2M"
                                ar="تقديم SOREAD 2M"
                            />
                        </p>
                        <h2 className="mt-4 text-xl font-extrabold tracking-tight text-[#1a237e] uppercase sm:text-[1.35rem]">
                            <TransText
                                en="2M, a citizen media"
                                fr="2M, un média citoyen"
                                ar="2M، إعلام مواطن"
                            />
                        </h2>

                        <div className="mt-7 space-y-5 text-sm leading-[1.75] text-[#1a237e]/90 sm:text-[15px]">
                            <p>
                                <TransText
                                    en="Founded in 1989, SOREAD 2M is a major player in the Moroccan audiovisual landscape. As a public service audiovisual media, it is committed daily to information, culture, entertainment and citizen debate."
                                    fr="Créée en 1989, SOREAD 2M est un acteur majeur du paysage audiovisuel marocain. Média audiovisuel de service public, elle s'engage au quotidien en faveur de l'information, de la culture, du divertissement et du débat citoyen."
                                    ar="تأسست سنة 1989، وتعد SOREAD 2M فاعلاً رئيسياً في المشهد السمعي البصري المغربي. بصفتها وسيلة إعلام سمعي بصري للخدمة العامة، تلتزم يومياً بالإعلام والثقافة والترفيه والنقاش المواطن."
                                />
                            </p>
                            <p>
                                <TransText
                                    en="Through the diversity of its programmes, 2M accompanies the evolution of Moroccan society and helps promote values of openness, pluralism and social cohesion. Aware of the role of media in shaping representations, it places equity, diversity and inclusion at the heart of its citizen commitment."
                                    fr="À travers la diversité de ses programmes, 2M accompagne les évolutions de la société marocaine et contribue à promouvoir les valeurs d'ouverture, de pluralisme et de cohésion sociale. Consciente du rôle des médias dans la construction des représentations, elle place l'équité, la diversité et l'inclusion au cœur de son engagement citoyen."
                                    ar="من خلال تنوع برامجها، ترافق 2M تحولات المجتمع المغربي وتساهم في تعزيز قيم الانفتاح والتعددية والتماسك الاجتماعي. وإذ تدرك دور الإعلام في بناء التمثيلات، تجعل المساواة والتنوع والإدماج في صميم التزامها المواطن."
                                />
                            </p>
                        </div>

                        <div className="mt-10 rounded-xl border border-border/60 bg-beta-white p-6 sm:p-7">
                            <h3 className="text-base font-extrabold text-[#1a237e] sm:text-lg">
                                <TransText
                                    en="Tilila: SOREAD 2M’s Equity, Diversity and Inclusion programme"
                                    fr="Tilila : le programme Équité, Diversité et Inclusion de 2M"
                                    ar="تيليلا: برنامج المساواة والتنوع والإدماج لـ 2M"
                                />
                            </h3>
                            <div className="mt-4 space-y-4 text-sm leading-[1.75] text-[#1a237e]/90 sm:text-[15px]">
                                <p>
                                    <TransText
                                        en="Tilila is the Equity, Diversity and Inclusion (EDI) programme led by SOREAD 2M through its Parity and Diversity Committee."
                                        fr="Tilila est le programme Équité, Diversité et Inclusion (EDI) porté par SOREAD 2M à travers son Comité Parité et Diversité."
                                        ar="تيليلا هو برنامج المساواة والتنوع والإدماج (EDI) الذي تقوده SOREAD 2M عبر لجنة المساواة والتنوع."
                                    />
                                </p>
                                <p>
                                    <TransText
                                        en="Through awareness-raising, highlighting best practices and supporting talent, Tilila works to promote fairer and more inclusive representations in media, communication and advertising."
                                        fr="À travers des actions de sensibilisation, de valorisation des bonnes pratiques et d'accompagnement des talents, Tilila agit pour promouvoir des représentations plus justes et plus inclusives dans les médias, la communication et la publicité."
                                        ar="من خلال التوعية وإبراز الممارسات الفضلى ومرافقة المواهب، تعمل تيليلا على تعزيز تمثيلات أكثر عدلاً وشمولاً في الإعلام والتواصل والإعلان."
                                    />
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* <div className="relative min-h-[220px] overflow-hidden sm:min-h-[280px] lg:min-h-0 lg:h-full">
                        <img
                            src={SOREAD_IMAGE}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover object-top"
                            loading="lazy"
                        />
                    </div> */}
                </div>
            </TililaContainer>
        </section>
    );
}
