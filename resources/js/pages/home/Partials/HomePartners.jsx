import { HomePartnersContent } from '@/components/ProgramPartnersGrouped';
import TransText from '@/components/TransText';
import {
    TililaContainer,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

function SectionTitle() {
    return (
        <div className="text-center">
            <h2 className="text-xl font-extrabold tracking-[0.12em] text-beta-blue uppercase sm:text-2xl">
                <TransText en="Partners" fr="Partenaires" ar="الشركاء" />
            </h2>
            <div
                className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-beta-blue/70"
                aria-hidden
            />
        </div>
    );
}

export default function HomePartners() {
    return (
        <TililaSection
            id="partners"
            className="border-t border-border/60 bg-beta-white py-10 sm:py-12"
        >
            <TililaContainer>
                <SectionTitle />
                <HomePartnersContent className="mt-10 lg:mt-12" />
            </TililaContainer>
        </TililaSection>
    );
}
