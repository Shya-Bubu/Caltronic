# Routh-Hurwitz Stability Criterion - Synthesis

The active RLC example shows that one parameter can shift poles across the imaginary axis. In that worked example, the note ends with the simple classification

- $A<1$: stable
- $A=1$: marginally stable
- $A>1$: unstable

That example motivates the Routh-Hurwitz criterion. The lecture then states three key facts:

- same-sign coefficients are necessary for stability
- same-sign coefficients are not sufficient
- the Routh array gives a necessary-and-sufficient stability test

The actual decision comes from the first column of the array:

- all first-column entries positive $\Rightarrow$ stable
- number of sign changes in the first column $\Rightarrow$ number of poles not in the left half plane

The note finishes with the low-order results

$$
P(s)=s^2+a_1s+a_0 \Rightarrow a_1>0,\ a_0>0
$$

and

$$
P(s)=s^3+a_2s^2+a_1s+a_0 \Rightarrow a_2>0,\ a_0>0,\ a_1a_2>a_0
$$

Those results are not separate formulas. They are the short versions of the general Routh test.
