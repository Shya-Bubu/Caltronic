const fs = require('fs');
const p = require('path');
const supported = ['plotly', 'falstad-sim', 'v3-load-line', 'v3-waveform', 'v3-plot', 'v3-ohms-law', 'v3-diode-circuit', 'v3-pwl-explorer', 'block-diagram', 'circuit-schematic', 'image', 'image-gallery', 'ohms-law-sim', 'time-domain', 'signal-plot', 'sine-wave', 'discrete-stem', 'circuit', 'vi-curve', 'frequency-spectrum', 'step-function', 'v3-circuit'];
const cs = ['why-biasing-is-needed', 'fixed-bias-circuit', 'voltage-divider-bias', 'dc-and-ac-load-lines', 'bjt-hybrid-pi-model'];
const base = 'c:/Users/ShyaBubu/Desktop/Caltronic app/caltronic-v2/src/content/analog-electronics/concepts';

cs.forEach(c => {
    const dir = p.join(base, c);
    const v = JSON.parse(fs.readFileSync(p.join(dir, 'visuals.json'), 'utf8'));
    const types = [...new Set(v.visuals.map(x => x.type))];
    const bad = types.filter(t => !supported.includes(t));
    const hasExpr = v.visuals.some(vis => vis.traces && vis.traces.some(t => t.x_expr || t.y_expr));
    const hasWf = v.visuals.filter(x => x.type === 'v3-waveform').length;

    const content = fs.readFileSync(p.join(dir, 'content.md'), 'utf8');
    const markers = [...content.matchAll(/\[\[visual:([^\]]+)\]\]/g)].map(m => m[1]);
    const ids = v.visuals.map(x => x.id);
    const miss = markers.filter(m => !ids.includes(m));
    const unused = ids.filter(i => !markers.includes(i));

    // Check plotly traces have static x/y
    let emptyTraces = 0;
    v.visuals.forEach(vis => {
        if (vis.type === 'plotly' && vis.traces) {
            vis.traces.forEach(t => {
                if (!t.x && !t.x_expr) emptyTraces++;
                if (t.x && t.x.length === 0) emptyTraces++;
            });
        }
    });

    console.log(c + ': ' + v.visuals.length + ' visuals');
    console.log('  types: [' + types.join(', ') + ']');
    if (bad.length) console.log('  ❌ BAD TYPES: ' + bad.join(', '));
    if (hasExpr) console.log('  ❌ HAS x_expr/y_expr!');
    if (hasWf) console.log('  ⚠️  v3-waveform: ' + hasWf);
    if (emptyTraces) console.log('  ❌ Empty traces: ' + emptyTraces);
    if (miss.length) console.log('  ❌ MISSING from JSON: ' + miss.join(', '));
    if (unused.length) console.log('  ⚠️  Unused in JSON: ' + unused.join(', '));
    if (!bad.length && !hasExpr && !hasWf && !miss.length && !emptyTraces)
        console.log('  ✅ ALL GOOD');
});
