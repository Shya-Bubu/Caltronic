# Sketching Signals from Equations

> **Narrative thread:** This is the fundamental translation skill. If you cannot convert between equations and graphs, every advanced topic — convolution, Fourier, Laplace — becomes impenetrable.

---

## FROM BASICS: The Language of Graphs

From A-Level maths, you know how to sketch functions like $y = x^2$ or $y = \sin(x)$.

Signal sketching is the same skill, just applied to engineering contexts:
- The horizontal axis is time $t$ (or index $n$)
- The vertical axis is the signal value $x(t)$
- The "shape" tells you everything about the signal's behavior

---

## THE BIG IDEA: Three Standard Building Blocks

Every complex signal can be built from these fundamental shapes:

[[visual:v1]]

The **unit step function** $u(t)$ above is the "switch" — zero for $t < 0$, one for $t \geq 0$.

---

[[visual:v2]]

The **rectangular pulse** $\text{rect}(t)$ is a "box" — equal to 1 for a finite duration, zero elsewhere.

---

[[visual:v3]]

The **triangular pulse** $\text{tri}(t)$ ramps up smoothly to a peak, then ramps down — no discontinuities.

---

## The Unit Step Function

The most important building block:

$$u(t) = \begin{cases} 0 & t < 0 \\ 1 & t \geq 0 \end{cases}$$

**Physical interpretation:** A switch that turns ON at $t = 0$.

### Key Properties
- **Discontinuity** at $t = 0$ (jump from 0 to 1)
- Used to "turn on" other signals at specified times
- $x(t) \cdot u(t-t_0)$ = signal $x(t)$ starting at $t = t_0$

---

## The Rectangular Pulse

$$\text{rect}\left(\frac{t}{T}\right) = \begin{cases} 1 & |t| \leq T/2 \\ 0 & |t| > T/2 \end{cases}$$

```
      ┌───────┐
    1 │       │
      │       │
    0 ┴───────┴────────
      -T/2  0  T/2    t
```

**Physical interpretation:** A signal that exists only for duration $T$.

### Building rect from steps
$$\text{rect}(t/T) = u(t + T/2) - u(t - T/2)$$

---

## The Triangular Pulse

$$\text{tri}\left(\frac{t}{T}\right) = \begin{cases} 1 - |t|/T & |t| \leq T \\ 0 & |t| > T \end{cases}$$

```
        /\
       /  \
    1 /    \
     /      \
    0────────────
    -T    0    T   t
```

**Physical interpretation:** A smooth ramp up and down.

---

## BUILDING UNDERSTANDING: Time Transformations

Once you know the basic shapes, you can transform them:

### Time Shift: $x(t - t_0)$

**Shift RIGHT by $t_0$** (delay)

- $u(t-2)$ = step that turns on at $t = 2$
- $\text{rect}((t-3)/2)$ = rectangle centered at $t = 3$

### Time Reversal: $x(-t)$

**Mirror about $t = 0$**

- Left becomes right, right becomes left
- $u(-t)$ = 1 for $t \leq 0$, 0 for $t > 0$

### Time Scaling: $x(at)$

**If $|a| > 1$:** compressed (faster)
**If $|a| < 1$:** stretched (slower)

- $\text{rect}(2t)$ = narrower rectangle
- $\text{rect}(t/2)$ = wider rectangle

---

## Step-by-Step Sketching Process

Given an equation, follow these steps:

1. **Identify the base shape** — step, rect, triangle, sine?
2. **Find the time shift** — where is it centered?
3. **Check for reversal** — is there a negative inside?
4. **Calculate key points:**
   - Where does it start/end?
   - What's the peak value?
   - Any discontinuities?
5. **Draw and label** — axes, amplitudes, time values

---

## Example: Sketch $x(t) = 2 \cdot \text{rect}\left(\frac{t-1}{4}\right)$

**Step 1:** Base shape = rectangular pulse

**Step 2:** Time shift = centered at $t = 1$

**Step 3:** Duration = $T = 4$, so extends from $t = 1 - 2 = -1$ to $t = 1 + 2 = 3$

**Step 4:** Amplitude = 2

**Sketch:**
```
        ┌───────┐
      2 │       │
        │       │
      0 ┴───────┴────────
       -1   1   3        t
```

---

## Reading Piecewise Definitions

Many signals are defined piecewise:

- If $\text{condition}_1$: value is $\text{expression}_1$
- If $\text{condition}_2$: value is $\text{expression}_2$
- Otherwise: value is 0

**Example:** Ramp signal
- If $0 \leq t \leq 1$: $x(t) = t$
- If $1 < t \leq 2$: $x(t) = 2 - t$
- Otherwise: $x(t) = 0$

This creates a triangular spike from 0 to 2.

---

## The |t| Notation

The absolute value creates **symmetry**:

$$|t| = \begin{cases} t & t \geq 0 \\ -t & t < 0 \end{cases}$$

Any expression with $|t|$ is symmetric about $t = 0$:
- $1 - |t|$ peaks at $t = 0$
- $e^{-|t|}$ is a two-sided exponential decay

---

## From Sketch to Equation

The reverse skill — given a graph, write the equation:

1. **Identify regions** where the signal is non-zero
2. **Determine the expression** in each region (linear? constant?)
3. **Write using piecewise or standard functions**

**Example:** Given a pulse from $t = 2$ to $t = 5$ with amplitude 3:

$$x(t) = 3 \cdot \left[u(t-2) - u(t-5)\right]$$

Or: $x(t) = 3 \cdot \text{rect}\left(\frac{t - 3.5}{3}\right)$

---

## Key Takeaways

1. **Three building blocks:** step $u(t)$, rect, triangle
2. **Time transformations:** shift $(t - t_0)$, reversal $(-t)$, scaling $(at)$
3. **Sketching process:** identify shape → find key points → draw
4. **Piecewise reading:** understand each region separately
5. **Equation from sketch:** reverse the process

---

*Congratulations! You've completed the foundations of Signals and Systems. Next lesson covers system properties and analysis.*
