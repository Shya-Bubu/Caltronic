# Fourier Transform — Part II

In Part I, you learned the Fourier Transform definition and computed spectra for basic signals. Now it's time to see *why* the FT is so incredibly useful.

This lesson reveals the properties that make the Fourier Transform the **Swiss Army knife** of signal processing. The time-scaling property shows the fundamental bandwidth-duration tradeoff. The convolution property — arguably the most important result in the entire course — shows that convolution in time becomes *multiplication* in frequency. And the frequency response of LTI systems ties everything together.

In this lesson, you will:

- Master **time scaling and time reversal** — how compressing a signal widens its spectrum
- Understand the **symmetry properties** of the FT for real-valued signals
- Apply **Parseval's theorem** to compute energy from the frequency domain
- Prove and use the **convolution property**: $x(t) * h(t) \leftrightarrow X(j\omega) H(j\omega)$
- Define the **frequency response** $H(j\omega)$ of an LTI system and use it to find outputs

> **The convolution property is the crown jewel of this course.** It's the reason engineers care about frequency domain analysis: instead of a complicated integral (convolution), you just multiply spectra. This one property makes filter design, communication systems, and control theory practical.
