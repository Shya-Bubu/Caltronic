# Exam Strategy: Gradient Methods and Step Size

This topic is usually examined through update formulas, directional reasoning, or a step-size bound.

The first thing you should write correctly is the pair of updates:

$$
x_{k+1}=x_k-\mu f'(x_k) \quad \text{for minimization}
$$

$$
x_{k+1}=x_k+\mu f'(x_k) \quad \text{for maximization}
$$

Do not mix the signs. That is one of the most common mistakes, especially under time pressure.

If the question asks why the sign is chosen that way, explain it in words:

- positive derivative means the function rises as x increases
- to minimize, move opposite the slope
- to maximize, move with the slope

That explanation is usually enough for a short conceptual part.

For convergence questions, the main result to remember is

$$
0<\mu<\frac{2}{|f''(x^\ast)|}
$$

near the optimum. If the question asks for a practical recommendation over an interval, mention that a smaller value than the rough upper estimate is safer.

> **Common Mistake**: Students often state that "a larger step size always gives faster convergence." That is not true. Larger step sizes can produce overshoot, oscillation, or divergence.

If a derivation is requested, organize it around the Taylor expansion of $f'(x_k)$ near $x^\ast$ and then substitute into the update. Even if you do not finish the algebra, showing that route usually earns method marks.

A clean exam answer on this topic usually has three parts:

1. write the correct iteration
2. explain the role of the derivative sign
3. state the curvature-based step-size condition

That combination shows both conceptual and computational understanding.
