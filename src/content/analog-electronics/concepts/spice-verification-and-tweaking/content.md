# SPICE Verification and Design Iteration

> **Why This Matters**: Paper calculations get you close, but simulation reveals the truth. LTspice shows you whether your amplifier actually works — and teaches you how to fix it when it doesn't match your predictions.

## Why Simulate Before Building?

You've designed all seven resistors on paper. The calculations say the gain should be about 600 and the output should swing 7 Vpp. But we made approximations — ignored $h_{ie2}$, rounded to E12 values, assumed ideal transistor models. Will it actually work?

**LTspice** (or any SPICE simulator) lets you:

1. Verify the DC operating point matches your calculations
2. Check the transient output for distortion or clipping
3. Generate Bode plots (gain and phase vs frequency)
4. Tweak resistor values and immediately see the effect
5. Test edge cases (temperature variation, component tolerances)

[[visual:ltspice-workflow-diagram]]

## Step 1: Enter the Circuit

In LTspice, you draw the complete circuit with:

- BC549 (NPN) and BC556 (PNP) transistor models
- All seven resistors (Ra, Rb, R1, R2, R3, R4, R5) with E12 values
- Input coupling capacitor $C_{in}$, output coupling capacitor $C_o$, and bypass capacitor $C_E$ across $R_2$
- AC voltage source: 1 kHz sine wave with amplitude calculated from $V_{pp,in} = V_{pp,out}/A_v = 7/600 \approx 11.7$ mV peak-to-peak
- Load resistor $R_L = 1$ kΩ

[[visual:falstad-complete-design]]

## Step 2: Choosing Capacitor Values

The lecture explains the capacitor selection process. The key requirement: at the operating frequency (1 kHz), the capacitor impedance must be **much smaller** than the surrounding resistors.

$$X_C = \frac{1}{2\pi f C}$$

For $X_C \ll R$ (say, $X_C < R/10$):

$$C > \frac{10}{2\pi f R}$$

[[visual:capacitor-selection-chart]]

| Capacitor | Adjacent Resistor | Minimum C | Chosen Value |
|-----------|------------------|-----------|-------------|
| $C_{in}$ | $R_a \| R_b \| Z_{in} \approx 8$ kΩ | $\frac{10}{2\pi \times 1000 \times 8000} = 0.2$ μF | 2.2 μF |
| $C_o$ | $R_5 + R_L = 1.22$ kΩ | $\frac{10}{2\pi \times 1000 \times 1220} = 1.3$ μF | 4.7 μF |
| $C_E$ | $R_2 = 1.8$ kΩ | $\frac{10}{2\pi \times 1000 \times 1800} = 0.88$ μF | 4.7 μF |

We deliberately choose values **much larger** than the minimum. This ensures the capacitors behave as short circuits across a wide frequency range, not just at 1 kHz.

<details>
<summary><strong>Pause & Think</strong>: What happens if you use smaller capacitors (e.g., 2.2μF for all three)?</summary>

The professor demonstrates this in the lecture. The gain drops (especially at lower frequencies) and the output shows distortion. The capacitors aren't fully shorting at the signal frequency, so part of the signal gets dropped across them instead of being amplified. The Bode plot would show a higher low-frequency cutoff.

</details>

## Step 3: DC Operating Point Verification

Before running any AC analysis, check the DC operating point. LTspice can display the DC voltages at every node:

| Node | Calculated | Expected from Simulation |
|------|-----------|-------------------------|
| $V_{B1}$ | 4.69 V | 4.5 – 5.0 V |
| $V_{C1} = V_{B2}$ | 7 – 11 V | Within range |
| $V_{E2}$ | ~14.3 V | 13.5 – 15 V |
| $V_{C2}$ | 6 V | 5 – 7 V |

If the DC voltages are wildly off, check your wiring before proceeding with AC analysis.

[[visual:dc-operating-point-table]]

## Step 4: Transient Analysis — The Output Waveform

Run a transient simulation with a 1 kHz input signal. The output should be:

- A clean sine wave
- Amplitude of approximately ± 3.5 V (7 Vpp)
- No flat tops or bottoms (no clipping)
- 180° phase shift from input (due to the amplifier inversion)

[[visual:transient-output-plot]]

The professor's simulation shows output swinging from about −4V to +3.2V — roughly 7.2 Vpp. This is very close to the 7 Vpp target.

> **If you see clipping**: The Q-point is too close to saturation or cutoff. Adjust the bias network (Ra/Rb) or shift the Q-point by changing R4 or R5.

## Step 5: Bode Plot — Gain vs Frequency

[[visual:bode-gain-plot]]

The Bode plot reveals the amplifier's frequency response:

- **Midband gain**: The flat region where $|A_v| \approx 600$ (about 55.6 dB)
- **Lower cutoff frequency** ($f_L$): Where the gain drops by 3 dB below midband. Determined by coupling/bypass capacitors
- **Upper cutoff frequency** ($f_H$): Where the gain drops by 3 dB above midband. Determined by transistor parasitic capacitances
- **Bandwidth**: $BW = f_H - f_L$

With 4.7 μF capacitors and typical transistor parasitics, expect:
- $f_L \approx 20 – 100$ Hz
- $f_H \approx 100$ kHz – 1 MHz
- Midband: 100 Hz to 100 kHz

## Step 6: Phase vs Frequency

[[visual:bode-phase-plot]]

The phase plot shows how the amplifier delays the signal at different frequencies:

- **Midband**: Phase ≈ 180° (inverting amplifier)
- **Below $f_L$**: Phase shifts towards 90° (capacitors adding phase shift)
- **Above $f_H$**: Phase shifts towards 270° (transistor parasitic effects)

## Step 7: Design Iteration — Tweaking Values

The professor demonstrates this live in the lecture. Once you have the basic circuit working, you can:

**Tweak R1 (collector resistor of Q1)**: 
- Changing from 1.8 kΩ to 2.7 kΩ increased the output amplitude slightly
- This changes VC1 and therefore VB2, shifting the Q-point of Stage 2

**Tweak capacitor values**:
- Reducing from 47 μF to 2.2 μF → amplitude dropped from 7V to 5.5V
- Distortion appeared at the output
- This shows the capacitors weren't shorting sufficiently

**Tweak bias (Ra)**:
- Changing Ra to 18 kΩ → severe clipping appeared
- The Q-point shifted too far, causing saturation distortion

[[visual:falstad-tweaking-demo]]

> **Key Learning**: Simulation is an iterative process. Make one change at a time, observe the effect, and understand *why* it happened. This builds your design intuition faster than any textbook.

## Tolerances and Manufacturing

With E12 resistors (5% tolerance), your actual gain will be somewhere in the range:

$$A_v = 600 \pm 5\% = 570 \text{ to } 630$$

The simulation with nominal values gives you the centre of this range. In practice, you might get any value within this band. This is why designers often aim for the centre of a specification range rather than a boundary.

[[visual:tolerance-band-plot]]

## Summary

- **Always simulate before building** — paper calculations are approximations
- **Check DC operating points first** — if bias is wrong, AC analysis is meaningless
- **Capacitor values matter** — too small causes gain loss and distortion
- **Bode plot** shows gain and phase vs frequency — identifies bandwidth limits
- **Iterate**: change one component at a time and observe the effect
- **5% tolerance** means your design must work across a range of component values
- The beauty of SPICE: you can break things virtually and learn from it without burning transistors
