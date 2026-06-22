export default function ActualitesSectionHeading({ children }) {
    return (
        <div>
            <h2 className="text-base font-extrabold tracking-wide text-beta-blue uppercase sm:text-lg">
                {children}
            </h2>
            <div
                className="mt-2 h-0.5 w-10 rounded-full bg-beta-blue/70"
                aria-hidden
            />
        </div>
    );
}
