# Exam Focus — Butterworth Filter Design

## Common Question Types

### Type 1: Derive |H_B(ω)| from H_B(s) (8-10 marks)
Start with H_B(s) = ω_n²/(s²+√2ω_ns+ω_n²). Substitute s = jω. Compute magnitude. Show the cancellation in the denominator that gives 1/√(1+(ω/ωn)⁴). This is a classic exam derivation.

### Type 2: Find Poles and Place on s-Plane (5-6 marks)
Solve s² + √2ω_ns + ω_n² = 0 or use the N-pole semicircle rule (poles at 180°/N spacing on semicircle of radius ω_c). Draw the s-plane with poles marked.

### Type 3: Frequency Scaling (4-5 marks)
Given a normalised Butterworth H(s) from tables (ω_c = 1), scale to desired ω_c by replacing s with s/ω_c. Expand and simplify.

### Type 4: Verify 3 dB Point (3 marks)
Show |H_B(ω_n)| = 1/√(1+1) = 1/√2. Confirm cutoff is at $\omega_n$.

### Type 5: Compare Filter Orders (4-5 marks)
Given |H_B(ω)| = 1/√(1+(ω/ωn)^{2N}), compare N=1,2,3 at specific frequencies. Higher N → steeper rolloff.

## Common Mistakes
- Forgetting the √2 coefficient: it's 2ζω_n = 2·(1/√2)·ω_n = √2·ω_n, NOT 2ω_n
- Using wrong exponent: 2-pole has (ω/ωn)⁴ in denominator, N-pole has (ω/ωn)^{2N}
- Frequency scaling errors: replace s with s/ω_c in the normalised transfer function, don't just multiply by ω_c
- Confusing pole radius: all poles at distance ω_c from origin, NOT ω_c/√2
