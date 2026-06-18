import TransText from '@/components/TransText';

export default function ArchivesCategoryPanels({ sections, year }) {
    const yearLabel = year === 'all' ? '' : ` ${year}`;

    const panels = [
        {
            id: 'campagnes',
            title: (
                <TransText
                    en={`Awarded campaigns${yearLabel}`}
                    fr={`Campagnes primées${yearLabel}`}
                    ar={`الحملات الفائزة${yearLabel}`}
                />
            ),
            items: sections.campagnes,
            render: (item) => item.name,
        },
        {
            id: 'marques',
            title: (
                <TransText
                    en={`Brands${yearLabel}`}
                    fr={`Marques${yearLabel}`}
                    ar={`العلامات${yearLabel}`}
                />
            ),
            items: sections.marques,
            render: (item) => item.name,
        },
        {
            id: 'agences',
            title: (
                <TransText
                    en={`Agencies${yearLabel}`}
                    fr={`Agences${yearLabel}`}
                    ar={`الوكالات${yearLabel}`}
                />
            ),
            items: sections.agences,
            render: (item) => item.name,
        },
    ];

    return (
        <div className="space-y-12 border-t border-border/50 pt-12">
            {panels.map((panel) => {
                if (!panel.items?.length) return null;

                return (
                    <section
                        key={panel.id}
                        id={panel.id}
                        className="scroll-mt-28"
                    >
                        <h3 className="text-base font-extrabold tracking-wide text-beta-blue uppercase">
                            {panel.title}
                        </h3>
                        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                            {panel.items.map((item, index) => (
                                <li
                                    key={`${panel.id}-${index}`}
                                    className="rounded-lg border border-border/60 bg-white px-4 py-3 text-sm text-tgray"
                                >
                                    {panel.render(item)}
                                </li>
                            ))}
                        </ul>
                    </section>
                );
            })}

            <section id="videos" className="scroll-mt-28">
                <h3 className="text-base font-extrabold tracking-wide text-beta-blue uppercase">
                    <TransText
                        en={`Videos${yearLabel}`}
                        fr={`Vidéos${yearLabel}`}
                        ar={`الفيديوهات${yearLabel}`}
                    />
                </h3>
                {!sections.videos?.length ? (
                    <p className="mt-4 text-sm text-tgray">
                        <TransText
                            en="No videos for this selection."
                            fr="Aucune vidéo pour cette sélection."
                            ar="لا توجد فيديوهات لهذا الاختيار."
                        />
                    </p>
                ) : (
                    <ul className="mt-4 space-y-2">
                        {sections.videos.map((video) => (
                            <li key={video.videoUrl}>
                                <a
                                    href={video.videoUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm font-semibold text-beta-blue hover:underline"
                                >
                                    {video.year} — {video.editionLabel}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}
