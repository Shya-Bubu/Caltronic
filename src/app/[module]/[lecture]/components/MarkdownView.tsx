import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';

import styles from './MarkdownView.module.css';
import remarkInlineVisuals from './remarkInlineVisuals';
import SimulationInline from './SimulationInline';

export default function MarkdownView({
  markdown,
  visuals,
}: {
  markdown: string;
  visuals?: unknown;
}) {
  const components = {
    table: ({ children, ...props }: { children: React.ReactNode }) => (
      <div className={styles.tableWrap}>
        <table {...(props as Record<string, unknown>)}>{children}</table>
      </div>
    ),
  } as unknown as Record<string, unknown>;

  components['simulation-inline'] = (props: unknown) => {
    const visualId = String((props as Record<string, unknown>).visualId ?? '');
    if (!visualId || visuals === undefined) {
      return (
        <div
          style={{
            margin: '1rem 0',
            border: '1px solid rgba(255, 180, 80, 0.35)',
            borderRadius: 'var(--radius)',
            padding: '0.85rem 1rem',
            color: 'var(--muted)',
            background: 'rgba(255, 180, 80, 0.06)',
          }}
        >
          Inline visual marker is missing context.
        </div>
      );
    }
    return <SimulationInline visualId={visualId} visuals={visuals} />;
  };

  return (
    <div className={styles.markdown}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath, remarkInlineVisuals]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={components as never}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
