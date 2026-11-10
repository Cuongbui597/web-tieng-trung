import Image from 'next/image';

function isRemoteUrl(src: string): boolean {
    return /^https?:\/\//i.test(src);
}

function isDataUrl(src: string): boolean {
    return /^data:/i.test(src);
}

interface MarkdownImageProps {
    src?: any;
    alt?: string;
    className?: string;
}

export default function MarkdownImage(props: MarkdownImageProps) {
    const { src, alt, className } = props;
    const safeSrc = typeof src === 'string' ? src : '';
    const safeAlt = typeof alt === 'string' ? alt : '';

    if (!safeSrc) return null;

    const unoptimized = isRemoteUrl(safeSrc) || isDataUrl(safeSrc);

    return (
        <div className={['md-img-frame', className].filter(Boolean).join(' ')}>
            <Image
                src={safeSrc}
                alt={safeAlt}
                fill
                className="md-img"
                sizes="(max-width: 768px) 100vw, 800px"
                quality={60}
                unoptimized={unoptimized}
            />
        </div>
    );
}
