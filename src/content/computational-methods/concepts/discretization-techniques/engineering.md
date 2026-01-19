# Discretization Techniques - Engineering Applications

## Industry Applications

### 1. SPICE Circuit Simulation

**Transient Analysis** uses time discretization:
- Converts circuit ODEs into algebraic equations at each time step
- Adaptive step sizing: smaller steps during fast transitions
- Methods: Backward Euler (stable), Trapezoidal (accurate)

```spice
.TRAN 1n 100u    ; Step suggestion, stop time
.OPTIONS RELTOL=1e-3 ABSTOL=1e-9
```

**What happens inside SPICE**:
1. Form circuit equations (KCL/KVL)
2. Discretize: $C \frac{dv}{dt} \rightarrow C \frac{v_{n+1} - v_n}{\Delta t}$
3. Solve algebraic system at each time point
4. Adapt step size based on local error

---

### 2. Finite Element Analysis (FEA)

**Electromagnetic field problems** require spatial discretization:

- Maxwell's equations are PDEs on continuous space
- FEA discretizes into mesh of triangles/tetrahedra
- Finer mesh near important features (edges, corners)

**Tools**: COMSOL, ANSYS Maxwell, HFSS

**Design considerations**:
- Mesh density vs. computation time
- Mesh quality (aspect ratio, skewness)
- Convergence studies: refine until answer stabilizes

---

### 3. Digital Signal Processing

**Sampling IS discretization**:

- Continuous audio/RF signal → discrete samples
- ADC resolution: amplitude discretization (quantization)
- Sample rate: time discretization

**Practical Sampling Rates**:
| Application | Sample Rate | Nyquist Limit |
|-------------|-------------|---------------|
| CD Audio | 44.1 kHz | 22.05 kHz |
| Professional Audio | 96 kHz | 48 kHz |
| Ultrasound | 40 MHz | 20 MHz |
| Oscilloscope | 1+ GHz | 500+ MHz |

---

## Design Example: RC Circuit Simulation

**Circuit**: Simple RC low-pass filter
- R = 1 kΩ, C = 1 µF
- Time constant τ = RC = 1 ms
- Input: Step voltage 0→5V

**Differential Equation**:
$$RC\frac{dv_{out}}{dt} + v_{out} = v_{in}$$

### Euler Method Implementation

```python
import numpy as np
import matplotlib.pyplot as plt

R = 1000  # Ohms
C = 1e-6  # Farads
tau = R * C  # Time constant

dt = 0.0001  # Time step (100 µs)
t_end = 0.005  # Simulate for 5 ms
t = np.arange(0, t_end, dt)

v_in = 5  # Step input
v_out = np.zeros(len(t))
v_out[0] = 0  # Initial condition

# Forward Euler
for i in range(len(t)-1):
    dvdt = (v_in - v_out[i]) / tau
    v_out[i+1] = v_out[i] + dt * dvdt

# Compare with analytical
v_analytical = v_in * (1 - np.exp(-t/tau))

plt.plot(t*1000, v_out, label='Euler')
plt.plot(t*1000, v_analytical, '--', label='Analytical')
```

### Stability Consideration

For the RC equation, stability requires:
$$\Delta t < 2\tau = 2RC = 2 \text{ ms}$$

Our choice of dt = 0.1 ms is well within stability limit ✓

---

## Anti-Aliasing Filter Design

**Problem**: Sample 10 kHz signal at 44.1 kHz

**Nyquist frequency**: 22.05 kHz

**Anti-aliasing filter specs**:
- Passband: 0-10 kHz (signal of interest)
- Stopband: >22.05 kHz (must attenuate to prevent aliasing)
- Transition band: 10-22 kHz

**Filter order estimation**:
$$N \approx \frac{A_s - 7.95}{14.36 \cdot \Delta f / f_s}$$

where $A_s$ = stopband attenuation in dB, $\Delta f$ = transition width

For 60 dB attenuation: N ≈ 5th order Butterworth sufficient

---

## PCB Thermal Analysis

**Heat equation**:
$$\rho c_p \frac{\partial T}{\partial t} = k \nabla^2 T + Q$$

**Discretization approach**:
1. **Spatial**: Finite difference grid on PCB layers
2. **Temporal**: Implicit method for stability

**Grid sizing rules**:
- Minimum 3-5 elements across heat source width
- Finer grid in high-gradient regions
- Coarser grid far from sources

---

## Practical Guidelines

### Choosing Time Step

| System | Characteristic Time | Suggested dt |
|--------|--------------------| -------------|
| RC circuit | τ = RC | dt < τ/10 |
| LC circuit | T = 2π√(LC) | dt < T/20 |
| Switching converter | 1/f_sw | dt < 1/(100·f_sw) |
| MOSFET transient | Rise time | dt < t_r/10 |

### Grid Independence Study

Always verify your discretization is fine enough:
1. Run simulation with grid spacing h
2. Run with h/2
3. If results differ significantly, h was too coarse
4. Continue until results converge

---

## Common Pitfalls

### 1. Ignoring Stability Limits
**Symptom**: Solution oscillates or blows up
**Fix**: Reduce time step or use implicit method

### 2. Insufficient Resolution
**Symptom**: Missing fast transients, wrong peak values
**Fix**: Finer grid in regions of rapid change

### 3. Aliasing in Sampled Data
**Symptom**: Low-frequency artifacts, "beating"
**Fix**: Anti-aliasing filter before sampling

### 4. Numerical Dispersion
**Symptom**: Waves travel at wrong speed in simulation
**Fix**: Higher-order methods or finer grid

---

## Tools and Software

### Circuit Simulation
- **LTspice** (free): Excellent for analog circuits
- **PSpice**: Industry standard
- **Spectre**: High-accuracy for RF/analog IC

### Field Solvers
- **COMSOL**: Multiphysics FEA
- **ANSYS HFSS**: RF/microwave
- **Sonnet**: Planar EM

### General Purpose
- **MATLAB**: Scripting, custom methods
- **Python + NumPy/SciPy**: Free alternative
- **Octave**: Free MATLAB clone
