# Ideal Filter Realizability

> **Why This Matters**: You've seen the elegant mathematics of ideal filters — perfect rectangular magnitude, linear phase, zero distortion. But here's the bombshell: **no ideal filter can ever be built in the physical world**. Understanding *why* is one of the deepest insights in signal processing, and it directly motivates the practical filter designs you'll study next.

## From Frequency Domain to Time Domain

We established that the complete ideal LPF has:

$$H(\omega) = P_{2B}(\omega) \cdot e^{-j\omega t_d}$$

To understand whether this filter can be physically built, we need to look at its **impulse response** — the time-domain function $h(t)$ that characterises the system. Remember:

$$h(t) = \mathcal{F}^{-1}\{H(\omega)\}$$

The impulse response tells us how the filter actually processes signals in real time. If $h(t)$ has any problematic properties, the filter can't be built.

[[visual:freq-to-time-transform]]

## The Fourier Transform Pair: Rect ↔ Sinc

Let's recall a fundamental Fourier transform pair. A rectangular pulse $P_W(\omega)$ of width $W$ in the frequency domain transforms to a sinc function in the time domain:

$$P_W(\omega) \xleftrightarrow{\mathcal{F}} \frac{W}{2\pi} \text{sinc}\left(\frac{Wt}{2\pi}\right)$$

[[visual:rect-sinc-pair]]

The sinc function $\text{sinc}(x) = \sin(\pi x)/(\pi x)$ has a distinctive shape: a central peak with oscillating sidelobes that decay as $1/t$. Crucially, it extends to infinity in both directions — it's **non-zero for all time**, including negative time.

## Impulse Response of the Ideal LPF

Now we apply this to our ideal LPF. Since $H(\omega) = P_{2B}(\omega) \cdot e^{-j\omega t_d}$, the time-shift property of the Fourier transform gives:

$$P_{2B}(\omega) \cdot e^{-j\omega t_d} \xleftrightarrow{\mathcal{F}} \frac{B}{\pi} \text{sinc}\left(\frac{B(t - t_d)}{\pi}\right) = h(t)$$

[[visual:ideal-lpf-impulse-response]]

This sinc function is centred at $t = t_d$ (not at $t = 0$) due to the time delay. But here's the critical observation: the sinc function has oscillating tails that extend to **negative infinity**.

> **Key Insight**: The impulse response $h(t) \neq 0$ for $t < 0$. This means the filter responds **before** the impulse is applied. It "knows" the input is coming before it arrives. This is physically impossible.

## The Non-Causality Problem

A system is **causal** if its output at any time $t$ depends only on the input at time $t$ and earlier — never on future inputs. Mathematically:

$$\text{Causal: } h(t) = 0 \text{ for all } t < 0$$

[[visual:sinc-noncausal-highlight]]

For the ideal LPF, $h(t)$ is a sinc function centred at $t_d$ that extends to $-\infty$. No matter how large you make $t_d$, the sinc tails will always reach into $t < 0$. This means:

$$h(t) \neq 0 \text{ for } t < 0 \implies \text{Non-causal} \implies \text{Not physically realisable}$$

<details>
<summary><strong>Pause & Think</strong>: Could you make t_d very large to push the sinc far to the right and make h(t) ≈ 0 for t < 0?</summary>

You could make the negative-time components very small by choosing a large $t_d$, but they would never be exactly zero. The sinc function has infinite extent — its tails decay as $1/t$ but never reach zero. So the ideal LPF is mathematically non-causal regardless of $t_d$. In practice, you can approximate it by choosing large enough $t_d$ and truncating, but the result is no longer the ideal filter — it's an approximation.

</details>

## Why Rectangular Frequency Response Implies Non-Causality

Here's the deeper connection: ideal filters have **rectangular magnitude responses** in the frequency domain. The rectangle function and the sinc function are a Fourier transform pair. Since the sinc extends to all time (both positive and negative), any system with a perfectly rectangular frequency response must have a non-causal impulse response.

[[visual:lecture-sinc-page]]

This is a fundamental trade-off in signal processing:
- **Sharp frequency cutoff** → **long time-domain response** (sinc extends to ±∞)
- **Causal time response** → **gradual frequency cutoff** (no sharp rectangle possible)

> **Watch Out**: This isn't just a mathematical curiosity. It has real engineering consequences — it tells you that **all practical filters must have gradual transitions** between passband and stopband.

## Key Properties Summary

| Property | Ideal Filter | Physical Requirement |
|----------|-------------|---------------------|
| Magnitude response | Perfectly rectangular | Gradual transition allowed |
| Impulse response | Sinc (extends to $t < 0$) | Must be zero for $t < 0$ |
| Causality | Non-causal | Must be causal |
| Realisability | Not realisable | Must be realisable |

[[visual:causality-summary-bar]]

<details>
<summary><strong>Pause & Think</strong>: Are all four ideal filter types (LPF, HPF, BPF, BSF) non-realisable?</summary>

Yes. All four have rectangular (sharp-edged) magnitude responses, which means their impulse responses all contain sinc-like components that extend to $t < 0$. The rectangular shape in frequency always implies non-causal time response. So none of the ideal filters — LPF, HPF, BPF, or BSF — can be physically built.

</details>

## What This Means for Engineering

Since ideal filters are impossible, engineers must design **causal approximations** that:
1. Have gradual transitions instead of sharp cutoffs
2. Accept some ripple in the passband and/or stopband
3. Have impulse responses that are zero (or negligibly small) for $t < 0$

This is exactly what the next concept addresses — how to specify and characterise these practical causal filters.

[[visual:ideal-vs-causal-comparison]]

## Summary

- The impulse response of an ideal LPF is $h(t) = \frac{B}{\pi}\text{sinc}\left(\frac{B(t-t_d)}{\pi}\right)$ — a sinc function
- The sinc extends to $t < 0$, making the ideal filter **non-causal**
- Non-causal systems cannot be built physically — they require knowledge of future inputs
- **All ideal filters** (LPF, HPF, BPF, BSF) are non-realisable for the same reason
- This fundamental limitation drives the design of practical causal filters with gradual transitions

> The rectangular frequency response ↔ sinc time response trade-off is one of the most important results in all of signal processing. Every filter design is an attempt to approximate the ideal while obeying causality.
