const fs = require('fs');
const p = require('path');
const base = 'c:/Users/ShyaBubu/Desktop/Caltronic app/caltronic-v2/src/content/circuit-analysis/concepts';

const cs = ['newton-raphson-circuits', 'nodal-analysis', 'tableau-analysis'];

cs.forEach(c => {
    const fp = p.join(base, c, 'visuals.json');
    const v = JSON.parse(fs.readFileSync(fp, 'utf8'));

    v.visuals.forEach(vis => {
        const keepTypes = ['plotly', 'falstad-sim', 'v3-load-line', 'v3-waveform', 'v3-plot', 'v3-ohms-law', 'v3-diode-circuit', 'v3-pwl-explorer', 'block-diagram', 'circuit-schematic', 'image', 'image-gallery', 'ohms-law-sim', 'time-domain', 'signal-plot', 'sine-wave', 'discrete-stem', 'circuit', 'vi-curve', 'frequency-spectrum', 'step-function', 'v3-circuit'];

        if (!keepTypes.includes(vis.type)) {
            // Convert everything unsupported to plotly
            vis.type = 'plotly';

            // Clear out any unsupported properties
            const keysToKeep = ['id', 'type', 'title', 'description', 'traces', 'layout', 'height', 'width'];
            Object.keys(vis).forEach(k => {
                if (!keysToKeep.includes(k)) delete vis[k];
            });

            // If no traces exist, create a simple bar representation
            if (!vis.traces) {
                vis.traces = [{
                    x: [vis.title || 'Visual'],
                    y: [1],
                    type: 'bar',
                    marker: { color: ['#4f8cff'] },
                    text: [vis.description ? vis.description.substring(0, 80) : ''],
                    textposition: 'inside',
                    textfont: { size: 10, color: '#ffffff' },
                    showlegend: false,
                    hoverinfo: 'none'
                }];
                vis.layout = {
                    xaxis: { title: '' },
                    yaxis: { visible: false, range: [0, 1.3] },
                    showlegend: false
                };
                vis.height = 250;
            }
        }
    });

    fs.writeFileSync(fp, JSON.stringify(v, null, 4));
    const types = [...new Set(v.visuals.map(x => x.type))];
    console.log('Fixed:', c, '- types:', types.join(', '));
});
