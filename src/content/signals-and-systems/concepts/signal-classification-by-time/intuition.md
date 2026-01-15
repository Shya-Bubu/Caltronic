# Continuous vs Discrete Signals

> **Narrative thread**: This concept teaches us why digital systems exist — continuous signals must be sampled for computers to process them, and understanding this bridge is essential for all DSP and embedded systems.

> The first major classification: is time smooth or sampled?

---

## 📖 Resources

| Type | Resource |
|------|----------|
| 📺 Video | [MIT 6.003: Sampling](https://www.youtube.com/watch?v=VtP0CgqC3LQ) |
| 📚 Textbook | Oppenheim & Willsky, Section 7.1-7.3 |
| 🎓 Lectures | University of Peradeniya EE2020 Week 1 |

---

## 🖼️ Visual: Continuous vs Discrete

![Continuous vs Discrete Comparison](/course/signals-and-systems/lesson-01/concepts/continuous-vs-discrete.png)

Side-by-side: Continuous-time x(t) is defined everywhere; discrete-time x[n] is defined only at integer samples.

---

## Two Worlds of Signals

When we look at signals in nature, we see **continuous** variation — a smooth curve with no gaps.

But when we process signals on computers, we need **discrete** values — individual samples at specific moments.

Understanding this distinction is foundational to all of digital signal processing.

---

## Continuous-Time Signals

A **continuous-time (CT) signal** is defined for ALL values of time.

Think of:
- A swinging pendulum — position changes smoothly
- Temperature throughout the day — no "gaps" in time
- Your voice — air pressure varies continuously

**Key characteristic**: You can zoom in infinitely, and the signal is still defined.

### Notation
$$x(t), \quad t \in \mathbb{R}$$

The parentheses `( )` indicate continuous time.

---

## Discrete-Time Signals

A **discrete-time (DT) signal** is defined only at specific time instants.

Think of:
- Daily stock closing prices — one value per day
- Digital audio samples — typically 44,100 per second
- Sensor readings — one value every 100ms

**Key characteristic**: Signal exists only at integer indices. Between samples? Undefined.

### Notation
$$x[n], \quad n \in \mathbb{Z}$$

The brackets `[ ]` indicate discrete time.

---

## The Sampling Process

How do we go from continuous to discrete? **Sampling**.

```
Continuous Signal x(t)
        ↓
   [Sample at regular intervals]
        ↓
Discrete Signal x[n] = x(nT_s)
```

## 🖼️ Visual: The Sampling Process

![Sampling Process Diagram](/course/signals-and-systems/lesson-01/concepts/sampling-process.png)

An analog signal enters, a switch closes every Ts seconds, and a discrete sequence exits.

Where:
- $T_s$ = sampling period (time between samples)
- $f_s = 1/T_s$ = sampling frequency

### Example: CD Audio
- Sampling frequency: $f_s = 44,100$ Hz
- Sampling period: $T_s = 1/44100 \approx 22.7 \mu s$
- That's 44,100 samples every second!

---

## 🖼️ Visual: Aliasing

![Aliasing Visualized](/course/signals-and-systems/lesson-01/concepts/aliasing.png)

When sampling is too slow (dots), the high-frequency white wave appears as a low-frequency cyan wave. This is aliasing.

---

## Visual Comparison

| Continuous Signal | Discrete Signal |
|-------------------|-----------------|
| Smooth curve | Stem plot (dots) |
| Defined everywhere | Defined at integers only |
| x(t) | x[n] |
| Analog systems | Digital systems |

---

## Why Does This Matter?

1. **Computers can only handle discrete data** — they need numbers at specific times
2. **Sampling rate determines quality** — too slow = aliasing (distortion)
3. **Different math tools** — integrals for CT, summations for DT
4. **Different system models** — differential equations vs difference equations

---

## The Bridge

Most real-world signals start as **continuous** (nature is analog).

We **sample** them to make them discrete for digital processing.

We can **reconstruct** them back to continuous (if sampled properly).

This bridge is what makes digital audio, video, and communications possible.

> **Nyquist's insight**: Sample at least 2× the highest frequency, and you lose nothing.
