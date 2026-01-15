# Exam Preparation

> Common traps, examiner framing, and grading patterns.

---

## Typical Questions

### Type 1: Identification (2-3 marks)

**Q: Classify the following as continuous-time or discrete-time signals:**
1. Temperature measured by a thermometer
2. Number of cars passing a toll booth per hour
3. Voltage across a capacitor
4. Digital audio samples

**A:**
1. **CT** — Temperature varies continuously
2. **DT** — Count per hour is a discrete sequence
3. **CT** — Voltage is continuous
4. **DT** — Samples exist only at integer indices

---

### Type 2: Sampling Calculation (5 marks)

**Q: An audio signal has frequency components up to 20 kHz. What is the minimum sampling rate required? If we sample at 44.1 kHz, what is the sampling period?**

**A:**
- Nyquist rate: $f_N = 2 \times 20 \text{ kHz} = 40 \text{ kHz}$
- Minimum: 40 kHz (but we use higher for safety margin)
- Sampling period: $T_s = \frac{1}{44100} = 22.68 \mu s$

---

### Type 3: Aliasing Analysis (5-8 marks)

**Q: A 25 kHz sinusoid is sampled at 30 kHz. What frequency will appear in the reconstructed signal?**

**A:**
- Input: 25 kHz
- Sampling: 30 kHz
- Nyquist limit: 15 kHz
- 25 kHz > 15 kHz → aliasing occurs
- Aliased frequency: $|25 - 30| = 5$ kHz

The 25 kHz signal will appear as a 5 kHz signal (aliased).

---

## Common Mistakes

| Mistake | Correction |
|---------|------------|
| Using x(n) for discrete | Use x[n] — brackets for discrete |
| Nyquist = highest frequency | Nyquist = 2× highest frequency |
| Assuming DT signals are zero between samples | They're undefined, not zero |
| Forgetting anti-aliasing filter | Always filter before sampling |

---

## Key Formulas

| Formula | Meaning |
|---------|---------|
| $x[n] = x(nT_s)$ | Sampling relationship |
| $f_s = 1/T_s$ | Sampling frequency |
| $f_s > 2f_{max}$ | Nyquist criterion |
| $f_{alias} = |f - kf_s|$ | Aliased frequency |

---

## Practice Problem

**Q: A signal $x(t) = \cos(2\pi \cdot 100t) + \cos(2\pi \cdot 300t)$ is sampled at 500 Hz.**

a) What is the Nyquist rate?
b) Will aliasing occur?
c) What frequencies appear in the sampled signal?

**A:**
a) $f_{max} = 300$ Hz, so $f_N = 600$ Hz

b) Yes! We're sampling at 500 Hz < 600 Hz

c) 
- 100 Hz < 250 Hz → no aliasing → 100 Hz
- 300 Hz > 250 Hz → aliases to $|300-500| = 200$ Hz

Sampled signal contains: 100 Hz and 200 Hz
