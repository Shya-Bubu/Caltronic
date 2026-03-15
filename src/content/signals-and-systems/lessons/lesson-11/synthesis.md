# Routh-Hurwitz Stability Criterion - Synthesis

The active RLC example at the start of the lesson gives the clean parameter result

- $A<1$: stable
- $A=1$: marginally stable
- $A>1$: unstable

That example shows why denominator coefficients matter: as $A$ changes, the poles move.

The Routh-Hurwitz part then turns that idea into a general stability test. The key points from the note are:

- same-sign coefficients are necessary for stability
- same-sign coefficients are not sufficient
- the Routh array gives a necessary-and-sufficient test
- all first-column entries positive means the system is stable
- sign changes in the first column count poles not in the left half plane

The final low-order results are

$$
P(s)=s^2+a_1s+a_0 \Rightarrow a_1>0,\ a_0>0
$$

and

$$
P(s)=s^3+a_2s^2+a_1s+a_0 \Rightarrow a_2>0,\ a_0>0,\ a_1a_2>a_0
$$

So the lesson ends with a very practical habit: if direct pole solving is easy, use it; if not, move to the denominator coefficients and build the Routh array.
