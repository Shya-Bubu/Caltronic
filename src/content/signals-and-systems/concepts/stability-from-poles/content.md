## Stability Starts with the Natural Response

When engineers say a system is **stable**, they are asking a very physical question: if the system is disturbed, does its output settle down, or does it keep growing? That question matters whether you are building a filter, an amplifier, or a feedback loop. A response that keeps increasing is not just mathematically awkward. It usually means energy is accumulating in a way the real circuit cannot safely sustain.

In this lesson we focus on the kind of systems your note calls **causal, linear, time-invariant, finite-dimensional continuous-time systems**. For that class, the transfer function has the form

$$
H(s) = \frac{b_M s^M + b_{M-1}s^{M-1} + \cdots + b_1 s + b_0}{s^N + a_{N-1}s^{N-1} + \cdots + a_1 s + a_0}
$$

The numerator gives the **zeros** and the denominator gives the **poles**. You already know that poles matter for partial fractions. Now we make the deeper connection: the poles tell you what time functions appear in the impulse response $h(t)$, and those time functions tell you whether the response decays.

[[visual:lesson-note-page-17]]

The note writes the transfer function in factored form as

$$
H(s) = K \frac{(s-z_M)(s-z_{M-1})\cdots(s-z_1)}{(s-p_N)(s-p_{N-1})\cdots(s-p_1)}
$$

That form is not just algebraic bookkeeping. It gives you a map from the $s$-plane to the time domain.

## From Poles to Time Functions

Suppose you expand $H(s)$ into partial fractions. Each pole contributes a standard inverse Laplace building block:

- a real pole $p$ contributes a term proportional to $e^{pt}$
- a complex-conjugate pair $p=\sigma \pm j\omega$ contributes a decaying or growing oscillation like $e^{\sigma t}\cos(\omega t+\theta)$
- a repeated pole contributes extra powers of $t$, such as $t e^{pt}$ or $t^2 e^{pt}$

This is where stability becomes intuitive. Everything depends on the exponential envelope. If the exponential envelope shrinks to zero, the natural response dies away. If it stays constant, the response can keep oscillating forever. If it grows, the system is unstable.

[[visual:pole-response-building-blocks]]

The note states the key implication very compactly:

$$
\lim_{t \to \infty} h(t) = 0 \quad \text{iff} \quad \operatorname{Re}(p_i) < 0 \text{ for all poles}
$$

That is the asymptotic stability rule for finite-dimensional continuous-time LTI systems.

## Why the Left Half Plane Matters

Take the simplest case first. If a pole is real and equal to $p$, then the natural mode is $e^{pt}$. There are only three possibilities:

- if $p < 0$, then $e^{pt}$ decays to zero
- if $p = 0$, then $e^{pt}=1$, so the mode does not decay
- if $p > 0$, then $e^{pt}$ grows without bound

For a complex pole $p = \sigma + j\omega$, the corresponding mode behaves like

$$
e^{\sigma t}\cos(\omega t + \theta)
$$

Here the oscillation comes from $\omega$, but the envelope comes from $\sigma$. So again:

- $\sigma < 0$ gives a decaying oscillation
- $\sigma = 0$ gives a constant-amplitude oscillation
- $\sigma > 0$ gives a growing oscillation

That is why engineers draw the **imaginary axis** as the dividing line of the $s$-plane. Poles to the left of it have negative real part and decay. Poles to the right have positive real part and grow.

[[visual:stable-pole-map]]

## The Meaning of Asymptotic Stability

When every pole satisfies $\operatorname{Re}(p_i)<0$, the impulse response tends to zero. That means the system's natural behaviour fades away after a disturbance. If you excite the system and then stop injecting energy, the transient response disappears.

This is the kind of stability you usually want in practice. A stable filter should not keep ringing forever. A stable amplifier should not create oscillations on its own. A stable sensor-processing chain should forget the initial disturbance rather than magnify it.

It is useful to say this in engineering language:

> **Key Insight**: Pole location is not a separate topic from time response. Pole location *is* time response, seen through the Laplace domain.

Once you believe that, you stop memorizing separate stability rules and start reading them directly from $H(s)$.

## A Quick Pole-by-Pole Check

Suppose a transfer function has poles at

$$
p_1 = -2,\qquad p_2 = -0.4 + j3,\qquad p_3 = -0.4 - j3
$$

Then the response contains terms like

$$
e^{-2t}, \qquad e^{-0.4t}\cos(3t+\theta)
$$

Every one of those envelopes decays, so the natural response vanishes. The system is asymptotically stable.

But if you move one pole to $+0.2$, then a term like $e^{0.2t}$ appears. No matter how small its coefficient is, it eventually dominates. That is why even one right-half-plane pole is enough to destroy stability.

[[visual:lesson-note-page-18]]

## What About Zeros?

Your note introduces zeros and poles together, but the stability test is driven by the **poles**, not the zeros. Zeros shape the response, cancel frequencies, and affect transient detail, but they do not decide whether the natural modes decay. The denominator does that, because the denominator determines the singular terms in the partial fraction expansion.

That is a subtle point students often miss. A zero can change how the response starts or how the numerator scales the mode. But if the denominator contains an unstable pole, the system is still unstable.

## The Rule You Should Carry Forward

For the finite-dimensional systems in this course:

$$
\text{Asymptotically stable} \iff \operatorname{Re}(p_i) < 0 \text{ for every pole}
$$

When you look at a transfer function, do not jump straight into algebra. Pause and ask:

- how many poles are there?
- are they real or complex?
- are any repeated?
- where are they relative to the imaginary axis?

That one habit makes later topics such as damping, frequency response, and feedback much easier to understand.
