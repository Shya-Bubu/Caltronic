# Energy Signals vs Power Signals

> **Narrative thread**: This concept teaches us how engineers decide whether a signal is physically realizable or sustainable — pulses have finite energy budgets, while continuous signals require ongoing power.

> Finite burst or endless hum? Two fundamentally different signal types.

---

## 📖 Resources

| Type | Resource |
|------|----------|
| 📺 Video | [Neso Academy: Energy and Power Signals](https://www.youtube.com/watch?v=mXwUYN2Q_rQ) |
| 📚 Textbook | Oppenheim & Willsky, Section 1.1 |
| 🎓 Lectures | University of Peradeniya EE2020 Week 1 |

---

## Energy vs Power Signals

Use the interactive simulation above to explore different signal types and see how their energy and power are calculated.

- **Energy signals**: A pulse has finite area (energy) and decays to zero
- **Power signals**: A sinusoid extends forever, having infinite energy but finite average power

Think of energy signals as batteries (finite life) and power signals as grid power (continuous source).

---

## The Core Question

When you look at a signal, ask: **Does it eventually run out?**

| If yes... | If no... |
|-----------|----------|
| Energy signal | Power signal |
| Finite total energy | Finite average power |
| Like a pulse | Like a sinusoid |

---

## Energy Signals

An **energy signal** has finite total energy.

Think of it like a flashlight with a battery:
- Turn it on, use some energy
- Eventually, battery depletes
- Total energy is finite and measurable

### Examples
- A single pulse
- A decaying exponential $e^{-t}u(t)$
- A short burst of data

### Key Property
$$E = \int_{-\infty}^{\infty} |x(t)|^2 \, dt < \infty$$

Total energy is finite.

---

## Power Signals

A **power signal** has finite average power (but infinite energy).

Think of it like a power plant:
- Runs forever (conceptually)
- Infinite total energy over infinite time
- But average power per second is finite

### Examples
- A sinusoid $A\cos(\omega t)$
- A constant DC signal
- Periodic waveforms

### Key Property
$$P = \lim_{T \to \infty} \frac{1}{2T} \int_{-T}^{T} |x(t)|^2 \, dt < \infty$$

Average power is finite.

---

## The Mutual Exclusion

Here's the key insight:

> A signal is either an energy signal OR a power signal. **Never both.**

| Signal Type | Total Energy | Average Power |
|-------------|--------------|---------------|
| **Energy** | Finite | Zero |
| **Power** | Infinite | Finite |
| **Neither** | Infinite | Infinite |

**If E is finite, P must be zero** (finite energy spread over infinite time → zero average)

**If P is finite, E must be infinite** (finite power × infinite time → infinite energy)

---

## Intuitive Comparison

### Energy Signal (Pulse)
```
      ┌───┐
      │   │
──────┴───┴──────  t
```
- Exists for limited time
- Squash it → finite area under curve
- Total energy is calculable

### Power Signal (Sinusoid)
```
   /\    /\    /\
  /  \  /  \  /  \  ...forever
      \/    \/
```
- Goes on forever
- Infinite total energy
- But average power per cycle is constant

---

## Why Does This Matter?

This classification affects:

1. **Analysis methods** — Different tools for each type
2. **Fourier transform behavior** — Energy signals have nice transforms
3. **Communication systems** — Data bursts vs carrier waves
4. **Filter design** — Response to pulses vs continuous inputs

---

## Quick Test

To classify a signal:

1. Calculate $E = \int |x(t)|^2 dt$
2. If $E < \infty$ → **Energy signal** ✓
3. If $E = \infty$, calculate $P = \lim \frac{1}{2T}\int |x(t)|^2 dt$
4. If $P < \infty$ → **Power signal** ✓
5. If both are infinite → **Neither** (rare, usually pathological)
