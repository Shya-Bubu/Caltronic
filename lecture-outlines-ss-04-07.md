# Signals & Systems — Detailed Lecture Outlines (Lectures 4–7)

> Extracted from auto-generated VTT subtitle files.
> Timestamps are approximate (from ASR captions).
> All resources.txt files (lessons 05, 06, 07) were empty templates.

---

## LECTURE 4 — Fourier Series Part I

**Duration:** ~1 h 38 min | **File:** `lesson-04/…-en-asr.vtt` (4 455 lines)

### A. Topic Sequence with Timestamps

| # | Timestamp | Topic |
|---|-----------|-------|
| 1 | 00:00 | Introduction — importance of signal processing, inter-domain analysis |
| 2 | ~01:50 | Representing signals in different domains (time vs frequency) |
| 3 | ~06:10 | Definition of periodic signals: x(t) = x(t + mT₀), m ∈ ℤ, T₀ > 0 |
| 4 | ~09:00 | Fundamental period T₀, fundamental frequency f₀ = 1/T₀, ω₀ = 2π/T₀ |
| 5 | ~11:00 | Example signal decomposition: x(t) = 11 + 4 sin(5t) + (4/3) sin(15t) |
| 6 | ~16:00 | Euler's formula and complex exponential representations |
| 7 | ~19:00 | Decomposing a signal into complex exponential terms e^(jk·5t) |
| 8 | ~22:00 | Complex number polar form review |
| 9 | ~26:00 | Calculating specific FS coefficients X₋₃, X₋₁, X₀, X₁, X₃ |
| 10 | ~28:00 | **Fourier Series definition**: x(t) = Σₖ Xₖ e^(jkω₀t) |
| 11 | ~31:00 | Magnitude and phase plots of FS coefficients |
| 12 | ~34:00 | Deriving the FS coefficient operator: (1/T₀)∫ x(t) e^(−jkω₀t) dt |
| 13 | ~38:00 | **Orthogonality proof**: ∫_{T₀} e^(j(m−k)ω₀t) dt = 0 (m≠k), = T₀ (m=k) |
| 14 | ~42:00 | General FS coefficient formula; X₀ as DC / average value |
| 15 | ~44:00 | **Square Pulse Train** example: amplitude 1, pulse width 2T₁, period T₀ |
| 16 | ~48:00 | Computing X₀ = 2T₁/T₀ for square pulse train |
| 17 | ~50:00 | Computing Xₖ = (1/kπ) sin(kω₀T₁) using Euler's formula trick |
| 18 | ~53:00 | Observations: Xₖ purely real (signal is real & even); Xₖ → 0 as k → ∞ |
| 19 | ~55:00 | Interpretation: adding sinusoids reconstructs the square pulse; Gibbs-like phenomena |
| 20 | ~58:00 | Fourier Series convergence discussion; using MATLAB to simulate partial sums |
| 21 | ~59:00 | Transition to **FS Properties**; motivation — avoid re-evaluating the integral |
| 22 | ~60:00 | **Linearity Property**: z(t) = αx(t) + βy(t) ⟹ Zₖ = αXₖ + βYₖ (same ω₀ required) |
| 23 | ~63:00 | Graphical explanation of why same fundamental frequency is required for linearity |
| 24 | ~65:00 | **Time Shifting Property**: x(t−t₀) ↔ Xₖ e^(−jkω₀t₀) — derivation by substitution |
| 25 | ~68:00 | Interpretation: magnitude unchanged, phase shifted by −kω₀t₀ |
| 26 | ~71:00 | Phase information ↔ temporal ordering; magnitude ↔ signal shape |
| 27 | ~73:00 | **Example**: square pulse (period 4, width 2), Xₖ = (1/kπ) sin(kπ/2); shift by 1 ⟹ multiply by e^(−jkπ/2) |
| 28 | ~76:00 | **Time Reversal Property**: x(−t) ↔ X₋ₖ — derivation by variable substitution |
| 29 | ~79:00 | **Time Scaling Property**: x(αt) ↔ Xₖ with new ω₀′ = αω₀ |
| 30 | ~80:00 | Interpretation: compress in time ↔ expand in frequency; stretch in time ↔ compress in frequency |
| 31 | ~83:00 | **FS Properties of Real Signals**: conjugate symmetry X₋ₖ = Xₖ* |
| 32 | ~86:00 | Consequences: magnitude even, phase odd |
| 33 | ~89:00 | **Real + Even** signal ⟹ Xₖ purely real and even |
| 34 | ~92:00 | **Real + Odd** signal ⟹ Xₖ purely imaginary and odd |
| 35 | ~95:00 | Example: y(t) = sin(5t) → purely imaginary FS coefficients |
| 36 | ~96:00 | Lecture summary and recap of all topics covered |

### B. Mathematical Content

1. **Periodic signal definition**: x(t) = x(t + mT₀), m ∈ ℤ
2. **Fundamental frequency**: f₀ = 1/T₀, ω₀ = 2π/T₀
3. **Euler's formula**: e^(jθ) = cos θ + j sin θ; sin θ = (e^(jθ) − e^(−jθ))/(2j); cos θ = (e^(jθ) + e^(−jθ))/2
4. **Complex exponential Fourier Series**: x(t) = Σₖ₌₋∞^∞ Xₖ e^(jkω₀t)
5. **FS coefficient (analysis equation)**: Xₖ = (1/T₀) ∫_{T₀} x(t) e^(−jkω₀t) dt
6. **DC component**: X₀ = (1/T₀) ∫_{T₀} x(t) dt
7. **Orthogonality**: ∫_{T₀} e^(j(m−k)ω₀t) dt = T₀·δ[m−k]
8. **Square pulse Xₖ**: Xₖ = (1/kπ) sin(kω₀T₁); X₀ = 2T₁/T₀
9. **Linearity**: z(t) = αx(t) + βy(t) ⟹ Zₖ = αXₖ + βYₖ (same ω₀)
10. **Time shifting**: x(t−t₀) ↔ Xₖ e^(−jkω₀t₀); |Xₖ′| = |Xₖ|, ∠Xₖ′ = ∠Xₖ − kω₀t₀
11. **Time reversal**: x(−t) ↔ X₋ₖ
12. **Time scaling**: x(αt) ↔ Xₖ with ω₀′ = αω₀ (coefficients unchanged, frequency axis scaled)
13. **Conjugate symmetry (real signals)**: X₋ₖ = Xₖ*; |X₋ₖ| = |Xₖ| (even); ∠X₋ₖ = −∠Xₖ (odd)
14. **Real + even**: Xₖ = Xₖ* ⟹ Xₖ ∈ ℝ, even
15. **Real + odd**: Xₖ = −X₋ₖ* ⟹ Xₖ purely imaginary, odd

### C. Examples Worked

1. **Decomposition example**: x(t) = 11 + 4 sin(5t) + (4/3) sin(15t) — found fundamental frequency ω₀ = 5 rad/s, T₀ = 2π/5; extracted FS coefficients X₋₃, X₋₁, X₀, X₁, X₃
2. **Square pulse train**: Pulse width 2T₁, period T₀. Derived X₀ = 2T₁/T₀ and Xₖ = (1/kπ) sin(kω₀T₁). Plotted magnitude/phase spectra.
3. **Time shifting example**: Square pulse with T₀ = 4, width = 2 (T₁ = 1), Xₖ = (1/kπ) sin(kπ/2). Shifted by 1: Yₖ = Xₖ · e^(−jkπ/2)

### D. Key Definitions

- **Periodic signal**: x(t) = x(t + mT₀) for all integer m
- **Fundamental period** T₀: smallest positive T₀ satisfying periodicity
- **Fourier Series coefficients** Xₖ: the complex weights in the exponential FS expansion
- **DC component** X₀: average value of one period
- **Basis functions**: φₖ(t) = e^(jkω₀t)
- **Conjugate symmetry**: X₋ₖ = Xₖ* (for real signals)

### E. Properties Stated

| Property | Time Domain | FS Domain |
|----------|-------------|-----------|
| Linearity | αx(t) + βy(t) | αXₖ + βYₖ |
| Time Shifting | x(t−t₀) | Xₖ e^(−jkω₀t₀) |
| Time Reversal | x(−t) | X₋ₖ |
| Time Scaling | x(αt) | Xₖ, ω₀′ = αω₀ |
| Conjugate Symmetry | x(t) real | X₋ₖ = Xₖ* |
| Real + Even | x(t) = x(−t), real | Xₖ ∈ ℝ, even |
| Real + Odd | x(t) = −x(−t), real | Xₖ ∈ jℝ, odd |

### F. Connections Made

- FS coefficients as projections onto orthogonal basis functions (linear algebra analogy)
- Compress in time ↔ expand in frequency (and vice versa) — fundamental duality
- Magnitude carries signal shape information; phase carries temporal ordering
- Sharp edges in time require high-frequency harmonics (Xₖ → 0 slowly)
- Connection to spectrum analyzer laboratory exercise
- FS as inter-domain analysis: what happens in time has a dual effect in frequency

---

## LECTURE 5 — Fourier Series Part II

**Duration:** ~1 h 11 min | **File:** `lesson-05/…-en-asr.vtt` (3 746 lines)

### A. Topic Sequence with Timestamps

| # | Timestamp | Topic |
|---|-----------|-------|
| 1 | 00:00 | Recap of Lecture 4: FS basics, Xₖ formula, orthogonality, square pulse train |
| 2 | ~05:00 | Recap: higher harmonics become smaller; sharp edges need high-freq components |
| 3 | ~07:00 | Recap of properties: linearity, time scaling, time reversal, time shifting |
| 4 | ~10:00 | Properties of real signals in FS: conjugate symmetry, magnitude even, phase odd |
| 5 | ~10:30 | Real+even ⟹ purely real & even Xₖ; Real+odd ⟹ purely imaginary Xₖ |
| 6 | ~13:00 | **Differentiation Property**: x′(t) ↔ jkω₀ · Xₖ (k ≠ 0) — high-pass process |
| 7 | ~19:00 | **Integration Property**: ∫x(t) ↔ Xₖ/(jkω₀) — low-pass/smoothing process |
| 8 | ~21:00 | **FS of Impulse Train**: δ_{T₀}(t) = Σ δ(t − kT₀) |
| 9 | ~22:00 | Impulse train FS: Xₖ = 1/T₀ for all k (constant — infinite bandwidth) |
| 10 | ~23:00 | Delta function sifting property: ∫f(t)δ(t−t₀)dt = f(t₀) |
| 11 | ~26:00 | Interpretation: delta is sharpest signal ⟹ all harmonics equal ⟹ infinite BW |
| 12 | ~28:00 | **Triangular Pulse Train** example: T₀ = 2, ω₀ = π |
| 13 | ~30:00 | Finding X₀ = 1/2 for triangular wave by integration |
| 14 | ~31:00 | Using differentiation property instead of integration by parts |
| 15 | ~33:00 | Differentiating triangular wave → square pulse + impulse train |
| 16 | ~35:00 | Connection: d/dt of unit step = delta; representing finite jumps via δ functions |
| 17 | ~40:00 | Full derivation: Xₖ = j/(2kπ) for triangular wave (k ≠ 0) |
| 18 | ~45:00 | Advantage of differentiation method over integration by parts |
| 19 | ~47:00 | **Trigonometric Fourier Series**: x(t) = X₀ + Σ_{k=1}^∞ [aₖ cos(kω₀t) + bₖ sin(kω₀t)] |
| 20 | ~49:00 | Deriving aₖ = Xₖ + X₋ₖ; bₖ = j(Xₖ − X₋ₖ) |
| 21 | ~50:00 | aₖ = (2/T₀) ∫_{T₀} x(t) cos(kω₀t) dt; bₖ = (2/T₀) ∫_{T₀} x(t) sin(kω₀t) dt |
| 22 | ~54:00 | Trigonometric FS is a byproduct; exponential FS has deeper information |
| 23 | ~55:00 | **Orthogonality of Basis Functions** — formal treatment |
| 24 | ~56:00 | Basis functions φₖ(t) = e^(jkω₀t); inner product definition with conjugate |
| 25 | ~57:00 | Inner product ⟨φₖ, φₘ⟩ = (1/T₀)∫_{T₀} e^(j(k−m)ω₀t) dt = δ[k−m] |
| 26 | ~58:00 | Orthonormal basis confirmed for exponential FS |
| 27 | ~59:00 | **Power of Periodic Signals / Parseval's Theorem** |
| 28 | ~60:00 | Average power: P = (1/T₀) ∫_{T₀} |x(t)|² dt |
| 29 | ~62:00 | Derivation using FS expansion: P = Σₖ |Xₖ|² |
| 30 | ~65:00 | Parseval's Theorem: (1/T₀)∫|x(t)|² dt = Σₖ |Xₖ|² |
| 31 | ~67:00 | Interpretation: power at each harmonic = |Xₖ|²; total power = sum of all |
| 32 | ~68:00 | Example: computing power above 2ω₀ using only |X₃|² |
| 33 | ~70:00 | **LTI Systems and Fourier Series** |
| 34 | ~71:00 | y(t) = h(t) * x(t); convolution integral revisited |
| 35 | ~73:00 | Substituting FS of x(t) into convolution; pulling Xₖ and e^(jkω₀t) out of integral |
| 36 | ~75:00 | Result: Yₖ = H(jkω₀) · Xₖ — convolution ↔ multiplication in FS domain |
| 37 | ~77:00 | H(jkω₀) as the kth frequency response sample of the system |
| 38 | ~78:00 | Transition: FS is a subset of the broader Fourier Transform |
| 39 | ~80:00 | Lecture conclusion, homework/lab instructions |

### B. Mathematical Content

1. **Differentiation property**: d/dt x(t) ↔ jkω₀ · Xₖ (for k ≠ 0); X₀ handled separately
2. **Integration property**: ∫x(t) ↔ Xₖ/(jkω₀) (for k ≠ 0)
3. **Impulse train FS**: δ_{T₀}(t) = Σ δ(t−kT₀); Xₖ = 1/T₀ for all k
4. **Delta sifting**: ∫f(t)δ(t−t₀)dt = f(t₀)
5. **Triangular wave FS**: X₀ = 1/2; Xₖ = j/(2kπ) for k ≠ 0
6. **Trigonometric FS**: x(t) = X₀ + Σ_{k=1}^∞ [aₖ cos(kω₀t) + bₖ sin(kω₀t)]
7. **aₖ formula**: aₖ = (2/T₀) ∫_{T₀} x(t) cos(kω₀t) dt
8. **bₖ formula**: bₖ = (2/T₀) ∫_{T₀} x(t) sin(kω₀t) dt
9. **Relationship**: aₖ = Xₖ + X₋ₖ; bₖ = j(Xₖ − X₋ₖ)
10. **Inner product for basis**: ⟨φₖ, φₘ⟩ = (1/T₀) ∫_{T₀} φₖ(t) φₘ*(t) dt = δ[k−m]
11. **Average power**: P = (1/T₀) ∫_{T₀} |x(t)|² dt = Σₖ |Xₖ|² (Parseval's Theorem)
12. **LTI + FS**: Yₖ = H(jkω₀) · Xₖ; H(jkω₀) = ∫_{−∞}^{∞} h(τ) e^(−jkω₀τ) dτ

### C. Examples Worked

1. **Impulse train**: Derived Xₖ = 1/T₀ ∀k using the sifting property. Interpreted: sharpest signal → constant spectrum → infinite bandwidth.
2. **Triangular pulse train** (T₀ = 2, ω₀ = π): Found X₀ = 1/2 by direct integration. Then differentiated to get a square pulse plus weighted impulse train; used differentiation property in reverse to get Xₖ = j/(2kπ). Compared effort vs integration-by-parts.
3. **Power calculation**: Showed how to compute total power and power at individual harmonics using Parseval's |Xₖ|² terms.

### D. Key Definitions

- **Differentiation (high-pass)**: Amplifies high-frequency harmonics (multiplies by jkω₀)
- **Integration (low-pass)**: Attenuates high-frequency harmonics (divides by jkω₀)
- **Impulse train**: δ_{T₀}(t) — periodic train of Dirac deltas
- **Orthonormal basis**: ⟨φₖ, φₘ⟩ = δ[k−m]
- **Average power** of a periodic signal: P = (1/T₀) ∫_{T₀} |x(t)|² dt
- **Parseval's Theorem** (FS): connects time-domain power to sum of |Xₖ|²
- **Frequency response sample**: H(jkω₀) — system's response at the kth harmonic

### E. Properties Stated

| Property | Time Domain | FS Domain |
|----------|-------------|-----------|
| Differentiation | dx/dt | jkω₀ · Xₖ (k≠0) |
| Integration | ∫x(t)dt | Xₖ/(jkω₀) (k≠0) |
| Parseval's | (1/T₀)∫\|x(t)\|²dt | Σₖ \|Xₖ\|² |
| LTI system | y = h * x | Yₖ = H(jkω₀)·Xₖ |

### F. Connections Made

- Differentiation is a high-pass process; integration is a low-pass (smoothing) process
- d/dt(unit step) = δ(t): representing discontinuities with delta functions
- Differentiation-then-divide method is faster than integration by parts for FS computation
- Power in frequency domain carried entirely in magnitude (|Xₖ|²) — phase doesn't contribute
- Convolution in time ↔ multiplication in FS domain (pre-cursor to the convolution theorem)
- FS is a subset of the Fourier Transform — foreshadowing Lecture 6
- Analogy between FS basis functions and linear algebra orthogonal bases

---

## LECTURE 6 — Fourier Transform Part I

**Duration:** ~1 h 31 min | **File:** `lesson-06/…-en-asr.vtt` (4 139 lines)

### A. Topic Sequence with Timestamps

| # | Timestamp | Topic |
|---|-----------|-------|
| 1 | 00:00 | Transition from FS to FT: T₀ → ∞, ω₀ → 0, discrete → continuous |
| 2 | ~03:00 | FT defined for aperiodic/energy signals; X(jω) is continuous complex spectrum |
| 3 | ~05:00 | **FT definition**: X(jω) = ∫_{−∞}^{∞} x(t) e^(−jωt) dt |
| 4 | ~07:00 | **Inverse FT**: x(t) = (1/2π) ∫_{−∞}^{∞} X(jω) e^(+jωt) dω |
| 5 | ~08:00 | FT is more general than FS; FS is a subset |
| 6 | ~09:30 | **Example 1**: FT of x(t) = e^(−at)u(t) → X(jω) = 1/(a+jω) |
| 7 | ~13:00 | Magnitude: \|X(jω)\| = 1/√(a²+ω²) — Lorentzian, low-pass |
| 8 | ~14:00 | Phase: ∠X(jω) = −tan⁻¹(ω/a) |
| 9 | ~19:00 | **FT of δ(t)** = 1 (infinite bandwidth) |
| 10 | ~22:00 | **Example 2**: FT of e^(−a\|t\|) = 2a/(a²+ω²) — purely real, low-pass |
| 11 | ~27:00 | Connection: FT = Laplace transform with σ = 0 for causal signals |
| 12 | ~30:00 | **FT of square pulse**: X(jω) = 2T₁ sinc(ωT₁/π) |
| 13 | ~34:00 | sinc function properties: sinc(0) = 1, zeros at integers; nulls at ω = nπ/T₁ |
| 14 | ~37:00 | **Linearity property**: F{ax₁ + bx₂} = aX₁(jω) + bX₂(jω) |
| 15 | ~40:00 | **Time shifting**: F{x(t−t₀)} = X(jω) e^(−jωt₀); magnitude unchanged |
| 16 | ~43:00 | Interpretation: magnitude = signal shape; phase = temporal ordering |
| 17 | ~45:00 | **Example**: shifted square pulse using time shifting property |
| 18 | ~49:00 | **Frequency shifting (modulation)**: F{x(t) e^(jω₀t)} = X(j(ω−ω₀)) |
| 19 | ~51:00 | Derivation by substitution in FT integral |
| 20 | ~55:00 | Modulation = multiplication by complex exponential in time → shift in frequency |
| 21 | ~56:00 | **FT of constant (DC)**: F{1} = 2πδ(ω); more generally F{K} = 2πKδ(ω) |
| 22 | ~58:00 | Derivation via inverse FT of δ(ω): x(t) = 1/(2π) → 1; scale by 2π |
| 23 | ~60:00 | Interpretation: DC signal → all energy at ω = 0 → impulse in frequency domain |
| 24 | ~62:00 | **FT of periodic signals**: general approach |
| 25 | ~63:00 | FT of e^(jω₀t) = 2πδ(ω−ω₀) — using frequency shifting + F{1} = 2πδ(ω) |
| 26 | ~66:00 | FT of cos(ω₀t) = π[δ(ω−ω₀) + δ(ω+ω₀)] |
| 27 | ~68:00 | **FT of general periodic signal**: X(jω) = Σₖ 2πXₖ δ(ω−kω₀) |
| 28 | ~71:00 | Interpretation: periodic signal spectrum = FS coefficients on delta functions ×2π |
| 29 | ~73:00 | **Differentiation property (FT)**: F{x′(t)} = jω · X(jω) — high-pass |
| 30 | ~77:00 | d/dt brings out jω factor; N-fold differentiation → (jω)ᴺ X(jω) |
| 31 | ~78:00 | Interpretation: differentiation enhances high frequencies (spectral sharpening) |
| 32 | ~80:00 | **Integration property (FT)**: F{∫x(τ)dτ} = X(jω)/(jω) + πX(0)δ(ω) |
| 33 | ~83:00 | X(0) = ∫_{−∞}^{∞} x(t) dt = total area under curve |
| 34 | ~84:00 | Integration = smoothing (low-pass); DC component appears as πX(0)δ(ω) |
| 35 | ~86:00 | **Example**: differentiation-integration method for square pulse FT (verification) |
| 36 | ~90:00 | **Example**: FT of triangular pulse via double differentiation → delta functions → time-shift properties |
| 37 | ~94:00 | **FT of unit step** u(t): F{u(t)} = 1/(jω) + πδ(ω) |
| 38 | ~96:00 | Derivation: d/dt u(t) = δ(t); FT of δ is 1; use integration property |
| 39 | ~97:00 | Comparison with Laplace: F{u(t)} ≠ 1/s because FT captures the DC jump |
| 40 | ~99:00 | **LTI Systems and FT**: Y(jω) = H(jω) · X(jω) |
| 41 | ~100:00 | Differential equation → FT both sides → polynomial in jω → H(jω) |
| 42 | ~102:00 | H(jω) = frequency response of LTI system; |H(jω)| = magnitude response; ∠H(jω) = phase response |
| 43 | ~104:00 | No new frequencies generated in LTI system output |
| 44 | ~106:00 | Example: 2nd-order system → partial fractions → inverse FT → h(t) |
| 45 | ~108:00 | Lecture conclusion; historical note on Fourier |

### B. Mathematical Content

1. **FT pair**: X(jω) = ∫_{−∞}^{∞} x(t) e^(−jωt) dt ↔ x(t) = (1/2π) ∫_{−∞}^{∞} X(jω) e^(jωt) dω
2. **FT of e^(−at)u(t)**: 1/(a+jω); |X| = 1/√(a²+ω²); ∠X = −arctan(ω/a)
3. **FT of δ(t)**: 1
4. **FT of e^(−a|t|)**: 2a/(a²+ω²) — real, even, Lorentzian
5. **FT of rectangular pulse**: 2T₁ sinc(ωT₁/π)
6. **sinc(x)** = sin(πx)/(πx), sinc(0) = 1
7. **Linearity**: F{αx₁+βx₂} = αX₁+βX₂
8. **Time shifting**: F{x(t−t₀)} = X(jω) e^(−jωt₀)
9. **Frequency shifting**: F{x(t) e^(jω₀t)} = X(j(ω−ω₀))
10. **FT of 1** = 2πδ(ω); FT of K = 2πKδ(ω)
11. **FT of e^(jω₀t)** = 2πδ(ω−ω₀)
12. **FT of cos(ω₀t)** = π[δ(ω−ω₀) + δ(ω+ω₀)]
13. **FT of general periodic signal**: X(jω) = 2π Σₖ Xₖ δ(ω−kω₀)
14. **Differentiation**: F{dⁿx/dtⁿ} = (jω)ⁿ X(jω)
15. **Integration**: F{∫_{−∞}^{t} x(τ)dτ} = X(jω)/(jω) + πX(0)δ(ω)
16. **X(0)** = ∫_{−∞}^{∞} x(t) dt (total area under curve)
17. **FT of u(t)**: 1/(jω) + πδ(ω)
18. **FT of triangular pulse**: derived via double differentiation → 3 delta functions → time-shift property → divide by (jω)²
19. **LTI frequency domain**: Y(jω) = H(jω) · X(jω); H(jω) = N(jω)/D(jω) from differential equation

### C. Examples Worked

1. **e^(−at)u(t)**: Evaluated FT integral directly; found 1/(a+jω). Plotted magnitude (Lorentzian) and phase (−arctan).
2. **δ(t)**: FT = 1 via sifting property. Infinite bandwidth interpretation.
3. **e^(−a|t|)**: Split into t>0 and t<0 integrals; result 2a/(a²+ω²); purely real since signal is real+even.
4. **Square pulse**: Direct integration → 2T₁ sinc(ωT₁/π). Sinc nulls at ω = nπ/T₁.
5. **Shifted square pulse**: Applied time-shifting property; Y(jω) = X(jω) e^(−jωT₁).
6. **Finding FT of 1**: Used inverse FT of δ(ω), then linearity to scale.
7. **FT of e^(jω₀t)**: Represented as 1·e^(jω₀t); applied frequency shifting to FT of 1; got 2πδ(ω−ω₀).
8. **FT of cos(ω₀t)**: Used Euler's formula; combined two exponential FTs; got π[δ(ω−ω₀)+δ(ω+ω₀)].
9. **Differentiation-integration verification of square pulse FT**: Differentiated square pulse → two impulses → FT → used integration property → recovered sinc.
10. **Triangular pulse FT**: Double differentiation → 3 weighted impulses → FT with time shifting → divide by (jω)² → closed-form result.
11. **FT of u(t)**: d/dt u(t) = δ(t) → FT = 1 → use integration rule → 1/(jω) + πδ(ω).
12. **2nd-order LTI system**: Differential eq → FT both sides → H(jω) = (jω+2)/((jω)²+4(jω)+3) → partial fractions → inverse FT → h(t).

### D. Key Definitions

- **Fourier Transform** X(jω): continuous complex-valued spectrum of an aperiodic signal
- **Inverse Fourier Transform**: reconstruction formula with 1/(2π) factor
- **sinc function**: sinc(x) = sin(πx)/(πx)
- **Frequency response** H(jω): FT of impulse response h(t); characterizes LTI system
- **Magnitude response** |H(jω)|: how much each frequency is amplified/attenuated
- **Phase response** ∠H(jω): phase shift applied to each frequency
- **Spectral sharpening**: differentiation amplifies high frequencies
- **Spectral smoothing**: integration attenuates high frequencies

### E. Properties Stated

| Property | Time Domain | Frequency Domain |
|----------|-------------|-----------------|
| Linearity | αx₁ + βx₂ | αX₁ + βX₂ |
| Time Shifting | x(t−t₀) | X(jω) e^(−jωt₀) |
| Frequency Shifting | x(t) e^(jω₀t) | X(j(ω−ω₀)) |
| Differentiation | dⁿx/dtⁿ | (jω)ⁿ X(jω) |
| Integration | ∫x(τ)dτ | X(jω)/(jω) + πX(0)δ(ω) |
| FT of periodic | Σ Xₖ e^(jkω₀t) | 2π Σ Xₖ δ(ω−kω₀) |

### F. Connections Made

- FS → FT as T₀ → ∞: discrete spectrum becomes continuous spectrum
- FT = Laplace transform evaluated on jω axis (σ = 0) for causal signals
- FT of periodic signals = FS coefficients mounted on weighted delta functions (×2π)
- Differentiation-integration trick: powerful method for finding FT of piecewise-linear signals
- FT of u(t) differs from Laplace 1/s because FT captures the DC component via πδ(ω)
- LTI system: convolution in time ↔ multiplication in frequency; no new frequencies generated
- Single-frequency input e^(jω₀t) through LTI: magnitude scaled by |H|, phase shifted by ∠H — each frequency acts independently
- Historical: Fourier discovered the FT to solve differential equations ~200 years ago

---

## LECTURE 7 — Fourier Transform Part II

**Duration:** ~1 h 06 min | **File:** `lesson-07/…-en-asr.vtt` (3 138 lines)

### A. Topic Sequence with Timestamps

| # | Timestamp | Topic |
|---|-----------|-------|
| 1 | ~01:00 | **Time Scaling Property**: F{x(at)} = (1/\|a\|) X(jω/a) |
| 2 | ~03:00 | Proof using substitution λ = at, cases for a > 0 and a < 0 |
| 3 | ~07:00 | Interpretation: time compression ↔ frequency expansion (and vice versa) |
| 4 | ~08:30 | **Time Reversal** as special case: a = −1 → F{x(−t)} = X(−jω) |
| 5 | ~09:00 | Illustration with square pulse / sinc pair under scaling |
| 6 | ~11:00 | **Properties of Real Signals in FT**: x(t) = x*(t) → X*(jω) = X(−jω) |
| 7 | ~15:00 | Consequences: \|X(−jω)\| = \|X(jω)\| (even); ∠X(−jω) = −∠X(jω) (odd) |
| 8 | ~16:30 | Real+Even → X(jω) purely real; Real+Odd → X(jω) purely imaginary |
| 9 | ~19:30 | **Duality Theorem** — proof by replacing t ↔ ω in FT definition |
| 10 | ~23:00 | Result: If F{x(t)} = X(jω), then F{X(t)} = 2πx(−ω) |
| 11 | ~26:00 | **Duality examples**: F{δ(t)}=1 → F{1}=2πδ(ω); F{rect}=sinc → F{sinc(t)}=rect in ω |
| 12 | ~30:00 | **Parseval's Theorem (energy signals)**: ∫\|x(t)\|² dt = (1/2π) ∫\|X(jω)\|² dω |
| 13 | ~35:00 | Energy spectral density: \|X(jω)\|²; total energy = area under \|X\|²/(2π) |
| 14 | ~37:00 | **Modulation Theorem**: F{x(t) cos(ω₀t)} = ½[X(j(ω−ω₀)) + X(j(ω+ω₀))] |
| 15 | ~40:00 | Band-pass vs low-pass signals; amplitude modulation interpretation |
| 16 | ~41:00 | **LTI Systems**: y(t) = x(t) * h(t); impulse response recap |
| 17 | ~42:00 | Convolution integral: y(t) = ∫_{−∞}^{∞} x(τ) h(t−τ) dτ |
| 18 | ~44:00 | Physical interpretation: past inputs have decaying "ripple effects" via h(t) |
| 19 | ~48:00 | **Convolution Theorem** proof: FT both sides of y = h*x → Y(jω) = H(jω)·X(jω) |
| 20 | ~51:00 | Two results: (1) convolution in time = multiplication in frequency; (2) Y = H·X for LTI |
| 21 | ~52:00 | By duality: multiplication in time = (1/2π) convolution in frequency |
| 22 | ~53:00 | **Frequency Response** H(jω): FT of h(t); "what the system lets through" |
| 23 | ~55:00 | Duality consequences listed as exercises: |
| | | — Convolution in time ↔ multiplication in frequency |
| | | — Differentiation in time ↔ jω multiplication in frequency |
| | | — (−jt) multiplication in time ↔ differentiation in frequency |
| 24 | ~56:00 | **Simple LTI example**: two first-order systems → multiply FTs → partial fractions → inverse FT |
| 25 | ~57:00 | FT of δ(t) = 1 ⟹ input all frequencies → output = H(jω) = frequency response |
| 26 | ~58:00 | H(jω) magnitude response and phase response defined |
| 27 | ~59:00 | Single-frequency through LTI: magnitude scaled, phase shifted; each freq acts independently |
| 28 | ~61:00 | No new frequencies generated in LTI output (crucial principle) |
| 29 | ~62:00 | Differential equation → FT → polynomial in jω → H(jω) = N(jω)/D(jω) |
| 30 | ~63:00 | Example: 2nd-order system → partial fractions → inverse FT |
| 31 | ~64:00 | Lecture conclusion; encouragement for independent learning, postgraduate studies |

### B. Mathematical Content

1. **Time scaling**: F{x(at)} = (1/|a|) X(jω/a)
2. **Time reversal**: F{x(−t)} = X(−jω) (special case a = −1)
3. **Conjugate symmetry (real signals)**: X*(jω) = X(−jω); |X| even, ∠X odd
4. **Real + even**: X(jω) ∈ ℝ (purely real)
5. **Real + odd**: X(jω) ∈ jℝ (purely imaginary)
6. **Duality theorem**: If x(t) ↔ X(jω), then X(t) ↔ 2πx(−ω)
7. **Parseval's theorem**: ∫_{−∞}^{∞} |x(t)|² dt = (1/2π) ∫_{−∞}^{∞} |X(jω)|² dω
8. **Energy spectral density**: |X(jω)|² (or |X(jω)|²/(2π) as energy per unit frequency)
9. **Modulation theorem**: F{x(t) cos(ω₀t)} = ½[X(j(ω−ω₀)) + X(j(ω+ω₀))]
10. **Convolution integral**: y(t) = ∫_{−∞}^{∞} x(τ) h(t−τ) dτ
11. **Convolution theorem**: F{x*h} = X(jω) · H(jω)
12. **Duality of convolution**: multiplication in time = (1/2π) convolution in frequency
13. **Duality of differentiation**: F{−jt · x(t)} = dX(jω)/dω
14. **Frequency response**: H(jω) = FT{h(t)} = Y(jω)/X(jω)
15. **From differential equation**: Σ aₖ(jω)ᵏ Y(jω) = Σ bₖ(jω)ᵏ X(jω) → H(jω) = B(jω)/A(jω)

### C. Examples Worked

1. **Time scaling of square pulse / sinc pair**: Showed compression in time → wider spectrum; expansion → narrower spectrum.
2. **Duality examples**: (a) F{δ(t)} = 1 → by duality F{1} = 2πδ(ω). (b) F{rect} = sinc → F{sinc(t)} = rectangular pulse in ω.
3. **Modulation / AM**: x(t)cos(ω₀t) creates two shifted copies of spectrum at ±ω₀ — amplitude modulation.
4. **Convolution of two exponentials**: Input e^(−3t)u(t), system h(t) = e^(−t)u(t). FT each → 1/(3+jω) and 1/(1+jω) → multiply → partial fractions → inverse FT → y(t).
5. **2nd-order system from differential equation**: Took FT of both sides, grouped Y and X terms, formed H(jω) = (jω+2)/((jω+1)(jω+3)), partial fractions, inverse FT to get h(t).

### D. Key Definitions

- **Time scaling**: compression/expansion in time ↔ reciprocal change in frequency
- **Duality**: symmetry between FT and inverse FT; pairs can be "flipped" between domains
- **Parseval's Theorem** (energy): total energy preserved across domains
- **Energy spectral density** |X(jω)|²: distribution of energy across frequencies
- **Modulation**: multiplication by cos(ω₀t) shifts spectrum to ±ω₀
- **Convolution theorem**: time convolution ↔ frequency multiplication
- **Frequency response** H(jω): complete frequency-domain characterization of an LTI system
- **Magnitude response** |H(jω)|: frequency-dependent gain
- **Phase response** ∠H(jω): frequency-dependent phase shift
- **Impulse response** h(t): output when input is δ(t)

### E. Properties Stated

| Property | Time Domain | Frequency Domain |
|----------|-------------|-----------------|
| Time Scaling | x(at) | (1/\|a\|) X(jω/a) |
| Time Reversal | x(−t) | X(−jω) |
| Conjugate Symmetry | x(t) real | X*(jω) = X(−jω) |
| Real + Even | x(t) = x(−t), real | X(jω) ∈ ℝ |
| Real + Odd | x(t) = −x(−t), real | X(jω) ∈ jℝ |
| Duality | X(t) | 2πx(−ω) |
| Parseval's | ∫\|x\|² dt | (1/2π)∫\|X\|² dω |
| Modulation | x(t)cos(ω₀t) | ½[X(j(ω−ω₀))+X(j(ω+ω₀))] |
| Convolution | x(t) * h(t) | X(jω) · H(jω) |
| Multiplication | x(t) · g(t) | (1/2π) X(jω) * G(jω) |
| Time-mult → freq-diff | −jt · x(t) | dX/dω |

### F. Connections Made

- Time scaling: dual of frequency scaling — compress one domain → expand the other
- Time reversal as special case of time scaling with a = −1
- Duality theorem unifies many results: every FT pair generates a "free" second pair
- Parseval's: energy is conserved across domains (second-norm equivalence)
- Modulation → amplitude modulation (AM) in communication systems; creates band-pass signals from low-pass
- Convolution theorem is foundational for LTI system analysis — converts integral equations to algebraic
- Duality of convolution/multiplication: powerful for deriving new results from known ones
- LTI systems: each frequency component is processed independently (no frequency mixing)
- Impulse response h(t) → frequency response H(jω): complete system characterization
- From differential equations → transfer function H(jω) = N(jω)/D(jω) → poles/zeros → partial fractions → h(t)
- Historical: Fourier developed FT for solving differential equations; still central to all engineering disciplines

---

## Cross-Reference with Official Syllabus (Pages 42–86)

| Syllabus Topic | Lecture(s) | Coverage |
|---------------|------------|----------|
| Periodic signals, fundamental freq | 4 | ✅ Full |
| Exponential Fourier Series, Xₖ | 4 | ✅ Full |
| Trigonometric Fourier Series | 5 | ✅ Covered (as byproduct) |
| Orthogonality of basis | 4, 5 | ✅ Full (proven twice) |
| FS Properties: linearity, shifting, reversal, scaling | 4 | ✅ Full |
| Differentiation/Integration (FS) | 5 | ✅ Full |
| FS of impulse train | 5 | ✅ Full |
| Properties of real/even/odd signals (FS) | 4 | ✅ Full |
| Parseval's Theorem (FS) / Power | 5 | ✅ Full |
| LTI Systems and FS | 5 | ✅ Covered |
| Fourier Transform definition | 6 | ✅ Full |
| FT pairs: exponential, delta, pulse, step | 6 | ✅ Full |
| FT properties: linearity, time/freq shifting | 6 | ✅ Full |
| Differentiation/Integration (FT) | 6 | ✅ Full |
| FT of periodic signals | 6 | ✅ Full |
| FT of unit step u(t) | 6 | ✅ Full |
| FT of triangular pulse | 6 | ✅ Full |
| Time scaling, time reversal (FT) | 7 | ✅ Full |
| Properties of real signals (FT) | 7 | ✅ Full |
| Duality theorem | 7 | ✅ Full |
| Parseval's theorem (energy) | 7 | ✅ Full |
| Modulation theorem | 7 | ✅ Full |
| Convolution theorem | 7 | ✅ Full |
| LTI / Frequency response H(jω) | 6, 7 | ✅ Full |
| Differential eq → H(jω) | 6, 7 | ✅ Full |
