# Exam Focus: LTI Impulse Response

## Key Tests

- **Causal**: h(t) = 0 for t < 0
- **Stable**: ∫|h(t)|dt < ∞

## Common Exam Patterns

### Is this system stable?
Given h(t) = e^(-2t)u(t): ∫₀^∞ e^(-2t)dt = 1/2 < ∞ → STABLE

### Cascade combination
h₁(t) * h₂(t) = overall impulse response

### Determine h(t) from differential equation
For y' + ay = x: h(t) = e^(-at)u(t)

## Quick Stability Check

- Exponentials e^(-at)u(t) with a>0: STABLE
- Step u(t): UNSTABLE (∫u(t)dt = ∞)
- sinc(t): STABLE (absolutely integrable)
- Growing exponentials: UNSTABLE
