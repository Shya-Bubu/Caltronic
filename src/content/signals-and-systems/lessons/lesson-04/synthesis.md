# Synthesis: Fourier Series Part I

## 🔗 The Big-Picture Connection

This lesson established the fundamental bridge between **time** and **frequency**:

$$x(t) \xleftrightarrow{\text{EFS}} X_k$$

Every periodic signal $x(t)$ with fundamental period $T_0$ has a unique set of Fourier Series coefficients $X_k$ that tell you *exactly* which frequency components are present, how strong they are, and what phase they carry.

## 🧩 How the Concepts Fit Together

```
Periodicity          → defines T₀, ω₀ = 2π/T₀
        ↓
EFS Definition       → x(t) = Σ Xₖ eⁱᵏω₀ᵗ  ;  Xₖ = (1/T₀) ∫ x(t) e⁻ⁱᵏω₀ᵗ dt
        ↓
Square Pulse Example → concrete worked FS using sinc: Xₖ = sin(kω₀T₁)/(kπ)
        ↓
Properties           → shortcuts: linearity, shifting, reversal, scaling
        ↓
Symmetry             → constraints on Xₖ for real, even, odd signals
```

## 📐 Key Formulas at a Glance

| Formula | Meaning |
|---------|---------|
| $x(t) = x(t + mT_0)$ | Periodicity definition |
| $X_k = \frac{1}{T_0}\int_{T_0} x(t)\,e^{-jk\omega_0 t}\,dt$ | Analysis (find coefficients) |
| $x(t) = \sum_{k=-\infty}^{\infty} X_k\,e^{jk\omega_0 t}$ | Synthesis (reconstruct signal) |
| $X_0 = \frac{1}{T_0}\int_{T_0} x(t)\,dt$ | DC / average value |
| Square pulse: $X_k = \frac{\sin(k\omega_0 T_1)}{k\pi}$ | sinc-shaped spectrum |
| Linearity: $\alpha x + \beta y \to \alpha X_k + \beta Y_k$ | Same $\omega_0$ required |
| Time shift: $x(t-t_0) \to X_k\,e^{-jk\omega_0 t_0}$ | Magnitude unchanged, phase shifted |
| Reversal: $x(-t) \to X_{-k}$ | Coefficients mirror |
| Real signal: $X_{-k} = X_k^*$ | Conjugate symmetry |

## 🔭 Looking Ahead

In **Lesson 05 (Fourier Series Part II)** you will:
- Use **differentiation and integration** properties for spectral sharpening/smoothing
- Compute the FS of **impulse** and **triangular pulse** trains
- Meet the **Trigonometric Fourier Series** and orthogonality
- Apply **Parseval's theorem** to link FS coefficients to signal power
- Analyse LTI systems using the FS
