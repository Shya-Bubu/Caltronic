# Exam Preparation: FT Properties: Frequency Shift and Differentiation

## How This Is Tested

This topic appears regularly in exams, typically as:
- **Direct computation** (8-12 marks): Apply the definition or a property to find a transform
- **Property application** (5-8 marks): Use a known transform pair + property to derive a new one
- **Interpretation** (3-5 marks): Sketch or describe the spectrum

## Mark Allocation Strategy

| Task | Marks | Time |
|------|-------|------|
| State the relevant formula/property | 2-3 | 1 min |
| Set up the integral or apply the property | 3-4 | 3 min |
| Evaluate and simplify | 3-4 | 3 min |
| Sketch the spectrum (if asked) | 2-3 | 2 min |

## Common Mistakes

1. **Forgetting to adjust integration limits** — when $x(t) = 0$ for $t < 0$, the integral starts at 0, not $-\infty$
2. **Sign errors in the exponent** — analysis uses $e^{-j\omega t}$, synthesis uses $e^{+j\omega t}$
3. **Missing the $1/2\pi$ factor** — the inverse FT has a $1/2\pi$ normalization
4. **Not checking convergence** — the integral must converge for the FT to exist

## Past Paper Patterns

- Compute FT from definition (most common)
- Use properties to find FT of a modified signal
- Sketch magnitude and phase spectra
- Verify Parseval's theorem for a given signal
