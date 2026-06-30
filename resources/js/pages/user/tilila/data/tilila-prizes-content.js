import { getTililaReglement } from '@/data';

/** Maps UI prize ids to article 5 (description) and article 10 (reward) paragraph indices. */
const PRIZE_REG_INDICES = {
    jury: { description: 2, reward: 0 },
    honneur: { description: 3, reward: 1 },
    online: { description: 4, reward: 2 },
    offline: { description: 5, reward: 3 },
    hommage: { description: 1, reward: 4 },
};

export function getTililaPrizeDetails(locale, prizeId) {
    const reglement = getTililaReglement(locale);
    const categories = reglement.articles.find((a) => a.number === 5);
    const rewards = reglement.articles.find((a) => a.number === 10);
    const indices = PRIZE_REG_INDICES[prizeId];

    if (!indices || !categories || !rewards) {
        return { description: '', reward: '' };
    }

    const rawDescription = categories.paragraphs[indices.description] ?? '';
    const description = rawDescription.replace(/^\d+\.\s*/, '');
    const reward = rewards.paragraphs[indices.reward] ?? '';

    return { description, reward };
}
