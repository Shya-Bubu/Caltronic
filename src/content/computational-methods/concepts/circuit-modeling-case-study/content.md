# Case Study: Diode Circuit Modeling

> **Why This Matters**: The half-wave rectifier is one of the simplest circuits in all of electronics — but it perfectly illustrates how *different models of the same device* lead to different analyses, different computational methods, and different levels of accuracy. Understanding these trade-offs is the essence of computational thinking in EEE.

## The Circuit Under Study

Let's set up the problem. You have a voltage source $V_S$ with an internal resistance $r$, connected in series with a diode and a load resistor $R$. Your goal is to find the operating point — the current $I$ flowing through the circuit and the voltage $V_D$ across the diode.

[[visual:rectifier-circuit-schematic]]

This is a half-wave rectifier, one of the most fundamental power electronics circuits. During the positive half of the AC cycle, the diode conducts and current flows through $R$. During the negative half, the diode blocks and no current flows. But what's the *exact* current during conduction? That depends on how you model the diode.

The **circuit constraint** comes from Kirchhoff's Voltage Law (KVL):

$$V_S = Ir + V_D + IR$$

Rearranging this into the standard load line form:

$$\boxed{I = \frac{-1}{r+R} V_D + \frac{V_S}{r+R}}$$

[[visual:load-line-basic]]

This is a straight line on the $V_D$-$I$ plane. Now here's the key idea: the operating point is where this load line **intersects** the diode's I-V characteristic. Different diode models give different I-V curves, hence different operating points.

> **Key Insight**: The load line equation is purely a circuit constraint — it contains no information about the diode. The diode model provides the second equation. Together, they determine the operating point.

## Model 1: Ideal Diode (The Perfect Switch)

The simplest possible diode model treats it as a perfect switch:

$$I = \begin{cases} \text{any positive value} & \text{if } V_D = 0 \\ 0 & \text{if } V_D < 0 \end{cases}$$

In words: when forward-biased, the diode is a short circuit ($V_D = 0$). When reverse-biased, it's an open circuit ($I = 0$). No in-between, no gradual transition.

[[visual:ideal-diode-iv]]

**Finding the operating point**: The load line intersects the ideal diode's I-V curve at $V_D = 0$:

$$\boxed{I = \frac{V_S}{r+R}, \quad V_D = 0}$$

This requires zero computation — you can read the answer by inspection. The current is the full short-circuit current.

**When to use this model**: You only need to know "does the diode conduct or not?" — digital logic level detection, protection diodes, simple switching circuits.

**What this model misses**: The real diode drops about 0.7V in forward bias. For a 5V circuit, ignoring this means you overestimate the current by $(5 - 4.3)/4.3 \approx 16\%$. That's fine for some applications, unacceptable for others.

## Model 2: Constant Voltage Drop ($V_\gamma$)

Now let's add one parameter — the forward voltage drop $V_\gamma \approx 0.7$ V for silicon:

$$I = \begin{cases} \text{any positive value} & \text{if } V_D = V_\gamma \\ 0 & \text{if } V_D < V_\gamma \end{cases}$$

The I-V curve is now a vertical line at $V_D = V_\gamma$ instead of at $V_D = 0$.

[[visual:constant-drop-model]]

**Finding the operating point**: The load line intersects the vertical line $V_D = V_\gamma$:

$$\boxed{I = \frac{V_S - V_\gamma}{r+R}, \quad V_D = V_\gamma}$$

Still simple algebra — you substitute $V_\gamma = 0.7$ V directly. With $V_S = 5$ V and $r + R = 1\,k\Omega$: $I = (5 - 0.7)/1000 = 4.3$ mA.

**When to use**: Power supply design, rectifier output estimation, any circuit where 5-10% accuracy is sufficient.

**What this model misses**: The real diode has a curved I-V characteristic in forward bias — the voltage across it actually *increases slightly* as current increases. This model treats $V_D$ as exactly $V_\gamma$ regardless of current.

<details>
<summary><strong>Pause & Think</strong>: For a circuit with V_S = 12V and r + R = 2kΩ, calculate the operating point with both the ideal and constant-drop models. What's the percentage difference in current?</summary>

**Ideal model**: $I = 12/2000 = 6.0$ mA, $V_D = 0$
**Constant-drop model**: $I = (12 - 0.7)/2000 = 5.65$ mA, $V_D = 0.7$ V

Percentage difference: $(6.0 - 5.65)/5.65 \times 100 = 6.2\%$

Notice that at higher source voltages, the 0.7V drop becomes proportionally less significant. At $V_S = 100$ V, the difference would be only 0.7%. This is why the ideal model is often "good enough" for high-voltage circuits but not for low-voltage ones.

</details>

## Model 3: Piecewise Linear (with Forward Resistance $\rho$)

The next level of sophistication adds a **forward resistance** $\rho$ to capture the slope of the I-V curve:

$$I = \frac{V_D - V_\gamma}{\rho} \quad \text{for } V_D > V_\gamma$$

[[visual:piecewise-linear-model]]

The diode looks like a $V_\gamma$ voltage source in series with a resistance $\rho$. The operating point now requires solving two simultaneous **linear** equations — the load line and the piecewise-linear diode model.

Substituting the diode equation into the load line:

$$\frac{V_D - V_\gamma}{\rho} = \frac{-1}{r+R}V_D + \frac{V_S}{r+R}$$

Solving for $V_D$ and then $I$:

$$\boxed{I = \frac{V_S - V_\gamma}{r + R + \rho}, \quad V_D = V_\gamma + I\rho}$$

The total resistance in the circuit is now $r + R + \rho$ — the diode's forward resistance adds to the circuit resistance.

**When to use**: When the diode's dynamic resistance significantly affects circuit performance, such as in precision rectifiers or when $\rho$ is comparable to $R$.

[[visual:piecewise-linear-interactive]]

> **Pro Tip**: The piecewise-linear model is the most common diode model in hand analysis. It captures the essential behavior (threshold + resistance) while keeping the math strictly linear — no iterative methods needed.

## Model 4: The Shockley Equation (Exponential)

Now we reach the physics-based model that captures the full exponential nature of the PN junction:

$$\boxed{I = I_S\left(e^{qV_D/kT} - 1\right) = I_S\left(e^{V_D/V_T} - 1\right)}$$

where:
- $I_S \approx 10^{-12}$ A (reverse saturation current)
- $q \approx 1.602 \times 10^{-19}$ C (electron charge)
- $k \approx 1.38 \times 10^{-23}$ J/K (Boltzmann constant)
- $T$ = temperature in Kelvin
- $V_T = kT/q \approx 26$ mV at room temperature (300 K)

[[visual:shockley-vs-loadline]]

Now the operating point requires solving a **transcendental equation** — the intersection of a straight line (load line) and an exponential (Shockley equation). There is **no closed-form solution**. You must use numerical methods:

- **Graphical method**: Plot both curves and read the intersection point
- **Newton-Raphson iteration**: Define $f(V_D) = I_S(e^{V_D/V_T} - 1) + V_D/(r+R) - V_S/(r+R) = 0$ and iterate $V_{D,k+1} = V_{D,k} - f(V_{D,k})/f'(V_{D,k})$

[[visual:newton-raphson-convergence]]

This is where the lesson connects directly to computational methods: the Shockley equation **demands** numerical iteration. You cannot avoid it. This is exactly why you need to study convergence, error analysis, and iterative algorithms.

<details>
<summary><strong>Pause & Think</strong>: The PDF states that the Shockley equation "is not used unless explicitly necessary." Why?</summary>

Because for most circuit analysis tasks (determining approximate current, checking if a diode conducts), the simpler models give answers that are close enough. The Shockley equation is only needed when:
1. **The exponential behavior itself matters** — designing log amplifiers where $V_{out} \propto \ln(I_{in})$
2. **Temperature dependence is critical** — the $kT$ in the denominator makes the equation temperature-sensitive
3. **High precision is required** — when 1% accuracy matters and the piecewise-linear model's 2-5% error is insufficient

For 90% of circuit analysis in this course, the constant-drop or piecewise-linear models are perfectly adequate.

</details>

## Comparing All Four Models

Let's put everything together and see the four operating points side by side:

[[visual:four-models-comparison]]

| Model | Equation for $V_D$ | Solution method | Typical error | Parameters |
|-------|----------|----------------|----------|------------|
| Ideal | $V_D = 0$ when on | Inspection | ~15-20% | 0 |
| Constant drop | $V_D = V_\gamma$ | Algebra | ~5-10% | 1 ($V_\gamma$) |
| Piecewise linear | $V_D = V_\gamma + I\rho$ | Linear algebra | ~2-5% | 2 ($V_\gamma$, $\rho$) |
| Shockley | $I = I_S(e^{V/V_T}-1)$ | Newton-Raphson | <1% | 2-3 ($I_S$, $T$, $n$) |

[[visual:accuracy-vs-complexity]]

Notice the pattern: each step up in model complexity requires a different computational strategy — from inspection (trivial) to algebra (easy) to linear algebra (moderate) to iterative numerical methods (sophisticated). This is **the central lesson**: model fidelity and computational complexity are tightly coupled.

<details>
<summary><strong>Pause & Think</strong>: A colleague tells you they'll "always use the Shockley equation to be safe." What's wrong with this approach?</summary>

Several things:
1. **Wasted computation**: For a quick check of "does this circuit work?", the ideal model takes 1 second; Newton-Raphson on the Shockley equation takes 10 minutes to set up.
2. **Parameter uncertainty**: $I_S$ varies by orders of magnitude between diodes, even of the same type. If your input parameter has 50% uncertainty, a high-accuracy computation gives a false sense of precision.
3. **Debugging difficulty**: When a complex model gives a wrong answer, it's much harder to find the error than in a simple model.
4. **The golden rule**: Always use the **simplest model that answers your question** with acceptable accuracy. Over-modeling is as much an engineering mistake as under-modeling.

</details>

## Summary

Let's consolidate the key insights from this case study:

- The **same physical device** (a diode) can be modeled at 4 levels of complexity, each with different trade-offs
- **Ideal diode**: perfect switch, zero computation, ~15% error — good for "is it on or off?" questions
- **Constant drop** ($V_\gamma = 0.7$ V): one-line algebra, ~5% error — the default for most hand analysis
- **Piecewise linear** ($V_\gamma + I\rho$): two-equation linear system, ~2% error — when forward resistance matters
- **Shockley equation** ($I_S e^{V/V_T}$): iterative numerical methods required, <1% error — only when exponential behavior or temperature effects matter
- Higher-fidelity models **demand** more sophisticated solution methods — the math gets harder because the physics is richer
- The "best" model depends on **what accuracy you need** and **what computation you can afford**

> **You're developing a crucial skill** — matching model complexity to the engineering question. This judgment is what makes someone an effective engineer, not the ability to always use the most complex tool available.
