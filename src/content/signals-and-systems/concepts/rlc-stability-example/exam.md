# Exam Focus - Series RLC Stability Example

## Typical exam demand

This concept is usually tested as a compact worked example:

- derive the transfer function for the series RLC circuit
- obtain the denominator polynomial
- solve for the poles
- classify the circuit as stable

The algebra matters, but the key marks come from interpreting the poles correctly.

## Best answer flow

1. Write the $s$-domain impedance form.
2. Simplify to a rational transfer function.
3. Set the denominator equal to zero.
4. Apply the quadratic formula.
5. Comment on the real part of the poles.
6. State the stability result clearly.

## What examiners like to see

They want the stability conclusion tied to a reason, for example:

> Since the poles have real part $-R/(2L)$ and $R,L>0$, both poles lie in the left half plane. Therefore the series RLC circuit is stable.

That sentence is much stronger than just writing "stable."

## Common traps

- losing the factor of $Cs$ when clearing the capacitor term
- classifying the three damping cases correctly but forgetting to state that all remain stable
- focusing on oscillation alone instead of the real part
- missing that a repeated real pole here is still left-half-plane, so it is not the same as a repeated imaginary-axis pole

## Fast memory aid

For the passive series RLC example, keep this in mind:

- damping case changes with the discriminant
- stability is still governed by the real part
- real part is $-R/(2L)$, so passive values keep the circuit stable
