# Deterministic vs Random Signals

> **Narrative thread**: This concept teaches us that real-world signals are never perfectly known — understanding the boundary between predictable and probabilistic is essential for communications, estimation, and AI.

> Can you predict the future, or only describe its probabilities?

---

## 📖 Resources

| Type | Resource |
|------|----------|
| 📺 Video | [MIT 6.041: Probability](https://www.youtube.com/watch?v=j9WZyLZCBzs) |
| 📚 Textbook | Haykin, Communication Systems, Chapter 1 |
| 🎓 Lectures | University of Peradeniya EE2020 Week 1-2 |

---

## 🖼️ Visual: Deterministic vs Random

![Deterministic vs Random Comparison](/course/signals-and-systems/lesson-01/concepts/deterministic-random.png)

Top: A deterministic signal (predictable). Bottom: A random signal (containing noise).

---

## The Fundamental Split

Signals fall into two categories based on **predictability**:

| Type | Can you know the exact value? | Example |
|------|------------------------------|---------|
| **Deterministic** | Yes — use the formula | $x(t) = A\cos(\omega t)$ |
| **Random** | No — only probabilities | Noise, speech, stock prices |

This distinction shapes everything in signal processing.

---

## Deterministic Signals

A signal is **deterministic** if you can write an explicit mathematical formula for it.

Given any time $t$, substitute it and get the exact value.

### Examples
- $x(t) = 5\cos(100t + \pi/4)$
- $x(t) = e^{-t}u(t)$ (exponential decay)
- $x[n] = 0.9^n$ (geometric sequence)

### Key Property
> **Probability = 1**: The value is known with absolute certainty.

---

## Random Signals

A signal is **random** (or stochastic) if its values follow a probability distribution.

You can't predict the exact value — only likely ranges.

### Examples
- Thermal noise in circuits
- Stock market fluctuations
- Speech signals
- Atmospheric interference

### Key Property
> **Values on a PDF**: Each sample is drawn from a probability density function.

---

## Why Random Signals Matter

Here's the reality check:

| In textbooks | In real life |
|--------------|--------------|
| Clean sinusoids | Sinusoids + noise |
| Perfect pulses | Pulses with jitter |
| Known signals | Signals we must estimate |

Almost every **real** signal has a random component.

---

## Visual Comparison

### Deterministic (Clean Cosine)
A perfect cosine wave — smooth, predictable, repeatable.

### Random (Noise)
Unpredictable fluctuations — no formula can describe it exactly.

### Real Communication Signal
A deterministic carrier with random noise added:
$$y(t) = x(t) + n(t)$$

Where $x(t)$ is your signal and $n(t)$ is noise.

---

## The Practical Consequence

When you receive a noisy signal, you can't just "extract" the exact original.

You must:
1. **Model** the noise statistically
2. **Estimate** the original signal
3. **Accept** some uncertainty

This is the foundation of:
- Detection theory
- Estimation theory
- Filtering (Wiener, Kalman)
- Machine learning

---

## In This Course

We'll focus mostly on **deterministic signals** because:
- The math is tractable
- Fundamental concepts are clearer
- It's the prerequisite for random analysis

But always remember: **real signals are random**. Third/fourth year courses will build on this.
