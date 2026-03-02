# Properties of the Exponential Waveform

> **Why This Matters**: The exponential function $e^{-t/\tau}$ appears everywhere in first-order circuits — but knowing the formula is only the beginning. Understanding its **properties** lets you sketch waveforms by hand, estimate timing without a calculator, determine stability, and solve real engineering problems like calculating rise time or settling time. These properties are your practical toolkit for circuit design.

## Property 1: The Tangent Rule

The tangent line to the exponential curve at any point $t = t_0$ passes through the steady-state value $x(\infty)$ at time $t_0 + \tau$:

[[visual:tangent-rule]]

Mathematically, the slope at $t_0$ is:

$$\left.\frac{dx}{dt}\right|_{t_0} = -\frac{x(t_0) - x(\infty)}{\tau}$$

The tangent line from $(t_0, x(t_0))$ with this slope reaches $x(\infty)$ at time $t_0 + \tau$.

This gives you a **graphical method** to find $\tau$: from any point on the curve, draw the tangent line. Where it hits the steady-state level — that horizontal distance is exactly $\tau$.

## Property 2: The 63% Rule

After one time constant $\tau$, the waveform has covered **63.2%** of the total distance from initial to final value:

$$|x(\tau) - x(\infty)| = |x(t_0) - x(\infty)| \cdot e^{-1} = 0.368 \cdot |x(t_0) - x(\infty)|$$

[[visual:sixty-three-percent-rule]]

So the *remaining distance* is 36.8%, meaning 63.2% of the journey is complete.

| Time ($t/\tau$) | Remaining | Complete |
|--------|-----------|----------|
| 0 | 100% | 0% |
| 1 | 36.8% | **63.2%** |
| 2 | 13.5% | **86.5%** |
| 3 | 5.0% | **95.0%** |
| 4 | 1.8% | **98.2%** |
| 5 | 0.7% | **99.3%** |

After **5τ**, the circuit is within 0.7% of steady state — close enough for most engineering purposes. The "5τ rule" is widely used to determine settling time.

<details>
<summary><strong>Pause & Think</strong>: An RC circuit has τ = 1ms. How long until v_C reaches 99% of its final value?</summary>

We need $e^{-t/\tau} = 0.01$ (1% remaining):

$$t = -\tau \ln(0.01) = -0.001 \times (-4.605) = 4.605 \text{ ms}$$

So approximately $4.6\tau$. The "5τ rule" gives a slightly conservative estimate of 5 ms.

</details>

## Property 3: The Elapsed Time Formula

Given any two points $(t_j, x(t_j))$ and $(t_k, x(t_k))$ on the exponential curve, the time elapsed between them is:

$$\boxed{t_k - t_j = \tau \ln\frac{x(t_j) - x(\infty)}{x(t_k) - x(\infty)}}$$

[[visual:elapsed-time-formula]]

This formula is incredibly useful: if you know $\tau$ and two points on the waveform, you can find the time between them without solving the exponential equation directly.

**Example**: $\tau = 2$ ms, $x(\infty) = 10$ V, $x(t_j) = 3$ V, $x(t_k) = 8$ V. Time elapsed:

$$t_k - t_j = 2 \times \ln\frac{3 - 10}{8 - 10} = 2 \times \ln\frac{-7}{-2} = 2 \times \ln(3.5) = 2 \times 1.253 = 2.51 \text{ ms}$$

## Property 4: Rise Time ($t_r$)

The **rise time** is defined as the time for the output to go from 10% to 90% of the steady-state value (after a step input):

$$t_r = \tau \ln\frac{0.1E - E}{0.9E - E} = \tau \ln\frac{-0.9E}{-0.1E} = \tau \ln 9$$

$$\boxed{t_r = 2.2\tau}$$

[[visual:rise-time]]

This is a standard specification in electronics — data sheets for amplifiers and comparators quote rise time as a key performance metric. Knowing $t_r = 2.2\tau$ means you can immediately determine the circuit bandwidth from the rise time, and vice versa.

<details>
<summary><strong>Pause & Think</strong>: An oscilloscope probe has a rise time of 1.1 ns. What is τ? What bandwidth does this correspond to?</summary>

$\tau = t_r / 2.2 = 1.1 / 2.2 = 0.5$ ns.

The 3dB bandwidth of a first-order system is $f_{3dB} = 1/(2\pi\tau) = 1/(2\pi \times 0.5 \times 10^{-9}) = 318$ MHz.

A commonly used approximation: $\text{Bandwidth} \times t_r \approx 0.35$. So $f_{3dB} \approx 0.35/1.1 \times 10^{-9} = 318$ MHz. ✓

</details>

## Property 5: Solution by Inspection

The lecture notes make a powerful observation: the exponential waveform is **completely determined by three parameters**:

$$x(t_0), \quad x(\infty), \quad \tau$$

[[visual:inspection-method-demo]]

This is the **inspection method** — no differential equations needed! For any branch voltage or current in a first-order circuit:

1. **Find the initial value** $x(t_0)$: Use continuity ($v_C$ or $i_L$ from the old circuit). For other quantities, calculate from the initial $v_C$ or $i_L$.

2. **Find the steady-state value** $x(\infty)$: Replace C → open, L → short, solve the resistive circuit.

3. **Find $\tau$**: $R_{TH} \cdot C$ or $L / R_{TH}$, where $R_{TH}$ is the Thevenin resistance seen by C or L.

The substitution theorem guarantees that *every* voltage and current in the circuit follows the same exponential form with the same $\tau$ — only $x(t_0)$ and $x(\infty)$ change from one quantity to another.

[[visual:substitution-theorem-all-branches]]

## Property 6: Stability (τ > 0 vs. τ < 0)

The sign of $\tau$ determines whether the circuit is **stable** or **unstable**:

| $\tau$ | Behavior | Circuit type |
|--------|----------|-------------|
| $\tau > 0$ | Exponential decay toward $x(\infty)$ | **Stable** — self-correcting |
| $\tau < 0$ | Exponential growth away from $x(\infty)$ | **Unstable** — runs away |

[[visual:stable-vs-unstable]]

**Stable case** ($\tau > 0$): The tangent at $t_0$ passes through $x(\infty)$ at $t_0 + \tau$ (ahead in time). The circuit naturally settles to equilibrium.

**Unstable case** ($\tau < 0$): The tangent at $t_0$ passes through $x(\infty)$ at $t_0 - |\tau|$ (behind in time). The distance from equilibrium grows exponentially — the circuit "runs away."

[[visual:falstad-stable-opamp]]

The lecture presents op-amp circuits that can be stable or unstable depending on feedback topology:
- **Negative feedback** → stable ($\tau > 0$)
- **Positive feedback** → unstable ($\tau < 0$)

<details>
<summary><strong>Pause & Think</strong>: Can you have a stable circuit with negative τ? Or an unstable circuit with positive τ?</summary>

No! The sign of $\tau$ directly determines stability:
- $\tau > 0$ → $e^{-t/\tau}$ decays → stable
- $\tau < 0$ → $e^{-t/\tau} = e^{|t|/|\tau|}$ grows → unstable

There's no other option. If your calculation gives $\tau < 0$, the circuit is unstable and will eventually saturate against the power supply rails or destroy a component.

</details>

## Piecewise-Constant Signals

When the driving signal changes value at discrete times (like a digital pulse or a staircase), you solve the circuit **segment by segment**:

[[visual:piecewise-constant-response]]

For each segment:
1. $x(t_0)$ = final value from the previous segment
2. $x(\infty)$ = new steady-state (from new source value)
3. $\tau$ = same (circuit structure doesn't change)

This applies the general formula repeatedly, using each segment's endpoint as the next segment's initial condition. This handles **any** piecewise-constant driving signal.

## Summary

Your exponential waveform toolkit:

- **Tangent rule**: Tangent at $t_0$ reaches $x(\infty)$ at $t_0 + \tau$ — graphical $\tau$ finder
- **63% rule**: 63.2% complete after 1τ, 95% after 3τ, 99.3% after 5τ
- **Elapsed time**: $t_k - t_j = \tau \ln\frac{x(t_j) - x(\infty)}{x(t_k) - x(\infty)}$
- **Rise time**: $t_r = 2.2\tau$ (10% to 90%)
- **Inspection method**: Three numbers $x(t_0)$, $x(\infty)$, $\tau$ determine everything
- **Stability**: $\tau > 0$ → stable (decay), $\tau < 0$ → unstable (growth)
- **Piecewise signals**: Solve segment by segment, chaining initial conditions

> **These properties turn the exponential formula into a practical design tool.** Instead of plugging numbers into equations, you can sketch waveforms, estimate timing, and verify solutions — skills that save hours in lab and exam settings.
