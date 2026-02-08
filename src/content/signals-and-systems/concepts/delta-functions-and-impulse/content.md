# Delta Functions and Unit Impulse

> **Why This Matters**: The unit impulse is the most important signal in systems analysis. If you know how a system responds to an impulse, you know how it responds to ANY input. This one function unlocks the entire theory of LTI systems.

---

## The Need for an "Instantaneous" Signal

Imagine striking a drum. The force is applied over an incredibly short time, yet it produces a lasting vibration. How do we mathematically represent such an "instantaneous" event?

[[visual:impulse-physical-examples]]

Real-world impulses are everywhere:
- A hammer hitting a nail
- A lightning strike
- A camera flash
- A heartbeat's electrical spike

We need a mathematical function that captures: **infinite intensity, zero duration, finite total effect**.

---

## Building the Unit Impulse

Let's start with something we understand—a rectangular pulse.

### The Rectangular Pulse Approach

Consider a pulse of width $\Delta$ and height $\frac{1}{\Delta}$:

$$p_\Delta(t) = \begin{cases} \frac{1}{\Delta} & |t| < \frac{\Delta}{2} \\ 0 & \text{otherwise} \end{cases}$$

[[visual:pulse-to-impulse]]

**Key property**: The area under this pulse is always 1, regardless of $\Delta$:

$$\int_{-\infty}^{\infty} p_\Delta(t) \, dt = \frac{1}{\Delta} \cdot \Delta = 1$$

<details>
<summary>🧠 <strong>Pause & Think</strong>: What happens as Δ → 0?</summary>

As the width shrinks:
- Height → ∞ (pulse gets taller)
- Width → 0 (pulse gets narrower)
- Area = 1 (stays constant!)

We get an infinitely tall, infinitely narrow spike with unit area.
</details>

---

## The Dirac Delta Function

The **unit impulse** or **Dirac delta function** $\delta(t)$ is the limit of $p_\Delta(t)$ as $\Delta \to 0$:

$$\delta(t) = \lim_{\Delta \to 0} p_\Delta(t)$$

[[visual:delta-function-limit]]

### Defining Properties

The delta function is uniquely defined by two properties:

1. **Zero everywhere except origin**: $\delta(t) = 0$ for $t \neq 0$

2. **Unit area (sifting property)**:
$$\int_{-\infty}^{\infty} \delta(t) \, dt = 1$$

> **Important**: $\delta(t)$ is not a function in the traditional sense—it's a **distribution** or **generalized function**. Its value at $t = 0$ is undefined (or symbolically infinite).

---

## The Sifting Property

The most powerful property of the delta function is **sifting**:

$$\int_{-\infty}^{\infty} x(t) \cdot \delta(t-t_0) \, dt = x(t_0)$$

[[visual:sifting-property]]

The delta function "sifts out" the value of $x(t)$ at the location of the impulse!

### Why This Works

Since $\delta(t-t_0)$ is zero everywhere except at $t = t_0$, the integral only "sees" the value of $x(t)$ at that single point.

**Example**: $\int_{-\infty}^{\infty} \cos(t) \cdot \delta(t - \pi/2) \, dt = \cos(\pi/2) = 0$

---

## Unit Step Function

The **unit step function** $u(t)$ is closely related to the impulse:

$$u(t) = \begin{cases} 0 & t < 0 \\ 1 & t \geq 0 \end{cases}$$

[[visual:unit-step-function]]

### Relationship Between Step and Impulse

The derivative of the unit step is the unit impulse:

$$\frac{d}{dt} u(t) = \delta(t)$$

Conversely, the integral of the impulse is the step:

$$\int_{-\infty}^{t} \delta(\tau) \, d\tau = u(t)$$

[[visual:step-impulse-relationship]]

---

## Discrete-Time Unit Impulse

For discrete-time signals, the unit impulse $\delta[n]$ is much simpler:

$$\delta[n] = \begin{cases} 1 & n = 0 \\ 0 & n \neq 0 \end{cases}$$

[[visual:discrete-impulse]]

Unlike the continuous case, $\delta[n]$ is a perfectly ordinary sequence!

### Discrete Unit Step

$$u[n] = \begin{cases} 0 & n < 0 \\ 1 & n \geq 0 \end{cases}$$

And the relationships:
- $\delta[n] = u[n] - u[n-1]$
- $u[n] = \sum_{k=-\infty}^{n} \delta[k]$

---

## Scaled and Shifted Impulses

Impulses can be scaled and shifted:

- **Scaled**: $A\delta(t)$ has area $A$ (strength of impulse)
- **Shifted**: $\delta(t - t_0)$ occurs at time $t_0$

[[visual:scaled-shifted-impulses]]

A train of impulses:
$$x(t) = \sum_{k=-\infty}^{\infty} A_k \delta(t - kT)$$

This represents samples spaced by $T$ seconds with amplitudes $A_k$.

---

## Why Impulses Matter for Systems

The impulse response $h(t)$ completely characterizes any LTI system:

$$\text{Input: } \delta(t) \longrightarrow \boxed{\text{LTI System}} \longrightarrow \text{Output: } h(t)$$

[[visual:impulse-response-system]]

Once we know $h(t)$, we can find the output for ANY input using **convolution**:

$$y(t) = x(t) * h(t) = \int_{-\infty}^{\infty} x(\tau) h(t-\tau) \, d\tau$$

This is the foundation of signal processing!

---

## Summary

| Concept | Continuous-Time | Discrete-Time |
|---------|----------------|---------------|
| Unit Impulse | $\delta(t)$: infinite at origin, zero elsewhere, unit area | $\delta[n]$: equals 1 at n=0, zero elsewhere |
| Unit Step | $u(t)$: 0 for t<0, 1 for t≥0 | $u[n]$: 0 for n<0, 1 for n≥0 |
| Relationship | $\delta(t) = \frac{d}{dt}u(t)$ | $\delta[n] = u[n] - u[n-1]$ |
| Sifting | $\int x(t)\delta(t-t_0)dt = x(t_0)$ | $\sum x[n]\delta[n-n_0] = x[n_0]$ |
