# Exam Focus - Laplace Analysis of Sinusoidal Inputs

## What this question usually asks

This topic is usually tested as a derivation problem. You are expected to:

- write the Laplace transform of $C\cos(\omega_0 t)$
- form $Y(s)=H(s)X(s)$
- express the result using partial fractions
- derive the constant $K$ at $s=j\omega_0$

## Best answer structure

1. Write $X(s)=Cs/(s^2+\omega_0^2)$.
2. Factor the denominator as $(s+j\omega_0)(s-j\omega_0)$.
3. Multiply by $H(s)=Z(s)/P(s)$ to get $Y(s)$.
4. Show the partial-fraction form with $K$ and $K^*$.
5. Evaluate $K$ at $s=j\omega_0$ and simplify to $(C/2)H(j\omega_0)$.

## Common mistakes

- forgetting the pair of poles at $\pm j\omega_0$
- missing the complex-conjugate partner $K^*$
- substituting $s=j\omega_0$ too early before isolating the term
- stopping before reaching the clean $K=(C/2)H(j\omega_0)$ result

## One exam-safe line

For a cosine input, the residue at the pole $s=j\omega_0$ becomes $K=(C/2)H(j\omega_0)$, which is why the steady-state response depends directly on the system's frequency response.
