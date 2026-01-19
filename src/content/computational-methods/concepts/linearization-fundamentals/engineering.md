# Linearization Fundamentals - Engineering Applications

## Industry Context

### Circuit Design Workflow

Every analog circuit design follows this pattern:

1. **DC Analysis**: Find operating point (Q-point)
2. **Linearization**: Create small-signal model at Q-point
3. **AC Analysis**: Analyze gain, bandwidth, impedance
4. **Verification**: SPICE simulation confirms both

Linearization is step 2—the bridge between nonlinear reality and linear analysis tools.

---

## Transistor Small-Signal Models

### BJT Small-Signal Model

At DC operating point $(I_C, V_{CE})$:

**Transconductance**: $g_m = I_C / V_T$ where $V_T \approx 26$ mV

**Input resistance**: $r_\pi = \beta / g_m$

**Output resistance**: $r_o = V_A / I_C$ (Early effect)

**Small-signal model**:
```
        ┌───── r_o ─────┐
        │               │
 B ──┬──┤               ├── C
     │  │   gm·vbe      │
    r_π │    ⇓         │
     │  │               │
     └──┴───────────────┴── E
```

### MOSFET Small-Signal Model

At DC operating point $(I_D, V_{GS}, V_{DS})$:

**Transconductance**: $g_m = 2I_D / (V_{GS} - V_{th})$

Or: $g_m = \sqrt{2\mu_n C_{ox} (W/L) I_D}$

**Output resistance**: $r_o = 1 / (\lambda I_D)$

---

## SPICE Operating Point Analysis

### .OP Command

```spice
* Find DC operating point
VCC 1 0 12
R1 1 2 10k
R2 2 0 2.2k
RC 1 3 4.7k
RE 4 0 1k
Q1 3 2 4 2N2222

.OP
.END
```

SPICE output gives you:
- Node voltages
- Branch currents
- Device operating points (IC, VBE, gm, etc.)

### .TF Command (Transfer Function)

```spice
.TF V(3) VIN
```

Computes small-signal gain and impedances by linearization.

---

## Design Example: Common Emitter Amplifier

### Step 1: DC Analysis

**Given**: VCC = 12V, R1 = 47kΩ, R2 = 10kΩ, RC = 2.2kΩ, RE = 1kΩ, β = 100

**Base voltage**: $V_B = V_{CC} \cdot R2/(R1+R2) = 12 \cdot 10/57 = 2.1V$

**Emitter voltage**: $V_E = V_B - 0.7V = 1.4V$

**Collector current**: $I_C \approx I_E = V_E/R_E = 1.4mA$

### Step 2: Linearize

**Transconductance**: $g_m = I_C/V_T = 1.4mA/26mV = 54 mS$

**Input resistance**: $r_\pi = \beta/g_m = 100/0.054 = 1.85 kΩ$

### Step 3: AC Analysis

**Voltage gain** (bypassed RE):
$$A_v = -g_m \cdot R_C = -54mS \cdot 2.2kΩ = -119$$

**Input resistance**:
$$R_{in} = R1 \| R2 \| r_\pi = 47k \| 10k \| 1.85k = 1.55 kΩ$$

---

## Control System Applications

### State-Space Linearization

For nonlinear system: $\dot{x} = f(x, u)$

At equilibrium $(x_0, u_0)$ where $f(x_0, u_0) = 0$:

$$\Delta \dot{x} = A\Delta x + B\Delta u$$

where:
- $A = \partial f/\partial x |_{x_0, u_0}$ (system matrix)
- $B = \partial f/\partial u |_{x_0, u_0}$ (input matrix)

### Example: Inverted Pendulum

**Nonlinear equations** (simplified):
$$\dot{\theta} = \omega$$
$$\dot{\omega} = \frac{g}{l}\sin\theta - \frac{1}{ml^2}u$$

**Linearized around θ = 0** (upright position):
$$\sin\theta \approx \theta$$

$$A = \begin{bmatrix} 0 & 1 \\ g/l & 0 \end{bmatrix}, \quad B = \begin{bmatrix} 0 \\ -1/ml^2 \end{bmatrix}$$

**Eigenvalues of A**: $\lambda = \pm\sqrt{g/l}$ → One positive = unstable!

---

## Power Electronics Linearization

### Buck Converter Averaging

**Switching**: Voltage and current have switching ripple

**Average model**: Replace switch with duty-ratio-weighted sources

**Small-signal model**: Perturb around operating point D

$$\hat{v}_o = G_{vd}(s)\hat{d} + G_{vg}(s)\hat{v}_g$$

where transfer functions come from linearized averaged model.

---

## MATLAB/Python Tools

### Jacobian Computation

```python
import numpy as np
from scipy.misc import derivative

def jacobian(f, x0, epsilon=1e-8):
    """Compute Jacobian matrix numerically."""
    n = len(x0)
    m = len(f(x0))
    J = np.zeros((m, n))
    
    for j in range(n):
        x_plus = x0.copy()
        x_minus = x0.copy()
        x_plus[j] += epsilon
        x_minus[j] -= epsilon
        J[:, j] = (f(x_plus) - f(x_minus)) / (2*epsilon)
    
    return J

# Example: f(x,y) = [x^2 + y, x*y]
def f(x):
    return np.array([x[0]**2 + x[1], x[0]*x[1]])

x0 = np.array([1.0, 2.0])
J = jacobian(f, x0)
print(f"Jacobian at (1,2):\n{J}")
# Should give [[2, 1], [2, 1]]
```

### Stability Analysis

```python
import numpy as np

A = np.array([[0, 1], [2, -3]])  # System matrix
eigenvalues = np.linalg.eigvals(A)

print(f"Eigenvalues: {eigenvalues}")
if all(np.real(eigenvalues) < 0):
    print("System is STABLE")
else:
    print("System is UNSTABLE")
```

---

## Practical Guidelines

### When is Linearization Valid?

Rule of thumb: **±10-20% deviation** from operating point

For more precision, check:
1. Compare linear prediction vs nonlinear simulation
2. If they diverge significantly, reduce signal swing

### Operating Point Selection

Choose operating point for:
- **Desired gain** (gm depends on IC)
- **Linearity** (avoid saturation/cutoff regions)
- **Power consumption** (IC affects power)
- **Noise** (optimal noise figure at specific IC)

---

## Common Pitfalls

### 1. Wrong Operating Point
Linear model only valid near where you linearized!
Different bias → different small-signal parameters.

### 2. Forgetting Large-Signal Limits
Linear model predicts infinite swing. Real devices clip!
Always check: Is output swing within linear region?

### 3. Ignoring Frequency Dependence
Capacitances make small-signal parameters frequency-dependent.
$g_m$ is constant, but $C_{gs}$, $C_{gd}$ add poles/zeros.

---

## Industry Tools

### Circuit Simulation
- **LTspice**: Free, excellent for linear/nonlinear
- **Cadence Spectre**: Industry standard for ICs
- **HSPICE**: High-accuracy analog

### Control System
- **MATLAB Control Toolbox**: State-space, transfer functions
- **Python Control**: Free alternative
- **Simulink**: Block diagram simulation

### Power Electronics
- **PLECS**: Averaged modeling built-in
- **PSIM**: Fast switching simulation
- **LTspice**: With averaged switch models
