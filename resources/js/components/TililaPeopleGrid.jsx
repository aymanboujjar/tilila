import TransText from '@/components/TransText';

function hasTrophyLabel(trophy) {
    if (!trophy || typeof trophy !== 'object') {
        return false;
    }

    return Boolean(
        String(trophy.en ?? '').trim() ||
        String(trophy.fr ?? '').trim() ||
        String(trophy.ar ?? '').trim(),
    );
}

import { useState } from 'react';

export default function TililaPeopleGrid({ title, people = [] }) {
    const rows = Array.isArray(people) ? people : [];

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);

    const handleOpenModal = (person) => {
        setSelectedPerson(person);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedPerson(null);
    };

    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold text-tblack">{title}</h2>
            {rows.length === 0 ? (
                <div className="mt-4 rounded-2xl border border-border bg-beta-white p-10 text-center text-sm text-tgray">
                    <TransText
                        en="No entries yet."
                        fr="Aucune entrée pour le moment."
                        ar="لا توجد إدخالات بعد."
                    />
                </div>
            ) : (
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {rows.map((p, idx) => {
                        const img = p?.photo_path
                            ? `/storage/${p.photo_path}`
                            : '';

                        return (
                            <button
                                key={`${p?.full_name ?? 'person'}-${idx}`}
                                type="button"
                                onClick={() => handleOpenModal(p)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="flex items-center justify-center">
                                    <div className="flex size-26 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted">
                                        {img ? (
                                            <img
                                                src={img}
                                                alt={p?.full_name || ''}
                                                className="h-full w-full object-cover"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}
            {/* Modal */}
            {modalOpen && selectedPerson && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="relative w-full max-w-xs rounded-xl bg-white p-6 shadow-lg">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-2 right-2 text-tgray hover:text-tblack focus:outline-none"
                            aria-label="Close"
                        >
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M18 6L6 18"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M6 6L18 18"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                        <div className="flex flex-col items-center">
                            <div className="mb-4 flex size-24 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted">
                                {selectedPerson?.photo_path && (
                                    <img
                                        src={`/storage/${selectedPerson.photo_path}`}
                                        alt={selectedPerson?.full_name || ''}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                )}
                            </div>
                            <div className="mb-2 text-center text-lg font-semibold break-words text-tblack">
                                {selectedPerson?.full_name ?? ''}
                            </div>
                            <div className="text-center text-sm text-tgray">
                                <TransText
                                    en={selectedPerson?.bio?.en ?? ''}
                                    fr={selectedPerson?.bio?.fr ?? ''}
                                    ar={selectedPerson?.bio?.ar ?? ''}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
