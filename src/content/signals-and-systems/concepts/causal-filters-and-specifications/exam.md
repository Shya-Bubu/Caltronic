# Exam Focus — Causal Filters and Specifications

## Common Question Types

### Type 1: Define Passband/Stopband/Transition (4 marks)
State definitions with the 3 dB criterion. Passband: |H| ≥ 1/√2. Stopband: |H| 40-50 dB below peak. Transition: between the two.

### Type 2: Read a Filter Specification (5 marks)
Given a magnitude plot, identify ωp, ωs, transition width, passband ripple, stopband attenuation.

### Type 3: Explain Trade-offs (4-6 marks)
Sharper transition ↔ more ripple. Higher order ↔ implementation difficulty. Phase linearity as additional constraint.

### Type 4: Compare Ideal vs Practical (4 marks)
Ideal: sharp cutoff, rectangular, non-causal. Practical: gradual transition, ripples possible, causal and realisable.

## Common Mistakes
- Using wrong dB formula — magnitude uses 20log₁₀(|H|), NOT 10log₁₀
- Confusing 3 dB voltage with 3 dB power — 3 dB voltage = 1/√2, 3 dB power = 1/2
- Thinking transition region width = 0 is achievable with high enough order — it's always finite
