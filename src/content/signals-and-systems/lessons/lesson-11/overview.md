# Routh-Hurwitz Stability Criterion - Overview

Lesson 11 stays on stability, but the note changes the method.

It starts with an active RLC example where a parameter $A$ changes the denominator and moves the poles between stable, marginal, and unstable regions. That example shows why direct root calculation can become awkward even in a relatively small problem.

The second half then introduces the Routh-Hurwitz criterion. Instead of solving for every pole explicitly, the lecture works with the denominator coefficients, builds the Routh array, and reads stability from the first column of that array.

So the lesson moves through this sequence:

$$
\text{parameter-dependent poles} \rightarrow \text{stability regions} \rightarrow \text{Routh array} \rightarrow \text{coefficient-based test}
$$

The last pages then specialize the method to second-order and third-order polynomials so you get short conditions that can be checked quickly.
