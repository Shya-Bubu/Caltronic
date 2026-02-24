## Exam Strategy: Why Biasing Is Needed

### What Examiners Ask

This concept appears as a **short-answer or qualitative question** (4-8 marks). You won't usually get a full numerical problem on "why biasing" alone — that comes with specific bias circuits — but you *will* be asked to explain the need for biasing, describe what clipping is, or sketch waveforms.

### Typical Question Patterns

1. **"Explain why biasing is necessary for a BJT amplifier"** (4-6 marks)
   - State that without bias, V_BE < 0.7 V for negative input → cutoff → signal clipped
   - Explain that biasing sets a DC Q-point in the active region
   - Mention coupling capacitor for DC isolation
   - Draw the clipped vs properly biased output waveforms (sketch = marks)

2. **"Define Q-point and state what determines it"** (3-4 marks)
   - Q-point = (V_CEQ, I_CQ), DC conditions with no signal
   - Determined by intersection of transistor characteristics and load line (circuit constraints)
   - Must be in the active linear region for amplification

3. **"State the notation convention for DC, AC, and total signals"** (2-4 marks)
   - Table with all four cases (DC, AC, total, phasor)
   - Examiner expects the exact convention — capital/lowercase for letter and subscript

### Mark Allocation Tips

- **Always draw waveforms** when asked about clipping — a sketch of input vs output typically earns 2 marks on its own
- Use the term **"quiescent"** — examiners look for this specific word
- When explaining bias necessity, contrast the two cases (biased vs unbiased) rather than just describing one
- Mention that the Q-point must satisfy **both** transistor characteristics **and** circuit constraints — this shows deeper understanding

### Time Guide

- Qualitative "explain biasing" question: 5-8 minutes
- Notation convention: 2-3 minutes (just reproduce the table)
- Waveform sketch: 3-4 minutes

### Common Mistakes That Lose Marks

- Saying biasing "turns on" the transistor — biasing doesn't just turn it on, it places it in the **middle** of the active region for symmetric signal swing
- Forgetting the coupling capacitor when describing the complete biased circuit
- Confusing the Q-point with the load line — the Q-point is a **single point**, the load line is the **line of possible operating points**
