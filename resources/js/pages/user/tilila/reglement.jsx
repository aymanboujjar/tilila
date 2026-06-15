import { Head, Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import TililaAwardsLayout from '@/layouts/tilila-awards-layout';
import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';
import { getTililaReglement } from '@/data/tilila-reglement-2026';
import {
    TililaBtnOutline,
    TililaContainer,
    TililaSection,
    TililaSectionHeading,
    TililaTealText,
} from '@/pages/user/tilila/partials/TililaUi';

function isListItem(text) {
    return /^\d+\.\s/.test(text);
}

function ArticleBody({ paragraphs }) {
    const blocks = [];
    let listItems = [];

    const flushList = () => {
        if (listItems.length > 0) {
            blocks.push({ type: 'ol', items: [...listItems] });
            listItems = [];
        }
    };

    for (const paragraph of paragraphs) {
        if (isListItem(paragraph)) {
            listItems.push(paragraph.replace(/^\d+\.\s*/, ''));
        } else {
            flushList();
            blocks.push({ type: 'p', text: paragraph });
        }
    }
    flushList();

    return (
        <div className="space-y-4">
            {blocks.map((block, i) => {
                if (block.type === 'ol') {
                    return (
                        <ol
                            key={i}
                            className="list-decimal space-y-3 ps-5 text-sm leading-relaxed text-tgray"
                        >
                            {block.items.map((item, j) => (
                                <li key={j}>{item}</li>
                            ))}
                        </ol>
                    );
                }
                return (
                    <p
                        key={i}
                        className="text-sm leading-relaxed text-tgray sm:text-base"
                    >
                        {block.text}
                    </p>
                );
            })}
        </div>
    );
}

export default function TililaReglement({ downloadUrl }) {
    const { locale } = useTranslation();
    const { title, subtitle, intro, articles, footer, version, articleLabel } =
        getTililaReglement(locale);

    return (
        <>
            <Head>
                <title>
                    {locale === 'ar'
                        ? 'النظام — Tilila Awards'
                        : locale === 'en'
                          ? 'Regulations — Tilila Awards'
                          : 'Règlement — Tilila Awards'}
                </title>
            </Head>

            <section className="border-b border-border/60 bg-beta-white py-10 sm:py-12">
                <TililaContainer>
                    <Link
                        href="/tilila"
                        className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-beta-blue uppercase hover:underline"
                    >
                        <ChevronLeft className="size-4" />
                        <TransText
                            en="Back to Tilila Awards"
                            fr="Retour aux Tilila Awards"
                            ar="العودة إلى تيليلا أووردز"
                        />
                    </Link>

                    <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-3xl">
                            <p className="text-xs font-bold tracking-[0.14em] text-beta-turquoise uppercase">
                                {version}
                            </p>
                            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-beta-blue sm:text-4xl">
                                {title}
                            </h1>
                            <p className="mt-2 text-lg font-semibold text-tblack">
                                {subtitle}
                            </p>
                            <p className="mt-4 text-sm leading-relaxed text-tgray sm:text-base">
                                {intro}
                            </p>
                        </div>
                        <TililaBtnOutline href={downloadUrl}>
                            <TransText
                                en="Download regulations"
                                fr="Télécharger le règlement"
                                ar="تحميل النظام"
                            />
                        </TililaBtnOutline>
                    </div>
                </TililaContainer>
            </section>

            <TililaSection className="bg-twhite pb-16">
                <TililaContainer>
                    <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-12">
                        <aside className="lg:sticky lg:top-24 lg:self-start">
                            <p className="mb-3 text-xs font-bold tracking-[0.14em] text-beta-blue uppercase">
                                <TransText
                                    en="Articles"
                                    fr="Articles"
                                    ar="المواد"
                                />
                            </p>
                            <nav
                                aria-label="Regulation articles"
                                className="flex flex-col gap-1"
                            >
                                {articles.map((article) => (
                                    <a
                                        key={article.number}
                                        href={`#article-${article.number}`}
                                        className="rounded-lg px-3 py-2 text-sm font-medium text-tgray transition hover:bg-alpha-blue hover:text-beta-blue"
                                    >
                                        <TililaTealText>
                                            {article.number}.
                                        </TililaTealText>{' '}
                                        <span className="ms-1">
                                            {article.title}
                                        </span>
                                    </a>
                                ))}
                            </nav>
                        </aside>

                        <div className="min-w-0 space-y-10">
                            <TililaSectionHeading
                                title={
                                    <TransText
                                        en="Competition regulations"
                                        fr="Règlement du concours"
                                        ar="نظام المسابقة"
                                    />
                                }
                                subtitle={
                                    <TransText
                                        en="Participation implies full acceptance of these rules."
                                        fr="La participation implique l’acceptation pleine et entière de ce règlement."
                                        ar="المشاركة تعني القبول الكامل لهذا النظام."
                                    />
                                }
                            />

                            {articles.map((article) => (
                                <article
                                    key={article.number}
                                    id={`article-${article.number}`}
                                    className="scroll-mt-24 rounded-xl border border-border bg-twhite p-6 sm:p-8"
                                >
                                    <h2 className="text-lg font-bold text-beta-blue sm:text-xl">
                                        <TililaTealText>
                                            {articleLabel} {article.number}
                                        </TililaTealText>
                                        <span className="text-tblack">
                                            {' '}
                                            : {article.title}
                                        </span>
                                    </h2>
                                    <div className="mt-4">
                                        <ArticleBody
                                            paragraphs={article.paragraphs}
                                        />
                                    </div>
                                </article>
                            ))}

                            {footer?.length > 0 ? (
                                <div className="border-t border-border pt-8 text-sm text-tgray">
                                    {footer.map((line) => (
                                        <p
                                            key={line}
                                            className={
                                                line === 'Salim CHEIKH'
                                                    ? 'mt-1 font-semibold text-tblack'
                                                    : ''
                                            }
                                        >
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            ) : null}

                            <div className="flex justify-center pt-4">
                                <TililaBtnOutline href={downloadUrl}>
                                    <TransText
                                        en="Download regulations (DOCX)"
                                        fr="Télécharger le règlement (DOCX)"
                                        ar="تحميل النظام (DOCX)"
                                    />
                                </TililaBtnOutline>
                            </div>
                        </div>
                    </div>
                </TililaContainer>
            </TililaSection>
        </>
    );
}

TililaReglement.layout = (page) => (
    <TililaAwardsLayout>{page}</TililaAwardsLayout>
);
