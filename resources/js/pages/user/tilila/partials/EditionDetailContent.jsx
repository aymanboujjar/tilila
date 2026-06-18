import { Award, Gavel } from 'lucide-react';
import TransText from '@/components/TransText';
import { useYoutubeAvailability } from '@/hooks/useYoutubeAvailability';
import TililaHorizontalCarousel from '@/pages/user/tilila/partials/TililaHorizontalCarousel';
import {
    TililaIconBadge,
    TililaSectionHeading,
} from '@/pages/user/tilila/partials/TililaUi';

export function textFor(obj, locale) {
    return obj?.[locale] || obj?.fr || obj?.en || obj?.ar || '';
}

export function storagePhotoSrc(path) {
    if (!path || typeof path !== 'string') return '';
    if (
        path.startsWith('http://') ||
        path.startsWith('https://') ||
        path.startsWith('/')
    ) {
        return path;
    }
    return `/storage/${path}`;
}

export function PersonPhoto({ path, alt = '', className = 'size-16' }) {
    const src = storagePhotoSrc(path);
    if (!src) return null;

    return (
        <div
            className={`${className} shrink-0 overflow-hidden rounded-xl border border-border bg-muted`}
        >
            <img
                src={src}
                alt={alt}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
            />
        </div>
    );
}

export function EditionWinnersSection({
    winners = [],
    historyLines = [],
    locale,
}) {
    if (!winners.length && !historyLines.length) {
        return (
            <section id="winners">
                <TililaSectionHeading
                    title={
                        <TransText en="Winners" fr="Lauréats" ar="الفائزون" />
                    }
                />
                <p className="mt-6 text-sm text-tgray">
                    <TransText
                        en="Winners for this edition will be announced after the awards ceremony."
                        fr="Les lauréats de cette édition seront annoncés après la cérémonie."
                        ar="يُعلَن عن فائزي هذه الدورة بعد حفل التوزيع."
                    />
                </p>
            </section>
        );
    }

    return (
        <section id="winners">
            <TililaSectionHeading
                title={<TransText en="Winners" fr="Lauréats" ar="الفائزون" />}
            />
            <TililaHorizontalCarousel
                ariaLabel="Edition winners"
                className="mt-6"
                slideClassName="w-[min(100%,340px)] shrink-0 snap-start md:w-[48%] lg:w-[32%]"
            >
                {winners.length > 0
                    ? winners.map((w, i) => (
                          <article
                              key={i}
                              className="flex h-full min-h-[200px] flex-col gap-4 rounded-2xl border border-border/60 bg-twhite p-5 shadow-sm"
                          >
                              {w.photo_path ? (
                                  <PersonPhoto
                                      path={w.photo_path}
                                      alt={w.full_name}
                                      className="size-24"
                                  />
                              ) : (
                                  <TililaIconBadge icon={Award} />
                              )}
                              <div className="min-w-0 flex-1">
                                  <p className="text-xs font-bold tracking-wide text-beta-blue uppercase">
                                      {textFor(w.trophy, locale)}
                                  </p>
                                  <p className="mt-1 text-lg font-bold text-tblack">
                                      {w.full_name}
                                  </p>
                                  {textFor(w.bio, locale) ? (
                                      <p className="mt-2 line-clamp-5 text-sm leading-relaxed text-tgray">
                                          {textFor(w.bio, locale)}
                                      </p>
                                  ) : null}
                              </div>
                          </article>
                      ))
                    : historyLines.map((line, i) => (
                          <article
                              key={i}
                              className="flex h-full min-h-[160px] gap-4 rounded-2xl border border-border/60 bg-twhite p-5 shadow-sm"
                          >
                              <TililaIconBadge icon={Award} />
                              <p className="text-sm leading-relaxed text-tgray">
                                  <TransText
                                      en={line.en}
                                      fr={line.fr}
                                      ar={line.ar}
                                  />
                              </p>
                          </article>
                      ))}
            </TililaHorizontalCarousel>
        </section>
    );
}

export function EditionJurySection({ jury = [], locale }) {
    return (
        <section id="jury">
            <TililaSectionHeading
                title={<TransText en="Jury" fr="Jury" ar="لجنة التحكيم" />}
            />
            {jury.length === 0 ? (
                <p className="mt-6 text-sm text-tgray">
                    <TransText
                        en="Jury members for this edition will be published soon."
                        fr="Les membres du jury de cette édition seront publiés prochainement."
                        ar="سيُنشر أعضاء لجنة التحكيم لهذه الدورة قريبًا."
                    />
                </p>
            ) : (
                <TililaHorizontalCarousel
                    ariaLabel="Edition jury"
                    className="mt-6"
                    slideClassName="w-[min(100%,300px)] shrink-0 snap-start sm:w-[45%] lg:w-[30%]"
                >
                    {jury.map((member, i) => (
                        <article
                            key={i}
                            className="flex h-full min-h-[180px] flex-col gap-4 rounded-2xl border border-border/60 bg-twhite p-5 shadow-sm"
                        >
                            {member.photo_path ? (
                                <PersonPhoto
                                    path={member.photo_path}
                                    alt={member.full_name}
                                    className="size-24"
                                />
                            ) : (
                                <TililaIconBadge icon={Gavel} />
                            )}
                            <div className="min-w-0">
                                <p className="text-lg font-bold text-tblack">
                                    {member.full_name}
                                </p>
                                {textFor(member.bio, locale) ? (
                                    <p className="mt-2 line-clamp-5 text-sm leading-relaxed text-tgray">
                                        {textFor(member.bio, locale)}
                                    </p>
                                ) : null}
                            </div>
                        </article>
                    ))}
                </TililaHorizontalCarousel>
            )}
        </section>
    );
}

export function EditionGallerySection({ images = [] }) {
    const rows = Array.isArray(images) ? images : [];

    return (
        <section id="gallery">
            <TililaSectionHeading
                title={<TransText en="Photos" fr="Photos" ar="صور" />}
            />
            {rows.length === 0 ? (
                <p className="mt-6 text-sm text-tgray">
                    <TransText
                        en="No photos published for this edition yet."
                        fr="Aucune photo publiée pour cette édition."
                        ar="لا توجد صور منشورة لهذه الدورة بعد."
                    />
                </p>
            ) : (
                <TililaHorizontalCarousel
                    ariaLabel="Edition gallery"
                    className="mt-6"
                    slideClassName="w-[min(100%,400px)] shrink-0 snap-start sm:w-[60%] lg:w-[40%]"
                    autoAdvanceMs={5200}
                >
                    {rows.map((path) => {
                        const src = storagePhotoSrc(path);
                        return (
                            <a
                                key={path}
                                href={src}
                                target="_blank"
                                rel="noreferrer"
                                className="group block overflow-hidden rounded-2xl border border-border/60 shadow-md"
                            >
                                <img
                                    src={src}
                                    alt=""
                                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                                    loading="lazy"
                                />
                            </a>
                        );
                    })}
                </TililaHorizontalCarousel>
            )}
        </section>
    );
}

export function EditionVideoSection({
    videoUrl,
    year,
    embedUrl: embedUrlProp,
}) {
    const check = useYoutubeAvailability(embedUrlProp ? null : videoUrl);
    const embedUrl = embedUrlProp ?? check.embedUrl;
    const loading = embedUrlProp ? false : check.loading;
    const available = embedUrlProp ? Boolean(embedUrlProp) : check.available;

    if (loading || !available || !embedUrl) {
        return null;
    }

    return (
        <section id="video">
            <TililaSectionHeading
                title={
                    <TransText
                        en="Ceremony video"
                        fr="Vidéo de cérémonie"
                        ar="فيديو الحفل"
                    />
                }
            />
            <div className="mt-6 overflow-hidden rounded-2xl border border-border/60 bg-tblack shadow-lg">
                <div className="aspect-video">
                    <iframe
                        title={`Ceremony ${year}`}
                        src={embedUrl}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
            </div>
        </section>
    );
}
