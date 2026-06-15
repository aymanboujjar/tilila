import { Award, Gavel, Play } from 'lucide-react';
import TransText from '@/components/TransText';
import { getYoutubeEmbedUrl } from '@/lib/youtubeEmbed';
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
                        <TransText
                            en="Winners"
                            fr="Lauréats"
                            ar="الفائزون"
                        />
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
                title={
                    <TransText en="Winners" fr="Lauréats" ar="الفائزون" />
                }
            />
            <ul className="mt-6 space-y-3">
                {winners.length > 0
                    ? winners.map((w, i) => (
                          <li
                              key={i}
                              className="flex gap-4 rounded-xl border border-border bg-twhite p-4"
                          >
                              {w.photo_path ? (
                                  <PersonPhoto
                                      path={w.photo_path}
                                      alt={w.full_name}
                                      className="size-20"
                                  />
                              ) : (
                                  <TililaIconBadge icon={Award} />
                              )}
                              <div className="min-w-0">
                                  <p className="text-xs font-bold tracking-wide text-beta-blue uppercase">
                                      {textFor(w.trophy, locale)}
                                  </p>
                                  <p className="mt-1 font-semibold text-tblack">
                                      {w.full_name}
                                  </p>
                                  {textFor(w.bio, locale) ? (
                                      <p className="mt-1 text-sm leading-relaxed text-tgray">
                                          {textFor(w.bio, locale)}
                                      </p>
                                  ) : null}
                              </div>
                          </li>
                      ))
                    : historyLines.map((line, i) => (
                          <li
                              key={i}
                              className="flex gap-4 rounded-xl border border-border bg-twhite p-4"
                          >
                              <TililaIconBadge icon={Award} />
                              <p className="text-sm leading-relaxed text-tgray">
                                  <TransText
                                      en={line.en}
                                      fr={line.fr}
                                      ar={line.ar}
                                  />
                              </p>
                          </li>
                      ))}
            </ul>
        </section>
    );
}

export function EditionJurySection({ jury = [], locale }) {
    return (
        <section id="jury">
            <TililaSectionHeading
                title={
                    <TransText en="Jury" fr="Jury" ar="لجنة التحكيم" />
                }
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
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {jury.map((member, i) => (
                        <div
                            key={i}
                            className="flex items-start gap-4 rounded-xl border border-border bg-twhite p-4"
                        >
                            {member.photo_path ? (
                                <PersonPhoto
                                    path={member.photo_path}
                                    alt={member.full_name}
                                    className="size-20"
                                />
                            ) : (
                                <TililaIconBadge icon={Gavel} />
                            )}
                            <div className="min-w-0">
                                <p className="font-semibold text-tblack">
                                    {member.full_name}
                                </p>
                                {textFor(member.bio, locale) ? (
                                    <p className="mt-1 text-sm leading-relaxed text-tgray">
                                        {textFor(member.bio, locale)}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
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
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {rows.map((path) => (
                        <a
                            key={path}
                            href={`/storage/${path}`}
                            target="_blank"
                            rel="noreferrer"
                            className="overflow-hidden rounded-lg border border-border"
                        >
                            <img
                                src={`/storage/${path}`}
                                alt=""
                                className="aspect-square w-full object-cover transition hover:scale-105"
                            />
                        </a>
                    ))}
                </div>
            )}
        </section>
    );
}

export function EditionVideoSection({ videoUrl, year }) {
    const embed = videoUrl ? getYoutubeEmbedUrl(videoUrl) : null;
    if (!embed && !videoUrl) return null;

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
            <div className="mt-6">
                {embed ? (
                    <div className="aspect-video overflow-hidden rounded-xl border border-border bg-tblack">
                        <iframe
                            title={`Ceremony ${year}`}
                            src={embed}
                            className="h-full w-full"
                            allowFullScreen
                        />
                    </div>
                ) : (
                    <a
                        href={videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-beta-blue hover:underline"
                    >
                        <Play className="size-4" />
                        <TransText
                            en="Watch video"
                            fr="Voir la vidéo"
                            ar="شاهد الفيديو"
                        />
                    </a>
                )}
            </div>
        </section>
    );
}
