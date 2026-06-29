import WinnerPosterVideo from '@/pages/user/tilila/archives/components/WinnerPosterVideo';

export default function ArchivesLaureateVideoCard({ card, showYear = false }) {
    return (
        <article className="overflow-hidden rounded-2xl border border-border/40 bg-twhite shadow-[0_8px_30px_rgba(26,35,126,0.08)]">
            <div className="relative aspect-video w-full overflow-hidden bg-[#0a1028]">
                <div className="absolute inset-0">
                    <WinnerPosterVideo
                        uploadSrc={card.videoUploadSrc}
                        youtubeUrl={card.videoYoutubeUrl}
                        posterSrc={card.photoSrc}
                        brand={card.name}
                    />
                </div>
            </div>

            <div className="border-t border-border/30 px-5 py-4">
                {card.trophy ? (
                    <p className="text-[10px] font-extrabold tracking-[0.1em] text-beta-blue uppercase sm:text-[11px]">
                        {card.trophy}
                    </p>
                ) : null}
                <p
                    className={`line-clamp-2 text-base font-extrabold text-tblack sm:text-lg ${card.trophy ? 'mt-1' : ''}`}
                >
                    {card.name}
                </p>
                {showYear && card.year ? (
                    <p className="mt-2 text-[10px] font-bold tracking-wide text-beta-turquoise uppercase">
                        {card.year}
                    </p>
                ) : null}
            </div>
        </article>
    );
}
