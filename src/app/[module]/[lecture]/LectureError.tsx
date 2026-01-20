import styles from './LectureError.module.css';
import Link from 'next/link';

interface LectureErrorProps {
    title: string;
    message: string;
    suggestion?: string;
    details?: string[];
}

export default function LectureError({ title, message, suggestion, details }: LectureErrorProps) {
    return (
        <main className={styles.container}>
            <div className={styles.card}>
                <div className={styles.icon}>⚠️</div>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.message}>{message}</p>
                {suggestion && (
                    <p className={styles.suggestion}>{suggestion}</p>
                )}
                {details && details.length > 0 && (
                    <details className={styles.details}>
                        <summary>Technical Details</summary>
                        <ul>
                            {details.map((detail, i) => (
                                <li key={i}>{detail}</li>
                            ))}
                        </ul>
                    </details>
                )}
                <div className={styles.actions}>
                    <Link href="/" className={styles.button}>
                        Return to Home
                    </Link>
                </div>
            </div>
        </main>
    );
}
