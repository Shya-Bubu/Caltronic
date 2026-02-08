# Lesson 01 Synthesis: Signal Fundamentals and Classifications

## What You've Learned

### The 3 Concepts - Summary

| Concept | Key Topics | Key Insight |
|---------|-----------|-------------|
| **Signal Fundamentals** | CT/DT, Energy/Power, Even/Odd, Periodic | Signals are classified by their properties |
| **Signal Operations** | Time shift, scale, reversal | Manipulating signals mathematically |
| **System Basics** | Memory, Causality, Linearity, TI | Systems transform signals with specific properties |

## Key Formulas (Memorize These!)

### Signal Classifications
| Classification | Continuous | Discrete |
|----------------|------------|----------|
| **Energy** | $E = \int |x(t)|^2 dt$ | $E = \sum |x[n]|^2$ |
| **Power** | $P = \lim_{T\to\infty}\frac{1}{2T}\int_{-T}^{T}|x(t)|^2 dt$ | Similar limit |
| **Sinusoid Power** | $P = A^2/2$ | Same |

### Signal Operations
| Operation | Formula | Effect |
|-----------|---------|--------|
| Time Shift | $x(t-t_0)$ | Delay by $t_0$ (right) |
| Time Scale | $x(at)$ | Compress if $|a|>1$ |
| Time Reversal | $x(-t)$ | Mirror about y-axis |

### System Properties
- **Linear**: $T\{ax_1 + bx_2\} = aT\{x_1\} + bT\{x_2\}$
- **Time-Invariant**: Shift input → Shift output
- **Causal**: No dependence on future inputs
- **BIBO Stable**: Bounded input → Bounded output

## Euler's Formula (Critical!)

$$e^{j\theta} = \cos\theta + j\sin\theta$$

From this:
- $\cos\theta = \frac{e^{j\theta} + e^{-j\theta}}{2}$
- $\sin\theta = \frac{e^{j\theta} - e^{-j\theta}}{2j}$

## Common Exam Traps

1. **x(t-2) shifts RIGHT, not left** - The minus is counter-intuitive
2. **Sinusoids are POWER signals** - They have infinite energy but finite power
3. **y = x + 3 is NONLINEAR** - Constants break the zero-input test
4. **Combined operations**: For x(at+b), factor out a first

## Connections to Future Topics

- **Convolution**: Uses LTI system properties
- **Fourier Analysis**: Uses Euler's formula extensively  
- **Laplace Transform**: Builds on exponential signals
- **Frequency Response**: Depends on sinusoidal steady-state

---

*You now have the foundation to understand signals, systems, and their interactions!*
