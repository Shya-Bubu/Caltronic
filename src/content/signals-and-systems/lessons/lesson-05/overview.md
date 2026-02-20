# Fourier Series — Part II

## What This Lesson Is About

This lesson extends the Fourier Series toolkit introduced in Part I. You will learn **two new properties** (differentiation and integration), **two new FS pairs** (impulse train and triangular pulse), the **trigonometric form** of the FS, **Parseval's power theorem**, and how to analyse **LTI systems** using the FS. Together these tools let you handle a much wider class of signals and systems than the basic EFS alone.

## Where This Fits

```
Lesson 04 (FS Part I)
├── EFS definition & properties (linearity, shift, reversal, scaling)
├── Square pulse FS pair
└── Symmetry properties
        │
        ▼
Lesson 05 (FS Part II)  ← YOU ARE HERE
├── Differentiation / Integration property
├── Impulse train & triangular pulse FS
├── Trigonometric FS & orthogonality
├── Power & Parseval's theorem
└── LTI systems + FS
        │
        ▼
Lesson 06 (Fourier Transform Part I)
└── From periodic → aperiodic signals
```

## What You Need Before Starting

- EFS analysis equation: $X_k = \frac{1}{T_0}\int_{T_0} x(t)\,e^{-jk\omega_0 t}\,dt$
- EFS synthesis equation: $x(t) = \sum_k X_k\,e^{jk\omega_0 t}$
- Square pulse FS pair: $X_k = \frac{\sin(k\omega_0 T_1)}{k\pi}$
- All four FS properties from Lesson 04
- Conjugate symmetry and real/even/odd symmetry rules
- Delta function properties ($\int f(t)\delta(t-t_0)\,dt = f(t_0)$)

## Key Takeaways

1. **Differentiation ↔ highpass**: $x'(t) \leftrightarrow jk\omega_0 X_k$ — amplifies high-$k$ harmonics (sharpening)
2. **Integration ↔ lowpass**: divides by $jk\omega_0$ — attenuates high-$k$ harmonics (smoothing)
3. **Impulse train FS**: all coefficients equal $1/T_0$ — infinite bandwidth
4. **Triangular pulse FS**: derived via differentiation property, avoiding integration by parts
5. **Trigonometric FS**: $x(t) = a_0 + \sum_k (a_k\cos k\omega_0 t + b_k\sin k\omega_0 t)$ — bridges EFS and familiar trig
6. **Orthogonality**: basis functions $e^{jk\omega_0 t}$ are orthogonal — inner product yields the Kronecker delta
7. **Parseval's theorem**: $P_{avg} = \sum_k |X_k|^2$ — total power = sum of harmonic powers
8. **LTI + FS**: if $H(j\omega)$ is the frequency response, output FS coefficients are $Y_k = H(jk\omega_0)\,X_k$
