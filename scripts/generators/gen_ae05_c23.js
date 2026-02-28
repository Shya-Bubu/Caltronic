const fs = require('fs');
const p = require('path');
const base = 'c:/Users/ShyaBubu/Desktop/Caltronic app/caltronic-v2/src/content/analog-electronics/concepts';
const colors = ['#4f8cff', '#ff6b8a', '#2fbf8f', '#f5a623', '#6b62ff', '#ec4899', '#14b8a6'];
function ls(a, b, n) { return Array.from({ length: n }, (_, i) => Math.round((a + i * (b - a) / (n - 1)) * 1e4) / 1e4) }
function writeAll(id, title, contentMd, examMd, quiz, flash, visuals) {
    const dir = p.join(base, id);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(p.join(dir, 'metadata.json'), JSON.stringify({ id, title, contentPath: 'content.md', examPath: 'exam.md', quizPath: 'quiz.json', flashcardsPath: 'flashcards.json', visualsPath: 'visuals.json' }, null, 4));
    fs.writeFileSync(p.join(dir, 'content.md'), contentMd);
    fs.writeFileSync(p.join(dir, 'exam.md'), examMd);
    fs.writeFileSync(p.join(dir, 'quiz.json'), JSON.stringify(quiz, null, 4));
    fs.writeFileSync(p.join(dir, 'flashcards.json'), JSON.stringify(flash, null, 4));
    fs.writeFileSync(p.join(dir, 'visuals.json'), JSON.stringify(visuals, null, 4));
    console.log('Created:', id);
}

// ======== C2: ideal-vs-practical-amplifiers ========
(function () {
    const xRl = ls(0.1, 100, 200);
    const vis = {
        visuals: [
            { id: 'ideal-voltage-transfer', type: 'plotly', title: 'Ideal Voltage Amplifier Transfer', description: 'Linear relationship V_out = A_V × V_in with no saturation or distortion.', traces: [{ x: ls(-1, 1, 100), y: ls(-1, 1, 100).map(v => Math.round(v * 10 * 100) / 100), mode: 'lines', name: 'A_V = 10', line: { color: colors[0], width: 2.5 } }], layout: { xaxis: { title: 'V_in (V)' }, yaxis: { title: 'V_out (V)' }, showlegend: false } },
            { id: 'practical-saturation', type: 'plotly', title: 'Practical Amplifier: Saturation Limits', description: 'Real amplifiers clip at ±V_CC. The linear region is bounded by the supply rails.', traces: [{ x: ls(-2, 2, 200), y: ls(-2, 2, 200).map(v => { const out = v * 10; return Math.round(Math.max(-12, Math.min(12, out)) * 100) / 100 }), mode: 'lines', name: 'With saturation', line: { color: colors[1], width: 2.5 } }, { x: ls(-2, 2, 200), y: ls(-2, 2, 200).map(v => Math.round(v * 10 * 100) / 100), mode: 'lines', name: 'Ideal', line: { color: colors[0], width: 1.5, dash: 'dash' } }], layout: { xaxis: { title: 'V_in (V)' }, yaxis: { title: 'V_out (V)' }, showlegend: true } },
            { id: 'rin-vs-signal-loss', type: 'plotly', title: 'Input Signal Loss vs R_in/R_S Ratio', description: 'As R_in/R_S → ∞, the input voltage divider loss → 0. Need R_in >> R_S for voltage amps.', traces: [{ x: ls(0.1, 100, 200), y: ls(0.1, 100, 200).map(r => Math.round(r / (r + 1) * 1e4) / 1e4), mode: 'lines', name: 'V_in/V_S', line: { color: colors[2], width: 2.5 } }], layout: { xaxis: { title: 'R_in / R_S', type: 'log' }, yaxis: { title: 'V_in / V_S', range: [0, 1.05] }, showlegend: false } },
            { id: 'rout-vs-output-loss', type: 'plotly', title: 'Output Loss vs R_out/R_L Ratio', description: 'For voltage amps: as R_out/R_L → 0, output loss → 0. Smaller R_out is better.', traces: [{ x: ls(0.001, 10, 200), y: ls(0.001, 10, 200).map(r => Math.round(1 / (1 + r) * 1e4) / 1e4), mode: 'lines', name: 'V_out/(A_V·V_in)', line: { color: colors[3], width: 2.5 } }], layout: { xaxis: { title: 'R_out / R_L', type: 'log' }, yaxis: { title: 'Voltage Transfer Ratio', range: [0, 1.05] }, showlegend: false } },
            { id: 'practical-rin-values', type: 'plotly', title: 'Typical R_in Values by Technology', description: 'Op-amps have the highest R_in (10¹² Ω). FETs > BJTs > Power stages.', traces: [{ x: ['Power BJT', 'Small-sig BJT', 'JFET', 'MOSFET', 'Op-amp'], y: [100, 5000, 1e6, 1e10, 1e12], type: 'bar', marker: { color: [colors[1], colors[0], colors[2], colors[4], colors[5]] } }], layout: { xaxis: { title: 'Technology' }, yaxis: { title: 'R_in (Ω)', type: 'log' }, showlegend: false } },
            { id: 'practical-rout-values', type: 'plotly', title: 'Typical R_out Values', description: 'Emitter follower has the lowest R_out (~10 Ω). CE has moderate R_out.', traces: [{ x: ['Emitter Follower', 'Op-amp', 'CE Amplifier', 'Current Mirror'], y: [10, 75, 50000, 1e6], type: 'bar', marker: { color: [colors[2], colors[0], colors[3], colors[4]] } }], layout: { xaxis: { title: 'Circuit' }, yaxis: { title: 'R_out (Ω)', type: 'log' }, showlegend: false } },
            { id: 'gain-bandwidth-tradeoff', type: 'plotly', title: 'Gain-Bandwidth Product Tradeoff', description: 'Practical amplifiers trade gain for bandwidth. The gain-bandwidth product (GBP) is approximately constant.', traces: [{ x: ls(1, 1000, 200), y: ls(1, 1000, 200).map(f => Math.round(1e6 / f * 100) / 100), mode: 'lines', name: 'GBP = 1 MHz', line: { color: colors[0], width: 2.5 } }, { x: ls(1, 1000, 200), y: ls(1, 1000, 200).map(f => Math.round(1e7 / f * 100) / 100), mode: 'lines', name: 'GBP = 10 MHz', line: { color: colors[4], width: 2, dash: 'dash' } }], layout: { xaxis: { title: 'Bandwidth (kHz)', type: 'log' }, yaxis: { title: 'Gain', type: 'log' }, showlegend: true } },
            { id: 'distortion-comparison', type: 'plotly', title: 'Harmonic Distortion: Small vs Large Signal', description: 'Small signal operation keeps THD < 1%. Large signal introduces significant distortion.', traces: [{ x: [1, 2, 3, 4, 5], y: [100, 0.5, 0.1, 0.02, 0.005], type: 'bar', name: 'Small signal', marker: { color: colors[2] } }, { x: [1, 2, 3, 4, 5], y: [100, 15, 8, 3, 1], type: 'bar', name: 'Large signal', marker: { color: colors[1] } }], layout: { xaxis: { title: 'Harmonic Number', dtick: 1 }, yaxis: { title: 'Relative Amplitude (%)', type: 'log' }, showlegend: true, barmode: 'group' } },
            { id: 'input-output-impedance-map', type: 'plotly', title: 'Impedance Requirements Map', description: 'Each amplifier type has specific R_in and R_out requirements for minimal loading.', traces: [{ x: ['Voltage', 'Current', 'Transcon.', 'Transres.'], y: [1e6, 100, 1e6, 100], type: 'bar', name: 'R_in', marker: { color: colors[0] } }, { x: ['Voltage', 'Current', 'Transcon.', 'Transres.'], y: [100, 1e6, 1e6, 100], type: 'bar', name: 'R_out', marker: { color: colors[1] } }], layout: { xaxis: { title: 'Type' }, yaxis: { title: 'Practical Ω', type: 'log' }, barmode: 'group', showlegend: true } },
            { id: 'efficiency-vs-linearity', type: 'plotly', title: 'Class A Efficiency vs Signal Swing', description: 'Class A amplifiers have max 25% efficiency for resistive load. Efficiency increases with signal swing but distortion increases too.', traces: [{ x: ls(0, 1, 100), y: ls(0, 1, 100).map(v => Math.round(v * v * 25 * 100) / 100), mode: 'lines', name: 'η (%)', line: { color: colors[3], width: 2.5 } }], layout: { xaxis: { title: 'Normalized Signal Swing' }, yaxis: { title: 'Efficiency (%)', range: [0, 30] }, showlegend: false } }
        ]
    };
    const cnt = `# Ideal vs Practical Amplifiers

> **Why This Matters**: No real amplifier is ideal. Understanding the gap between theory and practice — saturation, finite impedances, bandwidth limits, and distortion — is what separates textbook analysis from real circuit design.

## The Ideal Amplifier

[[visual:ideal-voltage-transfer]]

An ideal amplifier is a perfect linear machine: $V_{out} = A_V \\cdot V_{in}$ for all values, with infinite bandwidth, zero noise, and no distortion. But reality intervenes.

## Saturation and Clipping

[[visual:practical-saturation]]

Every amplifier has **supply rails** ($\\pm V_{CC}$). When the output tries to exceed these limits, it **clips** — creating severe distortion. The usable linear range is always smaller than the supply range.

## Input and Output Impedance Effects

[[visual:rin-vs-signal-loss]]

[[visual:rout-vs-output-loss]]

The input impedance creates a voltage divider with the source resistance: $V_{in} = V_S \\cdot R_{in}/(R_{in} + R_S)$. Similarly, the output impedance creates a divider with the load.

<details>
<summary><strong>Pause & Think</strong>: What happens if R_in = R_S?</summary>

You lose exactly half the signal voltage! $V_{in}/V_S = R_{in}/(R_{in}+R_S) = 0.5$. This is why we need R_in >> R_S for voltage amplifiers.

</details>

## Practical Values by Technology

[[visual:practical-rin-values]]

[[visual:practical-rout-values]]

## Bandwidth and Distortion

[[visual:gain-bandwidth-tradeoff]]

[[visual:distortion-comparison]]

All practical amplifiers have a **gain-bandwidth product (GBP)** that's roughly constant. Higher gain → lower bandwidth. This fundamental tradeoff governs every amplifier design.

## Impedance Requirements Summary

[[visual:input-output-impedance-map]]

[[visual:efficiency-vs-linearity]]

## Summary

- Real amplifiers clip at supply rails, have finite impedances, limited bandwidth, and introduce distortion
- R_in and R_out create loading effects that reduce actual gain
- GBP is approximately constant — you trade gain for bandwidth
- Small-signal operation keeps distortion low
`;
    writeAll('ideal-vs-practical-amplifiers', 'Ideal vs Practical Amplifiers', cnt,
        `# Exam Preparation: Ideal vs Practical Amplifiers
## How This Is Tested
- Calculate actual gain with specified R_in, R_out, R_S, R_L (8-10 marks)
- Explain saturation and draw clipped output waveform (5 marks)
- Compare technologies by input/output impedance (3-5 marks)
## Common Mistakes
1. Forgetting loading on BOTH input and output sides
2. Not accounting for saturation when signal is large
3. Confusing R_in requirements between amplifier types
`,
        {
            id: 'quiz-ideal-vs-practical', questions: [
                { id: 'q1', prompt: 'If R_in = 10·R_S, what fraction of V_S appears as V_in?', options: ['10/11 ≈ 91%', '1/11 ≈ 9%', '50%', '100%'], correctAnswer: '10/11 ≈ 91%', explanation: 'V_in/V_S = R_in/(R_in+R_S) = 10R_S/(10R_S+R_S) = 10/11 ≈ 91%.' },
                { id: 'q2', prompt: 'An amplifier with A_V=20 and V_CC=±15V will clip when V_in exceeds:', options: ['±0.75V', '±15V', '±1.5V', '±20V'], correctAnswer: '±0.75V', explanation: 'Clipping occurs when A_V×V_in > V_CC. So V_in > 15/20 = 0.75V.' },
                { id: 'q3', prompt: 'If GBP = 1 MHz and gain = 100, the bandwidth is:', options: ['10 kHz', '100 kHz', '1 kHz', '1 MHz'], correctAnswer: '10 kHz', explanation: 'BW = GBP/Gain = 1MHz/100 = 10 kHz.' },
                { id: 'q4', prompt: 'Maximum theoretical efficiency of a Class A amplifier with resistive load:', options: ['25%', '50%', '78.5%', '100%'], correctAnswer: '25%', explanation: 'Class A with resistive load has max η = 25%. With transformer coupling, max is 50%.' },
                { id: 'q5', prompt: 'An amplifier with R_out=1kΩ and R_L=4kΩ delivers what fraction of ideal output?', options: ['80%', '20%', '50%', '90%'], correctAnswer: '80%', explanation: 'R_L/(R_L+R_out) = 4/(4+1) = 0.8 = 80%.' },
                { id: 'q6', prompt: 'Which technology typically has the highest input impedance?', options: ['Power BJT', 'MOSFET', 'JFET', 'Op-amp with FET input'], correctAnswer: 'Op-amp with FET input', explanation: 'FET-input op-amps have R_in up to 10¹² Ω. MOSFETs also have very high R_in due to gate insulation.' },
                { id: 'q7', prompt: 'Total gain with R_in=50kΩ, R_S=5kΩ, A_V=100, R_out=2kΩ, R_L=8kΩ is:', options: ['72.7', '100', '80', '90.9'], correctAnswer: '72.7', explanation: 'Total = A_V × [R_in/(R_in+R_S)] × [R_L/(R_L+R_out)] = 100 × 50/55 × 8/10 = 100 × 0.909 × 0.8 = 72.7.' },
                { id: 'q8', prompt: 'Small-signal operation keeps THD below approximately:', options: ['1%', '10%', '25%', '50%'], correctAnswer: '1%', explanation: 'Small-signal operation linearizes the transistor characteristics, keeping total harmonic distortion well under 1%.' },
                { id: 'q9', prompt: 'An emitter follower (CC) typically has R_out of approximately:', options: ['10 Ω', '1 kΩ', '50 kΩ', '1 MΩ'], correctAnswer: '10 Ω', explanation: 'The CC configuration has very low R_out, typically around r_e = V_T/I_C ≈ 25mV/2.5mA = 10Ω.' },
                { id: 'q10', prompt: 'Doubling the gain of an amplifier while maintaining GBP constant will:', options: ['Halve the bandwidth', 'Double the bandwidth', 'Not affect bandwidth', 'Quadruple the bandwidth'], correctAnswer: 'Halve the bandwidth', explanation: 'If GBP is constant: BW = GBP/Gain. Doubling gain halves BW.' }
            ]
        },
        {
            id: 'flashcards-ideal-vs-practical', cards: [
                { id: 'f1', front: 'What limits the linear range of a real amplifier?', back: 'Supply rail saturation: output clips at ±V_CC. Linear range is V_in < V_CC/A_V.', difficultyLevel: 1 },
                { id: 'f2', front: 'Input loading formula for voltage amplifier?', back: 'V_in = V_S × R_in/(R_in + R_S). Need R_in >> R_S to minimize signal loss.', difficultyLevel: 2 },
                { id: 'f3', front: 'Output loading formula for voltage amplifier?', back: 'V_out = A_V·V_in × R_L/(R_L + R_out). Need R_out << R_L.', difficultyLevel: 2 },
                { id: 'f4', front: 'What is gain-bandwidth product?', back: 'GBP ≈ constant. Higher gain → lower bandwidth. BW = GBP/A_V.', difficultyLevel: 3 },
                { id: 'f5', front: 'Typical R_in of a MOSFET input stage?', back: '~10⁹ to 10¹² Ω due to insulated gate. Much higher than BJT.', difficultyLevel: 3 },
                { id: 'f6', front: 'Why is small-signal operation preferred?', back: 'Keeps operation in the linear region, minimizing THD (< 1%). Large signals cause clipping and harmonic distortion.', difficultyLevel: 3 },
                { id: 'f7', front: 'Max efficiency of Class A with resistive load?', back: '25%. With transformer-coupled load: 50%. Class B theoretical max: 78.5%.', difficultyLevel: 4 },
                { id: 'f8', front: 'Complete voltage gain formula with all loading effects?', back: 'A_total = A_V × [R_in/(R_in+R_S)] × [R_L/(R_L+R_out)]. Three factors multiply.', difficultyLevel: 4 },
                { id: 'f9', front: 'What is THD?', back: 'Total Harmonic Distortion: ratio of harmonic power to fundamental power. Small signal → low THD (< 1%).', difficultyLevel: 3 },
                { id: 'f10', front: 'R_out of emitter follower vs CE?', back: 'CC (emitter follower): ~10-50 Ω. CE: ~10-100 kΩ. CC is much lower — ideal voltage output.', difficultyLevel: 4 }
            ]
        }, vis);
})();

// ======== C3: common-emitter-amplifier ========
(function () {
    const vce = ls(0, 15, 200);
    const ic_ib20 = vce.map(v => v < 0.3 ? Math.round(v / 0.3 * 1 * 1e3) / 1e3 : Math.round(1 * 1e3) / 1e3);
    const ic_ib40 = vce.map(v => v < 0.3 ? Math.round(v / 0.3 * 2 * 1e3) / 1e3 : Math.round(2 * 1e3) / 1e3);
    const ic_ib60 = vce.map(v => v < 0.3 ? Math.round(v / 0.3 * 3 * 1e3) / 1e3 : Math.round(3 * 1e3) / 1e3);
    const vis = {
        visuals: [
            { id: 'ce-circuit-schematic', type: 'plotly', title: 'Common-Emitter Amplifier Circuit', description: 'The CE amplifier: input at base via C_in, output at collector. R_C sets the load, R_E provides DC stability, C_E bypasses R_E for AC.', traces: [{ x: ['Input C_in', 'R₁ Bias', 'R₂ Bias', 'R_E', 'C_E Bypass', 'R_C', 'Output C_out', 'V_CC'], y: [1, 1, 1, 1, 1, 1, 1, 1], type: 'bar', marker: { color: [colors[0], colors[3], colors[3], colors[2], colors[4], colors[1], colors[0], colors[5]] }, text: ['Coupling', '47kΩ', '10kΩ', '1kΩ', '10μF', '4.7kΩ', 'Coupling', '12V'], textposition: 'inside', textfont: { color: '#fff', size: 10 } }], layout: { xaxis: { title: 'Component' }, yaxis: { visible: false }, showlegend: false }, height: 280 },
            { id: 'ce-dc-load-line', type: 'plotly', title: 'CE DC Load Line and Q-Point', description: 'The load line V_CE = V_CC - I_C(R_C + R_E) intersects the BJT curves at the Q-point.', traces: [{ x: [0, 12], y: [2.1, 0], mode: 'lines', name: 'DC Load Line', line: { color: colors[3], width: 2.5 } }, { x: [6], y: [1.05], mode: 'markers', name: 'Q-point', marker: { color: colors[1], size: 12, symbol: 'star' } }, { x: vce, y: ic_ib20, mode: 'lines', name: 'I_B=20μA', line: { color: colors[0], width: 1.5 } }, { x: vce, y: ic_ib40, mode: 'lines', name: 'I_B=40μA', line: { color: colors[2], width: 1.5 } }, { x: vce, y: ic_ib60, mode: 'lines', name: 'I_B=60μA', line: { color: colors[4], width: 1.5 } }], layout: { xaxis: { title: 'V_CE (V)' }, yaxis: { title: 'I_C (mA)' }, showlegend: true } },
            { id: 'ce-voltage-gain', type: 'plotly', title: 'CE Voltage Gain: A_V = -g_m × R_C', description: 'The CE amplifier inverts the signal. Gain magnitude depends on g_m (set by Q-point) and R_C.', traces: [{ x: ls(0.5, 20, 100), y: ls(0.5, 20, 100).map(rc => Math.round(-40 * rc * 100) / 100), mode: 'lines', name: 'g_m = 40 mS', line: { color: colors[0], width: 2.5 } }, { x: ls(0.5, 20, 100), y: ls(0.5, 20, 100).map(rc => Math.round(-20 * rc * 100) / 100), mode: 'lines', name: 'g_m = 20 mS', line: { color: colors[1], width: 2, dash: 'dash' } }], layout: { xaxis: { title: 'R_C (kΩ)' }, yaxis: { title: 'A_V' }, showlegend: true } },
            { id: 'ce-input-impedance', type: 'plotly', title: 'CE Input Impedance: R_in = r_π || R₁ || R₂', description: 'Input impedance is dominated by r_π = β/g_m. For β=100, g_m=40mS: r_π = 2.5kΩ.', traces: [{ x: ls(0, 200, 100), y: ls(0, 200, 100).map(b => { const rpi = b === 0 ? 0 : b / 0.04; return Math.round(1 / (1 / rpi + 1 / 47000 + 1 / 10000) * 10) / 10 }), mode: 'lines', name: 'R_in vs β', line: { color: colors[2], width: 2.5 } }], layout: { xaxis: { title: 'β' }, yaxis: { title: 'R_in (Ω)' }, showlegend: false } },
            { id: 'ce-output-waveform', type: 'plotly', title: 'CE Output: Phase Inversion', description: 'The CE amplifier inverts the signal: positive input → negative output swing. This 180° phase shift is characteristic of CE.', traces: (function () { const t = ls(0, 3, 300); return [{ x: t, y: t.map(v => Math.round(Math.sin(2 * Math.PI * v) * 10 * 100) / 100), mode: 'lines', name: 'V_in × 10', line: { color: colors[0], width: 1.5, dash: 'dash' } }, { x: t, y: t.map(v => Math.round(-Math.sin(2 * Math.PI * v) * 10 * 100 * 8) / 10000), mode: 'lines', name: 'V_out', line: { color: colors[1], width: 2.5 } }] })(), layout: { xaxis: { title: 'Time (ms)' }, yaxis: { title: 'Voltage (mV)' }, showlegend: true } },
            { id: 'ce-frequency-response', type: 'plotly', title: 'CE Frequency Response (Bode Plot)', description: 'Low-frequency cutoff due to coupling/bypass capacitors. High-frequency rolloff due to device capacitances and Miller effect.', traces: [{ x: [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000], y: [0.1, 1, 10, 100, 100, 100, 10, 1], mode: 'lines', name: '|A_V|', line: { color: colors[0], width: 2.5 } }], layout: { xaxis: { title: 'Frequency (Hz)', type: 'log' }, yaxis: { title: '|A_V|', type: 'log' }, showlegend: false } },
            { id: 'ce-power-gain', type: 'plotly', title: 'CE Power Gain — Highest Among BJT Configs', description: 'CE provides high voltage gain AND current gain (β), giving the highest power gain A_P = A_V × A_I.', traces: [{ x: ['CE', 'CB', 'CC'], y: [4000, 400, 200], type: 'bar', name: 'Power Gain', marker: { color: [colors[0], colors[2], colors[4]] }, text: ['A_P ≈ 4000', 'A_P ≈ 400', 'A_P ≈ 200'], textposition: 'outside' }], layout: { xaxis: { title: 'Configuration' }, yaxis: { title: 'Power Gain' }, showlegend: false } },
            { id: 'ce-analysis-summary', type: 'plotly', title: 'CE Small-Signal Parameters Summary', description: 'Key parameters: A_V = -g_m·R_C, R_in ≈ r_π, R_out ≈ R_C, A_I ≈ β.', traces: [{ x: ['A_V', 'R_in (kΩ)', 'R_out (kΩ)', 'A_I (β)'], y: [160, 2.5, 4.7, 100], type: 'bar', marker: { color: [colors[0], colors[2], colors[3], colors[4]] }, text: ['-g_m·R_C', 'r_π', 'R_C', 'β'], textposition: 'outside' }], layout: { xaxis: { title: 'Parameter' }, yaxis: { title: 'Value' }, showlegend: false } },
            { id: 'ce-emitter-degeneration', type: 'plotly', title: 'Effect of Emitter Degeneration (Unbypassed R_E)', description: 'Adding R_E in the AC path reduces gain but improves linearity and stability. A_V = -R_C/(r_e + R_E).', traces: [{ x: ls(0, 500, 100), y: ls(0, 500, 100).map(re => Math.round(-4700 / (25 + re) * 100) / 100), mode: 'lines', name: 'A_V vs R_E', line: { color: colors[0], width: 2.5 } }], layout: { xaxis: { title: 'R_E (Ω)' }, yaxis: { title: 'A_V' }, showlegend: false } },
            { id: 'ce-thermal-stability', type: 'plotly', title: 'Thermal Stability: I_C vs Temperature', description: 'Without R_E, I_C increases with temperature (thermal runaway). R_E provides negative feedback for thermal stability.', traces: [{ x: ls(25, 85, 100), y: ls(25, 85, 100).map(t => Math.round((1 + 0.07 * (t - 25)) * 1e3) / 1e3), mode: 'lines', name: 'Without R_E', line: { color: colors[1], width: 2.5 } }, { x: ls(25, 85, 100), y: ls(25, 85, 100).map(t => Math.round((1 + 0.005 * (t - 25)) * 1e3) / 1e3), mode: 'lines', name: 'With R_E', line: { color: colors[2], width: 2.5 } }], layout: { xaxis: { title: 'Temperature (°C)' }, yaxis: { title: 'I_C (mA)' }, showlegend: true } }
        ]
    };
    writeAll('common-emitter-amplifier', 'Common-Emitter Amplifier',
        `# Common-Emitter Amplifier

> **Why This Matters**: The CE configuration is the **workhorse** of analog electronics. It's the most commonly used BJT amplifier because it provides high voltage gain, high current gain, and the highest power gain of any single-transistor configuration.

## The CE Circuit

[[visual:ce-circuit-schematic]]

[[visual:ce-dc-load-line]]

The CE amplifier has the input applied to the base and the output taken from the collector. The emitter is the common terminal (shared between input and output circuits).

## Voltage Gain

[[visual:ce-voltage-gain]]

The voltage gain is: $A_V = -g_m \\cdot R_C$, where $g_m = I_C/V_T$ is the transconductance. The negative sign means the CE **inverts** the signal.

[[visual:ce-output-waveform]]

<details>
<summary><strong>Pause & Think</strong>: Why is the output inverted?</summary>

When $V_{BE}$ increases, $I_C$ increases, which increases the voltage drop across $R_C$. Since $V_{CE} = V_{CC} - I_C R_C$, a larger $I_C$ causes a *decrease* in $V_{CE}$. So positive input → negative output.

</details>

## Input and Output Impedance

[[visual:ce-input-impedance]]

The input impedance is: $R_{in} = r_\\pi \\| R_1 \\| R_2$, where $r_\\pi = \\beta/g_m$. The output impedance is approximately $R_{out} \\approx R_C$.

## Frequency Response and Power

[[visual:ce-frequency-response]]

[[visual:ce-power-gain]]

## Emitter Degeneration

[[visual:ce-emitter-degeneration]]

[[visual:ce-thermal-stability]]

## Parameter Summary

[[visual:ce-analysis-summary]]

## Summary

- CE provides the highest power gain of all BJT configurations
- $A_V = -g_m R_C$ (inverting), $R_{in} \\approx r_\\pi$, $R_{out} \\approx R_C$
- Emitter degeneration trades gain for stability and linearity
- Phase inversion (180°) is the signature of CE operation
`,
        `# Exam Preparation: Common-Emitter Amplifier
## How This Is Tested
- Calculate A_V, R_in, R_out from given circuit values (10-12 marks)
- Draw small-signal equivalent circuit (5-8 marks)
- Explain phase inversion and thermal stability (3-5 marks)
## Common Mistakes
1. Forgetting the negative sign in A_V (CE inverts!)
2. Not including R₁||R₂ in the input impedance calculation
3. Confusing bypassed vs unbypassed R_E analysis
`, {
        id: 'quiz-ce', questions: [
            { id: 'q1', prompt: 'The CE amplifier voltage gain A_V equals:', options: ['-g_m × R_C', 'g_m × R_C', 'β × R_C', 'R_C / r_π'], correctAnswer: '-g_m × R_C', explanation: 'A_V = -g_m·R_C. The negative sign indicates phase inversion (180°).' },
            { id: 'q2', prompt: 'The input impedance of a CE amplifier is:', options: ['r_π || R₁ || R₂', 'R_C', 'r_π only', 'R₁ + R₂'], correctAnswer: 'r_π || R₁ || R₂', explanation: 'R_in = r_π || R₁ || R₂. The bias resistors are in parallel with r_π from the small-signal perspective.' },
            { id: 'q3', prompt: 'The CE amplifier output is:', options: ['Inverted (180° shift)', 'Non-inverted (0° shift)', '90° shifted', '45° shifted'], correctAnswer: 'Inverted (180° shift)', explanation: 'CE inverts: when V_in increases, I_C increases, V_RC increases, so V_CE decreases. Positive input → negative output.' },
            { id: 'q4', prompt: 'Adding unbypassed R_E to a CE amplifier will:', options: ['Reduce gain but improve stability', 'Increase gain', 'Have no effect on gain', 'Reduce both gain and stability'], correctAnswer: 'Reduce gain but improve stability', explanation: 'With R_E: A_V = -R_C/(r_e + R_E). Gain drops but linearity and thermal stability improve via negative feedback.' },
            { id: 'q5', prompt: 'If I_C = 1 mA at room temperature, g_m equals:', options: ['40 mA/V', '25 mA/V', '100 mA/V', '1 mA/V'], correctAnswer: '40 mA/V', explanation: 'g_m = I_C/V_T = 1mA/25mV = 40 mA/V. At room temperature V_T ≈ 25 mV.' },
            { id: 'q6', prompt: 'r_π for β=100 and g_m=40mS is:', options: ['2.5 kΩ', '100 kΩ', '40 kΩ', '250 Ω'], correctAnswer: '2.5 kΩ', explanation: 'r_π = β/g_m = 100/0.04 = 2500 Ω = 2.5 kΩ.' },
            { id: 'q7', prompt: 'The output impedance of a CE amplifier (with Early effect neglected) is approximately:', options: ['R_C', 'r_π', 'R_E', 'β × R_C'], correctAnswer: 'R_C', explanation: 'R_out ≈ R_C when early effect (r_o) is neglected. With r_o: R_out = R_C || r_o.' },
            { id: 'q8', prompt: 'Why is the CE configuration the most commonly used BJT amplifier?', options: ['Highest power gain', 'Lowest input impedance', 'Highest output impedance', 'No phase inversion'], correctAnswer: 'Highest power gain', explanation: 'CE has both high voltage gain and high current gain (β), giving the highest power gain A_P = |A_V| × A_I among all three BJT configs.' },
            { id: 'q9', prompt: 'The bypass capacitor C_E is used to:', options: ['Short R_E for AC signals', 'Short R_C for AC signals', 'Block DC from the output', 'Set the bias point'], correctAnswer: 'Short R_E for AC signals', explanation: 'C_E bypasses R_E for AC, restoring the full gain -g_m·R_C. Without C_E, gain is reduced to -R_C/(r_e+R_E).' },
            { id: 'q10', prompt: 'If R_C = 5kΩ and g_m = 40mS, the CE voltage gain magnitude is:', options: ['200', '5', '0.008', '40'], correctAnswer: '200', explanation: '|A_V| = g_m × R_C = 0.04 × 5000 = 200.' }
        ]
    }, {
        id: 'flashcards-ce', cards: [
            { id: 'f1', front: 'CE voltage gain formula?', back: 'A_V = -g_m × R_C. Negative = phase inversion. g_m = I_C/V_T.', difficultyLevel: 1 },
            { id: 'f2', front: 'CE input impedance?', back: 'R_in = r_π || R₁ || R₂, where r_π = β/g_m.', difficultyLevel: 2 },
            { id: 'f3', front: 'CE output impedance?', back: 'R_out ≈ R_C (neglecting r_o). With Early effect: R_out = R_C || r_o.', difficultyLevel: 2 },
            { id: 'f4', front: 'What does C_E (bypass capacitor) do?', back: 'Shorts R_E for AC signals → restores full gain -g_m·R_C. Without it, gain = -R_C/(r_e+R_E).', difficultyLevel: 3 },
            { id: 'f5', front: 'Why does CE invert the signal?', back: '↑V_in → ↑I_C → ↑V_RC → ↓V_CE. More current through R_C drops more voltage, reducing V_CE.', difficultyLevel: 3 },
            { id: 'f6', front: 'g_m at I_C = 2mA, room temp?', back: 'g_m = I_C/V_T = 2mA/25mV = 80 mA/V = 80 mS.', difficultyLevel: 2 },
            { id: 'f7', front: 'CE current gain?', back: 'A_I ≈ β. The CE configuration provides full current amplification.', difficultyLevel: 3 },
            { id: 'f8', front: 'Effect of emitter degeneration?', back: 'Unbypassed R_E: A_V = -R_C/(r_e + R_E). Lower gain but better linearity and thermal stability via negative feedback.', difficultyLevel: 4 },
            { id: 'f9', front: 'CE power gain compared to CB and CC?', back: 'CE has the HIGHEST power gain (A_P = |A_V| × A_I). CB has lower current gain. CC has lower voltage gain.', difficultyLevel: 4 },
            { id: 'f10', front: 'What causes thermal runaway and how does R_E prevent it?', back: '↑T → ↑I_C → ↑power → ↑T (positive feedback). R_E: ↑I_C → ↑V_RE → ↓V_BE → ↓I_C (negative feedback).', difficultyLevel: 5 }
        ]
    }, vis);
})();

console.log('Concepts 2-3 done!');
