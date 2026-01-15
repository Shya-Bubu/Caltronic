type MdastNode = {
  type: string;
  value?: unknown;
  children?: MdastNode[];
  data?: Record<string, unknown>;
};

function isText(node: MdastNode): node is MdastNode & { type: 'text'; value: string } {
  return node.type === 'text' && typeof node.value === 'string';
}

function makeParagraph(children: MdastNode[]): MdastNode {
  return { type: 'paragraph', children };
}

function makeVisualNode(visualId: string): MdastNode {
  return {
    type: 'visualBlock',
    data: {
      hName: 'simulation-inline',
      hProperties: {
        visualId,
      },
    },
  };
}

const ANY_VISUAL_RE = /\[\[visual:([^\]]+)\]\]|:::\s*visual\s+([^:\s]+)\s*:::/g;

function splitTextByMarkers(text: string): Array<{ kind: 'text'; value: string } | { kind: 'visual'; id: string }> {
  const parts: Array<{ kind: 'text'; value: string } | { kind: 'visual'; id: string }> = [];

  // Global regex; reset state for deterministic parsing.
  ANY_VISUAL_RE.lastIndex = 0;

  let lastIndex = 0;
  for (;;) {
    const match = ANY_VISUAL_RE.exec(text);
    if (!match) break;

    const start = match.index;
    const end = start + match[0].length;

    if (start > lastIndex) {
      parts.push({ kind: 'text', value: text.slice(lastIndex, start) });
    }

    const rawId = (match[1] ?? match[2] ?? '').trim();
    if (rawId) {
      parts.push({ kind: 'visual', id: rawId });
    } else {
      parts.push({ kind: 'text', value: match[0] });
    }

    lastIndex = end;
  }

  if (lastIndex < text.length) {
    parts.push({ kind: 'text', value: text.slice(lastIndex) });
  }

  return parts;
}

/**
 * remark plugin: replaces `[[visual:visual-id]]` markers with a custom mdast node.
 *
 * - No MDX
 * - No raw HTML parsing
 * - Deterministic transformation
 *
 * The node becomes a hast element via `data.hName` / `data.hProperties`.
 */
export default function remarkInlineVisuals() {
  return (tree: MdastNode) => {
    const visit = (node: MdastNode) => {
      if (!node.children || node.children.length === 0) return;

      // Rewrite paragraphs in-place, potentially replacing one paragraph with many nodes.
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];

        if (child.type === 'paragraph' && Array.isArray(child.children)) {
          const out: MdastNode[] = [];
          let currentChildren: MdastNode[] = [];

          const flushParagraph = () => {
            const hasContent = currentChildren.some(
              (c) => !(isText(c) && c.value.length === 0)
            );
            if (hasContent) out.push(makeParagraph(currentChildren));
            currentChildren = [];
          };

          for (const paraChild of child.children) {
            if (!isText(paraChild)) {
              currentChildren.push(paraChild);
              continue;
            }

            const text = paraChild.value;
            const parts = splitTextByMarkers(text);
            for (const part of parts) {
              if (part.kind === 'text') {
                if (part.value.length > 0) currentChildren.push({ type: 'text', value: part.value });
              } else {
                flushParagraph();
                out.push(makeVisualNode(part.id));
              }
            }
          }

          flushParagraph();

          // If nothing changed, continue.
          const didChange =
            out.length !== 1 ||
            out[0]?.type !== 'paragraph' ||
            (out[0]?.children?.length ?? 0) !== (child.children?.length ?? 0);

          if (didChange) {
            node.children.splice(i, 1, ...out);
            i += out.length - 1;
            continue;
          }
        }

        // Recurse
        visit(child);
      }
    };

    visit(tree);
  };
}
