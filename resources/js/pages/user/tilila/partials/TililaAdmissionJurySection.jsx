import TransText from '@/components/TransText';
import TililaPeopleGrid from '@/components/TililaPeopleGrid';
import {
    TililaBtnGhost,
    TililaCheckItem,
    TililaContainer,
    TililaSection,
    TililaSectionHeading,
} from '@/pages/user/tilila/partials/TililaUi';

const CONDITIONS = [
    {
        fr: 'Le concours est ouvert aux annonceurs marocains ayant diffusé des campagnes publicitaires en télévision, radio, presse écrite, affichage ou sur les supports digitaux.',
        en: 'The competition is open to Moroccan advertisers who have broadcast campaigns on television, radio, print, out-of-home or digital media.',
        ar: 'المسابقة مفتوحة للمعلنين المغاربة الذين بثوا حملات في التلفزيون أو الإذاعة أو الصحافة أو الإشهار الخارجي أو المنصات الرقمية.',
    },
    {
        fr: "Les campagnes présentées doivent promouvoir les valeurs d'équité, de diversité et d'inclusion portées par le programme Tilila.",
        en: 'Submitted campaigns must promote the equity, diversity and inclusion values upheld by the Tilila program.',
        ar: 'يجب أن تعزز الحملات المقدمة قيم الإنصاف والتنوع والإدماج التي يحملها برنامج تيليلا.',
    },
];

const PLACEHOLDER_COUNT = 7;

export default function TililaAdmissionJurySection({ jury = [] }) {
    const members = Array.isArray(jury) ? jury : [];
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
                            <TililaBtnGhost href="/tilila/reglement">
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
                            <>
                                <p className="mt-6 text-sm leading-relaxed text-tgray">
                                    <TransText
                                        en="The composition of the Tilila Awards 2026 jury will be announced soon. Photos, biographies and roles will be published here after final validation."
                                        fr="La composition du jury Tilila Awards 2026 sera annoncée prochainement. Les photos, biographies et fonctions seront publiées ici après validation définitive."
                                        ar="سيتم الإعلان قريبًا عن تشكيلة لجنة تحكيم تيليلا أووردز 2026."
                                    />
                                </p>
                                <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
                                    {Array.from({ length: PLACEHOLDER_COUNT }).map(
                                        (_, i) => (
                                            <div
                                                key={i}
                                                className="flex flex-col items-center"
                                            >
                                                <div className="size-16 rounded-full bg-muted sm:size-20" />
                                                <div className="mt-3 h-2.5 w-14 rounded bg-muted" />
                                                <div className="mt-2 h-2 w-20 rounded bg-muted/70" />
                                            </div>
                                        ),
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="mt-6">
                                <TililaPeopleGrid people={members} />
                            </div>
                        )}
                        <div className="mt-8">
                            <TililaBtnGhost href="#jury">
                                <TransText
                                    en="Discover jury members"
                                    fr="Découvrir les membres du jury"
                                    ar="اكتشف أعضاء لجنة التحكيم"
                                />
                            </TililaBtnGhost>
                        </div>
                    </div>
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
