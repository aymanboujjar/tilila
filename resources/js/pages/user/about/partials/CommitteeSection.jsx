import TransText from '@/components/TransText';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';

const COMMITTEE_IMAGE = '/assets/about/about1.jpg';

export default function CommitteeSection() {
    return (
        <section
            id="committee"
            className="scroll-mt-28 bg-twhite py-14 sm:py-16"
        >
            <TililaContainer>
                <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-16">
                    <div className="flex min-w-0 flex-1 flex-col lg:pe-4">
                        {/* <p className="text-[11px] font-bold tracking-[0.24em] text-beta-blue uppercase">
                            <TransText
                                en="Parity and Diversity Committee"
                                fr="Présentation du Comité Parité et Diversité 2M"
                                ar="تقديم لجنة المساواة والتنوع 2M"
                            />
                        </p> */}
                        <h2 className="mt-4 text-xl font-extrabold tracking-tight text-[#1a237e] uppercase sm:text-[1.35rem]">
                            <TransText
                                en="Over ten years of commitment to a more inclusive society"
                                fr="Plus de dix ans d'engagement pour une société plus inclusive"
                                ar="أكثر من عشر سنوات من الالتزام من أجل مجتمع أكثر شمولاً"
                            />
                        </h2>

                        <div className="mt-7 space-y-5 text-sm leading-[1.75] text-[#1a237e]/90 sm:text-[15px]">
                            <p>
                                <TransText
                                    en="Created in 2013 at the initiative of the Director General of SOREAD 2M, the Parity Committee — which became the Parity and Diversity Committee (CPD) in 2017 — works to promote parity and gender equality, diversity and respect for human dignity, and to fight all forms of discrimination."
                                    fr="Créé en 2013 à l'initiative de la Direction Générale de SOREAD 2M, le Comité Parité, devenu Comité Parité et Diversité (CPD) en 2017, a pour mission d'œuvrer pour la parité et l'égalité femmes-hommes, de promouvoir la diversité et le respect de la dignité de la personne, ainsi que de lutter contre toute forme de discrimination."
                                    ar="أُنشئت سنة 2013 بمبادرة من الإدارة العامة لـ SOREAD 2M، ولجنة المساواة — التي أصبحت لجنة المساواة والتنوع (CPD) سنة 2017 — تسعى إلى تعزيز المساواة بين الجنسين والتنوع واحترام كرامة الإنسان، ومكافحة كل أشكال التمييز."
                                />
                            </p>
                            <p>
                                <TransText
                                    en="Its first major action was to assess the image of women in the media. This work led to the adoption, on 8 March 2014, of the 2M Charter for the promotion of women’s image, marking the start of an ambitious approach by the channel towards fairer representations that respect human dignity."
                                    fr="Sa première action majeure a consisté à réaliser un état des lieux de l'image des femmes dans les médias. Ce travail a conduit à l'adoption, le 8 mars 2014, de la Charte 2M pour la valorisation de l'image de la femme, marquant le début d'une démarche ambitieuse de la chaîne en faveur de représentations plus justes et respectueuses de la dignité humaine."
                                    ar="كان أول إجراء رئيسياً لها تقييم صورة المرأة في الإعلام. وقد أفضى هذا العمل إلى اعتماد ميثاق 2M لتعزيز صورة المرأة في 8 مارس 2014، بداية مسار طموح للقناة نحو تمثيلات أكثر عدلاً واحتراماً للكرامة الإنسانية."
                                />
                            </p>
                            <p>
                                <TransText
                                    en="Since then, the CPD has developed concrete initiatives to evolve representations, promote equal opportunities and encourage better consideration of equity, diversity and inclusion in media, communication and advertising."
                                    fr="Depuis, le CPD développe des initiatives concrètes visant à faire évoluer les représentations, à promouvoir l'égalité des chances et à encourager une meilleure prise en compte des enjeux d'équité, de diversité et d'inclusion dans les médias, la communication et la publicité."
                                    ar="ومنذ ذلك الحين، تطور اللجنة مبادرات ملموسة لتطوير التمثيلات وتعزيز تكافؤ الفرص وتشجيع مراعاة أفضل لقضايا المساواة والتنوع والإدماج في الإعلام والتواصل والإعلان."
                                />
                            </p>
                            <p>
                                <TransText
                                    en="Today, the Parity and Diversity Committee mobilises media, businesses and civil society around a shared ambition: contributing to a fairer, more inclusive society that better represents its diversity."
                                    fr="Aujourd'hui, le Comité Parité et Diversité mobilise médias, entreprises et société civile autour d'une ambition commune : contribuer à une société plus juste, plus inclusive et plus représentative de sa diversité."
                                    ar="اليوم، تجمع لجنة المساواة والتنوع الإعلام والمؤسسات والمجتمع المدني حول طموح مشترك: المساهمة في مجتمع أكثر عدلاً وشمولاً وأكثر تمثيلاً لتنوعه."
                                />
                            </p>
                        </div>
                    </div>

            
                </div>
            </TililaContainer>
        </section>
    );
}
