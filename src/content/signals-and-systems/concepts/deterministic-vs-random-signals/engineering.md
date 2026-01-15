# Engineering Applications

> Where determinism ends and randomness begins in real systems.

---

## The Communication Problem

Every communication system fights the same battle:

```
Transmitter: x(t) → [Channel + Noise] → Receiver: y(t) = x(t) + n(t)
```

- **x(t)** is deterministic (you chose what to send)
- **n(t)** is random (you can't control noise)
- **y(t)** is what you receive (corrupted)

The receiver must **estimate** x(t) from y(t).

---

## Sources of Randomness

| Source | Type | Example |
|--------|------|---------|
| **Thermal noise** | Physical | Johnson noise in resistors |
| **Shot noise** | Physical | Random electron arrival in diodes |
| **Interference** | External | Other radio signals |
| **Quantization** | System | ADC rounding errors |
| **Process variation** | Manufacturing | Component tolerances |

---

## Signal-to-Noise Ratio (SNR)

Engineers quantify signal quality with SNR:

$$\text{SNR} = \frac{\text{Signal Power}}{\text{Noise Power}}$$

Or in decibels:
$$\text{SNR}_{dB} = 10\log_{10}\left(\frac{P_{signal}}{P_{noise}}\right)$$

| SNR | Quality |
|-----|---------|
| < 10 dB | Very noisy, hard to understand |
| 20-30 dB | Acceptable for voice |
| 40+ dB | High quality audio |
| 60+ dB | CD quality |

---

## Detection vs Estimation

### Detection
*Which of several known signals was sent?*

Example: Digital communication (was it 0 or 1?)

### Estimation
*What is the continuous value of this signal?*

Example: Radar (how far is the target?)

Both rely on understanding both deterministic signals AND noise statistics.

---

## Practical Systems

### Noise Reduction
- Averaging (noise decreases, signal adds)
- Filtering (remove out-of-band noise)
- Shielding (prevent interference)

### Modulation
- Spread spectrum (spread signal over frequency)
- Error correction (add redundancy)
- Diversity (multiple paths)

---

## Statistical Signal Processing

In advanced courses, you'll study:

| Topic | Application |
|-------|-------------|
| **Wiener filtering** | Optimal noise removal |
| **Kalman filtering** | Tracking moving targets |
| **Matched filtering** | Detecting known signals in noise |
| **Spectral analysis** | Characterizing random signals |

All build on distinguishing deterministic patterns from random fluctuations.
