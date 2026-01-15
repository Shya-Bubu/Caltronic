'use client';

import { useState, useCallback } from 'react';
import styles from './ImageGallery.module.css';

interface GalleryImage {
    src: string;
    alt: string;
    caption: string;
}

interface ImageGalleryProps {
    images: GalleryImage[];
    columns?: 2 | 3 | 4 | 5;
}

/**
 * ImageGallery Component
 * 
 * Displays 2-5 related images as small thumbnails.
 * On click, expands to full-size modal/lightbox.
 */
export default function ImageGallery({ images, columns = 3 }: ImageGalleryProps) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (expandedIndex === null) return;

        if (e.key === 'Escape') {
            setExpandedIndex(null);
        } else if (e.key === 'ArrowRight') {
            setExpandedIndex((prev) =>
                prev !== null ? (prev + 1) % images.length : 0
            );
        } else if (e.key === 'ArrowLeft') {
            setExpandedIndex((prev) =>
                prev !== null ? (prev - 1 + images.length) % images.length : 0
            );
        }
    }, [expandedIndex, images.length]);

    const colClass = `columns${columns}` as keyof typeof styles;

    return (
        <>
            <div className={`${styles.gallery} ${styles[colClass] || ''}`}>
                {images.map((img, index) => (
                    <button
                        key={index}
                        className={styles.thumbnail}
                        onClick={() => setExpandedIndex(index)}
                        aria-label={`View ${img.alt}`}
                    >
                        <img src={img.src} alt={img.alt} loading="lazy" />
                        <span className={styles.caption}>{img.caption}</span>
                    </button>
                ))}
            </div>

            {/* Lightbox Modal */}
            {expandedIndex !== null && (
                <div
                    className={styles.lightbox}
                    onClick={() => setExpandedIndex(null)}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    role="dialog"
                    aria-modal="true"
                >
                    <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
                        <button
                            className={styles.closeBtn}
                            onClick={() => setExpandedIndex(null)}
                            aria-label="Close"
                        >
                            ×
                        </button>

                        <button
                            className={styles.navBtn + ' ' + styles.prev}
                            onClick={() => setExpandedIndex((prev) =>
                                prev !== null ? (prev - 1 + images.length) % images.length : 0
                            )}
                            aria-label="Previous image"
                        >
                            ‹
                        </button>

                        <img
                            src={images[expandedIndex].src}
                            alt={images[expandedIndex].alt}
                            className={styles.fullImage}
                        />

                        <button
                            className={styles.navBtn + ' ' + styles.next}
                            onClick={() => setExpandedIndex((prev) =>
                                prev !== null ? (prev + 1) % images.length : 0
                            )}
                            aria-label="Next image"
                        >
                            ›
                        </button>

                        <p className={styles.lightboxCaption}>
                            {images[expandedIndex].caption}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
