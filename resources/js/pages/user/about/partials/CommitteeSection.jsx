import TransText from '@/components/TransText';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';

const COMMITTEE_IMAGE = '/assets/about/about1.jpg';

export default function CommitteeSection() {
    return (
        <section
            id="mission"
            className="scroll-mt-28 bg-twhite py-14 sm:py-16"
        >
            <TililaContainer>
                <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
                    <div className="lg:pe-4">
                        <div
                            className="mb-4 h-1 w-10 bg-beta-blue"
                            aria-hidden
                        />
                        <h2 className="text-xl font-extrabold tracking-tight text-[#1a237e] uppercase sm:text-[1.35rem]">
                            <TransText
                                en="Parity & Diversity Committee"
                                fr="Le Comité Parité & Diversité"
                                ar="لجنة المساواة والتنوع"
                            />
                        </h2>

                        <div className="mt-7 space-y-5 text-sm leading-[1.75] text-[#1a237e]/90 sm:text-[15px]">
                            <p>
                                <TransText
                                    en="Created in 2013 within SOREAD 2M, the Parity & Diversity Committee works to promote equal opportunities, diversity and the fight against discrimination in content, professional practices and projects carried by the Group."
                                    fr="Créé en 2013 au sein de SOREAD 2M, le Comité Parité & Diversité œuvre à promouvoir l'égalité des chances, la diversité et la lutte contre les discriminations dans les contenus, les pratiques professionnelles et les projets portés par le Groupe."
                                    ar="أُنشئت سنة 2013 ضمن SOREAD 2M، وتعمل لجنة المساواة والتنوع على تعزيز تكافؤ الفرص والتنوع ومكافحة التمييز في المحتوى والممارسات المهنية ومشاريع المجموعة."
                                />
                            </p>
                            <p>
                                <TransText
                                    en="A true space for reflection, proposals and action, it has for over a decade supported initiatives that foster a more balanced representation of women and men, value diverse paths and talents, and strengthen consideration of equity, diversity and inclusion in media and communication."
                                    fr="Véritable espace de réflexion, de proposition et d'action, il accompagne depuis plus d'une décennie le développement d'initiatives visant à favoriser une représentation plus équilibrée des femmes et des hommes, à valoriser la diversité des parcours et des talents et à renforcer la prise en compte des enjeux d'équité, de diversité et d'inclusion dans les médias et la communication."
                                    ar="بوصفها فضاءً حقيقياً للتفكير والاقتراح والعمل، ترافق منذ أكثر من عقد تطوير مبادرات تفضّل تمثيلاً أكثر توازناً للنساء والرجال، وتُقدّر تنوع المسارات والمواهب، وتعزز مراعاة قضايا المساواة والتنوع والإدماج في الإعلام والتواصل."
                                />
                            </p>
                            <p>
                                <TransText
                                    en="Through awareness programmes, reference tools, dialogue spaces and innovative projects, the Committee helps shift perspectives, promote best practices and encourage fairer, more inclusive representations."
                                    fr="À travers des programmes de sensibilisation, des outils de référence, des espaces de dialogue et des projets innovants, le Comité contribue à faire évoluer les regards, à promouvoir les bonnes pratiques et à encourager des représentations plus justes et plus inclusives."
                                    ar="من خلال برامج التوعية وأدوات المرجعية ومساحات الحوار والمشاريع المبتكرة، تساهم اللجنة في تطوير النظرات وتعزيز الممارسات الفضلى وتشجيع تمثيلات أكثر عدلاً وشمولاً."
                                />
                            </p>
                        </div>
                    </div>

                    <div>
                        <img
                            src={COMMITTEE_IMAGE}
                            alt=""
                            className="aspect-[16/10] w-full object-cover"
                            loading="lazy"
                        />
                        <p className="mt-3 text-xs leading-relaxed text-beta-blue sm:text-sm">
                            <TransText
                                en="The Parity & Diversity Committee of SOREAD 2M, on the occasion of its 10th anniversary."
                                fr="Le Comité Parité & Diversité de SOREAD 2M, à l'occasion de la célébration de son 10e anniversaire."
                                ar="لجنة المساواة والتنوع لـ SOREAD 2M، بمناسبة الاحتفال بالذكرى العاشرة لتأسيسها."
                            />
                        </p>
                    </div>
                </div>
            </TililaContainer>
        </section>
    );
}
