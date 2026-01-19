# What is Mathematical Modeling? - Mathematical Framework

## Formal Definition

A mathematical model is a mapping $\mathcal{M}$ from a physical system $\Sigma$ to a mathematical structure $\mathcal{S}$:

$$\mathcal{M}: \Sigma \rightarrow \mathcal{S}$$

where the mathematical structure typically consists of:
- A set of state variables $\mathbf{x} \in \mathbb{R}^n$
- A set of input variables $\mathbf{u} \in \mathbb{R}^m$
- A set of output variables $\mathbf{y} \in \mathbb{R}^p$
- Governing equations relating these variables

---

## Classification of Mathematical Models

### By Equation Type

| Type | General Form | Example |
|------|--------------|---------|
| **Algebraic** | $f(\mathbf{x}, \mathbf{u}) = 0$ | Resistive networks |
| **ODE** | $\dot{\mathbf{x}} = f(\mathbf{x}, \mathbf{u}, t)$ | Lumped circuits |
| **PDE** | $\frac{\partial x}{\partial t} = f(x, \nabla x, \nabla^2 x, t)$ | Transmission lines |
| **DAE** | $f(\mathbf{x}, \dot{\mathbf{x}}, \mathbf{u}, t) = 0$ | Constrained systems |
| **Integral** | $x(t) = \int K(t,\tau)u(\tau)d\tau$ | Convolution systems |

### By System Properties

**Linearity**:
- Linear: $f(\alpha x_1 + \beta x_2) = \alpha f(x_1) + \beta f(x_2)$
- Nonlinear: Violates superposition

**Time-Invariance**:
- Time-invariant: $f(x, t) = f(x)$
- Time-varying: Parameters change with time

**Memory**:
- Memoryless: Output depends only on current input
- Dynamic: Output depends on input history

---

## State-Space Representation

The most general form for lumped dynamic systems:

### Continuous-Time State Equations

**Linear Time-Invariant (LTI)**:
$$\dot{\mathbf{x}}(t) = \mathbf{A}\mathbf{x}(t) + \mathbf{B}\mathbf{u}(t)$$
$$\mathbf{y}(t) = \mathbf{C}\mathbf{x}(t) + \mathbf{D}\mathbf{u}(t)$$

where:
- $\mathbf{x} \in \mathbb{R}^n$ is the state vector
- $\mathbf{u} \in \mathbb{R}^m$ is the input vector
- $\mathbf{y} \in \mathbb{R}^p$ is the output vector
- $\mathbf{A} \in \mathbb{R}^{n \times n}$ is the system matrix
- $\mathbf{B} \in \mathbb{R}^{n \times m}$ is the input matrix
- $\mathbf{C} \in \mathbb{R}^{p \times n}$ is the output matrix
- $\mathbf{D} \in \mathbb{R}^{p \times m}$ is the feedthrough matrix

**Nonlinear System**:
$$\dot{\mathbf{x}}(t) = \mathbf{f}(\mathbf{x}(t), \mathbf{u}(t), t)$$
$$\mathbf{y}(t) = \mathbf{g}(\mathbf{x}(t), \mathbf{u}(t), t)$$

### Discrete-Time State Equations

$$\mathbf{x}[k+1] = \mathbf{A}_d\mathbf{x}[k] + \mathbf{B}_d\mathbf{u}[k]$$
$$\mathbf{y}[k] = \mathbf{C}_d\mathbf{x}[k] + \mathbf{D}_d\mathbf{u}[k]$$

---

## Transfer Function Representation

For LTI systems, taking Laplace transforms:

$$\mathbf{Y}(s) = \mathbf{H}(s)\mathbf{U}(s)$$

where the transfer function matrix is:

$$\mathbf{H}(s) = \mathbf{C}(s\mathbf{I} - \mathbf{A})^{-1}\mathbf{B} + \mathbf{D}$$

### Single-Input Single-Output (SISO) Systems

$$H(s) = \frac{Y(s)}{U(s)} = \frac{b_m s^m + b_{m-1} s^{m-1} + \cdots + b_0}{a_n s^n + a_{n-1} s^{n-1} + \cdots + a_0}$$

Properties:
- Poles: roots of denominator (system modes)
- Zeros: roots of numerator (transmission nulls)
- Proper: degree of numerator ≤ degree of denominator

---

## Derivation of Circuit Models

### Systematic Procedure (Modified Nodal Analysis)

Given a circuit with:
- $n$ nodes (including ground)
- $b$ branches

**Step 1**: Define variables
- Node voltages: $v_1, v_2, \ldots, v_{n-1}$
- Branch currents for voltage sources and inductors

**Step 2**: Write KCL at each node
$$\sum_{\text{entering}} i_k = \sum_{\text{leaving}} i_j$$

**Step 3**: Substitute constitutive relations

**Step 4**: Formulate matrix equation:
$$\mathbf{Y}\mathbf{v} = \mathbf{i}_s$$

where $\mathbf{Y}$ is the admittance matrix.

### Example: RLC Circuit

```
    ┌───R───┬───L───┐
    │       │       │
   (+)      C      (-)
   Vin      │      Vout
    │       │       │
    └───────┴───────┘
```

**Defining state variables**: $x_1 = v_C$ (capacitor voltage), $x_2 = i_L$ (inductor current)

**KVL**: $v_{in} = v_R + v_C + v_L = Ri_L + v_C + L\frac{di_L}{dt}$

**Capacitor**: $i_C = C\frac{dv_C}{dt}$, and by KCL: $i_C = i_L$

**State equations**:
$$\frac{dv_C}{dt} = \frac{1}{C}i_L$$
$$\frac{di_L}{dt} = -\frac{1}{L}v_C - \frac{R}{L}i_L + \frac{1}{L}v_{in}$$

**Matrix form**:
$$\begin{bmatrix} \dot{v}_C \\ \dot{i}_L \end{bmatrix} = \begin{bmatrix} 0 & \frac{1}{C} \\ -\frac{1}{L} & -\frac{R}{L} \end{bmatrix} \begin{bmatrix} v_C \\ i_L \end{bmatrix} + \begin{bmatrix} 0 \\ \frac{1}{L} \end{bmatrix} v_{in}$$

**Transfer function**:
$$H(s) = \frac{V_C(s)}{V_{in}(s)} = \frac{1/LC}{s^2 + \frac{R}{L}s + \frac{1}{LC}}$$

---

## Model Reduction Techniques

### Dominant Pole Approximation

If system has poles $p_1, p_2, \ldots, p_n$ with $|p_1| \ll |p_i|$ for $i > 1$:

$$H(s) \approx \frac{K}{s - p_1}$$

The "slow" pole dominates the response.

### Balanced Truncation

For state-space models, transform to balanced coordinates where controllability and observability Gramians are equal and diagonal:

$$\mathbf{P} = \mathbf{Q} = \text{diag}(\sigma_1, \sigma_2, \ldots, \sigma_n)$$

Truncate states with small $\sigma_i$ (Hankel singular values).

---

## Linearization of Nonlinear Models

Given nonlinear system:
$$\dot{\mathbf{x}} = \mathbf{f}(\mathbf{x}, \mathbf{u})$$

**Step 1**: Find equilibrium point $(\mathbf{x}_0, \mathbf{u}_0)$ where $\mathbf{f}(\mathbf{x}_0, \mathbf{u}_0) = \mathbf{0}$

**Step 2**: Define perturbation variables:
$$\delta\mathbf{x} = \mathbf{x} - \mathbf{x}_0, \quad \delta\mathbf{u} = \mathbf{u} - \mathbf{u}_0$$

**Step 3**: Taylor expand:
$$\dot{\delta\mathbf{x}} = \frac{\partial \mathbf{f}}{\partial \mathbf{x}}\bigg|_{\mathbf{x}_0, \mathbf{u}_0} \delta\mathbf{x} + \frac{\partial \mathbf{f}}{\partial \mathbf{u}}\bigg|_{\mathbf{x}_0, \mathbf{u}_0} \delta\mathbf{u} + O(\delta^2)$$

**Result**: Linear approximation valid for small perturbations:
$$\mathbf{A} = \frac{\partial \mathbf{f}}{\partial \mathbf{x}}\bigg|_{\mathbf{x}_0, \mathbf{u}_0}, \quad \mathbf{B} = \frac{\partial \mathbf{f}}{\partial \mathbf{u}}\bigg|_{\mathbf{x}_0, \mathbf{u}_0}$$

---

## Model Norms and Error Metrics

### H-infinity Norm

For measuring "worst-case" model error:

$$\|H\|_{\infty} = \sup_{\omega} |H(j\omega)| = \sup_{\omega} \sigma_{\max}(\mathbf{H}(j\omega))$$

**Interpretation**: Maximum gain over all frequencies.

### H2 Norm

For measuring "average" error:

$$\|H\|_2 = \sqrt{\frac{1}{2\pi}\int_{-\infty}^{\infty} |H(j\omega)|^2 d\omega}$$

**Interpretation**: RMS gain, related to output energy for white noise input.

### Model Error

Given true system $H(s)$ and approximation $\hat{H}(s)$:

$$\text{Relative Error} = \frac{\|H - \hat{H}\|}{\|H\|}$$

---

## Theorem: Uniqueness of State-Space Realizations

**Statement**: State-space realizations of a transfer function are unique up to similarity transformation.

If $(\mathbf{A}, \mathbf{B}, \mathbf{C}, \mathbf{D})$ is a realization of $H(s)$, then so is $(\mathbf{T}^{-1}\mathbf{A}\mathbf{T}, \mathbf{T}^{-1}\mathbf{B}, \mathbf{C}\mathbf{T}, \mathbf{D})$ for any invertible $\mathbf{T}$.

**Implication**: Many different state-space models represent the same input-output behavior.

---

## Summary of Mathematical Structures

| Model Form | Advantages | Disadvantages |
|------------|------------|---------------|
| Transfer function | Direct I/O relationship | Only for LTI, SISO limited |
| State-space | Handles MIMO, numerical methods | State choice not unique |
| Frequency response | Direct from measurement | No transient information |
| Impulse response | Time-domain behavior | Requires convolution |

---

## Key Formulas Reference

| Concept | Formula |
|---------|---------|
| State equation | $\dot{\mathbf{x}} = \mathbf{Ax} + \mathbf{Bu}$ |
| Output equation | $\mathbf{y} = \mathbf{Cx} + \mathbf{Du}$ |
| Transfer function | $\mathbf{H}(s) = \mathbf{C}(s\mathbf{I}-\mathbf{A})^{-1}\mathbf{B} + \mathbf{D}$ |
| Eigenvalues (poles) | $\det(s\mathbf{I} - \mathbf{A}) = 0$ |
| Time constant | $\tau = -1/\text{Re}(p)$ for pole $p$ |
| Natural frequency | $\omega_n = |p|$ for complex pole |
| Damping ratio | $\zeta = -\text{Re}(p)/|p|$ |
