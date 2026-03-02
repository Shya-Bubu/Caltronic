# Statistical and Stochastic Methods

> **Why This Matters**: Not everything in engineering is deterministic. Manufacturing tolerances, noise, and uncertain parameters mean that real-world systems have inherent randomness. This concept covers five principles for handling uncertainty: random sampling, simulation, search and enumeration, metaheuristics, and uncertainty quantification. These tools let you answer questions like "What is the *probability* that my circuit meets spec?" instead of just "Does my nominal design meet spec?"

## Random Sampling — Harnessing Randomness

**Random sampling** uses randomness to obtain a representative subset from a larger population or distribution. The most powerful application in ECE is **Monte Carlo analysis**.

[[visual:monte-carlo-resistor-sampling]]

Imagine you've designed a filter with a nominal cutoff frequency of 1 kHz. But the resistors have ±5% tolerance and the capacitors have ±10% tolerance. Will the manufactured circuit still meet your spec of 900–1100 Hz?

Monte Carlo analysis answers this:

1. **Randomly sample** resistor values from their tolerance distributions (e.g., $R \sim N(1000, 50^2)$ meaning Gaussian with mean 1 kΩ and standard deviation 50 Ω)
2. **Simulate** the circuit for each random sample
3. **Estimate yield** as the fraction of samples that meet specifications

$$\boxed{\text{Yield} = \frac{\text{Number of samples meeting spec}}{\text{Total samples}} \times 100\%}$$

[[visual:monte-carlo-yield-histogram]]

The remarkable fact: with just 1000–10000 random samples, you can estimate yield with about 1% accuracy. This is far more practical than testing every possible combination of component values (which would be astronomically many).

> **Key Insight**: Monte Carlo works because of the Law of Large Numbers — the sample average converges to the true average as the number of samples grows. The more samples, the more accurate your estimate.

## Simulation — Computational Experiments

**Simulation** is the computational imitation of a real-world process over time. You build a model, run it forward step by step, and observe what happens.

[[visual:spice-transient-simulation]]

The most familiar example in ECE is **SPICE transient analysis** of a CMOS inverter:

1. **Model** the transistors with nonlinear I-V characteristics (e.g., BSIM models)
2. **Discretize** time using a variable-step integration method
3. **Solve** the resulting nonlinear algebraic equations at each time step (using Newton-Raphson)
4. **Plot** output voltage vs. time for a given input pulse

This process predicts timing, power consumption, and signal integrity *before fabrication* — saving enormous cost and time compared to building and testing physical prototypes.

[[visual:simulation-workflow]]

Simulation combines multiple principles you've already learned:
- **Discretization** — continuous time is broken into steps
- **Approximation** — transistor models approximate real physics
- **Iterative algorithms** — Newton-Raphson solves nonlinear equations at each step
- **Adaptive methods** — variable step size adjusts to signal dynamics

<details>
<summary><strong>Pause & Think</strong>: Why does SPICE use variable time steps instead of fixed steps?</summary>

Signal dynamics vary over time. During a fast transition (like a digital edge), the circuit changes rapidly and needs small time steps for accuracy. During steady state (e.g., between clock edges), nothing is changing and large time steps save computation. Adaptive step sizing automatically balances accuracy and speed — using fine resolution only where needed.

</details>

## Search and Enumeration — Exploring Possibilities

**Search and enumeration** is the systematic exploration of a space of possibilities, checking each one against your criteria.

[[visual:fir-filter-search]]

For small problems, **exhaustive search** is practical. Consider designing an FIR filter with quantized coefficients. If you have $N$ taps with $B$ bits each, there are $2^{NB}$ possible coefficient combinations. For a small filter ($N = 4$, $B = 3$), that's only $2^{12} = 4096$ combinations — easily testable:

$$\min_{h[0], h[1], \ldots, h[N]} \int_{-\pi}^{\pi} |H_{desired}(e^{j\omega}) - H(e^{j\omega})|^2 d\omega$$

But search doesn't scale. For $N = 32$, $B = 8$, you'd need $2^{256}$ evaluations — more than the number of atoms in the universe. That's where smarter strategies (greedy algorithms, metaheuristics) come in.

[[visual:search-space-scaling]]

> **Watch Out**: Exhaustive search guarantees finding the optimal solution *if* the search completes. The problem is that search spaces grow exponentially with problem size. Always check whether brute-force is feasible before committing to it.

## Metaheuristics — Intelligent Search

When the search space is too large for exhaustive enumeration and the problem is too complex for gradient-based optimization, **metaheuristics** provide a middle ground: high-level, problem-independent strategies that find **near-optimal** solutions.

[[visual:genetic-algorithm-evolution]]

The most popular metaheuristic in ECE is the **Genetic Algorithm (GA)**:

1. **Encode** design parameters as a "chromosome" (e.g., antenna geometry)
2. **Create** an initial population of random designs
3. **Evaluate** each design's fitness (e.g., gain, bandwidth, size)
4. **Select** the best-performing designs as parents
5. **Apply** crossover (recombine parent genes) and mutation (random changes)
6. **Repeat** for many generations

$$\boxed{\text{GA: Inspired by natural evolution — survival of the fittest designs}}$$

Genetic algorithms can discover novel, high-performance designs that human engineers wouldn't think of — especially for complex, multi-objective problems where the design space is vast and non-convex.

[[visual:metaheuristic-landscape-search]]

Other metaheuristics include:
- **Simulated annealing**: mimics the cooling of metals — accepts worse solutions early (exploration), becomes pickier later (exploitation)
- **Particle swarm optimization**: mimics flocking behavior — a swarm of solutions moves through the design space
- **Ant colony optimization**: mimics how ants find shortest paths using pheromone trails

## Uncertainty Quantification (UQ) — How Confident Are You?

**Uncertainty quantification** goes beyond Monte Carlo yield estimation. It rigorously characterizes how uncertainties in inputs propagate to uncertainties in outputs.

[[visual:uq-filter-cutoff]]

Given manufacturing variations in component values:

$$R \sim N(1000, 50^2) \text{ Ω}, \quad C \sim N(1 \text{ nF}, 0.1^2 \text{ nF}^2)$$

What is the **probability distribution** of the cutoff frequency?

$$f_c = \frac{1}{2\pi RC}$$

UQ methods compute not just the nominal $f_c$, but its entire distribution $p(f_c)$ — telling you the probability that $f_c$ falls within any range.

[[visual:uq-output-distribution]]

Two main approaches:
- **Monte Carlo**: sample R and C randomly, compute $f_c$ for each sample, build histogram. Simple but potentially slow (needs many samples).
- **Polynomial chaos expansion**: express $f_c$ as a polynomial in the random variables. Faster for low-dimensional problems but more complex to implement.

<details>
<summary><strong>Pause & Think</strong>: Why isn't it enough to just compute fc at the nominal values of R and C?</summary>

Because $f_c = 1/(2\pi RC)$ is a nonlinear function of R and C. Even if R and C are symmetrically distributed around their means, the distribution of $f_c$ will be asymmetric (skewed). The nominal $f_c$ might not even be the most probable value. UQ reveals the full picture — not just the center, but the spread and shape of the distribution.

</details>

## Summary

- **Random sampling** (Monte Carlo) uses randomness to estimate statistical quantities like yield (1000–10000 samples → ~1% accuracy)
- **Simulation** imitates real-world processes step by step (SPICE: model → discretize → solve → plot)
- **Search and enumeration** systematically explores possibilities (exhaustive for small spaces, impractical for large ones)
- **Metaheuristics** provide intelligent search strategies for complex, non-convex problems (genetic algorithms, simulated annealing)
- **Uncertainty quantification** characterizes how input uncertainties propagate to output distributions ($R, C$ tolerances → $p(f_c)$)
