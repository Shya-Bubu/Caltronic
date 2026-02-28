const fs = require('fs');
const p = require('path');
const base = 'c:/Users/ShyaBubu/Desktop/Caltronic app/caltronic-v2/src/content/signals-and-systems/concepts';

const concepts = {
    'from-fourier-series-to-fourier-transform': {
        title: 'From Fourier Series to Fourier Transform',
        visuals: ['fs-discrete-spectrum', 'ft-continuous-spectrum', 'period-to-infinity', 'fs-ft-comparison-table', 'omega0-shrinking', 'fs-ft-analogy-diagram', 'spectral-density-concept', 'transition-animation-sim', 'envelope-emergence', 'limiting-process-sim'],
        desc: 'How the Fourier Series becomes the Fourier Transform as T₀→∞'
    },
    'fourier-transform-definition-and-examples': {
        title: 'Fourier Transform Definition and Examples',
        visuals: ['ft-analysis-integral', 'ft-synthesis-integral', 'exponential-signal-plot', 'ft-of-exponential', 'lorentzian-spectrum', 'rectangular-pulse-plot', 'ft-of-rect-sinc', 'sinc-function-plot', 'ft-pair-table', 'ft-calculator-sim'],
        desc: 'The FT analysis/synthesis integrals and key transform pairs'
    },
    'magnitude-and-phase-spectrum': {
        title: 'Magnitude and Phase Spectrum',
        visuals: ['complex-spectrum-plane', 'magnitude-spectrum-exp', 'phase-spectrum-exp', 'lowpass-spectrum-shape', 'magnitude-spectrum-rect', 'phase-spectrum-rect', 'spectrum-interpretation-diagram', 'bandwidth-concept', 'spectrum-explorer-sim', '3d-spectrum-view'],
        desc: 'Interpreting the continuous magnitude and phase spectra of aperiodic signals'
    },
    'ft-properties-linearity-and-time-shift': {
        title: 'FT Properties: Linearity and Time Shift',
        visuals: ['linearity-time-domain', 'linearity-freq-domain', 'superposition-spectra', 'time-shift-original', 'time-shift-delayed', 'phase-linear-tilt', 'magnitude-unchanged-shift', 'shift-property-diagram', 'time-shift-explorer-sim', 'linearity-demo-sim'],
        desc: 'Linearity preserves spectral addition; time shift adds linear phase'
    },
    'ft-properties-frequency-shift-and-differentiation': {
        title: 'FT Properties: Frequency Shift and Differentiation',
        visuals: ['modulation-time-domain', 'modulation-freq-shift', 'am-modulation-spectrum', 'carrier-signal-plot', 'differentiation-time-domain', 'differentiation-freq-domain', 'jomega-multiplication', 'integration-property', 'freq-shift-explorer-sim', 'differentiation-demo-sim'],
        desc: 'Frequency shift (modulation) and differentiation/integration in the FT domain'
    },
    'ft-time-scaling-and-time-reversal': {
        title: 'FT Time Scaling and Time Reversal',
        visuals: ['time-compression-signal', 'freq-expansion-spectrum', 'time-expansion-signal', 'freq-compression-spectrum', 'scaling-duality-diagram', 'rect-scaling-example', 'time-reversal-signal', 'time-reversal-spectrum', 'scaling-explorer-sim', 'bandwidth-duration-tradeoff'],
        desc: 'Time scaling creates bandwidth-duration duality; time reversal conjugates the spectrum'
    },
    'ft-of-real-signals-and-symmetry': {
        title: 'FT of Real Signals and Symmetry',
        visuals: ['conjugate-symmetry-ft', 'magnitude-even-symmetry', 'phase-odd-symmetry', 'real-even-signal-ft', 'real-odd-signal-ft', 'symmetry-summary-table', 'even-odd-decomposition-ft', 'real-signal-spectrum', 'symmetry-explorer-sim', 'conjugation-property'],
        desc: 'Conjugate symmetry, even/odd decomposition, and symmetry properties for real signals'
    },
    'parsevals-theorem-for-ft': {
        title: "Parseval's Theorem for FT",
        visuals: ['energy-time-domain', 'energy-freq-domain', 'energy-spectral-density', 'parseval-equality-diagram', 'esd-of-exponential', 'esd-of-rect-pulse', 'energy-bandwidth-relation', 'parseval-verification', 'energy-calculator-sim', 'esd-explorer-sim'],
        desc: "Parseval's theorem relates total energy to the integral of |X(jω)|², defining energy spectral density"
    },
    'convolution-property-of-ft': {
        title: 'Convolution Property of FT',
        visuals: ['convolution-time-domain', 'multiplication-freq-domain', 'convolution-theorem-diagram', 'conv-to-mult-example', 'input-signal-plot', 'impulse-response-plot', 'output-spectrum-product', 'deconvolution-concept', 'convolution-demo-sim', 'spectral-multiplication-sim'],
        desc: 'The crown jewel: convolution in time ↔ multiplication in frequency'
    },
    'frequency-response-of-lti-systems': {
        title: 'Frequency Response of LTI Systems',
        visuals: ['lti-block-diagram', 'frequency-response-definition', 'lowpass-filter-response', 'highpass-filter-response', 'bandpass-filter-response', 'input-output-spectra', 'gain-phase-response', 'filter-effect-demo', 'system-response-sim', 'filter-design-explorer-sim'],
        desc: 'H(jω) as the FT of h(t), and Y(jω) = H(jω)X(jω) for LTI system analysis'
    }
};

Object.entries(concepts).forEach(([id, info]) => {
    const dir = p.join(base, id);
    fs.mkdirSync(dir, { recursive: true });

    // content.md
    const markers = info.visuals.map(v => `[[visual:${v}]]`);
    const content = `# ${info.title}

> **Why This Matters**: ${info.desc}. This is a fundamental building block for understanding how signals behave in the frequency domain.

## The Big Idea

${markers[0]}

Let's start with the core intuition. ${info.desc}. This might sound abstract at first, but it connects directly to how every modern communication system, audio processor, and control system works.

${markers[1]}

Think of it this way: just as a prism splits white light into its component colors, the Fourier Transform splits a signal into its component frequencies. The difference is that now we're working with *aperiodic* signals — signals that don't repeat.

## Building the Theory

${markers[2]}

Now let's formalize this intuition with mathematics. Don't worry — we'll take it step by step, and every equation will have a clear physical meaning.

${markers[3]}

The key equation here connects the time domain to the frequency domain. Every term has a purpose, and understanding each one is essential.

<details>
<summary><strong>Pause & Think</strong>: What happens to the spectrum when you change the signal's duration?</summary>

A shorter signal in time produces a wider spectrum in frequency — this is the bandwidth-duration tradeoff. A longer signal produces a narrower spectrum. This is one of the most fundamental principles in signal processing.

</details>

${markers[4]}

${markers[5]}

## Diving Deeper

${markers[6]}

Let's explore the implications. Every property we derive here is a tool you'll use repeatedly in circuit analysis, filter design, and communication systems.

> **Key Insight**: The relationship between time and frequency is not just mathematical — it reflects a deep physical truth about how signals carry information.

${markers[7]}

## Practice and Exploration

${markers[8]}

Now it's time to build your intuition through interaction. Adjust parameters and watch both domains update simultaneously.

${markers[9]}

<details>
<summary><strong>Pause & Think</strong>: Can you predict what will happen to the spectrum before you see it?</summary>

Try to predict based on the properties you've learned. If the signal gets narrower in time, the spectrum should get wider. If you shift the signal in time, only the phase should change, not the magnitude. Building this predictive ability is the mark of true understanding.

</details>

## Summary

- ${info.desc}
- The time and frequency domains are two complementary views of the same signal
- Properties learned here will be used throughout the rest of the course and in every engineering discipline that deals with signals

> **You're building real engineering intuition here.** These concepts are not just exam material — they're tools you'll use every day as an engineer.
`;
    fs.writeFileSync(p.join(dir, 'content.md'), content);

    // exam.md
    const exam = `# Exam Preparation: ${info.title}

## How This Is Tested

This topic appears regularly in exams, typically as:
- **Direct computation** (8-12 marks): Apply the definition or a property to find a transform
- **Property application** (5-8 marks): Use a known transform pair + property to derive a new one
- **Interpretation** (3-5 marks): Sketch or describe the spectrum

## Mark Allocation Strategy

| Task | Marks | Time |
|------|-------|------|
| State the relevant formula/property | 2-3 | 1 min |
| Set up the integral or apply the property | 3-4 | 3 min |
| Evaluate and simplify | 3-4 | 3 min |
| Sketch the spectrum (if asked) | 2-3 | 2 min |

## Common Mistakes

1. **Forgetting to adjust integration limits** — when $x(t) = 0$ for $t < 0$, the integral starts at 0, not $-\\infty$
2. **Sign errors in the exponent** — analysis uses $e^{-j\\omega t}$, synthesis uses $e^{+j\\omega t}$
3. **Missing the $1/2\\pi$ factor** — the inverse FT has a $1/2\\pi$ normalization
4. **Not checking convergence** — the integral must converge for the FT to exist

## Past Paper Patterns

- Compute FT from definition (most common)
- Use properties to find FT of a modified signal
- Sketch magnitude and phase spectra
- Verify Parseval's theorem for a given signal
`;
    fs.writeFileSync(p.join(dir, 'exam.md'), exam);

    // quiz.json
    const quiz = {
        id: `quiz-${id}`,
        questions: Array.from({ length: 10 }, (_, i) => ({
            id: `q${i + 1}`,
            prompt: [
                `What is the Fourier Transform of x(t) = e^{-at}u(t) for a > 0?`,
                `The FT converts a time-domain signal into which domain?`,
                `What does the magnitude spectrum |X(jω)| represent?`,
                `If x(t) is shifted by t₀, what happens to X(jω)?`,
                `The inverse Fourier Transform uses which sign in the exponent?`,
                `What is the FT of a rectangular pulse of width τ?`,
                `Multiplication by e^{jω₀t} in time causes what in frequency?`,
                `Differentiation in time corresponds to what in frequency?`,
                `For a real signal x(t), |X(jω)| is always:`,
                `Parseval's theorem relates time-domain energy to:`
            ][i],
            options: [
                ['1/(a + jω)', 'a/(a + jω)', '1/(a - jω)', 'jω/(a + jω)'],
                ['Frequency domain', 'Laplace domain', 's-domain', 'z-domain'],
                ['Energy at each frequency', 'Phase at each frequency', 'Power at each frequency', 'Time delay at each frequency'],
                ['Multiplied by e^{-jωt₀}', 'Shifted by ω₀', 'Magnitude changes', 'Becomes zero'],
                ['Positive (+jωt)', 'Negative (-jωt)', 'No exponent', 'Depends on the signal'],
                ['τ sinc(ωτ/2π)', 'sinc(ωτ)', 'τ sinc(ωτ/2)', 'rect(ω/τ)'],
                ['Frequency shift by ω₀', 'Time shift by ω₀', 'Amplitude scaling by ω₀', 'No change'],
                ['Multiplication by jω', 'Division by jω', 'Multiplication by ω²', 'Convolution with jω'],
                ['Even symmetric', 'Odd symmetric', 'Always zero', 'Always one'],
                ['Frequency-domain energy integral', 'Fourier coefficients', 'Impulse response', 'Transfer function']
            ][i],
            correctAnswer: [
                '1/(a + jω)', 'Frequency domain', 'Energy at each frequency',
                'Multiplied by e^{-jωt₀}', 'Positive (+jωt)', 'τ sinc(ωτ/2π)',
                'Frequency shift by ω₀', 'Multiplication by jω', 'Even symmetric',
                'Frequency-domain energy integral'
            ][i],
            explanation: [
                'Apply the FT integral: ∫₀^∞ e^{-at}e^{-jωt}dt = ∫₀^∞ e^{-(a+jω)t}dt = 1/(a+jω). The lower limit is 0 because x(t)=0 for t<0.',
                'The Fourier Transform maps a time-domain signal x(t) to its frequency-domain representation X(jω), showing its spectral content at each frequency.',
                'The magnitude spectrum |X(jω)| shows how much of each frequency component is present in the signal. It represents the amplitude of each frequency.',
                'Time shifting x(t-t₀) multiplies the spectrum by e^{-jωt₀}. This adds a linear phase -ωt₀ but does NOT change the magnitude spectrum.',
                'The inverse FT uses e^{+jωt}: x(t) = (1/2π)∫X(jω)e^{+jωt}dω. The positive sign distinguishes it from the forward transform.',
                'The FT of rect(t/τ) is τ sinc(ωτ/2π). The sinc function is sin(x)/x, and the first null occurs at ω = 2π/τ.',
                'Multiplying by e^{jω₀t} in time shifts the spectrum by ω₀ in frequency. This is the modulation property, fundamental to communications.',
                'Taking the time derivative corresponds to multiplying by jω in the frequency domain: FT{dx/dt} = jω·X(jω). Each differentiation adds a factor of jω.',
                'For real x(t), the magnitude spectrum is even: |X(-jω)| = |X(jω)|. This is a consequence of conjugate symmetry X*( jω) = X(-jω).',
                'Parseval says ∫|x(t)|²dt = (1/2π)∫|X(jω)|²dω. Total energy can be computed from either domain. |X(jω)|² is the energy spectral density.'
            ][i]
        }))
    };
    fs.writeFileSync(p.join(dir, 'quiz.json'), JSON.stringify(quiz, null, 4));

    // flashcards.json
    const flashcards = {
        id: `flashcards-${id}`,
        cards: Array.from({ length: 10 }, (_, i) => ({
            id: `f${i + 1}`,
            front: [
                'What is the Fourier Transform analysis integral?',
                'What is the inverse Fourier Transform?',
                'FT of e^{-at}u(t) = ?',
                'FT of rect(t/τ) = ?',
                'Time shift property: x(t-t₀) ↔ ?',
                'Frequency shift property: e^{jω₀t}x(t) ↔ ?',
                'Differentiation property: dx/dt ↔ ?',
                'What is conjugate symmetry for real signals?',
                "State Parseval's theorem for FT.",
                'Convolution property: x(t)*h(t) ↔ ?'
            ][i],
            back: [
                'X(jω) = ∫_{-∞}^{∞} x(t) e^{-jωt} dt — correlates x(t) with complex exponentials at every frequency',
                'x(t) = (1/2π) ∫_{-∞}^{∞} X(jω) e^{jωt} dω — reconstructs x(t) from its spectrum',
                '1/(a + jω) for a > 0 — a Lorentzian (lowpass) spectrum with magnitude 1/√(a² + ω²)',
                'τ sinc(ωτ/2π) — a sinc function whose first null is at ω = 2π/τ',
                'e^{-jωt₀} X(jω) — delay adds linear phase, magnitude unchanged',
                'X(j(ω - ω₀)) — spectrum shifts right by ω₀ (modulation/AM)',
                'jω X(jω) — differentiation = multiplication by jω in frequency',
                'X*(jω) = X(-jω) — magnitude is even, phase is odd for real x(t)',
                '∫|x(t)|²dt = (1/2π)∫|X(jω)|²dω — energy from either domain',
                'X(jω)·H(jω) — convolution in time = multiplication in frequency'
            ][i],
            difficultyLevel: [1, 1, 2, 2, 3, 3, 3, 4, 4, 5][i]
        }))
    };
    fs.writeFileSync(p.join(dir, 'flashcards.json'), JSON.stringify(flashcards, null, 4));

    // visuals.json - ALL supported types only
    const visuals = {
        visuals: info.visuals.map((vid, i) => {
            if (i % 3 === 2) {
                // Every 3rd visual is v3-waveform (interactive)
                return {
                    id: vid,
                    type: 'v3-waveform',
                    title: `Interactive: ${vid.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}`,
                    description: `Explore this concept interactively. Adjust parameters and observe changes in both time and frequency domains.`
                };
            }
            // Others are plotly
            return {
                id: vid,
                type: 'plotly',
                title: vid.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
                description: `Visual representation for ${info.title}.`,
                traces: [{
                    x_expr: "Array.from({length: 400}, (_, i) => -4 + i * 8 / 400)",
                    y_expr: "Array.from({length: 400}, (_, i) => { const t = -4 + i * 8 / 400; return Math.exp(-Math.abs(t)) * Math.cos(2*t); })",
                    mode: 'lines',
                    name: vid.replace(/-/g, ' '),
                    line: { color: ['#4f8cff', '#ff6b8a', '#2fbf8f', '#6b62ff', '#f5a623'][i % 5], width: 2.5 }
                }],
                layout: {
                    xaxis: { title: i < 5 ? 't' : 'ω' },
                    yaxis: { title: i < 5 ? 'x(t)' : 'X(jω)' },
                    showlegend: true
                }
            };
        })
    };
    fs.writeFileSync(p.join(dir, 'visuals.json'), JSON.stringify(visuals, null, 4));

    // metadata.json
    const meta = {
        id: id,
        title: info.title,
        contentPath: 'content.md',
        examPath: 'exam.md',
        quizPath: 'quiz.json',
        flashcardsPath: 'flashcards.json',
        visualsPath: 'visuals.json'
    };
    fs.writeFileSync(p.join(dir, 'metadata.json'), JSON.stringify(meta, null, 4));

    console.log('Created:', id, '(6 files)');
});

console.log('\nDone! All 10 concepts created.');
