# Mathematical Modeling: From Reality to Equations

> **Why This Matters**: Every computational method starts with a model. Before you can run any algorithm, you must translate the real world — circuits, signals, fields, neurons — into mathematical equations. The quality of your model determines the quality of your results. A perfect algorithm applied to a wrong model gives wrong answers. This is the foundation everything else builds on.

## The Art of Mathematical Modeling

Let's start with a question that might surprise you: **what is a mathematical model?**

It's tempting to say "equations," but that's only part of the story. A mathematical model is really a *translation* — you take something from the physical world (a circuit, a neuron, a bridge under load) and express it in the language of mathematics. But here's the crucial part: this translation always involves **choices**. What do you include? What do you leave out? How detailed should the equations be?

[[visual:modeling-pipeline]]

These choices form what we call the **modeling pipeline**:

$$\text{Physical System} \xrightarrow{\text{assumptions}} \text{Mathematical Model} \xrightarrow{\text{algorithm}} \text{Computational Solution} \xrightarrow{\text{validation}} \text{Prediction}$$

Each arrow in this pipeline involves decisions. But the first arrow — from reality to model — is the most consequential. If you model a pendulum without air resistance, no amount of computational precision will predict the damping you observe in the lab.

> **Key Insight**: The modeling step is where engineering judgment matters most. Algorithms can be automated; choosing the right model cannot.

[[visual:modeling-pipeline-flowchart]]

Think of it this way: imagine you're designing a GPS navigation system. Do you model the Earth as a flat plane, a sphere, or an oblate spheroid? For a city-block-level navigation, a flat plane works fine. For intercontinental flights, you need the sphere. For precision surveying, you need the full oblate spheroid with gravitational corrections. Same physical reality — three different models, each appropriate for its purpose.

## Model Complexity: A Spectrum

Models live on a spectrum from simple to elaborate. This isn't a binary choice — it's a continuum, and the engineer's skill lies in choosing the right point on this spectrum.

[[visual:model-complexity-spectrum]]

| Characteristic | Simple Model | Elaborate Model |
|---------------|-------------|-----------------|
| Parameters | Few (1-3) | Many (10-50+) |
| Physics captured | Dominant phenomena only | Multiple scales, detailed mechanisms |
| Computational speed | Fast (milliseconds) | Slow (hours to days) |
| Accuracy | Approximate (10-20% error) | High fidelity (<1% error) |
| Use case | Quick insights, design exploration | Final verification, predictive simulation |
| Failure modes | Misses important effects | May overfit, hard to debug |

> **Key Insight**: The "best" model is not always the most detailed one. It's the one that answers your specific question with acceptable accuracy at affordable computational cost.

[[visual:simple-vs-elaborate]]

<details>
<summary><strong>Pause & Think</strong>: You're designing a power supply for a laptop charger. You need to predict the output ripple voltage within 10%. Would you model the diodes as ideal switches (Model 1) or use the Shockley equation (Model 4)?</summary>

The **constant-drop model** (Model 2, $V_\gamma \approx 0.7$ V) would be your best choice. The ideal switch overestimates current (ignoring the 0.7V drop), and the Shockley equation is unnecessarily complex for 10% accuracy. The constant-drop model captures the main voltage loss with a simple algebraic formula — exactly the right balance for this design question.

</details>

## The Role of Assumptions

Every model rests on assumptions — they are what make the problem tractable. Without assumptions, you'd be solving the full quantum-mechanical Schrödinger equation for every electron in your circuit. That's technically correct but computationally absurd.

The lecture notes list several **elementary assumptions** for a simple half-wave rectifier circuit. Let's examine each one:

[[visual:assumptions-impact]]

**Assumption 1: Wires have zero parasitic capacitance, inductance, and resistance.**
This is valid at low frequencies where wire lengths are much smaller than the wavelength. At 50 Hz, one wavelength is 6,000 km — so a 10 cm wire is fine. But at 1 GHz (cell phone frequencies), one wavelength is 30 cm, and a 10 cm wire has significant inductive reactance (~60 nH → $j \times 2\pi \times 10^9 \times 60 \times 10^{-9} \approx j377\,\Omega$). PCB traces become transmission lines above ~100 MHz.

**Assumption 2: Operating frequency is "low."**
Diodes have capacitance and finite switching speed. Below ~1 MHz, these are negligible. Above ~10 MHz, reverse recovery time creates current spikes that dissipate power and distort waveforms. The datasheet parameter $t_{rr}$ (reverse recovery time) tells you when this assumption fails.

**Assumption 3: No external electromagnetic interference (EMI).**
Valid in shielded lab environments. Fails near power transformers (50 Hz interference), wireless transmitters (RF pickup), or switch-mode power supplies (switching transient coupling). In the real world, EMI is always present — but often small enough to ignore.

**Assumption 4: Voltages and currents stay in a "reasonable" range.**
This avoids breakdown (too much voltage), thermal destruction (too much current), or nonlinear substrate effects. Component datasheets define the "absolute maximum ratings" — exceed these and the model (and the component) fails.

**Assumption 5: Resistance is fixed (not temperature-dependent).**
A standard ¼-watt resistor has a temperature coefficient of ±100 ppm/°C. At 50°C above ambient, its value changes by ±0.5%. Usually negligible — but in precision measurement circuits, even 0.1% drift matters.

[[visual:assumption-failure-scenarios]]

> **Watch Out**: Every assumption is a potential failure mode. When your circuit behaves unexpectedly, the first thing to check is which assumption has been violated. Experienced engineers develop an instinct for "which assumptions are we stretching here?"

<details>
<summary><strong>Pause & Think</strong>: You're building a circuit that will operate near a 900 MHz cell tower. Which of the five assumptions might fail?</summary>

**Assumptions 2 and 3** are most likely to fail. At 900 MHz:
- **Assumption 2 (low frequency)**: Diode parasitic capacitance creates significant reactance. Wire inductance matters. The circuit layout becomes critical.
- **Assumption 3 (no EMI)**: The cell tower radiates electromagnetic fields that can couple into your circuit through wires acting as antennas.

You might also need to reconsider Assumption 1 (parasitic capacitance/inductance become significant at these frequencies).

</details>

## From Assumptions to Equations

Once assumptions are stated explicitly, the model takes mathematical form. For the rectifier circuit, KVL gives us:

$$V_S = Ir + V_D + IR$$

Rearranging for $I$ as a function of $V_D$:

$$V_S - V_D = I(r + R)$$

$$\boxed{I = \frac{-1}{r+R} V_D + \frac{V_S}{r+R}}$$

[[visual:load-line-geometry]]

This is the **load line equation** — a straight line in the $V_D$-$I$ plane with:
- **Slope**: $m = -1/(r+R)$ (negative, steeper for smaller total resistance)
- **$V_D$-intercept** (when $I = 0$): $V_D = V_S$ (the open-circuit voltage — no current flows, so the diode sees the full source voltage)
- **$I$-intercept** (when $V_D = 0$): $I = V_S/(r+R)$ (the short-circuit current — the diode is replaced by a short circuit)

The **operating point** is where this load line intersects the diode's I-V characteristic. Different diode models give different I-V curves, hence different operating points — this is exactly what the next concept explores in detail.

[[visual:load-line-interactive]]

Notice something profound: the load line equation contains **no information about the diode**. It's purely a circuit constraint — it tells you "given KVL, any valid ($V_D$, $I$) pair must lie on this line." The diode model provides the second constraint. The operating point satisfies both simultaneously.

## Model Validation: Can You Trust Your Model?

> **Golden Rule**: A model that hasn't been validated is just a hypothesis.

[[visual:validation-cycle]]

Validation means comparing model predictions against one (or more) of:
1. **Measurements** from the real system (the gold standard)
2. **Higher-fidelity models** (when measurements aren't available — e.g., comparing your hand calculation against SPICE simulation)
3. **Known analytical solutions** (for test cases where exact answers exist)

If the model fails validation, you don't need a better algorithm — you need a **better model**. This is the iterative refinement cycle:

$$\text{Model} \xrightarrow{\text{compute}} \text{Prediction} \xrightarrow{\text{compare}} \text{Reality} \xrightarrow{\text{mismatch?}} \text{Refine assumptions} \xrightarrow{\text{redo}} \text{Better model}$$

[[visual:validation-feedback-loop]]

<details>
<summary><strong>Pause & Think</strong>: You model a diode circuit using the ideal diode model (V_D = 0 when on) and predict I = 5 mA. You measure 4.3 mA in the lab. What went wrong, and how do you fix the model?</summary>

The ideal diode ignores the ~0.7V forward voltage drop. If $V_S = 5V$ and $r + R = 1\,k\Omega$:
- Ideal model: $I = 5/1000 = 5$ mA
- Constant-drop model: $I = (5 - 0.7)/1000 = 4.3$ mA ← matches the measurement!

The fix is to switch to the **constant-drop model** ($V_\gamma = 0.7$ V). The ideal model captured the correct order of magnitude but was off by 14% — too much for this application. The constant-drop model eliminates the dominant source of error with minimal additional complexity.

</details>

## Summary

Let's consolidate what you've learned — these are the principles that will guide every computational method in the rest of this course:

- **Mathematical modeling** translates physical reality into equations through deliberate assumptions
- Models range from **simple** (few parameters, fast, approximate) to **elaborate** (many parameters, slow, high-fidelity)
- The "best" model depends on the question you're asking: quick design exploration needs simple models; final verification needs elaborate ones
- **Every assumption is a potential failure mode** — always state assumptions explicitly and know when they break
- The **load line equation** $I = \frac{-1}{r+R}V_D + \frac{V_S}{r+R}$ shows how circuit constraints become linear algebra — pure KVL, independent of the device model
- **Validation** (comparing predictions to reality) is essential — an unvalidated model is a hypothesis, not engineering

> **You're building something important here** — the ability to look at a physical system and decide what matters and what doesn't. This judgment call is what separates a working engineer from someone who can only follow textbook procedures.
