# Routh-Hurwitz Stability Criterion - Synthesis

The active RLC example in this lesson gives the parameter result

- $A < 1$: stable
- $A = 1$: marginally stable
- $A > 1$: unstable

The Routh-Hurwitz part then gives the coefficient test:

- stable iff all first-column entries of the Routh array are positive
- the number of sign changes in the first column equals the number of poles not in the left half plane
- same-sign coefficients are necessary, but not sufficient

The low-order results from the lecture are

$$
P(s)=s^2+a_1 s+a_0 \quad \Rightarrow \quad a_1>0,\ a_0>0
$$

and

$$
P(s)=s^3+a_2 s^2+a_1 s+a_0 \quad \Rightarrow \quad a_2>0,\ a_0>0,\ a_1 a_2>a_0
$$
