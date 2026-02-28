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

// ======== C4: common-base-and-common-collector ========
(function () {
    const vis = {
        visuals: [
            { id: 'cb-circuit-overview', type: 'plotly', title: 'Common-Base Configuration', description: 'CB: input at emitter, output at collector, base is common. Non-inverting with high voltage gain but current gain ≈ 1 (α).', traces: [{ x: ['Input (Emitter)', 'Base (Common)', 'Output (Collector)', 'R_C', 'V_CC'], y: [1, 1, 1, 1, 1], type: 'bar', marker: { color: [colors[0], colors[4], colors[1], colors[3], colors[5]] }, text: ['V_in', 'AC Ground', 'V_out', '4.7kΩ', '12V'], textposition: 'inside', textfont: { color: '#fff', size: 11 } }], layout: { xaxis: { title: 'Terminal' }, yaxis: { visible: false }, showlegend: false }, height: 260 },
            { id: 'cc-circuit-overview', type: 'plotly', title: 'Common-Collector (Emitter Follower) Configuration', description: 'CC: input at base, output at emitter, collector is common. A_V ≈ 1, high current gain (β+1), very low R_out.', traces: [{ x: ['Input (Base)', 'Collector (Common)', 'Output (Emitter)', 'R_E', 'V_CC'], y: [1, 1, 1, 1, 1], type: 'bar', marker: { color: [colors[0], colors[4], colors[2], colors[3], colors[5]] }, text: ['V_in', 'AC Ground', 'V_out', '1kΩ', '12V'], textposition: 'inside', textfont: { color: '#fff', size: 11 } }], layout: { xaxis: { title: 'Terminal' }, yaxis: { visible: false }, showlegend: false }, height: 260 },
            { id: 'three-config-gain-comparison', type: 'plotly', title: 'Voltage Gain Comparison: CE vs CB vs CC', description: 'CE and CB have high voltage gain. CC has gain ≈ 1 (voltage follower). CE inverts; CB and CC do not.', traces: [{ x: ['CE', 'CB', 'CC'], y: [-200, 200, 0.99], type: 'bar', name: 'A_V', marker: { color: [colors[0], colors[2], colors[4]] }, text: ['-g_m·R_C', 'g_m·R_C', '≈ 1'], textposition: 'outside' }], layout: { xaxis: { title: 'Configuration' }, yaxis: { title: 'A_V' }, showlegend: false } },
            { id: 'three-config-rin-comparison', type: 'plotly', title: 'Input Impedance Comparison', description: 'CB has very low R_in (≈ r_e ≈ 25Ω at 1mA). CC has very high R_in (≈ β·R_E). CE is moderate (r_π ≈ 2.5kΩ).', traces: [{ x: ['CE', 'CB', 'CC'], y: [2500, 25, 100000], type: 'bar', name: 'R_in (Ω)', marker: { color: [colors[0], colors[2], colors[4]] }, text: ['r_π ≈ 2.5kΩ', 'r_e ≈ 25Ω', 'β·R_E ≈ 100kΩ'], textposition: 'outside' }], layout: { xaxis: { title: 'Configuration' }, yaxis: { title: 'R_in (Ω)', type: 'log' }, showlegend: false } },
            { id: 'three-config-rout-comparison', type: 'plotly', title: 'Output Impedance Comparison', description: 'CC has very low R_out (≈ r_e ≈ 25Ω) — ideal for driving loads. CB has very high R_out. CE is moderate.', traces: [{ x: ['CE', 'CB', 'CC'], y: [4700, 500000, 25], type: 'bar', name: 'R_out (Ω)', marker: { color: [colors[0], colors[2], colors[4]] }, text: ['R_C ≈ 4.7kΩ', 'High ≈ 500kΩ', 'r_e ≈ 25Ω'], textposition: 'outside' }], layout: { xaxis: { title: 'Configuration' }, yaxis: { title: 'R_out (Ω)', type: 'log' }, showlegend: false } },
            { id: 'cb-frequency-advantage', type: 'plotly', title: 'CB High-Frequency Advantage: No Miller Effect', description: 'CB has no Miller multiplication of C_BC, giving much better high-frequency performance than CE.', traces: [{ x: [1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9], y: [200, 200, 200, 200, 198, 150, 50], mode: 'lines', name: 'CB', line: { color: colors[2], width: 2.5 } }, { x: [1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9], y: [200, 200, 200, 195, 100, 20, 2], mode: 'lines', name: 'CE', line: { color: colors[0], width: 2, dash: 'dash' } }], layout: { xaxis: { title: 'Frequency (Hz)', type: 'log' }, yaxis: { title: '|A_V|', type: 'log' }, showlegend: true } },
            { id: 'cc-buffer-application', type: 'plotly', title: 'CC as Buffer: Impedance Transformation', description: 'The emitter follower transforms high source impedance to low output impedance, preventing loading of sensitive sources.', traces: [(function () { const t = ls(0, 2, 200); return { x: t, y: t.map(v => Math.round(Math.sin(2 * Math.PI * v) * 100) / 100), mode: 'lines', name: 'V_in ≈ V_out', line: { color: colors[0], width: 2.5 } } })(), { x: ls(0, 2, 200), y: ls(0, 2, 200).map(v => Math.round(0.99 * Math.sin(2 * Math.PI * v) * 100) / 100), mode: 'lines', name: 'V_out (CC)', line: { color: colors[2], width: 2, dash: 'dash' } }], layout: { xaxis: { title: 'Time (ms)' }, yaxis: { title: 'Voltage (V)' }, showlegend: true } },
            { id: 'cascading-ce-cc', type: 'plotly', title: 'Cascaded CE + CC Stages', description: 'CE provides voltage gain, CC provides current gain and low output impedance. Combined: high voltage gain with ability to drive low-impedance loads.', traces: [{ x: ['CE Stage', 'CC Stage', 'Combined'], y: [200, 1, 200], type: 'bar', name: 'Voltage Gain', marker: { color: [colors[0], colors[2], colors[4]] } }, { x: ['CE Stage', 'CC Stage', 'Combined'], y: [4700, 4700, 25], type: 'bar', name: 'R_out (Ω)', marker: { color: [colors[1], colors[3], colors[5]] } }], layout: { barmode: 'group', xaxis: { title: 'Stage' }, showlegend: true } },
            { id: 'application-selection-guide', type: 'plotly', title: 'Which Configuration to Use?', description: 'CE: general amplification. CB: high-frequency applications. CC: impedance matching/buffering.', traces: [{ x: ['Power Gain', 'Voltage Gain', 'Current Gain', 'R_in', 'R_out', 'Freq Response'], y: [5, 5, 3, 3, 3, 2], type: 'bar', name: 'CE Best', marker: { color: colors[0] } }, { x: ['Power Gain', 'Voltage Gain', 'Current Gain', 'R_in', 'R_out', 'Freq Response'], y: [3, 5, 1, 1, 5, 5], type: 'bar', name: 'CB Best', marker: { color: colors[2] } }, { x: ['Power Gain', 'Voltage Gain', 'Current Gain', 'R_in', 'R_out', 'Freq Response'], y: [2, 1, 5, 5, 1, 3], type: 'bar', name: 'CC Best', marker: { color: colors[4] } }], layout: { barmode: 'group', xaxis: { title: 'Property' }, yaxis: { title: 'Rating (1-5)' }, showlegend: true } },
            { id: 'summary-table-all-configs', type: 'plotly', title: 'Complete Configuration Comparison', description: 'Summary of all three BJT configurations with typical values for a BJT with β=100, I_C=1mA, R_C=4.7kΩ.', traces: [{ x: ['A_V', 'A_I', 'R_in (kΩ)', 'R_out (kΩ)'], y: [200, 100, 2.5, 4.7], name: 'CE', type: 'bar', marker: { color: colors[0] } }, { x: ['A_V', 'A_I', 'R_in (kΩ)', 'R_out (kΩ)'], y: [200, 0.99, 0.025, 500], name: 'CB', type: 'bar', marker: { color: colors[2] } }, { x: ['A_V', 'A_I', 'R_in (kΩ)', 'R_out (kΩ)'], y: [0.99, 101, 250, 0.025], name: 'CC', type: 'bar', marker: { color: colors[4] } }], layout: { barmode: 'group', xaxis: { title: 'Parameter' }, yaxis: { type: 'log', title: 'Value' }, showlegend: true } }
        ]
    };
    writeAll('common-base-and-common-collector', 'Common-Base and Common-Collector Configurations',
        `# Common-Base and Common-Collector Configurations

> **Why This Matters**: CE is versatile but not always the right choice. CB excels at high frequencies (no Miller effect). CC (emitter follower) is the go-to buffer for impedance matching. Knowing all three lets you pick the right tool for the job.

## Common-Base Configuration

[[visual:cb-circuit-overview]]

In the CB configuration, input is at the emitter and output is at the collector. The base is AC grounded.

**Key properties**: non-inverting, high voltage gain ($A_V \\approx g_m R_C$), current gain $\\alpha \\approx 1$, very low $R_{in} \\approx r_e$, very high $R_{out}$.

## Common-Collector (Emitter Follower)

[[visual:cc-circuit-overview]]

In CC, input is at the base and output is at the emitter. The collector is connected to $V_{CC}$ (AC ground).

**Key properties**: non-inverting, $A_V \\approx 1$ (voltage follower), current gain $\\beta + 1$, very high $R_{in}$, very low $R_{out}$.

## Comparing All Three Configurations

[[visual:three-config-gain-comparison]]

[[visual:three-config-rin-comparison]]

[[visual:three-config-rout-comparison]]

<details>
<summary><strong>Pause & Think</strong>: Why is CB's R_in so much lower than CC's?</summary>

CB input is at the emitter — you're looking into $r_e = V_T/I_C \\approx 25\\Omega$. CC input is at the base — you're looking into $r_\\pi + (\\beta+1)R_E$, which is much larger because the base current is $\\beta$ times smaller than the emitter current.

</details>

## CB's High-Frequency Advantage

[[visual:cb-frequency-advantage]]

CB avoids the **Miller effect** that plagues CE at high frequencies. In CE, $C_{BC}$ is multiplied by $(1 + |A_V|)$, creating a huge effective input capacitance. In CB, $C_{BC}$ is between output and ground — no multiplication.

## CC as a Buffer

[[visual:cc-buffer-application]]

[[visual:cascading-ce-cc]]

The emitter follower's unity voltage gain seems useless — until you consider impedance transformation. It converts a high-impedance source into a low-impedance output, preventing loading effects.

## Choosing the Right Configuration

[[visual:application-selection-guide]]

[[visual:summary-table-all-configs]]

## Summary

- CB: high voltage gain, non-inverting, low R_in, best for high-frequency RF applications
- CC: A_V ≈ 1, high current gain, high R_in, low R_out, ideal as buffer/impedance matcher
- CE: highest power gain, moderate impedances, workhorse for general amplification
- Real systems cascade multiple configurations: CE for gain + CC for output buffering
`,
        `# Exam Preparation: CB and CC Configurations
## How This Is Tested
- Compare all three configurations in a table (5-8 marks)
- Calculate R_in, R_out, A_V for CB or CC (8-10 marks)
- Explain why CB has better high-frequency response (3-5 marks)
- Design a two-stage amplifier using CE + CC (10 marks)
## Common Mistakes
1. Confusing which terminal is "common" in each configuration
2. Getting CB and CC R_in/R_out mixed up
3. Forgetting that CB current gain is α ≈ 1, not β
4. Not considering Miller effect advantage of CB
`, {
        id: 'quiz-cb-cc', questions: [
            { id: 'q1', prompt: 'In the common-base configuration, the input terminal is:', options: ['Emitter', 'Base', 'Collector', 'Any terminal'], correctAnswer: 'Emitter', explanation: 'CB: input at emitter, output at collector, base is common (AC grounded).' },
            { id: 'q2', prompt: 'The voltage gain of a CC (emitter follower) is approximately:', options: ['1', 'β', 'g_m × R_C', '-g_m × R_C'], correctAnswer: '1', explanation: 'CC is a voltage follower: A_V ≈ 1. It provides current gain (β+1) but not voltage gain.' },
            { id: 'q3', prompt: 'CB has better high-frequency response than CE because:', options: ['No Miller effect', 'Higher gain', 'Lower R_out', 'Higher R_in'], correctAnswer: 'No Miller effect', explanation: 'In CE, C_BC is multiplied by (1+|A_V|) due to Miller effect. In CB, C_BC is between output and ground — no multiplication.' },
            { id: 'q4', prompt: 'The input impedance of a CB amplifier is approximately:', options: ['r_e ≈ 25 Ω', 'r_π ≈ 2.5 kΩ', 'β × R_E ≈ 100 kΩ', 'R_C ≈ 4.7 kΩ'], correctAnswer: 'r_e ≈ 25 Ω', explanation: 'CB R_in ≈ r_e = V_T/I_C. At I_C = 1mA: r_e ≈ 25mV/1mA = 25Ω. Very low!' },
            { id: 'q5', prompt: 'The current gain of a CB amplifier is:', options: ['α ≈ 1', 'β ≈ 100', 'β + 1 ≈ 101', 'g_m × R_C'], correctAnswer: 'α ≈ 1', explanation: 'CB current gain is α = β/(β+1) ≈ 0.99. Almost unity — CB amplifies voltage, not current.' },
            { id: 'q6', prompt: 'Why is CC (emitter follower) used as a buffer?', options: ['High R_in, low R_out — impedance transformation', 'High voltage gain', 'High output impedance', 'Low current gain'], correctAnswer: 'High R_in, low R_out — impedance transformation', explanation: 'CC has R_in ≈ β·R_E (very high) and R_out ≈ r_e (very low). This transforms high-impedance sources to low-impedance outputs.' },
            { id: 'q7', prompt: 'In a cascaded CE + CC design, the CE stage provides:', options: ['Voltage gain', 'Current gain only', 'Impedance matching', 'DC biasing only'], correctAnswer: 'Voltage gain', explanation: 'CE provides the voltage gain (-g_m·R_C). CC follows to provide current gain and low R_out for driving loads.' },
            { id: 'q8', prompt: 'The output impedance of a CC amplifier is approximately:', options: ['r_e ≈ 25 Ω', 'R_C ≈ 4.7 kΩ', 'r_π ≈ 2.5 kΩ', 'Very high (500 kΩ)'], correctAnswer: 'r_e ≈ 25 Ω', explanation: 'CC R_out ≈ r_e = V_T/I_C. Very low output impedance, ideal for driving loads.' },
            { id: 'q9', prompt: 'Which configuration has the highest current gain?', options: ['CC (β + 1)', 'CE (β)', 'CB (α ≈ 1)', 'All are equal'], correctAnswer: 'CC (β + 1)', explanation: 'CC has current gain β+1, CE has β, CB has α ≈ 1. CC wins for current amplification.' },
            { id: 'q10', prompt: 'The CB amplifier is phase:', options: ['Non-inverting (0°)', 'Inverting (180°)', '90° phase shift', 'Depends on frequency'], correctAnswer: 'Non-inverting (0°)', explanation: 'CB is non-inverting. When I_E increases (input), I_C increases, V_RC increases, so V_out increases. Same polarity.' }
        ]
    }, {
        id: 'flashcards-cb-cc', cards: [
            { id: 'f1', front: 'CB configuration: which terminal gets input?', back: 'Emitter is input, Collector is output, Base is common (AC ground).', difficultyLevel: 1 },
            { id: 'f2', front: 'CC configuration: which terminal gives output?', back: 'Emitter is output, Base is input, Collector is common (to V_CC).', difficultyLevel: 1 },
            { id: 'f3', front: 'CB voltage gain?', back: 'A_V ≈ g_m·R_C (non-inverting). Same magnitude as CE but NO sign inversion.', difficultyLevel: 2 },
            { id: 'f4', front: 'CC voltage gain?', back: 'A_V ≈ 1 (voltage follower). Output "follows" input with slight offset of V_BE.', difficultyLevel: 2 },
            { id: 'f5', front: 'CB input impedance?', back: 'R_in ≈ r_e = V_T/I_C ≈ 25Ω at 1mA. Very low — matches low-impedance sources.', difficultyLevel: 3 },
            { id: 'f6', front: 'CC output impedance?', back: 'R_out ≈ r_e = V_T/I_C ≈ 25Ω. Very low — drives low-impedance loads easily.', difficultyLevel: 3 },
            { id: 'f7', front: 'Why does CB have no Miller effect?', back: 'C_BC connects output to ground (base), not input. No feedback capacitance multiplication. Better high-freq response.', difficultyLevel: 4 },
            { id: 'f8', front: 'CB current gain?', back: 'A_I = α = β/(β+1) ≈ 0.99. CB provides voltage gain but NOT current amplification.', difficultyLevel: 3 },
            { id: 'f9', front: 'CC current gain?', back: 'A_I = β + 1 ≈ 101. Higher than CE (β). CC is the best current amplifier among BJT configs.', difficultyLevel: 3 },
            { id: 'f10', front: 'When to use CE vs CB vs CC?', back: 'CE: general-purpose high gain. CB: high-frequency/RF. CC: buffer/impedance matching. Often cascade: CE → CC.', difficultyLevel: 4 }
        ]
    }, vis);
})();

// ======== C5: bjt-two-port-analysis ========
(function () {
    const vis = {
        visuals: [
            { id: 'two-port-block-diagram', type: 'plotly', title: 'Two-Port Network: The Black Box', description: 'Any amplifier can be modeled as a two-port with input/output ports characterized by h, y, z, or ABCD parameters.', traces: [{ x: ['Port 1 (Input)', 'Two-Port Network', 'Port 2 (Output)'], y: [1, 1, 1], type: 'bar', marker: { color: [colors[0], colors[3], colors[1]] }, text: ['V₁, I₁', '[Parameters]', 'V₂, I₂'], textposition: 'inside', textfont: { color: '#fff', size: 12 } }], layout: { xaxis: { title: '' }, yaxis: { visible: false }, showlegend: false }, height: 250 },
            { id: 'h-parameter-model', type: 'plotly', title: 'Hybrid (h) Parameter Model for BJT', description: 'h-parameters: h₁₁ (input impedance), h₁₂ (reverse voltage ratio), h₂₁ (forward current gain), h₂₂ (output admittance).', traces: [{ x: ['h₁₁ (R_in)', 'h₁₂', 'h₂₁ (β)', 'h₂₂ (1/r_o)'], y: [2500, 0.0001, 100, 0.00002], type: 'bar', marker: { color: [colors[0], colors[2], colors[4], colors[5]] }, text: ['2.5 kΩ', '≈ 0', 'β = 100', '20 μS'], textposition: 'outside' }], layout: { xaxis: { title: 'h-Parameter' }, yaxis: { title: 'Value', type: 'log' }, showlegend: false } },
            { id: 'ce-h-parameter-equivalent', type: 'plotly', title: 'CE h-Parameter Equivalent Circuit', description: 'For CE: h_ie = r_π, h_re ≈ 0, h_fe = β, h_oe = 1/r_o. V₁ = h_ie·I₁ + h_re·V₂, I₂ = h_fe·I₁ + h_oe·V₂.', traces: [{ x: ['V₁ = h_ie·I₁', 'h_re·V₂ ≈ 0', 'I₂ = h_fe·I₁', 'h_oe·V₂'], y: [2.5, 0.001, 100, 0.02], type: 'bar', marker: { color: [colors[0], colors[2], colors[4], colors[5]] }, text: ['r_π = 2.5kΩ', 'Negligible', 'β = 100', '1/r_o'], textposition: 'outside' }], layout: { xaxis: { title: 'h-Parameter Term' }, yaxis: { title: 'Contribution', type: 'log' }, showlegend: false } },
            { id: 'y-parameter-model', type: 'plotly', title: 'y-Parameters (Admittance Matrix)', description: 'y-parameters: Y = [y₁₁, y₁₂; y₂₁, y₂₂]. Used for parallel connections. All parameters in Siemens.', traces: [{ x: ['y₁₁ (input)', 'y₁₂ (reverse)', 'y₂₁ (forward)', 'y₂₂ (output)'], y: [0.4, 0.001, 40, 0.02], type: 'bar', marker: { color: [colors[0], colors[1], colors[2], colors[3]] }, text: ['0.4 mS', '≈ 0', '40 mS (g_m)', '20 μS'], textposition: 'outside' }], layout: { xaxis: { title: 'y-Parameter' }, yaxis: { title: 'Value (mS)', type: 'log' }, showlegend: false } },
            { id: 'z-parameter-model', type: 'plotly', title: 'z-Parameters (Impedance Matrix)', description: 'z-parameters: Z = [z₁₁, z₁₂; z₂₁, z₂₂]. Used for series connections. All parameters in Ohms.', traces: [{ x: ['z₁₁ (input)', 'z₁₂ (reverse)', 'z₂₁ (forward)', 'z₂₂ (output)'], y: [2500, 10, 250000, 50000], type: 'bar', marker: { color: [colors[0], colors[1], colors[2], colors[3]] }, text: ['2.5 kΩ', '≈ 0', 'β·r_π', '>50 kΩ'], textposition: 'outside' }], layout: { xaxis: { title: 'z-Parameter' }, yaxis: { title: 'Value (Ω)', type: 'log' }, showlegend: false } },
            { id: 'parameter-conversion', type: 'plotly', title: 'Choosing the Right Parameter Set', description: 'h-params: most common for BJT. y-params: parallel connections. z-params: series connections. ABCD: cascading stages.', traces: [{ x: ['h-params', 'y-params', 'z-params', 'ABCD'], y: [5, 3, 3, 4], type: 'bar', marker: { color: [colors[0], colors[2], colors[4], colors[3]] }, text: ['BJT Standard', 'Parallel', 'Series', 'Cascade'], textposition: 'outside' }], layout: { xaxis: { title: 'Parameter Type' }, yaxis: { title: 'Usage Frequency', visible: false }, showlegend: false } },
            { id: 'ce-gain-from-h-params', type: 'plotly', title: 'Deriving CE Gain from h-Parameters', description: 'A_V = -h_fe / (h_ie · h_oe + h_ie/R_L) ≈ -β·R_L/r_π = -g_m·R_L for simplified h-params.', traces: [{ x: ls(0.5, 20, 100), y: ls(0.5, 20, 100).map(rl => Math.round(-100 * rl / 2.5 * 10) / 10), mode: 'lines', name: 'A_V from h-params', line: { color: colors[0], width: 2.5 } }, { x: ls(0.5, 20, 100), y: ls(0.5, 20, 100).map(rl => Math.round(-40 * rl * 10) / 10), mode: 'lines', name: 'A_V = -g_m·R_L', line: { color: colors[1], width: 2, dash: 'dash' } }], layout: { xaxis: { title: 'R_L (kΩ)' }, yaxis: { title: 'A_V' }, showlegend: true } },
            { id: 'cb-gain-from-h-params', type: 'plotly', title: 'CB Gain from h-Parameters', description: 'CB uses h_ib ≈ r_e, h_fb ≈ -α, h_ob ≈ 1/r_o. A_V ≈ g_m·R_L (non-inverting).', traces: [{ x: ls(0.5, 20, 100), y: ls(0.5, 20, 100).map(rl => Math.round(40 * rl * 10) / 10), mode: 'lines', name: 'A_V (CB)', line: { color: colors[2], width: 2.5 } }], layout: { xaxis: { title: 'R_L (kΩ)' }, yaxis: { title: 'A_V' }, showlegend: false } },
            { id: 'two-stage-cascade-analysis', type: 'plotly', title: 'Cascading Two-Port Networks', description: 'When stages are cascaded, overall ABCD = ABCD₁ × ABCD₂. This is why ABCD parameters are powerful for multi-stage analysis.', traces: [{ x: ['Stage 1', 'Interface', 'Stage 2', 'Overall'], y: [20, 0.8, 15, 240], type: 'bar', marker: { color: [colors[0], colors[3], colors[2], colors[4]] }, text: ['A_V₁ = 20', 'Loading = 0.8', 'A_V₂ = 15', 'A_total = 240'], textposition: 'outside' }], layout: { xaxis: { title: '' }, yaxis: { title: 'Gain' }, showlegend: false } },
            { id: 'practical-h-param-values', type: 'plotly', title: 'Typical h-Parameter Values for Common BJTs', description: 'Standard values for common small-signal BJTs like 2N2222, BC547, 2N3904.', traces: [{ x: ['2N2222', 'BC547', '2N3904'], y: [2500, 3000, 2800], name: 'h_ie (Ω)', type: 'bar', marker: { color: colors[0] } }, { x: ['2N2222', 'BC547', '2N3904'], y: [100, 200, 150], name: 'h_fe (β)', type: 'bar', marker: { color: colors[2] } }], layout: { barmode: 'group', xaxis: { title: 'BJT Type' }, yaxis: { title: 'Value' }, showlegend: true } }
        ]
    };
    writeAll('bjt-two-port-analysis', 'BJT Two-Port Network Analysis',
        `# BJT Two-Port Network Analysis

> **Why This Matters**: Two-port parameters give you a systematic, universal way to characterize any amplifier — regardless of its internal complexity. Once you have the h-parameters, you can compute gain, impedances, and cascade responses without redrawing the small-signal circuit.

## The Two-Port Model

[[visual:two-port-block-diagram]]

Any linear circuit with an input and output can be modeled as a **two-port network** described by four parameters. The most common parameter sets are h (hybrid), y (admittance), z (impedance), and ABCD (transmission).

## h-Parameters: The BJT Standard

[[visual:h-parameter-model]]

For BJTs, **h-parameters** are the standard:
- $h_{ie}$ = input impedance with output shorted ($= r_\\pi$ for CE)
- $h_{re}$ = reverse voltage ratio ($\\approx 0$, usually neglected)
- $h_{fe}$ = forward current gain ($= \\beta$ for CE)
- $h_{oe}$ = output admittance ($= 1/r_o$ for CE)

[[visual:ce-h-parameter-equivalent]]

The two defining equations are:
$$V_1 = h_{ie} \\cdot I_1 + h_{re} \\cdot V_2$$
$$I_2 = h_{fe} \\cdot I_1 + h_{oe} \\cdot V_2$$

<details>
<summary><strong>Pause & Think</strong>: Why are h-parameters called "hybrid"?</summary>

Because they mix units: $h_{ie}$ is in Ohms, $h_{re}$ is dimensionless, $h_{fe}$ is dimensionless, and $h_{oe}$ is in Siemens. No other parameter set has this mix — that's why they're the most natural for BJTs.

</details>

## Other Parameter Sets

[[visual:y-parameter-model]]

[[visual:z-parameter-model]]

[[visual:parameter-conversion]]

## Deriving Gain from Parameters

[[visual:ce-gain-from-h-params]]

[[visual:cb-gain-from-h-params]]

## Cascading Stages

[[visual:two-stage-cascade-analysis]]

[[visual:practical-h-param-values]]

## Summary

- Two-port models systematically characterize any linear amplifier
- h-parameters are standard for BJTs: $h_{ie}$, $h_{re}$, $h_{fe}$, $h_{oe}$
- Simplified analysis: $h_{re} \\approx 0$, giving $A_V \\approx -h_{fe} \\cdot R_L / h_{ie}$
- ABCD parameters are ideal for cascading stages (matrix multiplication)
- Same BJT, different configuration → different h-parameter subscripts (e, b, c)
`,
        `# Exam Preparation: BJT Two-Port Analysis
## How This Is Tested
- Write h-parameter equations for a given configuration (5-8 marks)
- Calculate A_V, R_in, R_out using h-parameters (10-12 marks)
- Convert between parameter sets (5 marks)
- Cascade analysis using ABCD or loading (8-10 marks)
## Common Mistakes
1. Using CE h-params for a CB circuit (subscripts differ!)
2. Forgetting to include h_oe loading when R_L is large
3. Wrong signs when converting between parameter sets
4. Not accounting for inter-stage loading in cascades
`, {
        id: 'quiz-two-port', questions: [
            { id: 'q1', prompt: 'In h-parameter equations, h_fe represents:', options: ['Forward current gain (β)', 'Input impedance', 'Output admittance', 'Reverse voltage ratio'], correctAnswer: 'Forward current gain (β)', explanation: 'h_fe = I_out/I_in with V_out = 0. For CE, h_fe = β.' },
            { id: 'q2', prompt: 'The simplified CE voltage gain using h-parameters is:', options: ['-h_fe·R_L / h_ie', '-h_ie / h_fe', 'h_oe × R_L', '-h_re × h_fe'], correctAnswer: '-h_fe·R_L / h_ie', explanation: 'With h_re ≈ 0: A_V = -h_fe·R_L/h_ie = -β·R_L/r_π = -g_m·R_L.' },
            { id: 'q3', prompt: 'h_re is usually neglected because:', options: ['Its value is ≈ 0 (10⁻⁴)', 'It has wrong units', 'It only applies at DC', 'It equals h_fe'], correctAnswer: 'Its value is ≈ 0 (10⁻⁴)', explanation: 'h_re is the reverse voltage feedback ratio. For BJTs it is typically 10⁻⁴, small enough to neglect.' },
            { id: 'q4', prompt: 'Which parameter set is best for cascading stages?', options: ['ABCD (transmission)', 'h-parameters', 'y-parameters', 'z-parameters'], correctAnswer: 'ABCD (transmission)', explanation: 'ABCD parameters cascade by matrix multiplication: ABCD_total = ABCD₁ × ABCD₂. Very convenient for multi-stage analysis.' },
            { id: 'q5', prompt: 'y-parameters are most useful for:', options: ['Parallel connections', 'Series connections', 'Cascade connections', 'Any connection'], correctAnswer: 'Parallel connections', explanation: 'y-parameters add directly for parallel-connected two-ports: Y_total = Y₁ + Y₂.' },
            { id: 'q6', prompt: 'For CE configuration, h_ie equals:', options: ['r_π', 'r_e', 'R_C', 'R_E'], correctAnswer: 'r_π', explanation: 'h_ie is the input impedance with output shorted. For CE: h_ie = r_π = β/g_m.' },
            { id: 'q7', prompt: 'The h-parameter subscripts for Common-Base are:', options: ['h_ib, h_rb, h_fb, h_ob', 'h_ie, h_re, h_fe, h_oe', 'h_ic, h_rc, h_fc, h_oc', 'h_i, h_r, h_f, h_o'], correctAnswer: 'h_ib, h_rb, h_fb, h_ob', explanation: 'Subscript "b" for common-base. "e" for CE, "c" for CC. The second letter indicates the common terminal.' },
            { id: 'q8', prompt: 'h_oe for a BJT is approximately:', options: ['1/r_o (output admittance)', 'r_π', 'β', 'g_m'], correctAnswer: '1/r_o (output admittance)', explanation: 'h_oe is the output admittance with input open: h_oe = 1/r_o ≈ I_C/V_A (Early effect).' },
            { id: 'q9', prompt: 'Why are h-parameters called "hybrid"?', options: ['They mix different units', 'They work for all configurations', 'They are approximate', 'They come in pairs'], correctAnswer: 'They mix different units', explanation: 'h-params have mixed units: h_ie (Ω), h_re (unitless), h_fe (unitless), h_oe (Siemens). No other set has this mix.' },
            { id: 'q10', prompt: 'If h_fe=150, h_ie=3kΩ, R_L=10kΩ, the CE voltage gain is:', options: ['-500', '-150', '500', '-1500'], correctAnswer: '-500', explanation: 'A_V = -h_fe·R_L/h_ie = -150·10k/3k = -500.' }
        ]
    }, {
        id: 'flashcards-two-port', cards: [
            { id: 'f1', front: 'What are the four h-parameters?', back: 'h_ie (input impedance), h_re (reverse voltage ratio ≈ 0), h_fe (current gain = β), h_oe (output admittance = 1/r_o).', difficultyLevel: 1 },
            { id: 'f2', front: 'h-parameter defining equations?', back: 'V₁ = h_ie·I₁ + h_re·V₂. I₂ = h_fe·I₁ + h_oe·V₂. First equation: input loop. Second: output loop.', difficultyLevel: 2 },
            { id: 'f3', front: 'Simplified CE gain from h-params?', back: 'A_V = -h_fe·R_L/h_ie = -β·R_L/r_π = -g_m·R_L (when h_re ≈ 0).', difficultyLevel: 3 },
            { id: 'f4', front: 'When to use y-parameters?', back: 'For parallel-connected two-ports: Y_total = Y₁ + Y₂. All parameters in Siemens.', difficultyLevel: 3 },
            { id: 'f5', front: 'When to use z-parameters?', back: 'For series-connected two-ports: Z_total = Z₁ + Z₂. All parameters in Ohms.', difficultyLevel: 3 },
            { id: 'f6', front: 'When to use ABCD parameters?', back: 'For cascaded stages: ABCD_total = ABCD₁ × ABCD₂. Matrix multiplication gives overall response.', difficultyLevel: 3 },
            { id: 'f7', front: 'h-parameter subscript convention?', back: 'Second letter = common terminal: "e" for CE, "b" for CB, "c" for CC. Example: h_fe = β for CE.', difficultyLevel: 2 },
            { id: 'f8', front: 'What is h_oe physically?', back: 'Output admittance with input open = 1/r_o. Due to Early effect: I_C depends slightly on V_CE.', difficultyLevel: 4 },
            { id: 'f9', front: 'Inter-stage loading in cascade?', back: 'Stage 1 output impedance and Stage 2 input impedance form a divider. Actual gain = A_V1 × (R_in2/(R_in2+R_out1)) × A_V2.', difficultyLevel: 5 },
            { id: 'f10', front: 'Typical h_ie for small-signal BJT?', back: 'h_ie = r_π = β/g_m. For β=100, I_C=1mA: h_ie = 100/40mS = 2.5kΩ.', difficultyLevel: 3 }
        ]
    }, vis);
})();

console.log('All 5 concepts created!');
