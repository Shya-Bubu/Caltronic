# Exam Focus — Ideal Filter Realizability

## Common Question Types

### Type 1: Prove Non-Causality (6–8 marks)
Given H(ω) = P_{2B}(ω)·e^{−jωtd}, find h(t) using the Fourier pair rect↔sinc. Show h(t) ≠ 0 for t < 0 → non-causal → unrealisable.

### Type 2: State Fourier Pair (3 marks)
P_W(ω) ↔ (W/2π)sinc(Wt/2π). Know the shifted version: P_W(ω)e^{−jωtd} ↔ (W/2π)sinc(W(t−td)/2π).

### Type 3: Explain Why All Ideal Filters Are Unrealisable (4 marks)
All have rectangular frequency responses → sinc time responses → non-zero for t < 0 → non-causal.

## Common Mistakes
- Confusing sinc with sin — sinc(x) = sin(πx)/(πx), not just sin(x)/x
- Thinking large t_d fixes causality — sinc tails extend to −∞ regardless
- Saying "ideal filters are unrealisable because they're too sharp" — the correct reason is non-causality of h(t)
