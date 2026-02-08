# Exam Focus: System Classifications

## Quick Classification Checklist

For each system, test systematically:

1. **Memoryless?** Check if y(t) depends ONLY on x(t) at same instant
2. **Causal?** Check if y(t) depends on any x(τ) where τ > t  
3. **Time-Invariant?** Substitute x(t-t₀), check if output becomes y(t-t₀)
4. **Linear?** Test superposition: T{ax₁ + bx₂} = aT{x₁} + bT{x₂}

## Common Exam Traps

### Trap 1: Constants Make Systems Nonlinear
$y = x + 5$ is NONLINEAR because zero input gives non-zero output (violates homogeneity).

### Trap 2: Time Scaling is Time-Varying
$y(t) = x(2t)$ is time-VARYING, not time-invariant.

### Trap 3: Future Indices Mean Non-Causal
$y[n] = x[n+1]$ is non-causal even though it's "just one sample ahead."

## Practice Problems

1. Classify: $y(t) = \frac{d}{dt}x(t)$
   - Answer: Memoryless, Causal, TI, Linear (LTI)

2. Classify: $y[n] = x[n] \cdot x[n-1]$
   - Answer: Memory, Causal, TI, Nonlinear

3. Classify: $y(t) = e^{t}x(t)$
   - Answer: Memoryless, Causal, Time-varying, Linear
