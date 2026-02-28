const fs = require('fs');
const p = require('path');
const base = 'c:/Users/ShyaBubu/Desktop/Caltronic app/caltronic-v2/src/content/analog-electronics/concepts';

// Helper: generate pre-computed arrays
function linspace(min, max, n) {
    return Array.from({ length: n }, (_, i) => Math.round((min + i * (max - min) / (n - 1)) * 10000) / 10000);
}

const colors = ['#4f8cff', '#ff6b8a', '#2fbf8f', '#f5a623', '#6b62ff', '#ec4899', '#14b8a6'];

// ==== CONCEPT 1: amplifier-classification ====
function c1() {
    const id = 'amplifier-classification';
    const dir = p.join(base, id);

    // visuals.json
    const xV = linspace(0, 10, 50);
    const visuals = {
        visuals: [
            {
                id: 'voltage-amp-model', type: 'plotly', title: 'Voltage Amplifier: Thévenin Model',
                description: 'The voltage amplifier has Thévenin equivalent output: V_out = A_V · V_in. Ideal: R_in → ∞, R_out → 0.',
                traces: [
                    { x: xV, y: xV.map(v => Math.round(v * 10 * 100) / 100), mode: 'lines', name: 'A_V = 10', line: { color: colors[0], width: 2.5 } },
                    { x: xV, y: xV.map(v => Math.round(v * 5 * 100) / 100), mode: 'lines', name: 'A_V = 5', line: { color: colors[1], width: 2, dash: 'dash' } }
                ],
                layout: { xaxis: { title: 'V_in (V)' }, yaxis: { title: 'V_out (V)' }, showlegend: true }
            },
            {
                id: 'current-amp-model', type: 'plotly', title: 'Current Amplifier: Norton Model',
                description: 'The current amplifier has Norton equivalent output: I_out = A_I · I_in. Ideal: R_in → 0, R_out → ∞.',
                traces: [
                    { x: linspace(0, 5, 50), y: linspace(0, 5, 50).map(v => Math.round(v * 100 * 100) / 100), mode: 'lines', name: 'A_I = 100', line: { color: colors[2], width: 2.5 } },
                    { x: linspace(0, 5, 50), y: linspace(0, 5, 50).map(v => Math.round(v * 50 * 100) / 100), mode: 'lines', name: 'A_I = 50', line: { color: colors[3], width: 2, dash: 'dash' } }
                ],
                layout: { xaxis: { title: 'I_in (mA)' }, yaxis: { title: 'I_out (mA)' }, showlegend: true }
            },
            {
                id: 'transconductance-amp', type: 'plotly', title: 'Transconductance Amplifier: V_in → I_out',
                description: 'Output current proportional to input voltage. Gain G_M has units of Siemens (1/Ω). Ideal: R_in → ∞, R_out → ∞.',
                traces: [
                    { x: linspace(0, 1, 50), y: linspace(0, 1, 50).map(v => Math.round(v * 40 * 1000) / 1000), mode: 'lines', name: 'G_M = 40 mS', line: { color: colors[4], width: 2.5 } }
                ],
                layout: { xaxis: { title: 'V_in (V)' }, yaxis: { title: 'I_out (mA)' }, showlegend: false }
            },
            {
                id: 'transresistance-amp', type: 'plotly', title: 'Transresistance Amplifier: I_in → V_out',
                description: 'Output voltage proportional to input current. Gain R_M has units of Ohms. Ideal: R_in → 0, R_out → 0.',
                traces: [
                    { x: linspace(0, 0.5, 50), y: linspace(0, 0.5, 50).map(v => Math.round(v * 10000 * 100) / 100), mode: 'lines', name: 'R_M = 10 kΩ', line: { color: colors[5], width: 2.5 } }
                ],
                layout: { xaxis: { title: 'I_in (mA)' }, yaxis: { title: 'V_out (V)' }, showlegend: false }
            },
            {
                id: 'four-types-comparison', type: 'plotly', title: 'All Four Amplifier Types at a Glance',
                description: 'Comparison of input/output signal types and their associated equivalent circuit models. Each type has unique ideal R_in and R_out requirements.',
                traces: [
                    {
                        x: ['Voltage', 'Current', 'Transconductance', 'Transresistance'], y: [10, 100, 40, 5], type: 'bar', name: 'Gain Value',
                        marker: { color: [colors[0], colors[2], colors[4], colors[5]] },
                        text: ['A_V=10', 'A_I=100', 'G_M=40mS', 'R_M=5kΩ'], textposition: 'inside', textfont: { color: '#fff', size: 11 }
                    }
                ],
                layout: { xaxis: { title: 'Amplifier Type' }, yaxis: { title: 'Gain (various units)', visible: false }, showlegend: false }, height: 300
            },
            {
                id: 'loading-effect-voltage', type: 'plotly', title: 'Loading Effect on Voltage Amplifier',
                description: 'As R_L decreases relative to R_out, the actual output voltage drops below the ideal A_V · V_in. The voltage divider R_L/(R_L + R_out) determines the loss.',
                traces: (function () {
                    const rl = linspace(0.1, 100, 200);
                    const rout = [1, 5, 20];
                    return rout.map((ro, i) => ({
                        x: rl, y: rl.map(r => Math.round(r / (r + ro) * 10000) / 10000),
                        mode: 'lines', name: `R_out = ${ro} kΩ`, line: { color: colors[i], width: 2 }
                    }));
                })(),
                layout: { xaxis: { title: 'R_L (kΩ)', type: 'log' }, yaxis: { title: 'V_out / (A_V · V_in)', range: [0, 1.05] }, showlegend: true }
            },
            {
                id: 'loading-effect-current', type: 'plotly', title: 'Loading Effect on Current Amplifier',
                description: 'For current amplifiers, larger R_out is better — current preferentially flows through R_L when R_out >> R_L.',
                traces: (function () {
                    const rl = linspace(0.1, 100, 200);
                    const rout = [10, 50, 500];
                    return rout.map((ro, i) => ({
                        x: rl, y: rl.map(r => Math.round(ro / (ro + r) * 10000) / 10000),
                        mode: 'lines', name: `R_out = ${ro} kΩ`, line: { color: colors[i + 2], width: 2 }
                    }));
                })(),
                layout: { xaxis: { title: 'R_L (kΩ)', type: 'log' }, yaxis: { title: 'I_out / (A_I · I_in)', range: [0, 1.05] }, showlegend: true }
            },
            {
                id: 'ideal-parameters-table', type: 'plotly', title: 'Ideal Parameters for Each Amplifier Type',
                description: 'Summary: Voltage amp needs R_in=∞, R_out=0. Current amp needs R_in=0, R_out=∞. Transconductance: both ∞. Transresistance: both 0.',
                traces: [
                    { x: ['Voltage', 'Current', 'Transcon.', 'Transres.'], y: [1e6, 0.001, 1e6, 0.001], type: 'bar', name: 'R_in (ideal)', marker: { color: colors[0] } },
                    { x: ['Voltage', 'Current', 'Transcon.', 'Transres.'], y: [0.001, 1e6, 1e6, 0.001], type: 'bar', name: 'R_out (ideal)', marker: { color: colors[1] } }
                ],
                layout: { xaxis: { title: 'Type' }, yaxis: { title: 'Impedance (Ω)', type: 'log' }, showlegend: true, barmode: 'group' }
            },
            {
                id: 'gain-definitions-summary', type: 'plotly', title: 'Gain Definitions and Units',
                description: 'A_V = V_out/V_in (dimensionless), A_I = I_out/I_in (dimensionless), G_M = I_out/V_in (Siemens), R_M = V_out/I_in (Ohms).',
                traces: [
                    {
                        x: ['A_V', 'A_I', 'G_M', 'R_M'], y: [10, 100, 0.04, 10000], type: 'bar',
                        marker: { color: [colors[0], colors[2], colors[4], colors[5]] },
                        text: ['Dimensionless', 'Dimensionless', 'Siemens', 'Ohms'], textposition: 'outside'
                    }
                ],
                layout: { xaxis: { title: 'Gain Parameter' }, yaxis: { title: 'Typical Value', type: 'log' }, showlegend: false }
            },
            {
                id: 'power-gain-all-types', type: 'plotly', title: 'Power Gain: The Universal Requirement',
                description: 'All amplifiers must provide power gain P_out > P_in regardless of whether they amplify voltage, current, or both. Power gain A_P = A_V × A_I.',
                traces: [
                    { x: linspace(1, 20, 50), y: linspace(1, 20, 50).map(v => Math.round(v * v * 100) / 100), mode: 'lines', name: 'P_out = A_P × P_in', line: { color: colors[0], width: 2.5 } },
                    { x: linspace(1, 20, 50), y: linspace(1, 20, 50).map(v => Math.round(v * 100) / 100), mode: 'lines', name: 'P_in', line: { color: colors[1], width: 2, dash: 'dash' } }
                ],
                layout: { xaxis: { title: 'Input Power (mW)' }, yaxis: { title: 'Output Power (mW)' }, showlegend: true }
            }
        ]
    };

    fs.writeFileSync(p.join(dir, 'visuals.json'), JSON.stringify(visuals, null, 4));

    // metadata
    fs.writeFileSync(p.join(dir, 'metadata.json'), JSON.stringify({
        id, title: 'Amplifier Classification', contentPath: 'content.md',
        examPath: 'exam.md', quizPath: 'quiz.json', flashcardsPath: 'flashcards.json', visualsPath: 'visuals.json'
    }, null, 4));

    // content.md
    fs.writeFileSync(p.join(dir, 'content.md'), `# Amplifier Classification

> **Why This Matters**: Every electronic system that processes signals uses amplifiers. But not all amplifiers are the same — a microphone pre-amp, a current mirror, and a sensor interface all have fundamentally different architectures. Understanding the four amplifier types is the foundation for all analogue design.

## The Four Types of Amplifiers

An amplifier is a two-port network: it has an input port and an output port. The signal at each port can be either a **voltage** or a **current**. This gives us four combinations:

[[visual:voltage-amp-model]]

[[visual:current-amp-model]]

The **voltage amplifier** takes a voltage input and produces a voltage output. Its gain $A_V = V_{out}/V_{in}$ is dimensionless. We model the input as a Thévenin source and the output as a Thévenin equivalent.

The **current amplifier** takes a current input and produces a current output. Its gain $A_I = I_{out}/I_{in}$ is also dimensionless. We use Norton equivalents for both ports.

## Transconductance and Transresistance

[[visual:transconductance-amp]]

[[visual:transresistance-amp]]

The **transconductance amplifier** converts voltage to current: $I_{out} = G_M \\cdot V_{in}$. The gain $G_M$ has units of Siemens (1/Ω). The **transresistance amplifier** converts current to voltage: $V_{out} = R_M \\cdot I_{in}$. The gain $R_M$ has units of Ohms.

<details>
<summary><strong>Pause & Think</strong>: Why does G_M have units of conductance?</summary>

Because $G_M = I_{out}/V_{in}$. Current divided by voltage equals 1/resistance = conductance. The name "trans-conductance" literally means "conductance across" (from input to output).

</details>

## Comparing All Four Types

[[visual:four-types-comparison]]

[[visual:gain-definitions-summary]]

## The Loading Effect

When you connect a source to an amplifier, or an amplifier to a load, there's inevitably some signal loss. This is the **loading effect**.

[[visual:loading-effect-voltage]]

For a voltage amplifier, the output voltage divider $R_L/(R_L + R_{out})$ means you lose voltage if $R_{out}$ is significant. That's why ideal voltage amplifiers have $R_{out} = 0$.

[[visual:loading-effect-current]]

For a current amplifier, the current divider $R_{out}/(R_{out} + R_L)$ means you lose current if $R_{out}$ is too small. That's why ideal current amplifiers have $R_{out} = \\infty$.

## Ideal Parameters

[[visual:ideal-parameters-table]]

[[visual:power-gain-all-types]]

The key insight: **all amplifiers must provide power gain** $P_{out} > P_{in}$, regardless of whether they amplify voltage, current, or both.

<details>
<summary><strong>Pause & Think</strong>: Can an amplifier have voltage gain less than 1 and still be useful?</summary>

Yes! A common-collector (emitter follower) has $A_V \\approx 1$ but provides significant current gain and power gain. It's extremely useful as a buffer/impedance transformer.

</details>

## Summary

- Four amplifier types: voltage, current, transconductance, transresistance
- Each has different ideal R_in and R_out requirements
- Loading effects reduce actual gain from the ideal value
- All amplifiers must provide power gain — that's the fundamental requirement
`);

    // exam.md
    fs.writeFileSync(p.join(dir, 'exam.md'), `# Exam Preparation: Amplifier Classification

## How This Is Tested
- Draw the equivalent circuit model for each amplifier type (5-8 marks)
- Derive the actual gain including loading effects (8-10 marks)
- Compare ideal vs practical parameters (3-5 marks)

## Common Mistakes
1. Confusing Thévenin (voltage) vs Norton (current) output models
2. Getting R_in and R_out ideal values swapped between types
3. Forgetting the loading effect on both input and output sides
4. Not stating units for G_M (Siemens) and R_M (Ohms)
`);

    // quiz.json
    fs.writeFileSync(p.join(dir, 'quiz.json'), JSON.stringify({
        id: 'quiz-amplifier-classification',
        questions: [
            { id: 'q1', prompt: 'For a voltage amplifier, the ideal input impedance R_in should be:', options: ['Zero', 'Infinity', '50 Ω', 'Equal to R_S'], correctAnswer: 'Infinity', explanation: 'A voltage amplifier needs R_in → ∞ so that no current is drawn from the source, preserving the full source voltage at the input.' },
            { id: 'q2', prompt: 'The gain of a transconductance amplifier G_M has units of:', options: ['Ohms', 'Siemens (1/Ω)', 'Dimensionless', 'Watts'], correctAnswer: 'Siemens (1/Ω)', explanation: 'G_M = I_out/V_in. Current ÷ voltage = 1/resistance = conductance, measured in Siemens.' },
            { id: 'q3', prompt: 'For a current amplifier, the ideal output impedance R_out should be:', options: ['Zero', 'Infinity', '1 kΩ', 'Equal to R_L'], correctAnswer: 'Infinity', explanation: 'A current amplifier needs R_out → ∞ so all current flows through R_L rather than being shunted through R_out.' },
            { id: 'q4', prompt: 'The loading effect on a voltage amplifier output is described by:', options: ['R_L / (R_L + R_out)', 'R_out / (R_out + R_L)', 'R_in / (R_in + R_S)', 'A_V × V_in'], correctAnswer: 'R_L / (R_L + R_out)', explanation: 'The output voltage divider R_L/(R_L + R_out) determines how much of A_V·V_in actually appears across R_L.' },
            { id: 'q5', prompt: 'A transresistance amplifier converts:', options: ['Voltage to voltage', 'Current to voltage', 'Voltage to current', 'Current to current'], correctAnswer: 'Current to voltage', explanation: 'Transresistance: R_M = V_out/I_in. Input is current, output is voltage. Gain has units of Ohms.' },
            { id: 'q6', prompt: 'Which amplifier type uses Norton equivalent for BOTH input and output?', options: ['Voltage amplifier', 'Current amplifier', 'Transconductance amplifier', 'Transresistance amplifier'], correctAnswer: 'Current amplifier', explanation: 'Current in, current out — both ports deal with current, so both use Norton equivalents.' },
            { id: 'q7', prompt: 'If a voltage amplifier has A_V = 20, R_out = 2 kΩ, and R_L = 8 kΩ, the actual voltage gain is:', options: ['16', '20', '15', '10'], correctAnswer: '16', explanation: 'Actual gain = A_V × R_L/(R_L + R_out) = 20 × 8/(8+2) = 20 × 0.8 = 16.' },
            { id: 'q8', prompt: 'The fundamental requirement that ALL amplifiers must satisfy is:', options: ['Voltage gain > 1', 'Current gain > 1', 'Power gain > 1', 'Input impedance > Output impedance'], correctAnswer: 'Power gain > 1', explanation: 'Every amplifier must provide power gain P_out > P_in, regardless of whether it amplifies voltage or current.' },
            { id: 'q9', prompt: 'For a transconductance amplifier, the ideal R_in and R_out are:', options: ['R_in = ∞, R_out = ∞', 'R_in = 0, R_out = 0', 'R_in = ∞, R_out = 0', 'R_in = 0, R_out = ∞'], correctAnswer: 'R_in = ∞, R_out = ∞', explanation: 'Input is voltage (needs R_in → ∞ to not load source), output is current (needs R_out → ∞ so all current goes to R_L).' },
            { id: 'q10', prompt: 'The Thévenin equivalent circuit is used to model the output of which amplifier types?', options: ['Voltage and transresistance', 'Current and transconductance', 'All four types', 'Only voltage amplifier'], correctAnswer: 'Voltage and transresistance', explanation: 'Both voltage and transresistance amplifiers have voltage outputs, so both use Thévenin output models.' }
        ]
    }, null, 4));

    // flashcards.json
    fs.writeFileSync(p.join(dir, 'flashcards.json'), JSON.stringify({
        id: 'flashcards-amplifier-classification',
        cards: [
            { id: 'f1', front: 'What are the four amplifier types?', back: 'Voltage (V→V), Current (I→I), Transconductance (V→I), Transresistance (I→V)', difficultyLevel: 1 },
            { id: 'f2', front: 'Ideal R_in and R_out for a voltage amplifier?', back: 'R_in → ∞ (don\'t load source), R_out → 0 (all voltage to load)', difficultyLevel: 2 },
            { id: 'f3', front: 'Ideal R_in and R_out for a current amplifier?', back: 'R_in → 0 (all current through amp), R_out → ∞ (all current to load)', difficultyLevel: 2 },
            { id: 'f4', front: 'Units of transconductance gain G_M?', back: 'Siemens (S) = 1/Ω = A/V. Because G_M = I_out/V_in', difficultyLevel: 2 },
            { id: 'f5', front: 'Units of transresistance gain R_M?', back: 'Ohms (Ω) = V/A. Because R_M = V_out/I_in', difficultyLevel: 2 },
            { id: 'f6', front: 'Output loading formula for voltage amplifier?', back: 'V_out = A_V · V_in × R_L/(R_L + R_out). Voltage divider between R_out and R_L.', difficultyLevel: 3 },
            { id: 'f7', front: 'Output loading formula for current amplifier?', back: 'I_out = A_I · I_in × R_out/(R_out + R_L). Current divider between R_out and R_L.', difficultyLevel: 3 },
            { id: 'f8', front: 'When do we use Thévenin vs Norton output model?', back: 'Thévenin for voltage output (voltage + transresistance). Norton for current output (current + transconductance).', difficultyLevel: 3 },
            { id: 'f9', front: 'What universal requirement must ALL amplifiers satisfy?', back: 'Power gain P_out/P_in > 1. An amplifier must always increase power, even if voltage or current gain is < 1.', difficultyLevel: 4 },
            { id: 'f10', front: 'Ideal parameters for transconductance amplifier?', back: 'R_in → ∞ (voltage input, don\'t load), R_out → ∞ (current output, don\'t shunt). Both infinite!', difficultyLevel: 4 }
        ]
    }, null, 4));

    console.log('Created:', id);
}

c1();
