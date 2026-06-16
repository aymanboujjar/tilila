import { Link } from '@inertiajs/react';
import { ArrowRight, Download } from 'lucide-react';
import TransText from '@/components/TransText';

export function ProgramApplyButton({ href, children }) {
    return (
        <Link
            href={href}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-beta-blue px-6 py-3 text-sm font-bold tracking-wide text-twhite uppercase transition hover:opacity-90"
        >
            {children}
            <ArrowRight className="size-4" aria-hidden />
        </Link>
    );
}

export function ProgramRegulationButton({ href }) {
    return (
        <Link
            href={href}
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-beta-blue bg-transparent px-6 py-3 text-sm font-bold tracking-wide text-beta-blue uppercase transition hover:bg-beta-blue hover:text-twhite"
        >
            <Download className="size-4" aria-hidden />
            <TransText
                en="Download regulations"
                fr="Télécharger le règlement"
                ar="تحميل النظام"
            />
        </Link>
    );
}

export function ProgramDeadlineBadge({ deadline }) {
    return (
        <p className="inline-flex items-center gap-2 rounded-full border border-beta-blue/30 bg-alpha-blue px-4 py-2 text-sm font-semibold text-beta-blue">
            <span aria-hidden>📅</span>
            <TransText
                en={`Applications open until ${deadline}`}
                fr={`Candidatures ouvertes jusqu'au ${deadline}`}
                ar={`التقديم مفتوح حتى ${deadline}`}
            />
        </p>
    );
}
