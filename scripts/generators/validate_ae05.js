const fs = require('fs');
const p = require('path');
const supported = ['plotly', 'falstad-sim', 'v3-load-line', 'v3-waveform', 'v3-plot', 'v3-ohms-law', 'v3-diode-circuit', 'v3-pwl-explorer', 'block-diagram', 'circuit-schematic', 'image', 'image-gallery', 'ohms-law-sim', 'time-domain', 'signal-plot', 'sine-wave', 'discrete-stem', 'circuit', 'vi-curve', 'frequency-spectrum', 'step-function', 'v3-circuit'];
const cs = ['amplifier-classification', 'ideal-vs-practical-amplifiers', 'common-emitter-amplifier', 'common-base-and-common-collector', 'bjt-two-port-analysis'];
const base = 'c:/Users/ShyaBubu/Desktop/Caltronic app/caltronic-v2/src/content/analog-electronics/concepts';

cs.forEach(c => {
    const dir = p.join(base, c);
    const files = ['content.md', 'exam.md', 'quiz.json', 'flashcards.json', 'visuals.json', 'metadata.json'];
    const missing = files.filter(f => !fs.existsSync(p.join(dir, f)));
    if (missing.length) { console.log(c + ': MISSING ' + missing.join(', ')); return; }

    const v = JSON.parse(fs.readFileSync(p.join(dir, 'visuals.json'), 'utf8'));
    const types = [...new Set(v.visuals.map(x => x.type))];
    const bad = types.filter(t => !supported.includes(t));
    const content = fs.readFileSync(p.join(dir, 'content.md'), 'utf8');
    const markers = [...content.matchAll(/\[\[visual:([^\]]+)\]\]/g)].map(m => m[1]);
    const ids = v.visuals.map(x => x.id);
    const miss = markers.filter(m => !ids.includes(m));

    let emptyTraces = 0;
    v.visuals.forEach(vis => {
        if (vis.type === 'plotly' && vis.traces) {
            vis.traces.forEach(t => {
                if (!t.x || (Array.isArray(t.x) && t.x.length === 0)) emptyTraces++;
                if (t.x_expr || t.y_expr) emptyTraces++;
            });
        }
    });

    console.log(c + ': ' + v.visuals.length + ' visuals, types=[' + types.join(',') + ']');
    if (bad.length) console.log('  ❌ BAD: ' + bad.join(','));
    if (emptyTraces) console.log('  ❌ EMPTY/EXPR: ' + emptyTraces);
    if (miss.length) console.log('  ❌ MISSING IDs: ' + miss.join(','));
    if (!bad.length && !emptyTraces && !miss.length) console.log('  ✅ ALL GOOD');
});
