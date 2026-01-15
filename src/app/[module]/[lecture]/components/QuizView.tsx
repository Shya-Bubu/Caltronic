import { useMemo, useState } from 'react';

import type { QuizContract } from '@/core/contracts/QuizContract';

import Button from './Button';
import MarkdownView from './MarkdownView';
import styles from './QuizView.module.css';

export default function QuizView({ quiz }: { quiz: QuizContract }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const question = quiz.questions[questionIndex];

  const isAnswered = selected !== null;
  const isCorrect = useMemo(() => {
    if (!isAnswered) return false;
    return selected === question.correctAnswer;
  }, [isAnswered, selected, question.correctAnswer]);

  const canGoNext = questionIndex < quiz.questions.length - 1;

  return (
    <section className={styles.wrap} aria-label="Quiz">
      <header className={styles.header}>
        <div>
          <div className={styles.kicker}>Quiz</div>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>Question {questionIndex + 1} / {quiz.questions.length}</h3>
            {isAnswered ? (
              <span className={[styles.badge, isCorrect ? styles.badgeCorrect : styles.badgeWrong].join(' ')}>
                {isCorrect ? 'Correct' : 'Incorrect'}
              </span>
            ) : null}
          </div>
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.prompt}>
          <MarkdownView markdown={question.prompt} />
        </div>

        <div className={styles.options}>
          {question.options.map((option) => {
            const isSelected = selected === option;
            const isRight = option === question.correctAnswer;

            const optionClass = [
              styles.option,
              isAnswered && isRight ? styles.optionCorrect : '',
              isAnswered && isSelected && !isRight ? styles.optionWrong : '',
              isSelected ? styles.optionSelected : '',
            ].filter(Boolean).join(' ');

            return (
              <button
                key={option}
                type="button"
                className={optionClass}
                disabled={isAnswered}
                onClick={() => setSelected(option)}
              >
                {option}
              </button>
            );
          })}
        </div>

        {isAnswered ? (
          <div className={styles.explanation}>
            <div className={styles.explanationTitle}>Explanation</div>
            <MarkdownView markdown={question.explanation} />
          </div>
        ) : null}
      </div>

      <footer className={styles.footer}>
        <Button
          variant="secondary"
          onClick={() => {
            setQuestionIndex(0);
            setSelected(null);
          }}
          disabled={questionIndex === 0 && !isAnswered}
          title="Reset to first question"
        >
          Reset
        </Button>

        <div className={styles.footerRight}>
          <Button
            variant="secondary"
            onClick={() => {
              setSelected(null);
              setQuestionIndex((i) => Math.max(0, i - 1));
            }}
            disabled={questionIndex === 0}
          >
            Previous
          </Button>

          <Button
            variant="primary"
            onClick={() => {
              if (!canGoNext) return;
              setSelected(null);
              setQuestionIndex((i) => i + 1);
            }}
            disabled={!canGoNext}
          >
            Next
          </Button>
        </div>
      </footer>
    </section>
  );
}
