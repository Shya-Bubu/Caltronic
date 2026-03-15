## Building the Routh Array

The note next shows how to form the Routh array from the denominator coefficients.

[[visual:routh-array-template-note]]

For

$$
P(s)=a_0 s^N+a_1 s^{N-1}+a_2 s^{N-2}+\cdots+a_N
$$

the first two rows are

$$
\begin{array}{c|cccc}
s^N & a_0 & a_2 & a_4 & \cdots \\
s^{N-1} & a_1 & a_3 & a_5 & \cdots
\end{array}
$$

[[visual:array-construction-flow]]

## Recursive Rows

The next row entries are obtained from the two rows above. The note gives formulas such as

$$
b_{N-2}=\frac{a_1 a_2-a_0 a_3}{a_1}
$$

and

$$
b_{N-4}=\frac{a_1 a_4-a_0 a_5}{a_1}
$$

Then the lower rows are built in the same way.

[[visual:entry-formula-note]]

## Stability Test from the First Column

The lecture states:

> The system is stable if and only if all elements in the first column of the Routh array are positive.

It also states:

> The number of sign changes in the first column equals the number of poles not in the left half plane.

[[visual:first-column-rule]]

If a denominator in the recursion becomes zero, the note says to replace it with a small positive $\epsilon$ and continue.
