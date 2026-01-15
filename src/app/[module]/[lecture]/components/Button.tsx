import type { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  leftSlot?: ReactNode;
}

export default function Button({
  variant = 'secondary',
  leftSlot,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...props}>
      {leftSlot ? <span className={styles.leftSlot}>{leftSlot}</span> : null}
      <span className={styles.label}>{children}</span>
    </button>
  );
}
