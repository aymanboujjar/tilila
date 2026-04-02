import React from 'react';

import { useTranslation } from '@/contexts/TranslationContext';

const DEFAULT_TAG = 'span';

export default function TransText({
    en,
    fr,
    ar,
    tag = DEFAULT_TAG,
    className,
}) {
    const { locale } = useTranslation();

    const resolvedText =
        (locale === 'ar' ? ar : locale === 'fr' ? fr : en) ?? en ?? '';

    const Tag = tag || DEFAULT_TAG;
    const extraButtonProps = Tag === 'button' ? { type: 'button' } : {};

    return (
        <Tag className={className} {...extraButtonProps}>
            {resolvedText}
        </Tag>
    );
}

