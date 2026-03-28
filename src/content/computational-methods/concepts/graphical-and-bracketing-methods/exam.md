# Exam Strategy: Graphical and Bracketing Methods

This topic usually appears in exams in one of four ways: identify a valid bracketing interval, explain why bisection converges, estimate the number of iterations needed, or interpret a graph of $f(x)$ or $1/|f(x)|$.

If the question gives you a continuous function and asks whether bisection can be used, your first job is not to start iterating. Your first job is to check for a **sign change**:

$$
f(a)f(b) < 0
$$

If that condition is not shown, do not claim bisection is guaranteed. That is one of the most common mark-losing mistakes.

For iteration-count questions, go straight to the bisection error bound:

$$
|x_k-x^\ast| \leq \frac{b-a}{2^{k+1}}
$$

Then solve for the smallest $k$ that makes the right-hand side smaller than the required tolerance. Examiners usually award method marks for writing the inequality correctly, even before the arithmetic is finished.

When graphical methods are discussed, make sure you explain the interpretation precisely:

- in the direct graph, roots are **axis intersections**
- in the reciprocal graph, roots are **large peaks** because the denominator becomes small

If the exam asks about multiple roots, say explicitly that the reciprocal plot helps separate them visually, even when the direct graph is less clear.

A good short-answer structure is:

1. state the condition or principle
2. apply it to the numbers given
3. conclude what the method guarantees

For example, a 4- to 6-mark bisection question often expects:

- continuity assumption stated
- sign-change test shown
- midpoint formula written
- correct interval update
- one or two iterations or an error estimate

> **Common Mistake**: Updating the wrong endpoint after computing the midpoint. Always compare the midpoint sign against the endpoint signs before replacing anything.

Another common mistake is to stop based only on the midpoint value looking visually "close enough." In an exam, always give a mathematical stopping condition such as interval width or tolerance.

If a question asks why bisection is slower than Newton-Raphson, the safe answer is:

- bisection uses only sign information
- the interval shrinks by a factor of 2 each step
- therefore the convergence is linear, not quadratic

That comparison often earns explanation marks because it shows you understand both the mechanism and the consequence.
