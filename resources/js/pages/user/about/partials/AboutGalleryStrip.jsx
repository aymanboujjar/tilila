const GALLERY_IMAGES = [
    '/assets/about/about1.jpg',
    '/assets/about/about3.png',
    '/assets/about/about4.jpg',
    '/assets/about/about5.jpg',
    '/assets/about/about6.jpg',
];

export default function AboutGalleryStrip() {
    return (
        <section className="w-full bg-twhite" aria-label="Galerie">
            <div className="flex w-full">
                {GALLERY_IMAGES.map((src) => (
                    <div
                        key={src}
                        className="aspect-[5/4] min-w-0 flex-1 overflow-hidden sm:aspect-[4/3]"
                    >
                        <img
                            src={src}
                            alt=""
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
