# Exam Focus — Filter Phase and Distortion

## Common Question Types

### Type 1: Identify Distortionless Condition (4 marks)
Given a filter's phase function, determine if transmission is distortionless. Check: is ∠H(ω) = −ωt_d (linear through origin)? If yes → distortionless. If constant or nonlinear → distortion.

### Type 2: Compute Time Delay (3–4 marks)
Given ∠H(ω) = −ωt_d, extract t_d. If ∠H = −5ω, then t_d = 5 s. Output is x(t − 5).

### Type 3: Show Distortion with Two-Frequency Signal (6–8 marks)
Given x(t) = A₀cos(ω₀t) + A₁cos(ω₁t) and a specific ∠H(ω), compute the output and show the different time delays for each component. If delays differ → distortion.

### Type 4: Write Complete Ideal LPF (4 marks)
Express H(ω) = P_{2B}(ω)·e^{−jωt_d}. Must include both magnitude (rectangular) AND phase (linear).

## Common Mistakes
- Confusing **constant phase** with **linear phase** — constant phase still causes distortion
- Forgetting the negative sign in ∠H(ω) = −ωt_d (positive t_d means delay, so phase is negative)
- Only checking magnitude for distortionless — phase must also be linear
