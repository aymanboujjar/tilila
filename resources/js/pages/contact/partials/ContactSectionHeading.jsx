export default function ContactSectionHeading({
    children,
    accent = 'turquoise',
}) {
    const accentClass =
        accent === 'purple' ? 'bg-beta-blue/70' : 'bg-beta-turquoise';

    return (
        <div>
            <h2 className="text-sm font-extrabold tracking-wide text-beta-blue uppercase sm:text-base">
                {children}
            </h2>
            <div
                className={`mt-2 h-0.5 w-10 rounded-full ${accentClass}`}
                aria-hidden
            />
        </div>
    );
}
