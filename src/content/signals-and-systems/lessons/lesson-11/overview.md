# Routh-Hurwitz Stability Criterion - Overview

> **Why This Matters**: In the previous lesson, stability came from actually finding poles. That works beautifully for first-order and second-order systems, and it still works for many small examples. But what happens when the denominator is fourth order, fifth order, or depends on a tunable parameter? This lesson gives you a faster tool: **Routh-Hurwitz**. It tells you how many poles are outside the left half plane without forcing you to solve for every root.

## What You Will Learn

This lesson has two halves that fit together naturally:

- a worked active RLC example where the gain parameter $A$ moves poles between stable, marginal, and unstable regions
- the **Routh-Hurwitz stability criterion**, which tests stability directly from denominator coefficients

Along the way, you will learn:

- how a parameter can push poles across the imaginary axis
- why "all coefficients positive" is necessary but not sufficient for stability
- how to build the Routh array row by row
- how the **first column** reveals stability and how sign changes count poles outside the left half plane
- the clean second-order and third-order stability conditions that fall out of the array

## The Big Picture

$$
\text{poles move with parameters} \longrightarrow \text{need a faster test} \longrightarrow \text{Routh array} \longrightarrow \text{stability from coefficients}
$$

This is one of the most useful lessons in the systems section because it lets you make stability decisions before the algebra gets out of control.

## Prerequisites

You should be comfortable with:

- transfer functions and denominator polynomials
- pole locations in the $s$-plane
- the difference between stable, marginally stable, and unstable systems
- solving second-order characteristic equations

If Lesson 10 is fresh in your mind, this lesson will feel like the natural next step.
