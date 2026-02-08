# Exam Strategy

## Key Topics to Master

1. **Op-amp pin diagram** — know pins 2, 3, 4, 6, 7
2. **Two golden rules** — no current into inputs, virtual short
3. **Analysis procedure** — KCL at nodes, set V+ = V−
4. **Saturation limits** — output cannot exceed supply voltage

## Common Exam Questions

### Type 1: Identify the configuration
"Given this circuit, identify if it's inverting, non-inverting, or differential"
- Look at which input receives the signal
- Look for the feedback path (output to inverting)

### Type 2: Calculate gain
"For the given circuit, derive the gain expression"
- Apply KCL at inverting node
- Use virtual short (V− = V+)
- Solve for Vo/Vi

### Type 3: Predict output waveform
"Given a 1V sine input and gain of -10, sketch the output"
- Amplitude multiplied by |gain|
- Phase inverted if gain is negative
- Watch for saturation/clipping

## Common Mistakes

❌ Forgetting the negative sign in inverting amplifier
❌ Confusing V+ and V− terminal positions
❌ Not checking if output saturates
❌ Using open-loop analysis when feedback is present

## Formula Sheet

| Item | Formula |
|------|---------|
| Inverting Gain | Av = −R2/R1 |
| Non-Inverting Gain | Av = 1 + R2/R1 |
| Virtual Short | V+ = V− |
| No input current | I+ = I− = 0 |
| Saturation limits | \|Vo\| ≤ Vsupply − 1V |
