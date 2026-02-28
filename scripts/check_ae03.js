const fs = require('fs'), p = require('path');
const base = 'c:/Users/ShyaBubu/Desktop/Caltronic app/caltronic-v2/src/content/analog-electronics/concepts';
['nonlinear-elements-and-vi-characteristics', 'dependent-sources', 'diode-models', 'bjt-structure-and-models', 'mosfet-models-and-regions'].forEach(c => {
    const cm = fs.readFileSync(p.join(base, c, 'content.md'), 'utf8');
    const vm = JSON.parse(fs.readFileSync(p.join(base, c, 'visuals.json'), 'utf8'));
    const cIds = [...cm.matchAll(/\[\[visual:(.+?)\]\]/g)].map(m => m[1]);
    const vIds = vm.visuals.map(v => v.id);
    const missing = cIds.filter(id => !vIds.includes(id));
    const unused = vIds.filter(id => !cIds.includes(id));
    console.log('\n' + c + ': ' + cm.split('\n').length + ' lines, ' + cIds.length + ' refs, ' + vIds.length + ' visuals');
    if (missing.length) console.log('  MISSING:', missing.join(', '));
    if (unused.length) console.log('  UNUSED:', unused.join(', '));
    const headings = cm.match(/^## .*/gm);
    if (headings) console.log('  HEADINGS:', headings.join(' | '));
});
