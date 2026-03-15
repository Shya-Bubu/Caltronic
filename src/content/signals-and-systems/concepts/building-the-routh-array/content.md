## Building the Routh Array Step by Step

Once the note motivates Routh-Hurwitz, it immediately becomes procedural. You now need to know how to build the array correctly, because one copied coefficient in the wrong place can destroy the final conclusion.

[[visual:routh-array-template-note]]

If the denominator polynomial has order $N$, the note states that the Routh array has:

- $N+1$ rows
- $\frac{N}{2}+1$ columns when $N$ is even
- $\frac{N+1}{2}$ columns when $N$ is odd

That tells you the size of the table before you even begin filling it.

## The First Two Rows

For a polynomial

$$
P(s)=a_0 s^N+a_1 s^{N-1}+a_2 s^{N-2}+\cdots+a_N
$$

the first two rows are formed directly from alternate coefficients:

$$
\begin{array}{c|cccc}
s^N & a_0 & a_2 & a_4 & \cdots \\
s^{N-1} & a_1 & a_3 & a_5 & \cdots
\end{array}
$$

No calculation is needed here. You are only placing coefficients in the correct pattern.

[[visual:array-construction-flow]]

This is where many mistakes start. If the coefficient order is wrong at the beginning, every later row will also be wrong. So the safe habit is to rewrite the polynomial first in descending powers of $s$ and make sure no power is missing before you build the array.

## The Third Row and Beyond

Now here's where it gets interesting. From the third row onward, the array stops being a copy-and-place table and becomes a recursive construction.

The note gives entries such as

$$
b_{N-2}=\frac{a_1 a_2-a_0 a_3}{a_1}
$$

and

$$
b_{N-4}=\frac{a_1 a_4-a_0 a_5}{a_1}
$$

Then the fourth row is built from the second and third rows in exactly the same spirit, and the remaining rows are completed in the same way.

[[visual:entry-formula-note]]

So the lower rows are generated from the two rows above them. That means the array is not a formula you memorize once. It is a repeated process you apply carefully.

## What to Do If Zero Appears

The note includes a practical instruction that matters in exam work:

if a denominator in the recursion becomes zero, replace it with a small positive number $\epsilon$.

That keeps the process going and preserves the sign analysis.

Do not skip that step mentally. If it happens, write it. It shows the examiner that you know how the special case is handled.

## The Two Results That Actually Matter

After the array is built, the note gives the real payoff.

First:

> The system is stable if and only if all elements in the first column of the Routh array are positive.

Second:

> The number of sign changes in the first column equals the number of poles not in the left half plane.

[[visual:first-column-rule]]

So the first column is the part you read at the end. Everything else in the table exists to generate that first column correctly.

> **Common Mistake**: Finishing the arithmetic and forgetting to write the stability conclusion. The table itself is not the final answer. The sign pattern in the first column is.
