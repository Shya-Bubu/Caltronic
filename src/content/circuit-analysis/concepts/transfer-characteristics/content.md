## Driving-Point vs. Transfer Characteristics

> **Why This Matters**: Transfer characteristics are the language of circuit function. Every amplifier gain, every logic gate threshold, every signal processing operation is described by a transfer characteristic. This concept bridges the gap between "how does a device behave" and "what does a circuit do."

Up to this point, every $v$-$i$ relationship we have studied has been a **driving-point** characteristic: the voltage and current are measured at the **same** port. You apply a voltage (or current) to a pair of terminals and observe the resulting current (or voltage) at those same terminals. The entire story takes place at one port.

Think of a prism. White light enters one side (input port) and a rainbow exits the other side (output port). The relationship between the input light and the output spectrum is a "transfer characteristic" — it tells you how the prism transforms the input into the output. Similarly, a circuit’s transfer characteristic tells you how the input signal is transformed into the output signal.

A **transfer characteristic** is fundamentally different. Here, the input is applied at one port and the output is observed at a **different** port. The word "transfer" means exactly this: the signal is transferred from the input port to the output port, and we want to know how the output depends on the input. Transfer characteristics are at the heart of amplifier design, signal processing, and virtually every circuit that does something useful beyond simply presenting an impedance.

The distinction matters because the relationship between input and output now involves the internal structure of the circuit — how the elements are connected between the two ports. A driving-point characteristic tells you how one port behaves in isolation; a transfer characteristic tells you how the circuit processes a signal from input to output.

[[visual:dp-vs-transfer]]

## Setting Up the Problem

Consider the simplest possible transfer circuit: two two-terminal resistors, $R_1$ and $R_2$, connected in **series** and driven by an input voltage $v_i$. The output voltage $v_o$ is measured across $R_2$.

Let the characteristics of the two resistors be:

$$v_1 = \hat{v}_1(i), \quad v_2 = \hat{v}_2(i)$$

Both are current-controlled. Since $R_1$ and $R_2$ are in series, KCL at the intermediate node forces:

$$i = i_1 = i_2$$

A single current flows through both elements. KVL around the loop gives:

$$v_i = v_1 + v_2 = \hat{v}_1(i) + \hat{v}_2(i)$$

This expresses the input voltage as a function of the common current:

$$v_i = f(i) \quad \text{where } f(i) = \hat{v}_1(i) + \hat{v}_2(i)$$

The output voltage is simply the voltage across $R_2$:

$$v_o = v_2 = \hat{v}_2(i) = h(i)$$

Now we have both $v_i$ and $v_o$ expressed in terms of the same parameter $i$. To obtain the transfer characteristic $v_o$ as an explicit function of $v_i$, we eliminate $i$:

$$v_o = h\!\left(f^{-1}(v_i)\right)$$

This requires inverting $f$ -- that is, expressing $i$ as a function of $v_i$ -- and then substituting into $h$. If $f$ is monotonic (which it will be if both resistors are strictly increasing), the inverse exists and the transfer characteristic is a well-defined, single-valued function. If $f$ is not monotonic, the transfer characteristic may be multi-valued, meaning that a single input voltage can produce more than one output voltage.

## The Parametric Approach

In practice, you often cannot invert $f$ in closed form. The parametric method avoids this difficulty entirely. Instead of seeking an explicit formula $v_o(v_i)$, you compute both $v_i$ and $v_o$ for a range of current values:

1. Choose a value of $i$.
2. Compute $v_i = \hat{v}_1(i) + \hat{v}_2(i)$.
3. Compute $v_o = \hat{v}_2(i)$.
4. Plot the point $(v_i, v_o)$.
5. Repeat for many values of $i$.

The resulting set of points traces the transfer characteristic curve in the $v_i$-$v_o$ plane. This works regardless of whether $f$ is invertible, and it handles nonlinear elements with no additional complexity.

[[visual:parametric-method]]

<details>
<summary><strong>Pause & Think</strong>: Why is the parametric method more robust than trying to find an explicit formula $v_o(v_i)$?</summary>

Because the parametric method never requires inverting $f(i)$. Inversion requires $f$ to be monotonic and analytically tractable — conditions that fail for many practical nonlinear circuits. The parametric method works by computing forward: choose $i$, compute both $v_i$ and $v_o$, and plot. No inversion needed.

</details>

## Example: PN-Junction Diode with Linear Resistor

To make this concrete, consider a circuit where $R_1$ is a PN-junction diode and $R_2$ is a linear resistor with resistance $R_2$.

The diode has the exponential characteristic $i = I_s(e^{v_1/V_T} - 1)$, which, for forward bias beyond a few $V_T$, produces a voltage that varies only slowly with current (roughly $v_1 \approx 0.6$ to $0.7\,\text{V}$ over a wide range of currents). The linear resistor has $v_2 = R_2 \cdot i$.

KVL gives:

$$v_i = v_1 + R_2 \cdot i$$

The output is:

$$v_o = R_2 \cdot i$$

[[visual:transfer-char]]

Now consider what happens as $v_i$ increases from zero:

- For $v_i < V_\gamma$ (the diode's turn-on voltage, roughly $0.6\,\text{V}$), the diode conducts negligible current. Therefore $i \approx 0$ and $v_o = R_2 \cdot i \approx 0$. Nearly all of $v_i$ appears across the diode (which is essentially an open circuit).
- As $v_i$ exceeds $V_\gamma$, the diode begins to conduct. The diode voltage remains approximately pinned near $V_\gamma$ because of the steep exponential characteristic. Therefore:

$$v_o = v_i - v_1 \approx v_i - V_\gamma$$

Almost all incremental input voltage appears across $R_2$. The transfer characteristic becomes approximately a straight line with slope $1$ and offset $-V_\gamma$.

The resulting transfer characteristic curve has two distinct regions:

- **Below turn-on** ($v_i < V_\gamma$): $v_o \approx 0$. The output is essentially dead.
- **Above turn-on** ($v_i > V_\gamma$): $v_o \approx v_i - V_\gamma$. The output tracks the input with a fixed voltage offset.

This is the behaviour of a simple **half-wave rectifier** or, viewed differently, a voltage divider in which one element is nonlinear. The diode "absorbs" its turn-on voltage and passes the rest to the resistor.

## Shape of the Transfer Characteristic Curve

The transfer characteristic is plotted in the $v_i$-$v_o$ plane (input on the horizontal axis, output on the vertical axis). For the diode-resistor example above, the curve hugs the horizontal axis for small $v_i$ and then rises with a slope approaching $1$ for large $v_i$. The transition between these two regions is smooth but rapid, occurring in a narrow band around $v_i = V_\gamma$.

For a purely linear circuit -- two linear resistors forming a voltage divider -- the transfer characteristic is a straight line through the origin:

$$v_o = \frac{R_2}{R_1 + R_2} \cdot v_i$$

The slope $R_2 / (R_1 + R_2)$ is constant and less than $1$ (the output is always a fraction of the input). This is the standard resistive voltage divider result.

Comparing the linear and nonlinear cases highlights the essential difference: a nonlinear element creates a transfer characteristic with **varying slope**, which means the circuit processes small and large signals differently. This varying slope is what enables nonlinear circuits to perform functions like rectification, limiting, and amplitude compression — functions that are impossible with purely linear elements.

[[visual:linear-vs-nonlinear-tc]]

<details>
<summary><strong>Pause & Think</strong>: A circuit has a transfer characteristic with slope = 100 in a narrow region. What does this circuit do in that region?</summary>

It **amplifies** — a small change in $v_i$ produces a 100× larger change in $v_o$. This is how transistor amplifiers work: they are biased to operate in a region where the transfer characteristic has a steep slope. The slope of the transfer characteristic at the operating point is the **small-signal gain** of the circuit.

</details>

## Practical Significance

Transfer characteristics are the language in which circuit function is described. When an engineer says "this amplifier has a gain of 100," they are making a statement about the slope of the transfer characteristic in a particular operating region. When a datasheet specifies the "input-output relationship" of a logic gate, it is presenting the transfer characteristic.

More broadly, the transfer characteristic encodes three essential pieces of information about a circuit:

- **Gain**: the slope $dv_o / dv_i$ at a given operating point. A slope greater than $1$ indicates amplification; less than $1$ indicates attenuation.
- **Offset**: any constant voltage shift between input and output (as in the diode example, where $v_o = v_i - V_\gamma$).
- **Linearity**: how much the slope changes as the input varies. A perfectly linear transfer characteristic has constant slope everywhere. A nonlinear one has slope that varies, introducing distortion for large signals.

Understanding how to derive and interpret transfer characteristics is therefore not just an academic exercise. It is the analytical foundation for understanding what circuits do and how they do it.

## Summary of the Derivation Procedure

For a series connection of two current-controlled resistors with input $v_i$ and output $v_o = v_2$:

1. Write KCL: $i = i_1 = i_2$.
2. Write KVL: $v_i = \hat{v}_1(i) + \hat{v}_2(i)$.
3. Write the output: $v_o = \hat{v}_2(i)$.
4. Eliminate $i$ (analytically if possible, or parametrically).
5. Plot $v_o$ vs. $v_i$.

The parametric method — computing both $v_i$ and $v_o$ for many values of $i$ — always works and avoids the need for algebraic inversion. Use it whenever the closed-form inverse is difficult or unavailable.

[[visual:derivation-procedure]]

[[visual:falstad-transfer-function]]

[[visual:transfer-curve-shapes]]

[[visual:gain-offset-linearity]]

