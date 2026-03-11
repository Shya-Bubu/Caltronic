# Exam Focus — Response to Arbitrary Inputs

## Common Question Types

### Type 1: Rectangular Pulse Response (6–8 marks)
Decompose pulse as u(t)−u(t−T), find X(s), multiply by H(s), use time-shift for inverse Laplace.

### Type 2: Time-Shift Property Application (3–4 marks)
Apply ℒ{f(t−t₀)u(t−t₀)} = e^(−st₀)F(s) to shifted signals.

### Type 3: Superposition of Known Responses (4–6 marks)
Express a complex input as sum of simpler signals, compute each output, sum.

## Common Mistakes
- Forgetting the u(t−t₀) factor when using time-shift property
- Wrong sign in the exponential (should be e^(−st₀), not e^(+st₀))
- Not recognising that pulse response = step response − delayed step response
