# Exam Focus - Absolute Integrability and BIBO Stability

## What usually gets tested

This concept appears in exams as:

- a theorem statement question
- a short proof using the convolution integral
- a classification problem asking whether a given $h(t)$ is BIBO stable

The proof is short enough that you should know its structure, not just the final statement.

## The proof pattern you should reproduce

Start from

$$
y(t) = \int_0^\infty h(\tau)x(t-\tau)\,d\tau
$$

Then:

1. take absolute values
2. use $|ab| = |a||b|$
3. use bounded-input assumption $|x(t)| \le M$
4. conclude

$$
|y(t)| \le M \int_0^\infty |h(\tau)|\,d\tau
$$

If the integral is finite, then the output is bounded.

## What earns marks

- writing the correct convolution formula for a causal LTI system
- introducing the bounded-input constant $M$
- carrying the inequality through correctly
- explicitly stating that finiteness of the integral gives bounded output

## Common mistakes

- forgetting the absolute value around $h(t)$
- writing integrability of $h(t)$ instead of absolute integrability
- stopping at the inequality without saying why it proves bounded output
- mixing BIBO stability with "goes to zero" language

## One line worth memorizing

> If $\int_0^\infty |h(t)|dt < \infty$, then every bounded input produces a bounded output, so the system is BIBO stable.
