# Mathematical Foundations

> Formal definitions and notation that power all analysis.

---

## Formal Definition of a Signal

A **signal** is a function that maps an independent variable to a dependent variable:

$$x: \mathbb{D} \rightarrow \mathbb{R} \text{ (or } \mathbb{C}\text{)}$$

Where:
- $\mathbb{D}$ is the domain (usually time)
- The output is real or complex valued

### Continuous-Time Signal
$$x(t), \quad t \in \mathbb{R}$$

The signal is defined for all real values of $t$.

### Discrete-Time Signal
$$x[n], \quad n \in \mathbb{Z}$$

The signal is defined only for integer values of $n$.

---

## Notation Convention

| Notation | Meaning |
|----------|---------|
| $x(t)$ | Continuous-time signal (parentheses) |
| $x[n]$ | Discrete-time signal (brackets) |
| $x(t_0)$ | Value of signal at specific time $t_0$ |
| $x[n_0]$ | Value at specific sample $n_0$ |

This notation is **universal** in signals and systems literature.

---

## Formal Definition of a System

A **system** is an operator $\mathcal{T}$ that maps input signals to output signals:

$$y(t) = \mathcal{T}\{x(t)\}$$

Or for discrete-time:
$$y[n] = \mathcal{T}\{x[n]\}$$

### Key Properties (Preview)

Systems can have various properties:
- **Linearity**: $\mathcal{T}\{ax_1 + bx_2\} = a\mathcal{T}\{x_1\} + b\mathcal{T}\{x_2\}$
- **Time-invariance**: Shifting input shifts output by same amount
- **Causality**: Output depends only on present and past inputs
- **Stability**: Bounded input produces bounded output

We'll study these in depth later.

---

## Independent vs Dependent Variables

| Variable Type | Role | Example |
|---------------|------|---------|
| **Independent** | What the signal is indexed by | Time $t$, position $x$ |
| **Dependent** | The signal's value | Voltage, temperature |

### Multi-dimensional Signals

Signals can have multiple independent variables:
- **1D**: $x(t)$ — audio
- **2D**: $I(x, y)$ — image intensity
- **3D**: $V(x, y, t)$ — video

---

## Signal Representation

A signal can be represented as:

1. **Explicit formula**: $x(t) = A\cos(\omega t + \phi)$
2. **Graph**: Plotting $x$ vs $t$
3. **Table**: Listing sample values
4. **Differential equation**: Implicitly defined

### Example: Sinusoidal Signal

$$x(t) = A\cos(\omega_0 t + \phi)$$

Where:
- $A$ = amplitude
- $\omega_0$ = angular frequency (rad/s)
- $\phi$ = phase (radians)

This is the most fundamental signal in all of engineering.

---

## System Representation

Systems can be described by:

1. **Input-output equation**: $y(t) = 2x(t) + 3$
2. **Differential equation**: $\frac{dy}{dt} + ay = bx$
3. **Impulse response**: $h(t)$ (for LTI systems)
4. **Transfer function**: $H(s)$ (Laplace domain)

We'll explore all of these representations in this course.
