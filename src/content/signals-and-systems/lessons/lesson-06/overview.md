# Fourier Transform — Part I

You've mastered the Fourier Series — the art of breaking periodic signals into their harmonic building blocks. But what about signals that are *not* periodic? A single pulse, a decaying exponential, a transient burst — these are everywhere in engineering, yet they have no period to repeat.

This is where the **Fourier Transform** enters the picture. Think of it as the Fourier Series taken to its logical extreme: as the period $T_0 \to \infty$, the discrete harmonic spacing $\omega_0 \to 0$, and the line spectrum merges into a *continuous* spectrum. The result is the most powerful frequency-domain tool in all of engineering.

In this lesson, you will:

- Understand the **transition** from Fourier Series to Fourier Transform — why the discrete spectrum becomes continuous
- Learn the **FT definition** (analysis integral) and the **inverse FT** (synthesis integral)
- Compute the FT of key signals: the **one-sided exponential** and the **rectangular pulse**
- Interpret the **magnitude and phase spectrum** of aperiodic signals
- Master the first set of **FT properties**: linearity, time shifting, frequency shifting, and differentiation

> **This lesson is a turning point.** Once you understand the Fourier Transform, you'll have the language to describe *any* signal in the frequency domain — not just periodic ones. Everything from communication systems to image processing to control theory builds on this foundation.
