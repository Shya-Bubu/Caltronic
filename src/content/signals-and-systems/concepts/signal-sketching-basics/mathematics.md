# Mathematical Foundations

> Standard pulse definitions and properties.

---

## The Unit Step Function

$$u(t) = \begin{cases} 1 & t \geq 0 \\ 0 & t < 0 \end{cases}$$

This is the fundamental "switch" function.

### Key Uses
- "Turn on" signals at t = 0
- Create rectangular pulses
- Express piecewise functions compactly

---

## Building Pulses with Step Functions

### Rectangular pulse from $-T$ to $+T$:
$$x(t) = u(t + T) - u(t - T)$$

- $u(t + T)$ turns on at $t = -T$
- $u(t - T)$ turns on at $t = T$
- Difference gives pulse from $-T$ to $T$

---

## Standard Pulse Definitions

### Rectangle Function
$$\text{rect}\left(\frac{t}{\tau}\right) = \begin{cases} 1 & |t| \leq \tau/2 \\ 0 & |t| > \tau/2 \end{cases}$$

Width = $\tau$, centered at origin.

### Triangle Function
$$\text{tri}\left(\frac{t}{\tau}\right) = \begin{cases} 1 - \frac{|t|}{\tau} & |t| \leq \tau \\ 0 & |t| > \tau \end{cases}$$

Base width = $2\tau$, height = 1.

---

## Properties of |t|

The absolute value creates symmetry:

$$f(|t|) \text{ is always even: } f(|-t|) = f(|t|)$$

### Derivative (Careful!)
$$\frac{d|t|}{dt} = \text{sgn}(t) = \begin{cases} 1 & t > 0 \\ -1 & t < 0 \end{cases}$$

Not defined at $t = 0$.

---

## Integration of Pulses

### Rectangular Pulse Energy
$$E = \int_{-T}^{T} 1^2 \, dt = 2T$$

### Triangular Pulse Energy
$$E = \int_{-T}^{T} \left(1 - \frac{|t|}{T}\right)^2 dt = \frac{2T}{3}$$

---

## Scaling and Shifting

### Time Scaling: $x(at)$
- $|a| > 1$: Compression (narrower)
- $|a| < 1$: Expansion (wider)

### Time Shifting: $x(t - t_0)$
- $t_0 > 0$: Shift right (delay)
- $t_0 < 0$: Shift left (advance)

These operations are fundamental for signal manipulation.

---

## Writing Equations from Graphs

**Method:**
1. Identify the shape (rectangular, triangular, etc.)
2. Find the boundaries (where does it start/end?)
3. Find the amplitude
4. Apply scaling/shifting to standard functions

**Example:** Triangle from $t = 1$ to $t = 5$, peak of 2 at $t = 3$
$$x(t) = 2 \cdot \text{tri}\left(\frac{t-3}{2}\right)$$
