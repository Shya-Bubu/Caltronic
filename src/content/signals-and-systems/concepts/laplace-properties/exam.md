# Exam Focus: Laplace Transform Properties

## Key Formulas to Remember

1. **Time shift**: $\mathcal{L}\{f(t-T)u(t-T)\} = e^{-sT}F(s)$
2. **Frequency shift**: $\mathcal{L}\{e^{at}f(t)\} = F(s-a)$
3. **Differentiation**: $\mathcal{L}\{f'\} = sF(s) - f(0^-)$
4. **Integration**: $\mathcal{L}\{\int f\} = F(s)/s$
5. **Convolution**: $\mathcal{L}\{f*g\} = F(s)G(s)$
6. **Initial value**: $f(0^+) = \lim_{s \to \infty} sF(s)$
7. **Final value**: $f(\infty) = \lim_{s \to 0} sF(s)$ (if stable)

## Common Exam Question Types

### Type 1: Find the Laplace transform using properties
Given f(t), use table entries and properties to find F(s).

### Type 2: Inverse transform using partial fractions
Given F(s), decompose and use table to find f(t).

### Type 3: Solve ODEs with initial conditions
Transform equation, solve algebraically, inverse transform.

### Type 4: Apply initial/final value theorems
Find limiting values without computing complete inverse.

## Practice Tips

- Always check if final value theorem applies (all poles in LHP except possibly at origin)
- For partial fractions, ensure proper form first (numerator degree < denominator degree)
- Remember the s-factor difference between differentiation (multiply) and integration (divide)
