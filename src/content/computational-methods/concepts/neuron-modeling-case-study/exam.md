# Exam Guide: Biological Neuron Modeling

## Typical Question Patterns

| Pattern | Marks | Time |
|---------|-------|------|
| **LIF derivation** — "Derive and explain the LIF equation. What is the membrane time constant?" | 5-6 | 5 min |
| **HH structure** — "Describe the Hodgkin-Huxley model. What does each term represent?" | 8-10 | 10 min |
| **Model comparison** — "Compare Poisson, LIF, and HH in terms of fidelity, complexity, and use cases." | 6-8 | 7 min |
| **Classification** — "Which neuron model category does each equation belong to?" | 4 | 4 min |

## Common Mistakes

- **Confusing m, n, h gating variables**: m = Na⁺ activation (fast, cubed), h = Na⁺ inactivation (slow), n = K⁺ activation (slow, to 4th power). Don't mix them up.
- **LIF has no spike shape**: The LIF produces a spike *event* (threshold crossing), not a realistic spike waveform. The spike shape is artificial. Only HH generates the correct spike shape.
- **Poisson = no voltage**: The Poisson model has no membrane potential at all — just random events at rate λ. Don't try to derive voltage traces from it.
