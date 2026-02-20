## 📝 Exam Focus: Periodicity & Inter-Domain Analysis

### What Examiners Are Looking For

You must be able to identify whether a signal is periodic, determine its fundamental period and frequency, and understand the concept of representing signals in alternative domains.

### Common Question Types

**Type 1: Determine Periodicity**
Given $x(t) = A + B\sin(\omega_1 t) + C\cos(\omega_2 t)$, determine if it is periodic and find $T_0$.
- Check: are $\omega_1/\omega_2$ a rational ratio? If yes, $T_0 = \text{LCM}$ of individual periods.

**Type 2: Find Fundamental Frequency**
Given a sum of sinusoids, identify $\omega_0$ as the GCD of all component frequencies.

**Type 3: Euler Expansion**
Rewrite a trigonometric periodic signal using Euler's formula and identify $X_k$ coefficients by inspection.

**Type 4: Sketch Magnitude/Phase Spectrum**
Given $X_k$, draw the magnitude and phase plots on the $k$-axis.

### Exam Tips

1. Always check that component frequencies are **integer multiples** of a common $\omega_0$
2. Remember: $\sin\theta = \frac{e^{j\theta} - e^{-j\theta}}{2j}$ and $\cos\theta = \frac{e^{j\theta} + e^{-j\theta}}{2}$
3. $X_0$ is always the DC (average) value — easy marks
4. Magnitude spectrum is **always symmetric** for real signals: $|X_{-k}| = |X_k|$

### Marks Distribution (Typical)
- Periodicity check: 2–3 marks
- Euler expansion and coefficient identification: 5–8 marks
- Spectrum sketching: 3–5 marks
