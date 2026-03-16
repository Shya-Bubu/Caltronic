# Synthesis — Filters & Butterworth Design

## The Big Picture

This lesson traced a complete arc from **mathematical ideal** to **practical design**:

$$\text{Ideal filter} \xrightarrow{\text{sinc impulse}} \text{Non-causal!} \xrightarrow{\text{approximate}} \text{Causal filter} \xrightarrow{\text{Butterworth}} \text{Maximally flat design}$$

## Key Takeaways

### From Ideal to Real
- **Ideal filters** have perfectly rectangular magnitude responses — but their impulse responses are sinc functions that extend to $t < 0$
- This makes them **non-causal** and therefore **physically unrealisable**
- All real filters must compromise: the transition from passband to stopband is always gradual

### The Phase Matters
- A filter's magnitude response tells you **what frequencies pass** — but the phase response determines **whether the signal shape is preserved**
- Distortionless transmission requires **linear phase**: $\angle H(\omega) = -\omega t_d$
- This means the filter introduces a pure time delay, with no relative phase shifts between frequency components

### Butterworth: The Maximally Flat Solution
- Setting $\zeta = 1/\sqrt{2}$ in a second-order system gives the **Butterworth filter** — the flattest possible passband
- The magnitude response is $|H_B(\omega)| = 1/\sqrt{1 + (\omega/\omega_n)^{2N}}$ for an $N$-pole design
- All $N$ poles lie on a semicircle of radius $\omega_c$ in the left half-plane, spaced $180°/N$ apart
- Higher $N$ → sharper transition, but more complexity

### Frequency Scaling
- Standard Butterworth tables give $H(s)$ for $\omega_c = 1$ rad/s
- To scale to any cutoff $\omega_c$: substitute $s/\omega_c$ for $s$

## Connections

| This Lesson | Connects To |
|------------|-------------|
| Ideal filter magnitude | Fourier transform pairs (rect ↔ sinc) |
| Linear phase | Time-shift property of Fourier/Laplace |
| Butterworth poles | Second-order system analysis (Lesson 09) |
| Filter order trade-offs | System stability (poles in LHP) |
| Frequency scaling | s-domain substitution techniques |

## Looking Ahead

The Butterworth filter is the starting point for analog filter design. Other filter families — **Chebyshev** (steeper rolloff, ripples in passband), **Bessel** (optimal linear phase), and **Elliptic** (sharpest transition, ripples everywhere) — all make different trade-offs from Butterworth's maximally-flat philosophy. Understanding Butterworth gives you the foundation for all of them.
