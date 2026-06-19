import TransText from '@/components/TransText';
import {
    TililaContainer,
    TililaSection,
    TililaSectionHeading,
} from '@/pages/user/tilila/partials/TililaUi';

const committee = [
    {
        name: 'Khadija Bouzoubaa',
        role: 'Chair',
        photoUrl:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80',
    },
    {
        name: 'Salim Cherdi',
        role: 'Member',
        photoUrl:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
    },
    {
        name: 'Rabia Fassi',
        role: 'Member',
        photoUrl:
            'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=900&q=80',
    },
    {
        name: 'Fatiha Derres',
        role: 'Member',
        photoUrl:
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    },
];

export default function CommitteeSection() {
    return (
        <TililaSection
            id="committee"
            className="scroll-mt-28 border-b border-border/60 bg-beta-white"
        >
            <TililaContainer>
                <TililaSectionHeading
                    centered
                    className="mx-auto"
                    title={
                        <TransText
                            en="Parity & Diversity Committee"
                            fr="Comité Parité et Diversité"
                            ar="لجنة المساواة والتنوع"
                        />
                    }
                    subtitle={
                        <TransText
                            en="The Committee steers 2M’s commitments on equality, representation, and non-discrimination. Tilila Awards is one of its flagship programmes—recognising advertising that advances inclusion and respect in Morocco."
                            fr="Le Comité porte les engagements de 2M en matière d’égalité, de représentation et de non-discrimination. Les Tilila Awards sont l’une de ses initiatives phares—récompensant une publicité qui fait progresser l’inclusion et le respect au Maroc."
                            ar="توجّه اللجنة التزامات 2M بالمساواة والتمثيل ومكافحة التمييز. جائزة تيليلا من أبرز برامجها—تُكرّم إعلاناً يرسّخ الإدماج والاحترام في المغرب."
                        />
                    }
                />

                <p className="mx-auto mt-3 max-w-xl text-center text-xs font-bold tracking-[0.2em] text-beta-turquoise uppercase">
                    <TransText
                        en="2M · Parity & Diversity"
                        fr="2M · Parité & Diversité"
                        ar="2M · المساواة والتنوع"
                    />
                </p>

                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {committee.map((member) => (
                        <article
                            key={member.name}
                            className="overflow-hidden rounded-xl border border-border/70 bg-twhite shadow-sm"
                        >
                            <div className="aspect-[4/5] overflow-hidden bg-beta-white">
                                <img
                                    src={member.photoUrl}
                                    alt={member.name}
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <div className="p-4">
                                <p className="text-sm font-extrabold text-tblack">
                                    {member.name}
                                </p>
                                <p className="mt-1 text-xs font-semibold text-tgray">
                                    {member.role === 'Chair' ? (
                                        <TransText
                                            en="Chair"
                                            fr="Présidente"
                                            ar="الرئيسة"
                                        />
                                    ) : (
                                        <TransText
                                            en="Member"
                                            fr="Membre"
                                            ar="عضوة"
                                        />
                                    )}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
