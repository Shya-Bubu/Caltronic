# j-Axis Poles and Sinusoidal Steady-State Response - Overview

> **Why This Matters**: Lesson 11 showed how the Routh array detects stability without explicitly factorizing the denominator. This lesson pushes that method one step further and then connects it to the frequency-domain quantity $H(j\omega_0)$ that governs sinusoidal steady-state response.

The lecture has two tightly connected parts.

The first part studies a special Routh-table situation in which the first-column pattern is almost entirely positive, except for a zero in the row indexed by $s^1$. The note shows that this is not an ordinary arithmetic accident. It signals a pair of poles on the imaginary axis, which means the system is sitting exactly on the stability boundary.

The second part revisits the input

$$
x(t)=C\cos(\omega_0 t), \qquad t \ge 0
$$

for a stable LTI system and derives the output in a form that separates the transient term from the persistent sinusoidal term.

So the flow of the lesson is

$$
\text{special Routh pattern} \rightarrow \text{poles on } j\omega \text{ axis} \rightarrow \text{Laplace analysis of } x(t) \rightarrow y_{ss}(t)
$$

If that structure is clear, the entire lecture becomes easier to follow: first identify the boundary case in the pole pattern, then understand why $H(j\omega_0)$ controls the sustained sinusoidal response.
