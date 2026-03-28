# Exam Strategy: Higher-Order Methods and Convergence

This topic is usually tested in a more theory-heavy way than the earlier concepts. You may be asked to identify convergence order, compare methods, or explain why Newton is quadratic while bisection is only linear.

For short theory questions, do not drown the answer in algebra. Start with the classification:

- bisection: linear
- fixed-point iteration: linear under contraction conditions
- Newton-Raphson: quadratic near a simple root
- Halley: cubic near a simple root

That simple list often earns the first marks immediately.

If the exam asks for the convergence rate of bisection, write the interval-width relation first:

$$
|a_k-b_k|=\frac{1}{2^k}|a_0-b_0|
$$

Then connect midpoint error to interval width. This is usually the cleanest route to the linear rate.

For Newton questions, the essential assumption is

$$
f'(x^\ast)\neq 0
$$

If you forget that, your answer is incomplete. The standard exam explanation is: expand $f(x_k)$ and $f'(x_k)$ about the simple root and show that the first-order error term cancels, leaving an error proportional to $|x_k-x^\ast|^2$.

> **Common Mistake**: Writing "Newton converges quadratically" without stating that this is a local result near a simple root. Examiners often penalize that missing condition.

For fixed-point iteration, the mark-scoring phrase is "contraction mapping." Mention that convergence is tied to the factor $|1-\mu f'(x^\ast)|$ or, more generally, to a slope magnitude below 1.

If Halley's method appears, you usually do not need to re-derive every line of the lecture note unless the question explicitly asks for it. In most exam situations, it is enough to:

1. state the update formula correctly
2. say it uses second-derivative information
3. state that it achieves cubic local convergence for a simple root

For comparison questions, structure your answer around the trade-off:

- stronger assumptions and more derivative information
- higher local convergence order
- more algebra and more computational cost per step

That trade-off is exactly what the examiner wants to see.

If a question asks why multiple roots are troublesome, the key statement is that for a multiple root, derivatives like $f'(x^\ast)$ may vanish, and many local convergence proofs rely on those derivatives being nonzero.

So the safest exam habit is this: whenever you mention convergence order, also mention the assumptions that make that order valid.
