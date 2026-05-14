'use client';

import { Component, ReactNode } from 'react';
import styles from './shared.module.css';

interface VisualCardProps {
  title: string;
  children: ReactNode;
  onSuccess?: () => void;
  onError?: () => void;
}

interface VisualCardState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<{ children: ReactNode; onError?: () => void }, VisualCardState> {
  constructor(props: { children: ReactNode; onError?: () => void }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error('Visual card error:', error);
    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorMessage}>
          <p>❌ Render failed</p>
          <p className={styles.errorDetail}>{this.state.error?.message || 'Unknown error'}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function VisualCard({ title, children, onSuccess, onError }: VisualCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <span className={`${styles.statusIcon} ${styles.success}`}>✅</span>
      </div>
      <div className={styles.cardContent}>
        <ErrorBoundary onError={onError}>
          {children}
        </ErrorBoundary>
      </div>
    </div>
  );
}
