const fs = require('fs');
const p = require('path');

function walk(dir) {
    let files = [];
    for (const f of fs.readdirSync(dir)) {
        const fp = p.join(dir, f);
        if (fs.statSync(fp).isDirectory()) files = files.concat(walk(fp));
        else if (f === 'visuals.json') files.push(fp);
    }
    return files;
}

const base = 'c:/Users/ShyaBubu/Desktop/Caltronic app/caltronic-v2/src/content';
const allFiles = walk(base);
let fixedCount = 0;
let totalTraces = 0;

allFiles.forEach(fp => {
    const v = JSON.parse(fs.readFileSync(fp, 'utf8'));
    let changed = false;

    v.visuals.forEach(vis => {
        if (vis.type !== 'plotly' || !vis.traces) return;

        vis.traces.forEach(trace => {
            if (trace.x_expr) {
                try {
                    trace.x = eval(trace.x_expr);
                    // Round to 4 decimal places to keep JSON small
                    if (Array.isArray(trace.x)) {
                        trace.x = trace.x.map(v => typeof v === 'number' ? Math.round(v * 10000) / 10000 : v);
                    }
                    delete trace.x_expr;
                    changed = true;
                    totalTraces++;
                } catch (e) {
                    console.log('  ERR x_expr:', vis.id, e.message);
                }
            }
            if (trace.y_expr) {
                try {
                    trace.y = eval(trace.y_expr);
                    if (Array.isArray(trace.y)) {
                        trace.y = trace.y.map(v => typeof v === 'number' ? Math.round(v * 10000) / 10000 : v);
                    }
                    delete trace.y_expr;
                    changed = true;
                } catch (e) {
                    console.log('  ERR y_expr:', vis.id, e.message);
                }
            }
        });
    });

    if (changed) {
        fs.writeFileSync(fp, JSON.stringify(v, null, 4));
        fixedCount++;
        const rel = fp.replace(base, '').replace(/\\/g, '/');
        console.log('Fixed:', rel);
    }
});

console.log('\nDone! Fixed ' + fixedCount + ' files, ' + totalTraces + ' traces converted.');
