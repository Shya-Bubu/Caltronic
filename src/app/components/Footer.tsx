'use client';

import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.disclaimer}>
                Made with AI · May contain inaccuracies · Built for academic study, not official use · Powered by 22 Jila
            </p>
        </footer>
    );
}
