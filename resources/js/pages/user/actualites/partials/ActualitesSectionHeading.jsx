export default function ActualitesSectionHeading({
    children,
    accent = 'purple',
}) {
    const accentClass =
        accent === 'turquoise'
            ? 'bg-beta-turquoise'
            : 'bg-beta-blue/70';

    return (
        <div>
            <h2 className="text-base font-extrabold tracking-wide text-beta-blue uppercase sm:text-lg">
                {children}
            </h2>
            <div
                className={`mt-2 h-0.5 w-10 rounded-full ${accentClass}`}
                aria-hidden
            />
        </div>
    );
}
