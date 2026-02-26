# From Fourier Series to Fourier Transform

> **Why This Matters**: How the Fourier Series becomes the Fourier Transform as T₀→∞. This is a fundamental building block for understanding how signals behave in the frequency domain.

## The Big Idea

[[visual:fs-discrete-spectrum]]

Let's start with the core intuition. How the Fourier Series becomes the Fourier Transform as T₀→∞. This might sound abstract at first, but it connects directly to how every modern communication system, audio processor, and control system works.

[[visual:ft-continuous-spectrum]]

Think of it this way: just as a prism splits white light into its component colors, the Fourier Transform splits a signal into its component frequencies. The difference is that now we're working with *aperiodic* signals — signals that don't repeat.

## Building the Theory

[[visual:period-to-infinity]]

Now let's formalize this intuition with mathematics. Don't worry — we'll take it step by step, and every equation will have a clear physical meaning.

[[visual:fs-ft-comparison-table]]

The key equation here connects the time domain to the frequency domain. Every term has a purpose, and understanding each one is essential.

<details>
<summary><strong>Pause & Think</strong>: What happens to the spectrum when you change the signal's duration?</summary>

A shorter signal in time produces a wider spectrum in frequency — this is the bandwidth-duration tradeoff. A longer signal produces a narrower spectrum. This is one of the most fundamental principles in signal processing.

</details>

[[visual:omega0-shrinking]]

[[visual:fs-ft-analogy-diagram]]

## Diving Deeper

[[visual:spectral-density-concept]]

Let's explore the implications. Every property we derive here is a tool you'll use repeatedly in circuit analysis, filter design, and communication systems.

> **Key Insight**: The relationship between time and frequency is not just mathematical — it reflects a deep physical truth about how signals carry information.

[[visual:transition-animation-sim]]

## Practice and Exploration

[[visual:envelope-emergence]]

Now it's time to build your intuition through interaction. Adjust parameters and watch both domains update simultaneously.

[[visual:limiting-process-sim]]

<details>
<summary><strong>Pause & Think</strong>: Can you predict what will happen to the spectrum before you see it?</summary>

Try to predict based on the properties you've learned. If the signal gets narrower in time, the spectrum should get wider. If you shift the signal in time, only the phase should change, not the magnitude. Building this predictive ability is the mark of true understanding.

</details>

## Summary

- How the Fourier Series becomes the Fourier Transform as T₀→∞
- The time and frequency domains are two complementary views of the same signal
- Properties learned here will be used throughout the rest of the course and in every engineering discipline that deals with signals

> **You're building real engineering intuition here.** These concepts are not just exam material — they're tools you'll use every day as an engineer.
