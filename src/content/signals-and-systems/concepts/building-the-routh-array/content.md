## How the Routh Array Is Structured

The note next describes the structure of the Routh array.

[[visual:routh-array-template-note]]

If $P(s)$ is of order $N$, the array has

- $N+1$ rows
- $\frac{N}{2}+1$ columns when $N$ is even
- $\frac{N+1}{2}$ columns when $N$ is odd

The first two rows are filled directly from the polynomial coefficients by taking alternate coefficients.

For a denominator

$$
P(s)=a_0 s^N+a_1 s^{N-1}+a_2 s^{N-2}+\cdots+a_N
$$

this gives the pattern

$$
\begin{array}{c|cccc}
s^N & a_0 & a_2 & a_4 & \cdots \\
s^{N-1} & a_1 & a_3 & a_5 & \cdots
\end{array}
$$

[[visual:array-construction-flow]]

## How the Lower Rows Are Computed

The note then gives formulas for the third row. In the current notation, entries such as

$$
b_{N-2}=\frac{a_1 a_2-a_0 a_3}{a_1}
$$

and

$$
b_{N-4}=\frac{a_1 a_4-a_0 a_5}{a_1}
$$

are formed from the first two rows.

After that, the fourth row is formed from the second and third rows in the same manner, and the remaining rows are completed in the same way.

[[visual:entry-formula-note]]

So the array is a repeated coefficient-combination procedure. The rows below the top two are not copied; they are generated recursively.

## What to Do If a Denominator Becomes Zero

The note includes a practical instruction:

if one or more elements in the denominator happen to be zero, replace them by a small positive value $\epsilon$.

That allows the row construction to continue and preserves the sign test.

## The Actual Stability Test

Once the array is built, the note states the Routh-Hurwitz criterion:

> The system is stable if and only if all elements in the first column of the Routh array are positive.

It also gives the counting result:

> The number of sign changes in the first column is equal to the number of poles not in the left half plane.

[[visual:first-column-rule]]

So the first column is the part of the array you must read at the end. The other entries are there to generate that column correctly.
