import styles from './SimulationInline.module.css';

import VisualRenderer from './VisualRenderer';
import { parseVisualRoot } from './visualsSchema';

export default function SimulationInline({
  visualId,
  visuals,
}: {
  visualId: string;
  visuals: unknown;
}) {
  const root = parseVisualRoot(visuals);
  const items = root?.visuals ?? [];

  const item = items.find((v) => v.id === visualId);

  if (!item) {
    return (
      <aside className={styles.missing} aria-label="Missing visual">
        <div className={styles.missingTitle}>Missing visual</div>
        <div className={styles.missingBody}>
          Inline marker references <span className={styles.mono}>[[visual:{visualId}]]</span>, but no
          matching entry was found in <span className={styles.mono}>concept.layers.visuals</span>.
        </div>
      </aside>
    );
  }

  return (
    <div className={styles.inline} data-visual-id={visualId}>
      <VisualRenderer item={item} fallbackTitle={`Visual: ${visualId}`} />
    </div>
  );
}
