# Time-Varying Resistors and Modulation

> **Narrative thread**: So far, we've studied resistors whose v-i characteristics don't change with time. But what if the resistance itself varies? Time-varying resistors are the basis for modulation, mixing, and frequency conversion — essential in communications and signal processing.

> The key to understanding modulators, mixers, and switches.

---

## FROM BASICS: What Does "Time-Varying" Mean?

Remember from A-Level maths that a constant is a number that doesn't change: $k = 5$.  
A variable changes with time: $x(t) = 3t + 2$.

Same idea for resistance:

**Time-invariant resistor:**
$$R = 100\Omega \text{ (constant)}$$
$$v(t) = 100 \cdot i(t)$$

The resistance value 100Ω never changes, no matter when you measure it.

**Time-varying resistor:**
$$R(t) = 100 + 50\cos(\omega t) \text{ Ohms (varies with time!)}$$
$$v(t) = R(t) \cdot i(t) = [100 + 50\cos(\omega t)] \cdot i(t)$$

The resistance oscillates between 50Ω and 150Ω as time passes!

[[visual:v1]]

---

## THE BIG IDEA: Resistance as a Function of Time

**Definition (from lecture Page 8):**

A **time-varying resistor** has resistance (or conductance) that changes with time:

$$v(t) = R(t) \cdot i(t)$$

or equivalently:

$$i(t) = G(t) \cdot v(t)$$

where $R(t)$ or $G(t)$ is a function of time, not a constant.

**Why does this exist in reality?**

1. **Switches:** When a switch opens or closes, resistance jumps from 0 to ∞ (or vice versa) — extreme time variation!
2. **Thermistors:** Resistance changes with temperature, which changes with time as heat flows
3. **Photoresistors (LDRs):** Resistance changes with light intensity, which varies with time
4. **MOSFETs in active region:** Resistance (channel conductance) varies as gate voltage changes
5. **Intentional modulation:** We deliberately vary resistance to perform signal processing

---

## BUILDING UNDERSTANDING: The Lecture Example

Your professor gives a specific example on Page 8:

**Time-varying resistor:**
$$i(t) = G(t) \cdot v(t)$$

where:
$$G(t) = G_a + G_b \cos(\omega t)$$

with $G_a > G_b$ (to keep $G(t) > 0$ always — otherwise it becomes negative resistance!).

**Applied voltage:**
$$v(t) = V_m \cos(\omega_1 t)$$

**What current flows?**

**Before we start:** This might look intimidating with all the subscripts and cosines. Don't panic. We're just going to multiply two expressions and use a trig identity you already know from A-Level. Take it one step at a time.

Step 1: Substitute into $i(t) = G(t) \cdot v(t)$:
$$i(t) = [G_a + G_b \cos(\omega t)] \cdot V_m \cos(\omega_1 t)$$

**Pause here.** Make sure you see what we did — we just replaced G(t) and v(t) with their definitions.

Step 2: Distribute:
$$i(t) = G_a V_m \cos(\omega_1 t) + G_b V_m \cos(\omega t) \cos(\omega_1 t)$$

**This is where students usually get confused:** That second term has two cosines multiplied together. This is NOT addition — it's multiplication of two sinusoids. We need a trig identity to simplify it.

Step 3: Use trig identity $\cos A \cos B = \frac{1}{2}[\cos(A-B) + \cos(A+B)]$:

$$\cos(\omega t) \cos(\omega_1 t) = \frac{1}{2}[\cos((\omega - \omega_1)t) + \cos((\omega + \omega_1)t)]$$

Step 4: Final result:
$$i(t) = G_a V_m \cos(\omega_1 t) + \frac{1}{2} G_b V_m \cos((\omega - \omega_1)t) + \frac{1}{2} G_b V_m \cos((\omega + \omega_1)t)$$

[[visual:v2]]

---

## THE KEY INSIGHT: Frequency Mixing

Look at what happened:

**Input:** Single frequency $\omega_1$  
**Output:** THREE frequencies:
1. $\omega_1$ (original frequency)
2. $\omega - \omega_1$ (difference frequency)
3. $\omega + \omega_1$ (sum frequency)

**This is frequency conversion! New frequencies appear that weren't in the input!**

---

## CONNECTION TO LECTURE: Why This Matters

From Page 8:

> Output has sinusoids at angular frequencies $(\omega + \omega_1)$ and $(\omega - \omega_1)$. This property is the **basis for several modulation schemes**.

**Applications:**

### 1. **Amplitude Modulation (AM Radio)**
- Audio signal (speech/music) at frequency $\omega_1$ = 0-5 kHz
- Carrier signal at frequency $\omega$ = 1 MHz (AM band)
- Time-varying resistor (mixer) creates sum and difference frequencies
- Result: Audio information transmitted at high frequency!

### 2. **Frequency Mixing (Superheterodyne Receivers)**
- Incoming RF signal at $\omega_1$ (e.g., 100 MHz)
- Local oscillator at $\omega$ (e.g., 89.5 MHz)
- Mixer produces difference $\omega - \omega_1$ = 10.5 MHz (IF frequency)
- Easier to process and filter at lower frequency!

### 3. **Frequency Multiplication/Division**
By choosing specific relationships between $\omega$ and $\omega_1$, you can multiply or divide frequencies.

### 4. **Parametric Amplifiers**
Time-varying reactances (capacitors, inductors) pumped at frequency $\omega$ can amplify signals at $\omega_1$ with very low noise. Used in satellite receivers.

---

## GOING SLIGHTLY DEEPER: Why Nonlinearity Isn't Required

You might think: "Wait, isn't frequency mixing a nonlinear effect? Didn't we say linear resistors obey superposition?"

**Key distinction:**
- **Linear time-INVARIANT systems** obey superposition → no new frequencies
- **Linear time-VARYING systems** DON'T obey time-invariant superposition → new frequencies appear!

The resistor is still "linear" in the sense that $v$ and $i$ are proportional at each instant in time:
$$i(t) = G(t) \cdot v(t)$$

But because $G(t)$ itself varies, the overall system is time-varying, and **multiplication in time domain = convolution in frequency domain**, creating new frequencies.

---

## Real-World Implementation: Switches as Time-Varying Resistors

The simplest time-varying resistor is a **switch**:

**Periodic switch:**

- When closed: $R = 0$ (short circuit)
- When open: $R = \infty$ (open circuit)

Switching at frequency $\omega$ acts like a time-varying resistor and can perform:
- **Chopping** (DC → AC conversion)
- **Sampling** (continuous-time → discrete-time)
- **Modulation** (frequency shifting)

**Example:** Switching power supplies use high-frequency switches (100 kHz - 1 MHz) to efficiently convert voltages.

[[visual:v3]]

---

## Mathematical Insight: The Product Theorem

The core mathematical principle:

**Time-domain multiplication:**
$$y(t) = x(t) \cdot h(t)$$

**Frequency-domain convolution:**
$$Y(\omega) = X(\omega) * H(\omega)$$

When you multiply two sinusoids in time (like $G(t) \cdot v(t)$ where both are sinusoidal), their frequency spectra **convolve**, creating sum and difference frequencies.

This is the mathematical foundation of **all modulation schemes**:
- AM (amplitude modulation)
- FM (frequency modulation, via time-varying capacitance)
- PSK (phase-shift keying)
- Mixing in receivers

---

## PRACTICE: Worked Example

**Question:** A time-varying resistor has conductance $G(t) = 2 + \cos(2\pi \times 10^6 t)$ Siemens. A voltage $v(t) = 5\cos(2\pi \times 10^3 t)$ V is applied. Find the current $i(t)$.

**Solution:**

Step 1: Write the relationship
$$i(t) = G(t) \cdot v(t)$$

Step 2: Substitute
$$i(t) = [2 + \cos(2\pi \times 10^6 t)] \cdot 5\cos(2\pi \times 10^3 t)$$

Step 3: Distribute
$$i(t) = 10\cos(2\pi \times 10^3 t) + 5\cos(2\pi \times 10^6 t)\cos(2\pi \times 10^3 t)$$

Step 4: Apply $\cos A \cos B = \frac{1}{2}[\cos(A-B) + \cos(A+B)]$

$$i(t) = 10\cos(2\pi \times 10^3 t) + \frac{5}{2}\cos(2\pi (10^6 - 10^3) t) + \frac{5}{2}\cos(2\pi (10^6 + 10^3) t)$$

$$i(t) = 10\cos(2\pi \times 10^3 t) + 2.5\cos(2\pi \times 999 \times 10^3 t) + 2.5\cos(2\pi \times 1001 \times 10^3 t)$$

**Answer:** Output has three frequencies:
- 1 kHz (original)
- 999 kHz (difference)
- 1001 kHz (sum)

The 1 kHz signal has been **upconverted** to around 1 MHz! This is exactly how AM radio works.

[[visual:v4]]

[[visual:v5]]

---

## Why You Care: Real EEE Applications

### 1. **RF and Communications**
Every radio receiver and transmitter uses mixers (time-varying resistors/conductances) to shift frequencies.

### 2. **Signal Processing**
Analog multipliers, mixers, and modulators are time-varying elements at their core.

### 3. **Power Electronics**
Switching converters (DC-DC, inverters) rely on rapidly switched resistances to transfer energy efficiently.

### 4. **Sensors**
Many sensors (thermistors, photoresistors, strain gauges) are time-varying resistors responding to environmental changes.

### 5. **Measurement**
Lock-in amplifiers use time-varying gain (essentially time-varying conductance) to extract tiny signals from noise.

---

## Summary: Key Takeaways

1. **Time-varying resistor**: $R(t)$ or $G(t)$ varies with time, not constant
2. **Ohm's Law still applies** at each instant: $v(t) = R(t) \cdot i(t)$
3. **Frequency mixing**: Multiplying sinusoids creates sum and difference frequencies
4. **Modulation basis**: AM, FM, mixing, and frequency conversion all use time-varying elements
5. **Still "linear"** in the instantaneous sense, but not time-invariant
6. **Real examples**: switches, MOSFETs, thermistors, photoresistors, mixers
7. **Mathematical tool**: Product in time = convolution in frequency

Time-varying resistors bridge circuit theory and communications — essential for understanding modern EEE systems!

[[visual:v6]]

[[visual:v7]]

[[visual:v8]]

