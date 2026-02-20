# Synthesis: Fourier Series Part II

## The Big Picture

Part I gave you the **machinery** of the FS — analysis, synthesis, basic properties, symmetry. Part II gives you the **power tools**: differentiation/integration shortcuts, new FS pairs (impulse, triangle), the trigonometric form, Parseval's theorem for power, and the connection to LTI systems. These are the tools that make the FS practically useful for circuit and signal analysis.

## How the Concepts Connect

```
Diff/Integration Property
    │
    ├── Derives triangular pulse FS (avoid integration by parts)
    │       └── Uses impulse train FS as known pair
    │
    ├── Interpretation: differentiation = highpass, integration = lowpass
    │
    └── Foundation for FT differentiation property (Lesson 06+)

Trigonometric FS
    │
    ├── Connects EFS to familiar a_k cos + b_k sin form
    └── Proves orthogonality of basis functions

Parseval's Theorem
    │
    ├── Total power = sum of |X_k|²
    └── Enables frequency-domain power calculations

LTI Systems + FS
    │
    ├── Y_k = H(jkω₀) · X_k
    └── Directly computes output spectrum without convolution
```

## What to Prioritise for Exams

| Priority | Topic | Why |
|----------|-------|-----|
| 🔴 High | Differentiation/integration property | Used in derivations; asked to "use properties" |
| 🔴 High | Parseval's theorem | Classic exam question on power computation |
| 🔴 High | LTI systems + FS | System response questions |
| 🟡 Medium | Impulse & triangular pulse FS pairs | Standard pairs to know |
| 🟢 Lower | Trigonometric FS and orthogonality | Asked for completeness; less computation-heavy |

## Looking Forward

The Fourier Series applies to **periodic** signals. In the next lectures (Fourier Transform), you'll take the limit $T_0 \to \infty$, turning the discrete spectrum into a continuous one. The differentiation/integration property, Parseval's theorem, and LTI system analysis all carry over — just with integrals instead of sums.
