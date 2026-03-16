## A Special Routh Case: Poles on the Stability Boundary

The lesson begins by staying with the Routh table, but the question is now more delicate than in the previous lecture. We are not merely distinguishing left-half-plane poles from right-half-plane poles. We are asking whether a conjugate pair lies exactly on the $j\omega$ axis.

[[visual:example-polynomials-note]]

That distinction matters because a pole on the $j\omega$ axis lies on the stability boundary. The Routh table must therefore be interpreted with more care than in the ordinary stable or unstable cases.

## Example 3: Zero Replaced by Epsilon

The note first studies the polynomial

$$
P(s)=s^4+s^3+2s^2+2s+3
$$

and builds its Routh array. During the construction, a zero appears in the first column of the $s^2$ row, so the note replaces it with a small positive quantity $\epsilon$.

That gives a later first-column entry of the form

$$
2-\frac{3}{\epsilon}
$$

which changes sign depending on how the limiting argument is handled. The purpose of this example is not only the arithmetic. It shows that a zero in the Routh table can signal a boundary case that cannot be read in the same casual way as a standard stable table.

[[visual:routh-epsilon-contrast]]

So when the table forces you to introduce $\epsilon$, the correct response is to inspect the first-column pattern carefully rather than rushing to a conclusion.

## Example 4: The j-Axis Pattern

The note then gives a cleaner example:

$$
P(s)=s^4+s^3+3s^2+2s+2
$$

Its Routh array leads to a first-column pattern in which every relevant entry is positive, but the entry in the row indexed by $s^1$ becomes zero.

That is exactly the special condition highlighted on the next page of the notes.

[[visual:jw-axis-condition-note]]

The note states the result in substance as follows:

if all entries in the first column of the Routh array are positive, but the one indexed by $s^1$ is zero, then one pair of poles lies on the $j\omega$ axis.

This is the core conclusion of the concept. The zero is not merely a computational inconvenience. It is a structural indicator that the pole pattern has reached the imaginary-axis boundary.

## Locating the Pair on the j-Axis

For the worked example, the note then gives the pair of poles as

$$
\pm \sqrt{\frac{a_0}{\delta_2}}
$$

which, for the numbers on the page, becomes

$$
\pm j\sqrt{2}
$$

Here $\delta_2$ denotes the element indexed by the $s^2$ row, and $a_0$ is the constant-term element from the last row.

[[visual:jw-axis-pair-plot]]

So the lesson does two things at once: it tells you how to recognize the special Routh pattern, and it shows how to identify the corresponding imaginary-axis pair.

> **Watch Out**: A zero in the Routh table does not automatically imply instability. In this note, the zero in the $s^1$ row, together with the otherwise positive first column, indicates a pair exactly on the $j\omega$ axis.

## What You Should Retain

The exam habit from this concept is very clear:

- build the Routh table carefully
- watch for zeros in the first column
- if the special $s^1$-row zero appears while the rest of the first column is positive, expect a pair on the $j\omega$ axis

That is the bridge from Lesson 11 into the sinusoidal-response part of this lecture, because poles on the imaginary axis are precisely the poles associated with sustained oscillatory behavior.
