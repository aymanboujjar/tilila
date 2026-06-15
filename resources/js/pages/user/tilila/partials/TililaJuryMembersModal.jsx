import { useEffect } from 'react';
import { Gavel, X } from 'lucide-react';
import TransText from '@/components/TransText';
import {
    PersonPhoto,
    textFor,
} from '@/pages/user/tilila/partials/EditionDetailContent';
import {
    TililaIconBadge,
    TililaTealText,
} from '@/pages/user/tilila/partials/TililaUi';
import { useTranslation } from '@/contexts/TranslationContext';

export default function TililaJuryMembersModal({
    open,
    onClose,
    members = [],
}) {
    const { locale } = useTranslation();
    const rows = Array.isArray(members) ? members : [];

    useEffect(() => {
        if (!open) return undefined;

        const onKeyDown = (event) => {
            if (event.key === 'Escape') onClose();
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="jury-modal-title"
        >
            <button
                type="button"
                className="absolute inset-0 bg-tblack/50"
                aria-label="Close"
                onClick={onClose}
            />

            <div className="relative flex max-h-[min(90vh,820px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-twhite shadow-2xl">
                <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
                    <div>
                        <p className="text-xs font-bold tracking-[0.14em] text-beta-turquoise uppercase">
                            <TransText
                                en="Tilila Awards 2026"
                                fr="Tilila Awards 2026"
                                ar="تيليلا أووردز 2026"
                            />
                        </p>
                        <h2
                            id="jury-modal-title"
                            className="mt-1 text-xl font-bold text-beta-blue sm:text-2xl"
                        >
                            <TransText
                                en="Jury members"
                                fr="Membres du jury"
                                ar="أعضاء لجنة التحكيم"
                            />
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border text-tgray transition hover:bg-alpha-blue hover:text-beta-blue"
                        aria-label="Close"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                <div className="overflow-y-auto px-6 py-6">
                    {rows.length === 0 ? (
                        <p className="text-sm leading-relaxed text-tgray">
                            <TransText
                                en="The composition of the Tilila Awards 2026 jury will be announced soon. Photos, biographies and roles will be published here after final validation."
                                fr="La composition du jury Tilila Awards 2026 sera annoncée prochainement. Les photos, biographies et fonctions seront publiées ici après validation définitive."
                                ar="سيتم الإعلان قريبًا عن تشكيلة لجنة تحكيم تيليلا أووردز 2026."
                            />
                        </p>
                    ) : (
                        <ul className="grid gap-4 sm:grid-cols-2">
                            {rows.map((member, index) => (
                                <li
                                    key={`${member?.full_name ?? 'member'}-${index}`}
                                    className="flex gap-4 rounded-xl border border-border bg-beta-white p-4"
                                >
                                    {member?.photo_path ? (
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
                                            {member?.full_name}
                                        </p>
                                        {textFor(member?.bio, locale) ? (
                                            <p className="mt-1 text-sm leading-relaxed text-tgray">
                                                {textFor(member.bio, locale)}
                                            </p>
                                        ) : null}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {rows.length > 0 ? (
                    <div className="border-t border-border px-6 py-4 text-center text-xs text-tgray">
                        <TililaTealText>{rows.length}</TililaTealText>{' '}
                        <TransText
                            en="jury members"
                            fr="membres du jury"
                            ar="أعضاء لجنة التحكيم"
                        />
                    </div>
                ) : null}
            </div>
        </div>
    );
}
