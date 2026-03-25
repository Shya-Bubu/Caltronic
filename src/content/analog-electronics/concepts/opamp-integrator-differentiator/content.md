# Op-Amp Integrators and Differentiators

> **Why This Matters**: Operational amplifiers aren't just for multiplying signals by a constant gain. "Operational" is right there in the name—they were originally designed to perform mathematical operations in analog computers. By replacing a feedback resistor with a capacitor, we introduce time dependency. This allows us to perform real-time calculus on analog electrical signals: integration (finding the area under a curve) and differentiation (finding the rate of change).

## 1. The Ideal Integrator

Let's begin by modifying our standard inverting amplifier. We keep the input resistor $R$, but we replace the feedback resistor with a capacitor $C$. 

[[visual:integrator-schematic]]

Because negative feedback is present (via the capacitor), our two golden rules still apply:
1. Virtual Ground: $V_- = 0\text{V}$
2. Zero input current: $i_- = 0$

### Deriving the Integrator Equation
Let's apply KCL at the virtual ground. The current flowing through the resistor $i_{in}$ must exactly equal the current flowing through the capacitor $i_c$.

$$i_{in} = -i_c$$

We know from basic circuit theory:
- Current through a resistor: $I = V / R$
- Current through a capacitor: $I = C \frac{dV}{dt}$

Let's express both currents in terms of our node voltages:
$$i_{in} = \frac{V_{in} - 0}{R} = \frac{V_{in}}{R}$$

For the capacitor, the voltage across it is ($V_o - 0$) or just $V_o$. The current flowing *from* the virtual ground *towards* the output is:
$$i_c = C \frac{dV_o}{dt}$$

Equating the two ($i_{in} = -i_c$):
$$\frac{V_{in}}{R} = -C \frac{dV_o}{dt}$$

Rearranging to solve for the output voltage change over time:
$$\frac{dV_o}{dt} = -\frac{V_{in}}{RC}$$

To find the actual output voltage $V_o$, we must integrate both sides with respect to time:
$$\boxed{V_o(t) = -\frac{1}{RC} \int V_{in}(t) dt + V_{initial}}$$

### What does this mean?
The output voltage is the **integral of the input voltage** over time, scaled by a constant factor $-1/RC$. 

If you apply a constant DC voltage $V_{in} = 1\text{V}$, the integral of a constant is a linear ramp. The output will ramp linearly downwards (due to the negative sign) until it hits the negative power supply rail and saturates.

If you apply a square wave, the integrator produces a sequence of positive and negative ramps—resulting in a perfectly straight-edged triangle wave.

[[visual:falstad-integrator]]
[[visual:integrator-waveforms]]

### The Practical Reality: Integrator Drift
The ideal integrator mathematically beautiful, but practically flawed. Recall that real op-amps have tiny imperfections. Even with $0\text{V}$ applied to the input, a real op-amp might have an internal input offset voltage of a few millivolts.

What is the integral of $1\text{mV}$ over hours or days? It ramps up to infinity!

In a real, ideal integrator circuit, these tiny DC offsets are integrated continuously. Because a capacitor acts as an open circuit to DC, there is no DC feedback to correct it. The output will slowly drift until it pins itself to one of the power supply rails (saturation).

[[visual:integrator-drift]]

To fix this "DC drift," we must add a large resistor $R_F$ in parallel with the capacitor. This provides a DC feedback path, essentially turning the circuit back into an inverting amplifier for incredibly slow-changing DC offset voltages, while still acting as an integrator for faster AC signals. This is called a **practical** or **lossy integrator**.

[[visual:practical-integrator-schematic]]

## 2. The Ideal Differentiator

What if we swap the positions of the resistor and capacitor? We place a capacitor $C$ at the input, and a resistor $R$ in the feedback loop.

[[visual:differentiator-schematic]]

Let's do the KCL KCL derivation at the virtual ground again ($i_{in} = -i_r$).

Current through the input capacitor:
$$i_{in} = C \frac{d(V_{in} - 0)}{dt} = C \frac{dV_{in}}{dt}$$

Current through the feedback resistor:
$$i_r = \frac{V_o - 0}{R} = \frac{V_o}{R}$$

Equating them ($i_{in} = -i_r$):
$$C \frac{dV_{in}}{dt} = -\frac{V_o}{R}$$

Solving for $V_o$:
$$\boxed{V_o(t) = -RC \frac{dV_{in}(t)}{dt}}$$

### What does this mean?
The output voltage is directly proportional to the **rate of change** (the derivative) of the input voltage. 
If the input is a constant DC voltage, its rate of change is zero, so $V_o = 0\text{V}$.
If the input is a triangle wave (constant slopes), the derivative is a constant positive or negative value, resulting in a square wave output.
If the input is $\sin(\omega t)$, the output will be based on $\cos(\omega t)$. 

Notice that the scaling factor here is $-RC$, rather than $-1/RC$ for the integrator.

[[visual:falstad-differentiator]]
[[visual:differentiator-waveforms]]

### The Practical Reality: High Frequency Noise
Just like the ideal integrator, the ideal differentiator has a fatal practical flaw. 

Look at the capacitor's impedance $X_C = 1/(2\pi f C)$. At extremely high frequencies, the input capacitor acts almost like a short circuit. The "gain" of the differentiator ($R / X_C$) approaches infinity at high frequencies. 

Any tiny amount of high-frequency noise (like radio waves or switching noise) gets enormously amplified, drowning out the actual signal. To combat this, a practical differentiator places a small resistor $R_S$ in series with the input capacitor to cap the maximum high-frequency gain.

## Summary
- **Integrator**: Input resistor, feedback capacitor. Output is the scaled integral of the input ($-1/RC \int V_{in} dt$). Prone to DC drift due to offset voltages.
- **Differentiator**: Input capacitor, feedback resistor. Output is the scaled derivative of the input ($-RC \cdot dV_{in}/dt$). Prone to severe high-frequency noise amplification.
- Both circuits invert the phase of the mathematical result due to connecting to the inverting op-amp terminal.
