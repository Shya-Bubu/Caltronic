# What is Mathematical Modeling? - Exam Preparation

## Key Concepts Checklist

- [ ] Define mathematical model and its purpose
- [ ] Distinguish lumped vs distributed models
- [ ] Classify models by equation type (algebraic, ODE, PDE)
- [ ] Write state-space equations from circuit schematics
- [ ] Convert between state-space and transfer function forms
- [ ] Linearize nonlinear systems around operating points
- [ ] Identify model assumptions and their implications

---

## Common Exam Question Types

### Type 1: Model Classification

**Question Pattern**: "For the following system, identify the appropriate model type and justify your choice."

**Strategy**:
1. Check if spatial variation matters → lumped vs distributed
2. Check if time variation matters → static vs dynamic
3. Check if superposition applies → linear vs nonlinear
4. Check equation type → algebraic, ODE, PDE

**Example**:
> A 10 cm PCB trace carrying a 1 GHz signal.

**Answer**: Distributed model required because trace length (10 cm) is comparable to wavelength (λ = c/f = 30 cm for 1 GHz). Lumped model would fail because electromagnetic wave effects are significant.

---

### Type 2: Derive State Equations

**Question Pattern**: "For the circuit shown, derive the state-space model."

**Strategy**:
1. Identify energy storage elements (C, L) → these are state variables
2. Write equations for each:
   - Capacitor: $\frac{dv_C}{dt} = \frac{i_C}{C}$
   - Inductor: $\frac{di_L}{dt} = \frac{v_L}{L}$
3. Use KCL/KVL to express $i_C$ and $v_L$ in terms of states
4. Arrange into matrix form

**Example Circuit**:
```
    R          L
   ─┬─\/\/\/─┬─⊃⊃⊃─┐
    │        │     │
   (+)       │    (-)
   Vin      ═╪═ C  Vout
    │        │     │
   ─┴────────┴─────┘
```

**Solution**:

States: $x_1 = v_C$, $x_2 = i_L$

From capacitor: $\frac{dv_C}{dt} = \frac{i_L}{C}$

From KVL: $v_{in} = Ri_L + L\frac{di_L}{dt} + v_C$

Rearranging: $\frac{di_L}{dt} = -\frac{R}{L}i_L - \frac{1}{L}v_C + \frac{1}{L}v_{in}$

**State-space form**:
$$\begin{bmatrix} \dot{v}_C \\ \dot{i}_L \end{bmatrix} = \begin{bmatrix} 0 & 1/C \\ -1/L & -R/L \end{bmatrix} \begin{bmatrix} v_C \\ i_L \end{bmatrix} + \begin{bmatrix} 0 \\ 1/L \end{bmatrix} v_{in}$$

Output ($v_{out} = v_C$):
$$y = \begin{bmatrix} 1 & 0 \end{bmatrix} \begin{bmatrix} v_C \\ i_L \end{bmatrix}$$

---

### Type 3: Transfer Function Derivation

**Question Pattern**: "Find the transfer function from the state-space model."

**Formula**:
$$H(s) = \mathbf{C}(s\mathbf{I} - \mathbf{A})^{-1}\mathbf{B} + D$$

**Example** (continuing from above):

$s\mathbf{I} - \mathbf{A} = \begin{bmatrix} s & -1/C \\ 1/L & s+R/L \end{bmatrix}$

$(s\mathbf{I} - \mathbf{A})^{-1} = \frac{1}{s^2 + \frac{R}{L}s + \frac{1}{LC}} \begin{bmatrix} s+R/L & 1/C \\ -1/L & s \end{bmatrix}$

$H(s) = \begin{bmatrix} 1 & 0 \end{bmatrix} \frac{1}{s^2 + \frac{R}{L}s + \frac{1}{LC}} \begin{bmatrix} s+R/L & 1/C \\ -1/L & s \end{bmatrix} \begin{bmatrix} 0 \\ 1/L \end{bmatrix}$

$$H(s) = \frac{1/LC}{s^2 + \frac{R}{L}s + \frac{1}{LC}}$$

---

### Type 4: Linearization

**Question Pattern**: "Linearize the following nonlinear system about the given operating point."

**Strategy**:
1. Find equilibrium: Set $\dot{\mathbf{x}} = 0$, solve for $\mathbf{x}_0$
2. Compute Jacobians: $\mathbf{A} = \frac{\partial \mathbf{f}}{\partial \mathbf{x}}$, $\mathbf{B} = \frac{\partial \mathbf{f}}{\partial \mathbf{u}}$
3. Evaluate at operating point

**Example**:
> Linearize $\dot{x} = u - x^2$ about equilibrium for $u_0 = 4$.

**Solution**:

Equilibrium: $0 = 4 - x_0^2 \Rightarrow x_0 = 2$ (taking positive root)

Linearize: $\frac{\partial f}{\partial x} = -2x$, $\frac{\partial f}{\partial u} = 1$

At operating point: $A = -2(2) = -4$, $B = 1$

**Linear model**: $\delta\dot{x} = -4\delta x + \delta u$

---

### Type 5: Model Validity Assessment

**Question Pattern**: "Under what conditions is the following model valid/invalid?"

**Key Considerations**:

| Model Assumption | Validity Condition |
|-----------------|-------------------|
| Lumped elements | Dimensions << wavelength |
| Linear | Small signals, no saturation |
| Time-invariant | Constant parameters |
| Ideal components | Parasitic effects negligible |

**Example**:
> "When would the ideal op-amp model fail?"

**Answer**: The ideal op-amp model fails when:
1. Signal frequency approaches GBW product (finite bandwidth)
2. Output voltage approaches rail voltages (saturation)
3. Slew rate is exceeded during fast transients
4. Input bias current matters (not infinite input impedance)
5. Common-mode rejection is important (not infinite CMRR)

---

## Worked Exam Problems

### Problem 1: Model Selection (5 marks)

**Q**: A digital signal with 100 ps rise time travels through a 15 cm interconnect on a PCB (εr = 4). Determine whether a lumped or distributed model is needed.

**Solution**:

Step 1: Calculate wavelength of equivalent frequency
- Rise time tr = 100 ps → equivalent bandwidth ≈ 0.35/tr = 3.5 GHz
- Wavelength in PCB: λ = c/(f√εr) = 3×10⁸/(3.5×10⁹×2) = 4.3 cm

Step 2: Compare to interconnect length
- Trace length = 15 cm
- Length/wavelength = 15/4.3 = 3.5

Step 3: Decision criterion
- If length < λ/10, lumped model OK
- Here, length ≈ 3.5λ >> λ/10

**Conclusion**: Distributed (transmission line) model required. ✓

---

### Problem 2: State-Space Derivation (10 marks)

**Q**: Derive the state-space model for the circuit below with states x₁ = iL and x₂ = vC.

```
        R₁        L
    ───/\/\/──┬──⊃⊃⊃──┬───
              │       │
    Vin      R₂      ═╪═ C    Vout
              │       │
    ──────────┴───────┴───
```

**Solution**:

Step 1: Write KVL around outer loop
$$V_{in} = R_1(i_{R1}) + L\frac{di_L}{dt} + v_C$$

Step 2: Note that $i_{R1} = i_L + i_{R2}$ and $i_{R2} = v_C/R_2$ (since R₂ || C)

Step 3: Write capacitor equation
$$C\frac{dv_C}{dt} = i_L - \frac{v_C}{R_2}$$

Step 4: Substitute into KVL and solve for $\frac{di_L}{dt}$
$$\frac{di_L}{dt} = \frac{1}{L}V_{in} - \frac{R_1}{L}i_L - \frac{R_1}{LR_2}v_C - \frac{1}{L}v_C$$

Step 5: Matrix form
$$\begin{bmatrix} \dot{i}_L \\ \dot{v}_C \end{bmatrix} = \begin{bmatrix} -R_1/L & -(1+R_1/R_2)/L \\ 1/C & -1/(R_2C) \end{bmatrix} \begin{bmatrix} i_L \\ v_C \end{bmatrix} + \begin{bmatrix} 1/L \\ 0 \end{bmatrix} V_{in}$$

$$y = v_C = \begin{bmatrix} 0 & 1 \end{bmatrix} \begin{bmatrix} i_L \\ v_C \end{bmatrix}$$

---

### Problem 3: Linearization (10 marks)

**Q**: A diode-resistor circuit has the equation:
$$i = I_s(e^{v/V_T} - 1) = \frac{V_{in} - v}{R}$$

Linearize about operating point V_in = 0.7V, I_s = 10⁻¹² A, V_T = 26 mV, R = 1 kΩ.

**Solution**:

Step 1: Find DC operating point
Solve iteratively or graphically: $v_D ≈ 0.6V$, $i_D ≈ 0.1 mA$

Step 2: Small-signal diode model
$$\frac{di}{dv}\bigg|_{v_D} = \frac{I_s}{V_T}e^{v_D/V_T} = \frac{i_D + I_s}{V_T} ≈ \frac{i_D}{V_T}$$

Dynamic resistance: $r_d = V_T/i_D = 26mV/0.1mA = 260Ω$

Step 3: Linearized circuit model
Replace diode with $r_d = 260Ω$ in series with DC voltage source $V_D = 0.6V$

Step 4: Small-signal transfer function
$$\frac{\delta v}{\delta V_{in}} = \frac{r_d}{R + r_d} = \frac{260}{1260} = 0.206$$

---

## Common Mistakes to Avoid

| Mistake | Correction |
|---------|------------|
| Wrong number of states | Count independent energy storage elements only |
| Sign errors in KVL/KCL | Use consistent sign convention throughout |
| Forgetting initial conditions | State IC for complete solution |
| Wrong Jacobian evaluation | Evaluate partial derivatives at operating point, not symbolically |
| Confusing verification and validation | Verification = math correct; Validation = physics correct |

---

## Formula Quick Reference

| Concept | Formula |
|---------|---------|
| State equation (general) | $\dot{\mathbf{x}} = \mathbf{f}(\mathbf{x}, \mathbf{u}, t)$ |
| LTI state equation | $\dot{\mathbf{x}} = \mathbf{Ax} + \mathbf{Bu}$ |
| Transfer function | $H(s) = \mathbf{C}(s\mathbf{I}-\mathbf{A})^{-1}\mathbf{B} + D$ |
| Linearization (A matrix) | $A_{ij} = \frac{\partial f_i}{\partial x_j}\bigg|_{\mathbf{x}_0, \mathbf{u}_0}$ |
| Lumped model criterion | Length << λ/10 |
| Small-signal criterion | Amplitude << DC bias |
