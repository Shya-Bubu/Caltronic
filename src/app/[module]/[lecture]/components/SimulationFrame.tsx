import styles from './SimulationFrame.module.css';
import VisualRenderer from './VisualRenderer';
import { parseVisualRoot } from './visualsSchema';

export default function SimulationFrame({ visuals }: { visuals: unknown }) {
  const root = parseVisualRoot(visuals);
  const items = root?.visuals ?? [];

  return (
    <section className={styles.wrap} aria-label="Visuals">
      <header className={styles.header}>
        <div>
          <div className={styles.kicker}>Visuals</div>
          <h3 className={styles.title}>Simulation Host (placeholders)</h3>
        </div>
        <div className={styles.meta}>SVG/canvas later</div>
      </header>

      <div className={styles.body}>
        {items.length === 0 ? (
          <div className={styles.empty}>No visuals found in visuals.json.</div>
        ) : (
          <div className={styles.grid}>
            {items.map((item, index) => {
              const title = item.title ?? `Visual ${index + 1}`;
              const type = item.type ?? 'unknown';
              const description = item.description ?? '';

              const key = item.id ?? `${type}-${index}`;

              if (type === 'time-domain' || type === 'signal-plot') {
                return (
                  <div key={key} className={styles.simCard}>
                    <VisualRenderer item={item} fallbackTitle={title} />
                  </div>
                );
              }

              const tableInfo =
                type === 'table' && Array.isArray(item.columns) && Array.isArray(item.rows)
                  ? `${item.columns.length} columns • ${item.rows.length} rows`
                  : null;

              const hasElements = item.elements !== undefined;

              return (
                <div key={key} className={styles.card}>
                  <div className={styles.cardTop}>
                    <div className={styles.cardTitle}>{title}</div>
                    <div className={styles.cardType}>{type}</div>
                  </div>
                  {description ? <div className={styles.cardDesc}>{description}</div> : null}
                  {tableInfo ? <div className={styles.cardMeta}>{tableInfo}</div> : null}
                  {hasElements ? <div className={styles.cardMeta}>Structured elements</div> : null}

                  <div className={styles.placeholder}>
                    Placeholder rendering for <span className={styles.mono}>{type}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <details className={styles.details}>
          <summary>Raw visuals.json</summary>
          <pre className={styles.pre}>{JSON.stringify(visuals, null, 2)}</pre>
        </details>
      </div>
    </section>
  );
}
