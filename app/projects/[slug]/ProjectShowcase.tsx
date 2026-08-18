type ProjectShowcaseProps = {
    src: string;
    alt: string;
    caption?: string;
    demoUrl?: string;
    demoLabel?: string;
    width?: "narrow" | "medium" | "wide" | "full";
};

export default function ProjectShowcase({
    src,
    alt,
    caption,
    demoUrl,
    demoLabel = "Open Live Demo",
    width = "wide",
}: ProjectShowcaseProps) {
    return (
        <div className={`project-showcase project-showcase-${width}`}>
            <figure className="project-showcase-figure">
                {/* Project screenshots vary in size, so preserve their intrinsic aspect ratio. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={alt} className="project-showcase-image" />

                {caption && (
                    <figcaption className="project-showcase-caption">
                        {caption}
                    </figcaption>
                )}
            </figure>

            {demoUrl && (
                <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="terminal-link-btn no-margin project-demo-btn"
                >
                    [{demoLabel}]
                </a>
            )}
        </div>
    );
}
