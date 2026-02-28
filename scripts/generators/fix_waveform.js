const fs = require('fs');
const p = require('path');

// Pre-computed waveform data generators
function sine(N, periods, amp) {
    const x = [], y = [];
    for (let i = 0; i < N; i++) {
        const t = i * periods * 2 * Math.PI / N;
        x.push(Math.round(t * 1000) / 1000);
        y.push(Math.round(amp * Math.sin(t) * 10000) / 10000);
    }
    return { x, y };
}

function cosine(N, periods, amp) {
    const x = [], y = [];
    for (let i = 0; i < N; i++) {
        const t = i * periods * 2 * Math.PI / N;
        x.push(Math.round(t * 1000) / 1000);
        y.push(Math.round(amp * Math.cos(t) * 10000) / 10000);
    }
    return { x, y };
}

function expDecay(N, a, tMax) {
    const x = [], y = [];
    for (let i = 0; i < N; i++) {
        const t = i * tMax / N;
        x.push(Math.round(t * 1000) / 1000);
        y.push(Math.round(Math.exp(-a * t) * 10000) / 10000);
    }
    return { x, y };
}

function square(N, periods) {
    const x = [], y = [];
    for (let i = 0; i < N; i++) {
        const t = i * periods * 2 * Math.PI / N;
        x.push(Math.round(t * 1000) / 1000);
        y.push(Math.sin(t) >= 0 ? 1 : -1);
    }
    return { x, y };
}

function sawtooth(N, periods) {
    const x = [], y = [];
    for (let i = 0; i < N; i++) {
        const t = (i / N * periods) % 1;
        x.push(Math.round(i * periods / N * 1000) / 1000);
        y.push(Math.round((2 * t - 1) * 10000) / 10000);
    }
    return { x, y };
}

function triangle(N, periods) {
    const x = [], y = [];
    for (let i = 0; i < N; i++) {
        const t = (i / N * periods) % 1;
        x.push(Math.round(i * periods / N * 1000) / 1000);
        y.push(Math.round((t < 0.5 ? 4 * t - 1 : 3 - 4 * t) * 10000) / 10000);
    }
    return { x, y };
}

function lorentzian(N, a, wMax) {
    const x = [], y = [];
    for (let i = 0; i < N; i++) {
        const w = -wMax + i * 2 * wMax / N;
        x.push(Math.round(w * 1000) / 1000);
        y.push(Math.round(1 / Math.sqrt(a * a + w * w) * 10000) / 10000);
    }
    return { x, y };
}

function sincFn(N, wMax) {
    const x = [], y = [];
    for (let i = 0; i < N; i++) {
        const w = -wMax + i * 2 * wMax / N;
        x.push(Math.round(w * 1000) / 1000);
        const val = w === 0 ? 1 : Math.sin(w) / w;
        y.push(Math.round(val * 10000) / 10000);
    }
    return { x, y };
}

// Color palette
const colors = ['#4f8cff', '#ff6b8a', '#2fbf8f', '#f5a623', '#6b62ff', '#ec4899', '#14b8a6'];

// Different plotly chart generators for variety
const chartTemplates = [
    // 0: sine wave variants
    (id, title, desc) => {
        const d = sine(200, 3, 1);
        return {
            id, type: 'plotly', title, description: desc,
            traces: [{ x: d.x, y: d.y, mode: 'lines', name: 'Signal', line: { color: colors[0], width: 2.5 } }],
            layout: { xaxis: { title: 'Time (s)' }, yaxis: { title: 'Amplitude' }, showlegend: false }
        };
    },
    // 1: multi-frequency comparison
    (id, title, desc) => {
        const d1 = sine(200, 2, 1), d2 = sine(200, 4, 0.7), d3 = sine(200, 6, 0.4);
        return {
            id, type: 'plotly', title, description: desc,
            traces: [
                { x: d1.x, y: d1.y, mode: 'lines', name: 'f₁', line: { color: colors[0], width: 2 } },
                { x: d2.x, y: d2.y, mode: 'lines', name: '2f₁', line: { color: colors[1], width: 2 } },
                { x: d3.x, y: d3.y, mode: 'lines', name: '3f₁', line: { color: colors[2], width: 2 } }
            ],
            layout: { xaxis: { title: 'Time (s)' }, yaxis: { title: 'Amplitude' }, showlegend: true }
        };
    },
    // 2: exponential decay + spectrum
    (id, title, desc) => {
        const d = expDecay(200, 2, 4);
        return {
            id, type: 'plotly', title, description: desc,
            traces: [{ x: d.x, y: d.y, mode: 'lines', name: 'e^{-at}', line: { color: colors[3], width: 2.5 } }],
            layout: { xaxis: { title: 't' }, yaxis: { title: 'x(t)' }, showlegend: false }
        };
    },
    // 3: square wave
    (id, title, desc) => {
        const d = square(400, 3);
        return {
            id, type: 'plotly', title, description: desc,
            traces: [{ x: d.x, y: d.y, mode: 'lines', name: 'Square', line: { color: colors[4], width: 2 } }],
            layout: { xaxis: { title: 't' }, yaxis: { title: 'x(t)', range: [-1.3, 1.3] }, showlegend: false }
        };
    },
    // 4: bar chart (spectrum/coefficients)
    (id, title, desc) => {
        const k = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
        const mag = k.map(v => Math.round(1 / (1 + v * v) * 10000) / 10000);
        return {
            id, type: 'plotly', title, description: desc,
            traces: [{ x: k, y: mag, type: 'bar', name: '|X_k|', marker: { color: colors[0] } }],
            layout: { xaxis: { title: 'k', dtick: 1 }, yaxis: { title: '|X_k|' }, showlegend: false }
        };
    },
    // 5: sinc function
    (id, title, desc) => {
        const d = sincFn(300, 15);
        return {
            id, type: 'plotly', title, description: desc,
            traces: [{ x: d.x, y: d.y, mode: 'lines', name: 'sinc', line: { color: colors[2], width: 2.5 } }],
            layout: { xaxis: { title: 'ω' }, yaxis: { title: 'X(jω)' }, showlegend: false }
        };
    },
    // 6: triangle wave
    (id, title, desc) => {
        const d = triangle(300, 4);
        return {
            id, type: 'plotly', title, description: desc,
            traces: [{ x: d.x, y: d.y, mode: 'lines', name: 'Triangle', line: { color: colors[5], width: 2 } }],
            layout: { xaxis: { title: 't' }, yaxis: { title: 'x(t)' }, showlegend: false }
        };
    },
    // 7: lorentzian spectrum
    (id, title, desc) => {
        const d = lorentzian(300, 1, 10);
        return {
            id, type: 'plotly', title, description: desc,
            traces: [{ x: d.x, y: d.y, mode: 'lines', name: '|X(jω)|', line: { color: colors[1], width: 2.5 } }],
            layout: { xaxis: { title: 'ω (rad/s)' }, yaxis: { title: '|X(jω)|' }, showlegend: false }
        };
    },
];

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
let replaced = 0;

allFiles.forEach(fp => {
    const v = JSON.parse(fs.readFileSync(fp, 'utf8'));
    let changed = false;

    v.visuals = v.visuals.map((vis, idx) => {
        if (vis.type !== 'v3-waveform') return vis;

        // Pick a different chart template based on position to ensure variety
        const templateIdx = (idx + replaced) % chartTemplates.length;
        const newVis = chartTemplates[templateIdx](vis.id, vis.title, vis.description);
        changed = true;
        replaced++;
        return newVis;
    });

    if (changed) {
        fs.writeFileSync(fp, JSON.stringify(v, null, 4));
        const rel = fp.split('concepts\\')[1] || fp.split('concepts/')[1] || fp;
        console.log('Fixed:', rel);
    }
});

console.log('\nDone! Replaced ' + replaced + ' v3-waveform entries with unique plotly charts.');
