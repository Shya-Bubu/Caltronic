# Nonlinear Resistor Properties

> **Narrative thread:** We've seen the ideal diode — a piecewise-linear nonlinear resistor. Now we explore deeper: what unique behaviors emerge when resistors don't obey Ohm's law?

---

## THE BIG IDEA

**Nonlinearity creates new frequencies that weren't in the input.**

When you apply a pure sine wave to a nonlinear resistor, the output contains:
- The original frequency
- **Harmonics** (2×, 3×, 4× the input frequency)
- **DC component** (average value)

And if the resistor is **time-varying**, you get:
- **Frequency mixing** (sum and difference frequencies)
- The basis for AM radio, frequency multipliers, and modulation

**Why it matters in EEE:** Every radio transmitter, every power converter with distortion, every audio amplifier with nonlinear distortion — they all involve nonlinear resistor behavior.

[[visual:v1]]

[[visual:v2]]

---

## Harmonic Generation

From lecture Page 7:

Consider a nonlinear resistor with characteristic $i = f(v)$ and apply:
$$v(t) = 2\sin(\omega t)$$

**For a linear resistor:** Output is $i = G \cdot 2\sin(\omega t)$ — same frequency scaled.

**For a nonlinear resistor (e.g., $i = v^2$):**
$$i = (2\sin\omega t)^2 = 4\sin^2(\omega t) = 2 - 2\cos(2\omega t)$$

Output contains:
- **DC term:** 2
- **Second harmonic:** $\cos(2\omega t)$ at frequency $2\omega$

**General result from lecture:**
$$i(t) = I_0 + \sum_{k=1}^{\infty} I_k \sin(k\omega t + \varphi_k)$$

Where $I_0$ is DC, and $I_k$ are harmonic amplitudes.

---

##Mathematical Insight: Why Harmonics Appear

Any smooth nonlinear function can be approximated by a **Taylor series**:
$$i = f(v) = f(V_Q) + f'(V_Q)(v - V_Q) + \frac{f''(V_Q)}{2!}(v - V_Q)^2 + \cdots$$

When $v = V_m \sin(\omega t)$:
- **First term** (linear): produces frequency $\omega$
- **Second term** (quadratic): produces $\sin^2(\omega t) = \frac{1 - \cos(2\omega t)}{2}$ → DC + $2\omega$
- **Third term** (cubic): produces $\sin^3(\omega t)$ → $\omega$ + $3\omega$

**Higher-order terms → Higher harmonics**

This is why distortion in amplifiers is characterized by "total harmonic distortion (THD)" — it's the power in the harmonics relative to the fundamental.

[[visual:v4]]

[[visual:v3]]

---

## Time-Varying Resistors

From lecture Pages 7-8:

What if resistance changes with time? $i(t) = G(t) \cdot v(t)$

**Example from lecture:**
$$G(t) = G_a + G_b \cos(\omega t), \quad G_a > G_b$$

Input signal: $v(t) = V_m \cos(\omega_1 t)$

Output:
$$i(t) = (G_a + G_b \cos \omega t) V_m \cos \omega_1 t$$

$$= G_a V_m \cos(\omega_1 t) + \frac{G_b V_m}{2}[\cos((\omega - \omega_1)t) + \cos((\omega + \omega_1)t)]$$

**Result:** Output contains **three frequencies**:
1. Original: $\omega_1$
2. Lower sideband: $\omega - \omega_1$
3. Upper sideband: $\omega + \omega_1$

**This is frequency mixing!**

---

## Real-World Application: AM Modulation

**Amplitude Modulation (AM radio)** uses this principle:

- **Carrier:** High frequency $\omega_c$ (e.g., 1 MHz)
- **Message:** Audio signal at $\omega_s$ (e.g., 1 kHz)
- **Modulator:** Time-varying conductance $G(t) = G_0(1 + m \cos \omega_s t)$

Output contains:
- Carrier: $\omega_c$
- Lower sideband: $\omega_c - \omega_s$
- Upper sideband: $\omega_c + \omega_s$

The receiver "picks" the sidebands to recover the audio.

**Without time-varying nonlinear elements, wireless communication wouldn't exist.**

[[visual:v5]]

[[visual:v6]]

---

## Bilateral Property

From lecture Page 7:

> A bilateral resistor satisfies: $f(v, i) = f(-v, -i)$ for all $(v, i)$ on its characteristic.

**Geometric interpretation:** The v-i curve is **symmetric about the origin**.

**Examples:**
- Linear resistor: $v = Ri$ → bilateral  
- Quadratic: $v = i^2$ → bilateral
- Ideal diode → **NOT** bilateral (asymmetric)

**Why does it matter?**
- Bilateral resistors have **only odd harmonics** (1st, 3rd, 5th...)
- Non-bilateral resistors have **all harmonics** (1st, 2nd, 3rd, 4th...)

**In audio:** Even harmonics (2nd, 4th) sound "warmer," odd harmonics sound "harsh." Tube amplifiers (bilateral-ish) vs. solid-state (non-bilateral) have different distortion character.

---

## Going Deeper: Frequency Multipliers

**Problem:** You have a 10 MHz oscillator, but you need 30 MHz.

**Solution:** Use a nonlinear resistor with $i = v^3$ characteristic.

Input: $v = V_m \cos(2\pi \cdot 10^7 t)$

Using $\cos^3 \theta = \frac{3\cos\theta + \cos 3\theta}{4}$:

$$i = V_m^3 \cos^3(\omega t) = \frac{3V_m^3}{4}\cos(\omega t) + \frac{V_m^3}{4}\cos(3\omega t)$$

Filter out the $\omega$ component, keep the $3\omega$ → **frequency tripler**.

**Used in:**
- RF transmitters
- Microwave generators
- High-frequency test  equipment

[[visual:v7]]

[[visual:v8]]

---

## Pose & Reflect

1. **If you want a "clean" signal with no harmonics, what should you avoid?**  
   Hint: What property ensures output frequency = input frequency?

2. **A guitar amplifier intentionally uses nonlinear tubes. Why?**  
   Think about harmonic content and sound quality.

3. **Time-varying resistors create sum/difference frequencies. How is this different from harmonic generation?**  
   What's the mathematical source of each?

---

## Summary

**Nonlinear resistors produce new frequencies:**
- **Harmonic generation:** Input $\omega$ → outputs $\omega, 2\omega, 3\omega, ...$
- Due to quadratic, cubic, higher-order terms in Taylor series

**Time-varying resistors enable frequency mixing:**
- $G(t)$ modulation creates sum/difference: $\omega \pm \omega_1$
- Basis for AM modulation, mixers, modulators

**Bilateral property:**
- Symmetric v-i curve → only odd harmonics
- Asymmetric → all harmonics

**Next:** How do we combine nonlinear resistors? Series and parallel connections require graphical methods because we can't just "add resistances" anymore.
