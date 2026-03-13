# Exam Focus - Parameter-Dependent Stability

## How this is usually tested

This concept is ideal for a medium-length exam problem because it combines circuit modelling and stability classification. A typical question asks you to:

- write the transfer function of the active circuit
- derive the denominator polynomial
- find the poles as a function of the parameter $A$
- identify stable, marginal, and unstable parameter ranges

## Best answer structure

1. Derive the transfer function cleanly from KCL.
2. Write the characteristic equation.
3. Apply the quadratic formula carefully.
4. discuss the discriminant if the question asks about real versus complex poles
5. state the final stability intervals in terms of $A$

## Common mistakes

- mixing up the transfer-function numerator with the denominator used for pole calculation
- classifying "real poles" as automatically stable
- forgetting that $A=1$ gives purely imaginary poles and therefore marginal stability
- finding the discriminant regions correctly but not translating them into stability regions

## High-value final sentence

> The active RLC circuit is stable for $A<1$, marginally stable at $A=1$, and unstable for $A>1$, because the parameter $A$ shifts the pole real part across the imaginary axis.
