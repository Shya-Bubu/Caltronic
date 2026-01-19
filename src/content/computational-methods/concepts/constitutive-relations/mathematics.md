# Constitutive Relations - Mathematical Framework

## Formal Definition

A constitutive relation is a functional relationship between the voltage across and current through a two-terminal element:

$$f(v, i, t) = 0$$

Or more generally, including derivatives:

$$f(v, \dot{v}, \ddot{v}, ..., i, \dot{i}, \ddot{i}, ..., t) = 0$$

---

## Classification of Two-Terminal Elements

### By State Dependence

**Memoryless (Algebraic)**:
$$f(v, i, t) = 0$$

Current depends only on current voltage (and vice versa).

**With Memory (Dynamic)**:
$$f(v, i, \dot{v}, \dot{i}, ...) = 0$$

Current depends on voltage history.

### By Linearity

**Linear Time-Invariant (LTI)**:
If $(v_1, i_1)$ and $(v_2, i_2)$ satisfy the constitutive relation, then so does:
$$(\alpha v_1 + \beta v_2, \alpha i_1 + \beta i_2)$$

**Nonlinear**:
Superposition does not hold.

---

## Linear Passive Elements

### Resistor

**Time Domain**:
$$v(t) = R \cdot i(t)$$

**Frequency Domain**:
$$V(s) = R \cdot I(s)$$
$$Z_R(s) = R$$

**Power**:
$$p(t) = v(t) \cdot i(t) = i^2(t)R = \frac{v^2(t)}{R} \geq 0$$

Always dissipative.

### Capacitor

**Time Domain**:
$$i(t) = C\frac{dv(t)}{dt}$$

**Integral Form**:
$$v(t) = \frac{1}{C}\int_{-\infty}^{t} i(\tau) d\tau = \frac{q(t)}{C}$$

**Frequency Domain** (Laplace):
$$I(s) = sCV(s) - Cv(0^-)$$
$$Z_C(s) = \frac{1}{sC}$$

**Frequency Domain** (Fourier):
$$Z_C(j\omega) = \frac{1}{j\omega C}$$

**Energy Stored**:
$$W_C = \frac{1}{2}Cv^2 = \frac{1}{2}\frac{q^2}{C}$$

### Inductor

**Time Domain**:
$$v(t) = L\frac{di(t)}{dt}$$

**Integral Form**:
$$i(t) = \frac{1}{L}\int_{-\infty}^{t} v(\tau) d\tau = \frac{\phi(t)}{L}$$

**Frequency Domain** (Laplace):
$$V(s) = sLI(s) - Li(0^-)$$
$$Z_L(s) = sL$$

**Frequency Domain** (Fourier):
$$Z_L(j\omega) = j\omega L$$

**Energy Stored**:
$$W_L = \frac{1}{2}Li^2 = \frac{1}{2}\frac{\phi^2}{L}$$

---

## State-Variable Formulation

For circuits with capacitors and inductors, the state vector is:
$$\mathbf{x} = \begin{bmatrix} \mathbf{v}_C \\ \mathbf{i}_L \end{bmatrix}$$

**Constitutive relations in matrix form**:
$$\mathbf{C}\frac{d\mathbf{v}_C}{dt} = \mathbf{i}_C$$
$$\mathbf{L}\frac{d\mathbf{i}_L}{dt} = \mathbf{v}_L$$

Where $\mathbf{C}$ and $\mathbf{L}$ are diagonal matrices (or symmetric positive definite for coupled elements).

**Energy function** (Lyapunov candidate):
$$W = \frac{1}{2}\mathbf{v}_C^T\mathbf{C}\mathbf{v}_C + \frac{1}{2}\mathbf{i}_L^T\mathbf{L}\mathbf{i}_L \geq 0$$

---

## Nonlinear Constitutive Relations

### Diode (Shockley Equation)

$$i = I_s\left(e^{v/(nV_T)} - 1\right)$$

**Linearization** around operating point $(V_D, I_D)$:

$$\Delta i = \frac{dI}{dV}\bigg|_{V_D} \Delta v = \frac{I_D + I_s}{nV_T} \Delta v \approx \frac{I_D}{nV_T}\Delta v$$

**Small-signal conductance**:
$$g_d = \frac{I_D}{nV_T}$$

**Small-signal resistance**:
$$r_d = \frac{nV_T}{I_D}$$

### MOSFET (Square Law, Saturation Region)

$$I_D = \frac{\mu_n C_{ox}}{2}\frac{W}{L}(V_{GS} - V_{TH})^2(1 + \lambda V_{DS})$$

**Transconductance** (small-signal):
$$g_m = \frac{\partial I_D}{\partial V_{GS}} = \sqrt{2\mu_n C_{ox}\frac{W}{L}I_D}$$

**Output conductance** (small-signal):
$$g_o = \frac{\partial I_D}{\partial V_{DS}} = \lambda I_D$$

---

## Coupled Elements

### Mutual Inductance

For two coupled inductors:
$$v_1 = L_1\frac{di_1}{dt} + M\frac{di_2}{dt}$$
$$v_2 = M\frac{di_1}{dt} + L_2\frac{di_2}{dt}$$

**Matrix form**:
$$\mathbf{v} = \mathbf{L}\frac{d\mathbf{i}}{dt}$$

where $\mathbf{L} = \begin{bmatrix} L_1 & M \\ M & L_2 \end{bmatrix}$

**Constraint** (passivity): $M^2 \leq L_1 L_2$

**Coupling coefficient**: $k = \frac{M}{\sqrt{L_1 L_2}} \leq 1$

### Ideal Transformer

$$v_1 = n \cdot v_2$$
$$i_1 = -\frac{i_2}{n}$$

**Turns ratio**: $n = N_1/N_2$

Not strictly a constitutive relation (relates two ports), but useful in modeling.

---

## Impedance and Admittance

### General Definitions (Frequency Domain)

**Impedance**:
$$Z(s) = \frac{V(s)}{I(s)}$$

**Admittance**:
$$Y(s) = \frac{I(s)}{V(s)} = \frac{1}{Z(s)}$$

### Passivity Conditions

A one-port is passive if and only if:

1. **Real Part Condition**: $\text{Re}[Z(j\omega)] \geq 0$ for all $\omega$
2. **Positive Real**: $Z(s)$ is analytic for Re(s) > 0, and Re[Z(s)] ≥ 0 for Re(s) > 0

### Foster and Cauer Realizations

Any positive real impedance can be realized using only R, L, C elements.

**Foster Form I** (series):
$$Z(s) = R_0 + sL_0 + \frac{1}{sC_0} + \sum_{k=1}^{n} \frac{s}{s^2 + \omega_k^2}\cdot \frac{2\sigma_k}{\omega_k}$$

---

## Passivity and Losslessness

### Definitions

**Passive**: Cannot generate energy
$$\int_{-\infty}^{t} p(\tau) d\tau = \int_{-\infty}^{t} v(\tau)i(\tau) d\tau \geq -W_{stored}(0)$$

**Lossless**: Neither generates nor dissipates energy
$$\int_{0}^{T} v(t)i(t) dt = W_{stored}(T) - W_{stored}(0)$$

for any T.

**Active**: Can generate energy (sources, amplifiers)

### Properties

| Element | Passive | Lossless |
|---------|---------|----------|
| Resistor (R > 0) | Yes | No |
| Capacitor | Yes | Yes |
| Inductor | Yes | Yes |
| Ideal diode | Yes | Yes |
| Voltage source | No (active) | N/A |
| Current source | No (active) | N/A |

---

## Summary of Key Formulas

| Element | Time Domain | Impedance Z(s) | Energy |
|---------|-------------|----------------|--------|
| Resistor | v = iR | R | Dissipated: $\int i^2 R \, dt$ |
| Capacitor | i = C dv/dt | 1/(sC) | $W = \frac{1}{2}Cv^2$ |
| Inductor | v = L di/dt | sL | $W = \frac{1}{2}Li^2$ |

| Nonlinear Element | Relation | Small-Signal Model |
|-------------------|----------|-------------------|
| Diode | $i = I_s(e^{v/V_T} - 1)$ | $r_d = V_T/I_D$ |
| MOSFET (sat) | $I_D = \frac{k}{2}(V_{GS}-V_{TH})^2$ | $g_m = \sqrt{2kI_D}$ |

| Coupled Element | Relations |
|-----------------|-----------|
| Mutual Inductance | $v_1 = L_1\dot{i}_1 + M\dot{i}_2$ |
| Transformer | $v_1/v_2 = n$, $i_1 \cdot i_2 = -1/n$ |
