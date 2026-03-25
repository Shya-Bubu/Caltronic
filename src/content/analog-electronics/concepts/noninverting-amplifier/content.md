# The Non-Inverting Amplifier & Voltage Buffers

> **Why This Matters**: The inverting amplifier we just studied is great, but it has one fundamental flaw: its input impedance is determined by $R_1$. If you need a high gain, $R_1$ must be small, which heavily loads down the signal source. What if you're measuring a delicate biological sensor capable of supplying only nano-amps of current? Enter the **Non-Inverting Amplifier**. It solves the loading problem completely while preserving the source signal's phase.

## The Circuit Setup

In the non-inverting amplifier, we flip where the input connects. Instead of feeding $V_{in}$ into the resistor network, we apply it directly to the **non-inverting ($+$)** terminal.

[[visual:noninverting-amp-schematic]]

The feedback network — resistors $R_1$ and $R_2$ — still connects the output $V_o$ back to the **inverting ($-$)** terminal. Notice that $R_1$ connects the inverting terminal to ground.

## Analyzing the Circuit

Let's use our two Golden Rules of ideal op-amps derived from negative feedback:
1. **Virtual Short**: $V_+ = V_-$
2. **Infinite Input Impedance**: $i_+ = 0$ and $i_- = 0$

### Step 1: The Virtual Short

The input signal is applied directly to the non-inverting terminal.
$$V_+ = V_{in}$$

Because of the virtual short principle, the op-amp will drive its output to whatever voltage is necessary to make the inverting terminal match.
$$V_- = V_{in}$$

### Step 2: KCL at the Inverting Terminal

Let's look at the node at the inverting terminal. 
- Current $I_1$ flows from this node to ground through $R_1$.
- Current $I_2$ flows from the output $V_o$ to this node through $R_2$.
- The current into the op-amp $i_-$ is zero.

Because $i_- = 0$, all the current $I_2$ flowing from the output through $R_2$ must continue flowing straight through $R_1$ to ground. The two resistors simply act as a **voltage divider**!

[[visual:voltage-divider-feedback]]

Let's set up the KCL equation: currents leaving the node equal zero.
$$\frac{V_- - 0}{R_1} + \frac{V_- - V_o}{R_2} = 0$$

### Step 3: Solve for the Voltage Gain

Substitute $V_- = V_{in}$ into the equation:

$$\frac{V_{in}}{R_1} + \frac{V_{in} - V_o}{R_2} = 0$$

Multiply the whole equation by $R_2$:

$$V_{in}\left(\frac{R_2}{R_1}\right) + V_{in} - V_o = 0$$

Rearrange to solve for $V_o$:

$$V_o = V_{in}\left(1 + \frac{R_2}{R_1}\right)$$

Therefore, the voltage gain ($A_v$) is:

$$\boxed{A_v = \frac{V_o}{V_{in}} = 1 + \frac{R_2}{R_1}}$$

[[visual:falstad-noninverting-amp]]

## Key Features

### 1. No Phase Inversion
Unlike the inverting amplifier ($A_v = -R_2/R_1$), there is no minus sign here. When the input goes positive, the output goes positive. They are perfectly in phase.

### 2. Minimum Gain is 1
Notice the $+1$ in the equation. Even if you make $R_2$ essentially zero, the gain doesn't go to zero; it goes down to $1$. A non-inverting amplifier can only amplify ($A_v \geq 1$), it cannot attenuate.

[[visual:gain-comparison]]

### 3. Ultimate Input Impedance
Let's find the input impedance for the entire circuit. The signal source $V_{in}$ is connected *directly* to the op-amp's non-inverting terminal. Based on the golden rules, the op-amp draws **zero current**. 

According to Ohm's Law ($Z = V / I$), if $I=0$, the impedance is infinite.

$$\boxed{Z_{in} = \infty \text{ (Ideal)}}$$

In reality, real op-amps have an input impedance ranging from a few Mega-ohms (BJT ops-amps like the 741) to Tera-ohms (FET-input op-amps like the TL071). This prevents even the weakest sensors from being loaded down.

[[visual:impedance-comparison]]

## The Unity Gain Buffer (Voltage Follower)

What happens if we take the non-inverting amplifier to its logical extreme? 
Let's make $R_2 = 0\,\Omega$ (a solid wire) and $R_1 = \infty\,\Omega$ (remove it completely).

According to our gain formula:
$$A_v = 1 + \frac{0}{\infty} = 1 + 0 = 1$$

And the output voltage becomes:
$$V_o = V_{in}$$

This circuit is called the **Unity Gain Buffer** or **Voltage Follower**. 

[[visual:unity-gain-buffer]]

### "Wait, why do I want an amplifier that doesn't amplify?"

If $V_o = V_{in}$, why not just use a piece of wire?

The magic lies in impedance. A piece of wire transfers both voltage *and* current. If your source is weak (high internal resistance) and your load is heavy (low resistance), connecting them with a wire causes a massive voltage drop. This is known as "loading".

The Unity Gain Buffer acts like a perfect one-way mirror for voltage:
- **It looks at the source**, drawing zero current ($Z_{in} = \infty$).
- **It drives the load**, supplying whatever current is necessary from the power supply, not the source ($Z_{out} = 0$).

It entirely isolates the source from the load. It is one of the most important concepts in analog electronics. Whenever you have a high-impedance sensor (like a pH probe or a guitar pickup), you immediately put a buffer right next to it before sending the signal down a long cable.

[[visual:falstad-buffer-sim]]

## Summary

- The **Non-Inverting Amplifier** applies the input directly to the op-amp's positive terminal, resulting in massive input impedance ($Z_{in} \approx \infty$).
- The voltage gain is $A_v = 1 + \frac{R_2}{R_1}$, generating an output that is in phase with the input.
- The feedback network $R_1$ and $R_2$ simply acts as a voltage divider from $V_o$ to the inverting terminal.
- The **Unity Gain Buffer** (Voltage Follower) is a special case where $A_v = 1$. It provides impedance isolation, allowing a weak signal source to drive a heavy load without losing voltage.
