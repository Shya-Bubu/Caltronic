import { useMemo, useState } from 'react';

import type { FlashcardContract } from '@/core/contracts/FlashcardContract';

import Button from './Button';
import MarkdownView from './MarkdownView';
import styles from './FlashcardView.module.css';

export default function FlashcardView({ deck }: { deck: FlashcardContract }) {
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  const card = deck.cards[index];
  const canGoPrev = index > 0;
  const canGoNext = index < deck.cards.length - 1;

  const difficultyLabel = useMemo(() => {
    return `Difficulty ${card.difficultyLevel} / 5`;
  }, [card.difficultyLevel]);

  return (
    <section className={styles.wrap} aria-label="Flashcards">
      <header className={styles.header}>
        <div>
          <div className={styles.kicker}>Flashcards</div>
          <h3 className={styles.title}>Card {index + 1} / {deck.cards.length}</h3>
        </div>
        <div className={styles.meta}>{difficultyLabel}</div>
      </header>

      <div className={styles.card}>
        <div className={styles.faceLabel}>{showBack ? 'Back' : 'Front'}</div>
        <div className={styles.face}>
          <MarkdownView markdown={showBack ? card.back : card.front} />
        </div>
      </div>

      <footer className={styles.footer}>
        <Button
          variant="secondary"
          onClick={() => {
            setShowBack(false);
            setIndex((i) => Math.max(0, i - 1));
          }}
          disabled={!canGoPrev}
        >
          Previous
        </Button>

        <Button
          variant="primary"
          onClick={() => setShowBack((v) => !v)}
        >
          {showBack ? 'Show Front' : 'Flip'}
        </Button>

        <Button
          variant="secondary"
          onClick={() => {
            setShowBack(false);
            setIndex((i) => Math.min(deck.cards.length - 1, i + 1));
          }}
          disabled={!canGoNext}
        >
          Next
        </Button>
      </footer>
    </section>
  );
}
