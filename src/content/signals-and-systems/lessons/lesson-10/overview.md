# Stability of Systems - Overview

> **Why This Matters**: Up to this point, you have learned how to derive a transfer function and how to predict time-domain and sinusoidal responses. But one question sits underneath all of that: **will the response settle down, stay bounded, or blow up?** Stability is the test that separates a useful engineering system from one that is mathematically possible but physically dangerous.

## What You Will Learn

This lesson turns the transfer function into a stability tool. You will see:

- why the denominator poles of a finite-dimensional transfer function control the natural modes in $h(t)$
- how left-half-plane poles make the impulse response die away
- what **marginal stability** really means, and why repeated poles on the imaginary axis are a red flag
- a worked **series RLC** example showing how pole locations stay in the stable region
- the practical **BIBO stability** criterion: if $h(t)$ is absolutely integrable, every bounded input produces a bounded output

## The Big Picture

$$
H(s) \longrightarrow \text{poles of } H(s) \longrightarrow h(t) \longrightarrow \text{stability classification} \longrightarrow \text{BIBO test}
$$

You should think of this lesson as the missing bridge between "I can compute the response" and "I know whether the response is acceptable."

## Prerequisites

This lesson builds directly on Lessons 08 and 09. You should be comfortable with:

- transfer functions $H(s)$
- inverse Laplace transforms of first-order and second-order forms
- poles and zeros
- basic RLC denominator forms
- convolution and impulse response for LTI systems

If those ideas still feel a bit shaky, that is okay. This lesson revisits them from a very practical angle: every pole now has a physical meaning.
