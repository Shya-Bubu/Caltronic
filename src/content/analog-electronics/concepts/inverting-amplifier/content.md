# The Inverting Amplifier: Your First Op-Amp Circuit

> **Why This Matters**: If you need to amplify a signal by exactly 10 times, how do you do it? With a single BJT transistor, setting the exact gain requires complex biasing, reading datasheets, and worrying about temperature drift. With an op-amp, you can achieve a perfect, stable gain of 10 using just two cheap resistors. The **Inverting Amplifier** is the staple circuit of analog design, used in audio mixers, sensor interfaces, and thousands of other applications.

## The Circuit Setup

Let's look at the standard inverting amplifier topology. 

[[visual:inverting-amp-schematic]]

The circuit has three main components:
1. An op-amp.
2. An input resistor $R_1$ connected between the signal source $V_{in}$ and the **inverting ($-$)** terminal.
3. A feedback resistor $R_2$ connecting the output $V_o$ back to the **inverting ($-$)** terminal.

Crucially, the **non-inverting ($+$)** terminal is tied directly to ground ($0\text{V}$).

## Analyzing the Circuit: The Power of KCL

Because this circuit uses negative feedback (a connection from the output to the inverting input), we can unleash the two "Golden Rules" of the ideal op-amp we learned in the previous concept:

1. **Virtual Short**: $V_+ = V_-$
2. **Infinite Input Impedance**: $i_+ = 0$ and $i_- = 0$

Let's apply these rules to find the relationship between the output $V_o$ and the input $V_{in}$.

### Step 1: Find the Virtual Ground

Look at the non-inverting terminal $V_+$. It is physically connected to ground, so $V_+ = 0\text{V}$.

Because of the Virtual Short rule ($V_+ = V_-$), the op-amp will force the inverting terminal $V_-$ to precisely match it. Therefore:

$$V_- = 0\text{V}$$

We call Node A a **Virtual Ground**. It is at $0\text{V}$, but unlike a true ground, it cannot sink any current. If you touched a multimeter probe to Node A, it would read zero volts!

[[visual:virtual-ground-voltage]]

### Step 2: Apply Kirchhoff's Current Law (KCL) at Node A

Now we apply KCL at the inverting terminal (Node A). The sum of currents leaving the node must equal zero.

[[visual:kcl-current-flow]]

Let the current flowing from $V_{in}$ through $R_1$ be $I_1$.
Let the current flowing from the output through $R_2$ be $I_2$.
Let the current flowing into the op-amp inverting pin be $i_-$.

KCL states:
$$I_1 + I_2 + i_- = 0$$

According to our second Golden Rule, the op-amp draws no input current, so $i_- = 0$. This means:

$$I_1 + I_2 = 0 \quad \text{or} \quad I_1 = -I_2$$

> **Key Insight**: ALL the current that flows through the input resistor $R_1$ must continue flowing straight through the feedback resistor $R_2$. There is nowhere else for it to go! This single fact defines the entire behavior of the amplifier.

### Step 3: Express Currents using Ohm's Law

Now we express those currents in terms of the node voltages. 

Current $I_1$ flows from $V_{in}$ to Node A (which is at $0\text{V}$):
$$I_1 = \frac{V_{in} - 0}{R_1} = \frac{V_{in}}{R_1}$$

Current $I_2$ flows from $V_o$ to Node A (which is at $0\text{V}$):
$$I_2 = \frac{V_o - 0}{R_2} = \frac{V_o}{R_2}$$

Substitute these into our KCL equation ($I_1 + I_2 = 0$):

$$\frac{V_{in}}{R_1} + \frac{V_o}{R_2} = 0$$

### Step 4: Solve for the Voltage Gain

Rearranging the equation to solve for $V_o$:

$$\frac{V_o}{R_2} = -\frac{V_{in}}{R_1}$$

$$V_o = -\left(\frac{R_2}{R_1}\right) V_{in}$$

The voltage gain ($A_v$) is defined as $V_o / V_{in}$:

$$\boxed{A_v = \frac{V_o}{V_{in}} = -\frac{R_2}{R_1}}$$

[[visual:gain-vs-resistors]]

## Understanding the Result

Look closely at this incredible result. The gain of the circuit depends **only** on the ratio of two external resistors! It doesn't depend on the op-amp's internal transistors, temperature variations, or individual device characteristics. 

If you want a gain of exactly $10$, you just choose $R_2 = 10\text{ k}\Omega$ and $R_1 = 1\text{ k}\Omega$. It's that simple. 

### Why is there a minus sign?

The minus sign means the amplifier is **inverting**. An input of $+1\text{V}$ produces a negative output. An input of $-1\text{V}$ produces a positive output. If you feed in a sine wave, the output sine wave will be flipped upside down (180° out of phase).

[[visual:falstad-inverting-amp]]

<details>
<summary><strong>Pause & Think</strong>: To achieve a very high gain (e.g. 1000), you could make $R_1$ very small (e.g. $10\,\Omega$). Why is this generally a bad idea in practice?</summary>

Remember that $I_1 = V_{in}/R_1$. If $R_1 = 10\,\Omega$, a $1\text{V}$ signal would force $100\text{ mA}$ to flow from the source! Most signal sources (like a microphone or sensor) are very weak and cannot supply $100\text{ mA}$. A small $R_1$ creates a very low input impedance, heavily loading the previous stage. It's much better practice to use larger resistor values (e.g. $R_1 = 1\text{ k}\Omega, R_2 = 1\text{ M}\Omega$).
</details>

## Input and Output Impedance

For the entire inverting amplifier circuit (not the bare op-amp chip):

- **Circuit Input Impedance**: The signal source $V_{in}$ looks into resistor $R_1$, which goes to a virtual ground ($0\text{V}$). Therefore, the input impedance of the circuit is simply $\boxed{Z_{in} = R_1}$.
- **Circuit Output Impedance**: Due to the massive negative feedback, the output acts as an almost perfect voltage source. The output impedance is $\boxed{Z_{out} \approx 0\,\Omega}$.

## The Saturation Reality Check

While our formula $V_o = -(R_2/R_1) V_{in}$ suggests the output can be anything, real op-amps obey the physical laws of the universe. The op-amp is powered by DC supply rails, usually labeled $+V_{CC}$ and $-V_{CC}$ (e.g. $\pm 15\text{V}$).

The output voltage can **never** exceed the power supply voltages.

$$-V_{CC} < V_o < +V_{CC}$$

If your input signal requires an output that exceeds these rails, the op-amp simply stops increasing the voltage. It "hits the rail" and clips the top off the waveform. This is called **saturation**.

[[visual:transfer-characteristic]]
[[visual:output-saturation]]
[[visual:falstad-clipping]]

## Summary

- The **Inverting Amplifier** uses negative feedback to provide a perfectly stable voltage gain.
- Because the non-inverting terminal is grounded, the inverting terminal becomes a **Virtual Ground** ($0\text{V}$).
- By applying KCL at the virtual ground, we find that the current through $R_1$ must equal the current through $R_2$.
- The voltage gain is determined solely by the resistor ratio: $$A_v = -\frac{R_2}{R_1}$$
- The negative sign indicates a 180° phase inversion.
- The output voltage is strictly bounded by the power supply rails ($\pm V_{CC}$).
