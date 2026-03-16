# Causal Filters and Specifications

> **Why This Matters**: Since ideal filters are impossible, every real filter design starts with a **specification** — how flat should the passband be? How much attenuation in the stopband? How gradual can the transition be? Learning to read and write filter specifications is the bridge between "I want to filter these frequencies" and "here's the circuit."

## The Reality: Non-Ideal but Causal

We proved that ideal filters are non-causal and unrealisable. Real (causal) filters must compromise: the transition from passband to stopband is **gradual**, not instantaneous.

[[visual:causal-filter-overview]]

The key differences between ideal and causal filters:
- The magnitude response is **not rectangular** — it has a smooth transition
- There may be **ripples** (small oscillations) in the passband and/or stopband
- The cutoff is defined at the **3 dB point**, not as a sharp wall

## Practical Filter Shapes

Your lecture notes show practical versions of all four filter types. Let's look at how each ideal type becomes a real, causal filter:

[[visual:practical-lpf-shape]]

### Low-Pass Filter (Causal)
The passband rolls off gradually near the cutoff frequency. Instead of a sharp drop from 1 to 0, the magnitude decreases smoothly through the transition region.

### High-Pass Filter (Causal)
The response rises gradually from the stopband to the passband, with a smooth transition instead of an abrupt step.

[[visual:practical-hpf-shape]]

### Band-Pass Filter (Causal)
Two transition regions — one on each side of the passband. The passband may have ripple.

### Band-Stop Filter (Causal)
The "notch" is not infinitely deep — the stopband attenuation is finite, and the transitions are gradual.

[[visual:lecture-causal-filters]]

## The Three Critical Regions

Every causal filter's magnitude response can be divided into three regions:

[[visual:three-regions-diagram]]

### Passband
The range of frequencies where the filter **passes** the signal. Defined as the set of frequencies for which:

$$|H(\omega)| \geq \frac{1}{\sqrt{2}} \approx 0.707$$

This corresponds to the **3 dB bandwidth**. Why 3 dB? Because:

$$20 \log_{10}\left(\frac{1}{\sqrt{2}}\right) = -3.01 \text{ dB}$$

So the passband edge is where the magnitude has dropped by 3 dB from its peak value.

> **Key Insight**: The "3 dB" convention comes from power. When voltage drops by $1/\sqrt{2}$, power drops by half (since $P \propto V^2$). The 3 dB point is the **half-power point**.

### Stopband
The range of frequencies where the filter **significantly attenuates** the signal. Typically, the stopband is defined as where the magnitude is **40–50 dB below** the peak — meaning the signal is reduced to 1% or less of its original amplitude.

### Transition Region
The range of frequencies between the passband and stopband edges. This is where the magnitude changes gradually from near-unity to near-zero. In ideal filters, this region has zero width. In real filters, it always has finite width.

<details>
<summary><strong>Pause & Think</strong>: If a real LPF has its 3 dB point at 1000 rad/s and its stopband begins at 2000 rad/s, how wide is the transition region?</summary>

The transition region extends from the passband edge (1000 rad/s) to the stopband edge (2000 rad/s), giving a width of 1000 rad/s. A sharper filter would have a narrower transition region, but at the cost of more ripple or higher complexity.

</details>

## Design Trade-Offs

Here's a crucial insight from your lectures: you can't have everything. There are fundamental trade-offs in filter design:

[[visual:tradeoffs-diagram]]

| Want | Cost |
|------|------|
| **Sharper transition** (narrower transition region) | **More ripple** in the passband |
| **Flatter passband** (less ripple) | **Wider transition** region |
| **Higher filter order** (more poles) | **More implementation difficulty** (more components) |

> **Watch Out**: The trade-off between transition sharpness and passband ripple is not just a practical limitation — it's fundamental to the mathematics of causal filter design.

Additionally, the phase function should be **as linear as possible** over the passband to minimise phase distortion. This adds another constraint that interacts with the magnitude trade-offs.

[[visual:lecture-tradeoffs-page]]

## Reading Filter Specifications

A typical filter specification looks like this:

| Parameter | Symbol | Meaning |
|-----------|--------|---------|
| Passband edge | $\omega_p$ | Frequency where $|H|$ drops to $1/\sqrt{2}$ (3 dB) |
| Stopband edge | $\omega_s$ | Frequency where $|H|$ reaches minimum attenuation |
| Passband ripple | $\delta_p$ | Maximum deviation from unity gain in passband |
| Stopband attenuation | $\delta_s$ | Maximum magnitude allowed in stopband |
| Filter order | $N$ | Number of poles (determines complexity) |

[[visual:spec-annotated-plot]]

<details>
<summary><strong>Pause & Think</strong>: A spec says: passband 0–1 kHz, stopband above 1.5 kHz, passband ripple < 1 dB, stopband attenuation > 40 dB. Identify each parameter.</summary>

- $\omega_p = 2\pi \times 1000$ rad/s (passband edge)
- $\omega_s = 2\pi \times 1500$ rad/s (stopband edge)
- Transition region: 1–1.5 kHz (width = 500 Hz)
- $\delta_p < 1$ dB passband ripple
- $\delta_s > 40$ dB stopband attenuation

To meet this spec, you'd need to choose a filter type (Butterworth, Chebyshev, etc.) and find the minimum order $N$ that satisfies all constraints.

</details>

## Summary

- Real (causal) filters have **gradual transitions** between passband and stopband — never sharp cutoffs
- The **passband** is defined by the 3 dB point: $|H(\omega)| \geq 1/\sqrt{2}$
- The **stopband** has significant attenuation (typically 40–50 dB below peak)
- The **transition region** connects them — its width is a key design parameter
- Fundamental trade-offs: sharper transition ↔ more ripple ↔ higher order ↔ more complex
- Phase should be linear over the passband for minimal distortion
- Filter specifications quantify these requirements for systematic design

> With the vocabulary of passband, stopband, and transition region established, we're ready to study the most famous practical filter: the **Butterworth** — designed for the flattest possible passband.
