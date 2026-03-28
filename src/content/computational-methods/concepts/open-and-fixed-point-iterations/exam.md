# Exam Strategy: Open Methods and Fixed-Point Iteration

Exam questions on this topic usually test one of three skills:

- derive or apply Newton-Raphson
- explain the secant update from a derivative approximation
- analyze whether a fixed-point iteration is likely to converge

For Newton-Raphson derivations, start from the first-order Taylor expansion and show the algebra cleanly:

$$
f(x)\approx f(x_k)+(x-x_k)f'(x_k)
$$

Then set the left-hand side to zero and solve for the next iterate. Examiners like seeing the reasoning, not only the final formula.

If a numerical Newton question appears, keep your working organized by columns:

| k | x_k | f(x_k) | f'(x_k) | x_{k+1} |
|---|-----|--------|----------|---------|

That layout reduces arithmetic mistakes and usually earns full method marks even if one later number slips.

For secant questions, explicitly mention that the derivative is replaced by a finite difference:

$$
f'(x_k)\approx \frac{f(x_k)-f(x_{k-1})}{x_k-x_{k-1}}
$$

Then substitute into Newton's formula. If the question asks "why use secant?", the safe answer is: it avoids evaluating the analytic derivative while still using slope information.

Fixed-point questions are often more conceptual. You may be asked whether a proposed

$$
x_{k+1}=g(x_k)
$$

will converge. The two things to check are:

1. does $g$ map the interval into itself?
2. is the slope small enough, typically $|g'(x)|<1$ in the relevant region?

If either of these is ignored, the answer is incomplete.

> **Common Mistake**: Students often prove that x*=g(x*) and then stop. That only shows the fixed point is correct, not that the iteration will actually converge to it.

For the linear example with

$$
x_{k+1}=(1-\mu a)x_k-\mu b
$$

remember the convergence condition

$$
|1-\mu a|<1 \iff 0<\mu<\frac{2}{a}
$$

That result is exam-friendly because it connects algebra, iteration, and convergence in one compact statement.

If asked to compare methods, keep the contrast sharp:

- Newton: fastest locally, needs derivative
- Secant: no exact derivative, usually still fast
- Fixed-point: most general framework, but heavily depends on how you choose $g(x)$

Those short, structured comparisons often earn easy marks in theory-heavy questions.
