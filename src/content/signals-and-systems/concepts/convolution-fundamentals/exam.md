# Exam Focus: Convolution Fundamentals

## Essential Formulas

- CT: $y(t) = \int_{-\infty}^{\infty} x(\tau)h(t-\tau)d\tau$
- DT: $y[n] = \sum_{k=-\infty}^{\infty} x[k]h[n-k]$

## Graphical Convolution Steps

1. Flip h(τ) to get h(-τ)
2. Shift by t to get h(t-τ)
3. Multiply x(τ)·h(t-τ)
4. Integrate over all τ
5. Repeat for each t value

## Common Exam Patterns

### Rectangular Pulse Convolution
Two rectangular pulses → trapezoidal or triangular result

### Step × Exponential
u(t) * e^(-at)u(t) = (1/a)(1 - e^(-at))u(t)

### Discrete Convolution
For finite sequences, sum over overlapping indices only

## Key Shortcuts

- Duration of y = duration of x + duration of h - 1 (for finite signals)
- Impulse convolution: x * δ = x
