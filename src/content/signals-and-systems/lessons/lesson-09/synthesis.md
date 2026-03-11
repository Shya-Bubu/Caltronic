# Synthesis — Putting H(s) to Work

## The Complete Picture

You now have a full workflow for analysing any LTI system with any input:

$$x(t) \xrightarrow{\mathcal{L}} X(s) \xrightarrow{\times H(s)} Y(s) \xrightarrow{\text{PFE}} \text{Simple terms} \xrightarrow{\mathcal{L}^{-1}} y(t)$$

The Laplace transform converts the problem to algebra, $H(s)$ handles the system, partial fraction expansion breaks $Y(s)$ into invertible pieces, and inverse Laplace transform gives you the time-domain answer.

## Three Input Types, One Method

| Input | $X(s)$ | What You Learn |
|-------|--------|---------------|
| **Step** $u(t)$ | $1/s$ | Transient behaviour, time constant, settling time |
| **Sinusoid** $A\sin(\omega t)$ | $A\omega/(s^2+\omega^2)$ | Frequency response, phase shift, steady-state |
| **Pulse** $u(t)-u(t-T)$ | $(1-e^{-sT})/s$ | Response to finite-duration inputs via superposition |

## The Value Theorem Shortcuts

The initial and final value theorems let you skip the entire inverse Laplace process when all you need are the endpoints:

$$y(0^+) = \lim_{s \to \infty} sY(s) \qquad y(\infty) = \lim_{s \to 0} sY(s)$$

These are invaluable for quick checks and exam answers.

## First-Order vs Second-Order

The RC circuit gives a smooth exponential step response — no overshoot, no oscillation. The RLC circuit can oscillate, overshoot, and ring before settling. The difference comes from the number of energy storage elements and the damping ratio $\zeta$.

## Looking Ahead

With these tools, you can now analyse any circuit or system for any input. Next, you'll study:
- **Bode plots** — graphical representation of frequency response
- **Stability analysis** — when do poles cause problems?
- **Filter design** — choosing R, L, C to achieve desired frequency characteristics
