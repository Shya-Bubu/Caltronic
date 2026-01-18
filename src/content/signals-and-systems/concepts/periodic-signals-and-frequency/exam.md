# Exam Preparation: Periodic Signals

## Common Question Types

### Type 1: Find Fundamental Period
**Given:** x(t) = A₁sin(ω₁t) + A₂cos(ω₂t)
**Find:** T₀

**Method:**
1. Find individual periods: T₁ = 2π/ω₁, T₂ = 2π/ω₂
2. Express ratio T₁/T₂ as a fraction p/q in lowest terms
3. T₀ = p·T₂ = q·T₁

### Type 2: Determine if Periodic
**Given:** x(t) = sin(3t) + cos(πt)
**Ask:** Is x(t) periodic?

**Method:**
1. T₁ = 2π/3, T₂ = 2
2. T₁/T₂ = 2π/3 / 2 = π/3 (irrational!)
3. **Not periodic** (ratio must be rational)

### Type 3: Convert Between Parameters
**Given:** f₀ = 50 Hz
**Find:** T₀, ω₀

**Solution:**
- T₀ = 1/f₀ = 1/50 = 0.02 s = 20 ms
- ω₀ = 2πf₀ = 100π rad/s ≈ 314.16 rad/s

## Key Formulas

| From | To T₀ | To f₀ | To ω₀ |
|------|-------|-------|-------|
| T₀ | — | 1/T₀ | 2π/T₀ |
| f₀ | 1/f₀ | — | 2πf₀ |
| ω₀ | 2π/ω₀ | ω₀/(2π) | — |

## Common Mistakes

1. **Forgetting 2π:** ω₀ = 2πf₀, NOT ω₀ = f₀
2. **Wrong period for sum:** Period of x+y ≠ T₁+T₂; use LCM
3. **Irrational frequency ratios:** If T₁/T₂ is irrational, sum is NOT periodic
4. **Sign errors:** Period is always positive

## Practice Problems

**Problem 1:** Find T₀ for x(t) = 3cos(4t) + 2sin(6t)
- T₁ = 2π/4 = π/2
- T₂ = 2π/6 = π/3
- LCM(π/2, π/3) = π
- **Answer:** T₀ = π

**Problem 2:** Is x(t) = sin(t) + sin(√2·t) periodic?
- T₁ = 2π
- T₂ = 2π/√2 = π√2
- T₁/T₂ = 2π/(π√2) = √2 (irrational)
- **Answer:** Not periodic

**Problem 3:** A signal has ω₀ = 10π rad/s. Find the time to complete 5 cycles.
- T₀ = 2π/ω₀ = 2π/(10π) = 0.2 s
- Time for 5 cycles = 5T₀ = 1 s

## Exam Tips

- Always check if the question asks for f₀ (Hz) or ω₀ (rad/s)
- Draw a quick sketch to visualize the signal
- For composite signals, identify the fundamental (lowest non-zero frequency)
- Remember: DC component has zero frequency
