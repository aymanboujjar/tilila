import PartnersCarouselSection from '@/components/PartnersCarouselSection';
import TransText from '@/components/TransText';

export default function HomePartners() {
    return (
        <PartnersCarouselSection
            id="partners"
            className="border-t border-border/60 bg-beta-white"
            fadeFrom="from-beta-white"
            showCta={false}
            title={
                <TransText en="Partners" fr="Partenaires" ar="الشركاء" />
            }
            subtitle={
                <TransText
                    en="Main partner logos"
                    fr="Logos partenaires principaux"
                    ar="شعارات الشركاء الرئيسيين"
                />
            }
        />
    );
}
