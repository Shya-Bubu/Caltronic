## When the Response Does Not Decay All the Way

The previous concept gave the cleanest stability result: if every pole lies strictly in the left half plane, the impulse response goes to zero. But real systems also produce two edge cases that you need to classify correctly:

- the response may stay **bounded** without decaying
- the response may become **unbounded** even though some poles lie on the imaginary axis

This is exactly where students start mixing up "stable," "marginally stable," and "unstable." The note separates those cases very clearly, so let us slow down and rebuild the distinction carefully.

[[visual:lesson-note-page-18-marginal]]

## What Marginal Stability Means

The note defines a system as **marginally stable** if $h(t)$ is bounded:

$$
|h(t)| \le C \quad \text{for all } t
$$

for some finite positive constant $C$.

That definition is weaker than asymptotic stability. It does **not** require the response to go to zero. It only requires the response to stay finite.

A simple example is a pure sinusoid:

$$
h(t) = \cos(\omega t)
$$

This never decays, so it is not asymptotically stable. But it never grows without bound either. It stays between $-1$ and $1$, so it is bounded. That is the essence of marginal stability.

## Pole Conditions for Marginal Stability

The note gives the rule in words, and it is worth translating into a cleaner checklist.

For marginal stability:

- every pole must satisfy $\operatorname{Re}(p_i) \le 0$
- poles on the imaginary axis must be **non-repeated**
- repeated poles must still lie strictly in the left half plane

Why this extra condition about repetition? Because repeated poles create extra factors of $t$.

If a pole at $p=j\omega$ is simple, you get an oscillation with constant amplitude. But if it is repeated, you get terms like

$$
t \cos(\omega t + \theta)
$$

or

$$
t \sin(\omega t + \theta)
$$

and those terms grow in amplitude as $t$ increases. So the response becomes unbounded even though the pole is not in the right half plane.

[[visual:classification-responses]]

This is one of those ideas that feels technical at first, but it is really just a statement about envelopes. The repeated pole multiplies the oscillation by a polynomial growth factor, and that growth factor eventually wins.

## Unstable Does Not Mean "Everything is on the Right"

A system is **unstable** if the impulse response becomes unbounded. The note lists two ways this can happen:

- at least one pole has $\operatorname{Re}(p_i) > 0$
- a pole lies on the imaginary axis and is repeated

So instability is broader than "there is a right-half-plane pole." Right-half-plane poles are one unstable mechanism, but repeated imaginary-axis poles are another.

That second case is easy to miss in exams. A student sees $\pm j\omega$ and thinks, "pure oscillation, so bounded." But the moment the pole is repeated, the constant-amplitude oscillation becomes a growing oscillation.

## A Three-Class Picture

It helps to compress the whole classification into one comparison table:

| Pole condition | Typical natural mode | Long-term behaviour | Classification |
|---|---|---|---|
| All poles satisfy Re$(p_i) < 0$ | $e^{-at}$, $e^{-\sigma t}\cos \omega t$ | decays to zero | asymptotically stable |
| Re$(p_i) \le 0$, imaginary-axis poles simple only | $\cos \omega t$, $\sin \omega t$ | bounded but non-decaying | marginally stable |
| Any Re$(p_i) > 0$, or repeated imaginary-axis pole | $e^{at}$, $t\cos \omega t$ | unbounded growth | unstable |

[[visual:pole-classification-map]]

That table is not a set of disconnected facts. It is the same principle repeated in three forms:

1. exponentials with negative real part shrink
2. exponentials with zero real part stay at constant magnitude
3. exponentials with positive real part grow
4. repeated poles can add polynomial growth on top

## Worked Thought Experiment

Suppose a system has poles at

$$
p_1 = -1, \qquad p_2 = j2, \qquad p_3 = -j2
$$

The corresponding modes are a decaying exponential and a sustained oscillation. Since the oscillation stays bounded and there is no repeated imaginary-axis pole, the system is marginally stable.

Now change the system to

$$
p_1 = -1, \qquad p_2 = j2 \text{ repeated}, \qquad p_3 = -j2 \text{ repeated}
$$

Then terms like $t\cos(2t)$ appear, and the amplitude grows without bound. The system becomes unstable.

That is why multiplicity matters just as much as location.

[[visual:repeated-pole-growth]]

## Why Engineers Care About This Distinction

Marginal stability may sound acceptable because the response stays bounded, but in practice it is delicate. A sustained oscillation does not die out, so the system keeps storing the effect of the disturbance. A tiny modelling error, nonlinearity, or parameter drift can easily push a marginally stable system into true instability.

This is why practical designs often aim for poles that are comfortably inside the left half plane rather than sitting on the imaginary axis. Decay gives robustness.

> **Watch Out**: In exam language, "bounded" and "goes to zero" are not the same thing. Bounded means finite. Asymptotically stable means finite **and** decaying to zero.

## The Rule You Should Remember

When classifying a system, do not only look at the sign of the real part. Ask two questions:

- is any pole in the right half plane?
- is any imaginary-axis pole repeated?

If the answer to either question is yes, the system is unstable. If the answer to both is no, then decide whether all poles are strictly left-half-plane or whether some simple poles sit on the imaginary axis. That final check separates asymptotic stability from marginal stability.
