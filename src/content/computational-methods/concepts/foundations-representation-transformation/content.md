# Foundations: Representation and Transformation

> **Why This Matters**: Before you can solve any computational problem, you first need to *represent* it in a form your tools can handle. The five principles in this concept — approximation, discretization, transformation, linearization, and dimension reduction — are the ways engineers convert messy real-world problems into clean mathematical ones. Master these, and you'll know how to make any problem tractable.

## Approximation — Trading Perfection for Tractability

The first and most pervasive principle in computational methods is **approximation**: replacing something complex and exact with something simpler and "close enough."

[[visual:approx-diode-linearization]]

Think about the diode equation you met in analog electronics:

$$I = I_S\left(e^{V/V_T} - 1\right)$$

This exponential relationship is exact, but try solving a circuit with it analytically — you'll hit a transcendental equation with no closed-form solution. The engineer's instinct? **Approximate.**

Around a bias point $V_0$, you can expand the exponential as a Taylor series and keep only the first-order term:

$$\boxed{I \approx I_0 + g_d(V - V_0)}$$

where $g_d = \frac{dI}{dV}\Big|_{V_0}$ is the small-signal conductance. You've traded the exact exponential for a straight line — and now you can use all of linear circuit theory.

[[visual:taylor-approximation-comparison]]

> **Key Insight**: Every approximation is a trade-off. You gain tractability (easier to solve) but lose accuracy (the answer isn't exact). The art of engineering is knowing when the approximation is "good enough" for your application.

<details>
<summary><strong>Pause & Think</strong>: When would a first-order Taylor approximation of the diode equation be unacceptable?</summary>

When the signal swing around the bias point is large — say, more than $\pm 50$ mV. The exponential curve bends significantly over that range, so a straight-line approximation misses important nonlinear behavior (like distortion in an amplifier). For large signals, you'd need higher-order terms or a different approach entirely.

</details>

## Discretization — From Continuous to Countable

Computers work with discrete numbers, not continuous functions. **Discretization** is the principle of converting continuous-domain problems into discrete-point problems that a computer can process.

[[visual:sampling-continuous-to-discrete]]

The most familiar example is **sampling**. An audio signal $x(t)$ is a continuous function of time. To store it digitally, you sample it at regular intervals $T_s$ to obtain a sequence:

$$\boxed{x[n] = x(nT_s), \quad n = 0, 1, 2, \ldots}$$

The Nyquist-Shannon sampling theorem tells you the minimum sampling rate:

$$f_s = \frac{1}{T_s} \geq 2 f_{max}$$

where $f_{max}$ is the highest frequency component in $x(t)$. Sample too slowly, and you get **aliasing** — the discrete signal misrepresents the original.

[[visual:nyquist-aliasing-demo]]

But discretization goes far beyond audio sampling. It appears whenever you:
- Replace a differential equation with difference equations (finite differences)
- Divide a continuous region into a mesh (finite elements)
- Convert integrals into sums (numerical quadrature)

> **Watch Out**: Discretization always introduces error. Finer discretization (smaller $T_s$, more mesh points) gives better accuracy but costs more computation. Finding the sweet spot is a recurring theme in computational methods.

## Transformation — Changing the Battlefield

Sometimes a problem is hard in one domain but easy in another. **Transformation** is the principle of mapping a problem into a different representation where the math becomes simpler.

[[visual:time-to-frequency-transform]]

The classic example is the RLC circuit differential equation. In the time domain, you have:

$$L\frac{di}{dt} + Ri + \frac{1}{C}\int i\, dt = v(t)$$

This involves derivatives AND integrals of the unknown $i(t)$ — messy to solve. But apply the **Laplace transform**, and every derivative becomes multiplication by $s$, every integral becomes division by $s$:

$$\boxed{(sL + R + \frac{1}{sC})I(s) = V(s)}$$

Now it's an **algebraic equation** — you can solve for $I(s)$ by simple division.

[[visual:laplace-transform-simplification]]

Other important transformations include:
- **Fourier transform**: time domain → frequency domain (see signals and systems)
- **Z-transform**: for discrete-time systems
- **Logarithmic scaling**: turns multiplication into addition, exponentials into lines
- **Change of variables**: in integration and optimization

<details>
<summary><strong>Pause & Think</strong>: Why does transforming to the Laplace domain convert differentiation into multiplication?</summary>

By definition, the Laplace transform of a derivative is:

$$\mathcal{L}\left\{\frac{df}{dt}\right\} = sF(s) - f(0^-)$$

The "multiplication by $s$" replaces the differentiation operation. This works because the Laplace basis functions $e^{st}$ are eigenfunctions of the derivative operator — differentiating $e^{st}$ just multiplies it by $s$. So in the Laplace domain, the structure of the differential equation is preserved but the operations become algebraic.

</details>

## Linearization — Taming the Nonlinear

Most physical systems are nonlinear. **Linearization** is the principle of approximating a nonlinear system with a linear one near an operating point — making it accessible to the powerful tools of linear algebra and linear systems theory.

[[visual:linearization-around-operating-point]]

For a general nonlinear system described by:

$$\dot{x} = f(x, u)$$

you find an equilibrium point $(x_0, u_0)$ where $f(x_0, u_0) = 0$, then compute the **Jacobian matrices**:

$$\boxed{A = \frac{\partial f}{\partial x}\bigg|_{(x_0, u_0)}, \quad B = \frac{\partial f}{\partial u}\bigg|_{(x_0, u_0)}}$$

The linearized model becomes:

$$\dot{\tilde{x}} = A\tilde{x} + B\tilde{u}$$

where $\tilde{x} = x - x_0$ and $\tilde{u} = u - u_0$ are small deviations from equilibrium.

[[visual:nonlinear-vs-linear-comparison]]

> **Key Insight**: Linearization is only valid for **small perturbations** around the operating point. Venture too far from equilibrium, and the linear model diverges from reality. This is both its power (simple) and its limitation (local).

You've actually already used linearization: the small-signal analysis of BJTs and MOSFETs is exactly this principle applied to transistor circuits. The hybrid-π model is a linearized version of the nonlinear transistor equations.

## Dimension Reduction — Less Is More

High-dimensional problems are expensive to solve and hard to visualize. **Dimension reduction** is the principle of representing data or systems in fewer dimensions while preserving the essential structure.

[[visual:pca-dimension-reduction]]

The most common technique is **Principal Component Analysis (PCA)**. Given a dataset of $N$ images, each with $P$ pixels (where $P$ might be millions), PCA finds the orthogonal directions of maximum variance — the "principal components."

Instead of storing each image as $P$ numbers, you can represent it with only $K \ll P$ coefficients along the principal directions:

$$\boxed{x \approx \bar{x} + \sum_{k=1}^{K} a_k \mathbf{v}_k}$$

where $\mathbf{v}_k$ are the principal component vectors and $a_k$ are the coefficients. For face recognition, just $K = 50$ components can capture 95% of the variation in a database of thousands of face images.

[[visual:dimension-reduction-info-preserved]]

Other dimension reduction techniques include:
- **Singular Value Decomposition (SVD)**: the mathematical workhorse behind PCA
- **Model order reduction**: simplifying state-space models with hundreds of states to a few
- **Feature selection**: choosing the most informative measurements

<details>
<summary><strong>Pause & Think</strong>: What information is lost when you reduce dimensions? Is this always acceptable?</summary>

You lose the variation along the discarded dimensions — typically the "noise" or least important variation. For many applications (compression, classification, visualization), this is not only acceptable but beneficial — removing noise actually *improves* performance. However, if a critical feature happens to lie along a low-variance direction, you might throw away important information. The choice of $K$ requires domain knowledge.

</details>

## The Common Thread

[[visual:five-foundations-overview]]

All five foundations share a common purpose: they **convert intractable problems into tractable ones**. They are pre-processing steps — ways to reshape a problem before you even begin to solve it.

| Principle | What it does | What you trade away |
|-----------|-------------|-------------------|
| **Approximation** | Replaces complex with simpler | Exactness |
| **Discretization** | Converts continuous to discrete | Continuous resolution |
| **Transformation** | Maps to an easier domain | Original domain intuition |
| **Linearization** | Replaces nonlinear with linear | Validity range (local only) |
| **Dimension Reduction** | Keeps only essential dimensions | Minor variation |

The art of computational methods is knowing **which combination** of these tools to apply, and **how much accuracy** to sacrifice for tractability.

## Summary

- **Approximation** replaces complex quantities with simpler ones (Taylor expansions, piecewise-linear models)
- **Discretization** converts continuous problems to discrete (sampling, finite differences, meshing)
- **Transformation** maps problems to domains where they're easier to solve (Laplace, Fourier, Z-transform)
- **Linearization** approximates nonlinear systems with linear ones near an operating point (Jacobian, small-signal models)
- **Dimension Reduction** represents high-dimensional data in fewer dimensions while preserving information (PCA, SVD)
- All five are **pre-processing tools** that make problems tractable for computation
