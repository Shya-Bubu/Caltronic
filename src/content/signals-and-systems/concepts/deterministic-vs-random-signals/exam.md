# Exam Preparation

> Common traps, examiner framing, and grading patterns.

---

## Typical Questions

### Type 1: Classification (2-3 marks)

**Q: Classify as deterministic or random:**
1. $x(t) = 5\sin(2\pi \cdot 60t)$
2. Thermal noise in a resistor
3. $x[n] = 0.8^n$
4. Stock market prices

**A:**
1. **Deterministic** — explicit formula
2. **Random** — no formula, only statistical description
3. **Deterministic** — explicit formula
4. **Random** — unpredictable, follows statistical patterns

---

### Type 2: Concept Explanation (5 marks)

**Q: Explain why we study deterministic signals when real signals are mostly random.**

**A:**
1. Deterministic signals provide tractable mathematics
2. They represent the "wanted" part of the signal
3. Noise can be analyzed separately using probability
4. The superposition principle allows us to combine analyses
5. Advanced stochastic analysis builds on deterministic foundations

---

### Type 3: SNR Calculation (5 marks)

**Q: A signal has power 100 mW and noise power is 1 mW. Calculate SNR in dB.**

**A:**
$$\text{SNR} = \frac{P_s}{P_n} = \frac{100}{1} = 100$$

$$\text{SNR}_{dB} = 10\log_{10}(100) = 10 \times 2 = 20 \text{ dB}$$

---

## Common Mistakes

| Mistake | Correction |
|---------|------------|
| Calling periodic signals random | Periodic = predictable = deterministic |
| Thinking random = no pattern | Random signals have statistical patterns |
| Mixing up SNR formula | Signal over Noise, not the other way |

---

## Key Formulas

| Formula | Meaning |
|---------|---------|
| $\Pr[x(t) = f(t)] = 1$ | Deterministic: certain value |
| $x(t) \sim \text{PDF}$ | Random: follows probability distribution |
| $\text{SNR} = P_s/P_n$ | Signal-to-noise ratio |
| $\text{SNR}_{dB} = 10\log_{10}(P_s/P_n)$ | SNR in decibels |

---

## Practice Problems

**Q1**: A receiver gets a 20 dB SNR signal. What is the ratio of signal power to noise power?

**A1**: $10^{20/10} = 10^2 = 100$. Signal is 100× stronger than noise.

**Q2**: Is speech deterministic or random? Why?

**A2**: Random. Even the same person saying the same word produces slightly different waveforms each time. No formula can predict exact values.
