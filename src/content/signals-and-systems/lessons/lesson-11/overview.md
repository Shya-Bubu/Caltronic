# Routh-Hurwitz Stability Criterion - Overview

> **Why This Matters**: Lesson 10 taught you to decide stability after finding poles. Lesson 11 teaches you what to do when that direct route becomes awkward: read stability from the denominator itself.

This lesson has two connected parts.

First, the note studies an active RLC example where the parameter $A$ changes the denominator and pushes the poles through stable, marginal, and unstable regions. That part is important because it shows you, with a real transfer function, that changing one coefficient can move the whole stability picture.

Second, the note introduces the Routh-Hurwitz criterion. Instead of factorizing the denominator completely, you build the Routh array and inspect its first column. The lecture then finishes with the compact second-order and third-order results that come out of that array.

So the lesson flow is

$$
\text{parameter } A \rightarrow \text{pole movement} \rightarrow \text{need for a faster test} \rightarrow \text{Routh array}
$$

What you should expect from this lesson is not a new definition of stability. The definition is the same as before. What changes is the method you use to test it.
