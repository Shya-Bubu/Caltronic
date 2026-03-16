# Ideal Filter Types

> **Why This Matters**: Filters are everywhere — every audio speaker, every radio receiver, every medical imaging device relies on filtering to select specific frequencies and reject others. Before you can design a real filter, you need to understand the "perfect" versions. These ideal filters set the mathematical benchmark that all practical designs try to approximate.

## The Starting Point — Sinusoidal Steady-State Response

Let's recall a powerful result from earlier lessons. When you feed a sinusoidal input $x(t) = A\cos(\omega_0 t + \theta)$ into an LTI system with frequency response $H(\omega)$, the output in steady state is:

$$y(t) = A|H(\omega_0)|\cos(\omega_0 t + \theta + \angle H(\omega_0))$$

[[visual:sinusoidal-response-recap]]

This is the key insight behind filtering. The system's frequency response $H(\omega)$ controls two things:
- **$|H(\omega_0)|$** scales the amplitude — making the sinusoid louder or quieter
- **$\angle H(\omega_0)$** shifts the phase — delaying or advancing the sinusoid in time

Now here's the big idea: if you can make $|H(\omega)| = 0$ for a certain range of frequencies, those frequencies are **completely blocked**. The system passes some frequencies and rejects others — that's a **filter**.

## What Makes a Filter "Ideal"?

An ideal filter has a perfectly sharp transition between passing and blocking frequencies. There's no gradual rolloff — it's either fully on (magnitude = 1) or fully off (magnitude = 0). Think of it like a perfect brick wall: frequencies on one side pass through untouched, frequencies on the other side are completely stopped.

[[visual:ideal-vs-real-comparison]]

In reality, no physical system can achieve this. But these ideal definitions give us the vocabulary and mathematical framework to specify what we want from a real filter.

## The Four Fundamental Filter Types

Every filter you'll ever encounter is some combination of these four basic types. Let's define each one precisely.

### Ideal Low-Pass Filter (LPF)

The low-pass filter is the most intuitive: it passes low frequencies and blocks high frequencies.

$$|H(\omega)| = \begin{cases} 1, & |\omega| \leq B \\ 0, & |\omega| > B \end{cases}$$

The parameter $B$ is the **bandwidth** — the highest frequency that the filter passes. Everything below $B$ comes through at full strength; everything above $B$ is completely eliminated.

[[visual:ideal-lpf-magnitude]]

> **Key Insight**: Notice the magnitude response is symmetric about $\omega = 0$. This is always the case for real-valued systems — $|H(-\omega)| = |H(\omega)|$. The "width" of the passband from $-B$ to $+B$ is $2B$.

<details>
<summary><strong>Pause & Think</strong>: If you play music through an ideal LPF with B = 300 Hz, what happens to the sound?</summary>

You'd hear only the bass frequencies below 300 Hz. All higher harmonics, vocals in their upper registers, cymbals, and high-pitched instruments would be completely removed. The result would sound muffled and deep — like listening through a thick wall.

</details>

### Ideal High-Pass Filter (HPF)

The high-pass filter is the opposite of the low-pass: it blocks low frequencies and passes high frequencies.

$$|H(\omega)| = \begin{cases} 0, & |\omega| < B \\ 1, & |\omega| \geq B \end{cases}$$

[[visual:ideal-hpf-magnitude]]

Everything above the cutoff frequency $B$ passes; everything below is blocked. An HPF removes the "baseline" or "DC component" of a signal, keeping only the higher-frequency variations.

### Ideal Band-Pass Filter (BPF)

A band-pass filter passes frequencies within a specific band and blocks everything else. It has two cutoff frequencies, $B_1$ and $B_2$:

$$|H(\omega)| = \begin{cases} 1, & B_1 \leq |\omega| \leq B_2 \\ 0, & \text{elsewhere} \end{cases}$$

[[visual:ideal-bpf-magnitude]]

The passband lies between $B_1$ and $B_2$. This is what a radio tuner does — it selects just one station's frequency band out of all the electromagnetic signals hitting the antenna.

### Ideal Band-Stop Filter (BSF)

Also called a **notch filter** or **band-reject filter**, this does the opposite of the BPF: it blocks one frequency band and passes everything else.

$$|H(\omega)| = \begin{cases} 0, & B_1 \leq |\omega| \leq B_2 \\ 1, & \text{elsewhere} \end{cases}$$

[[visual:ideal-bsf-magnitude]]

A classic application: removing 50 Hz (or 60 Hz) power-line interference from sensitive measurements like ECG recordings.

## Comparing All Four Types

[[visual:all-four-filters-comparison]]

The four types are really just different windows on the frequency axis:

| Filter | Passes | Blocks | Parameters |
|--------|--------|--------|------------|
| LPF | $|\omega| \leq B$ | $|\omega| > B$ | Single cutoff $B$ |
| HPF | $|\omega| \geq B$ | $|\omega| < B$ | Single cutoff $B$ |
| BPF | $B_1 \leq |\omega| \leq B_2$ | Outside band | Two cutoffs $B_1, B_2$ |
| BSF | Outside band | $B_1 \leq |\omega| \leq B_2$ | Two cutoffs $B_1, B_2$ |

## Building Complex Filters by Cascading

Here's a powerful idea from your lecture notes: different filter responses can be obtained by **cascading** these basic types. When you cascade two LTI systems, their frequency responses multiply:

$$H_{\text{total}}(\omega) = H_1(\omega) \cdot H_2(\omega)$$

[[visual:cascading-filters-diagram]]

For example:
- **LPF × HPF** (with HPF cutoff < LPF cutoff) → BPF
- **Two BPFs in parallel** → passes two separate frequency bands
- **LPF with very low bandwidth** → isolates almost just the DC component

This modular thinking is exactly how filter networks are designed in practice.

<details>
<summary><strong>Pause & Think</strong>: If you cascade an ideal LPF (cutoff B₁) with an ideal HPF (cutoff B₂, where B₂ < B₁), what do you get?</summary>

You get an ideal **band-pass filter** with passband from $B_2$ to $B_1$. The LPF removes everything above $B_1$, and the HPF removes everything below $B_2$. What's left is the band in between.

</details>

## Summary

- A **filter** makes $|H(\omega)| = 0$ for unwanted frequencies, allowing others to pass
- The four ideal types (LPF, HPF, BPF, BSF) have **perfectly rectangular** magnitude responses
- Each is defined by its cutoff frequencies and whether the region between them is passed or blocked
- Complex filter responses can be built by **cascading** basic filter types
- These ideal definitions set the mathematical standard — real filters approximate them

> The next concept explores *why* the magnitude response alone isn't enough — the filter's phase response is equally critical for preserving signal shape.
