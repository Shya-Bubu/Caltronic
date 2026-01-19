# Conservation Laws and Balance Equations - Engineering Perspective

## Systematic Circuit Analysis Methods

### Modified Nodal Analysis (MNA)

The industry-standard method for formulating circuit equations, used by SPICE.

**Key Idea**: Use node voltages as primary unknowns, add branch currents only when necessary.

#### The MNA Matrix Structure

$$\begin{bmatrix} \mathbf{G} & \mathbf{B} \\ \mathbf{C} & \mathbf{D} \end{bmatrix} \begin{bmatrix} \mathbf{v} \\ \mathbf{i} \end{bmatrix} = \begin{bmatrix} \mathbf{i}_s \\ \mathbf{v}_s \end{bmatrix}$$

Where:
- **G**: Conductance matrix from resistors
- **B, C**: Coupling terms from voltage sources
- **D**: Usually zero matrix
- **v**: Node voltages
- **i**: Currents through voltage sources
- **i_s**: Current source values
- **v_s**: Voltage source values

---

### Building the Conductance Matrix

For a circuit with n nodes (excluding ground), the G matrix is n×n:

**Rules for filling G**:

| Entry | Value |
|-------|-------|
| G[i,i] (diagonal) | Sum of all conductances connected to node i |
| G[i,j] (off-diagonal) | Negative of conductance between nodes i and j |

#### Example: Three-Node Resistor Network

```
       R1=1kΩ         R2=2kΩ
    1 ──/\/\/──┬──2──/\/\/──3
               │
              R3=3kΩ
               │
               ⏊ (ground)
```

**G Matrix**:
$$\mathbf{G} = \begin{bmatrix} 1/R_1 & -1/R_1 & 0 \\ -1/R_1 & 1/R_1 + 1/R_2 + 1/R_3 & -1/R_2 \\ 0 & -1/R_2 & 1/R_2 \end{bmatrix}$$

$$= \begin{bmatrix} 1 & -1 & 0 \\ -1 & 1+0.5+0.333 & -0.5 \\ 0 & -0.5 & 0.5 \end{bmatrix} \text{ mS}$$

---

### Handling Different Components

#### Voltage Sources

Voltage sources require an extra equation (you can't directly compute current through them from Ohm's law).

**Added to MNA**:
- Add the voltage source current as an unknown
- Add the voltage constraint as an equation

For $V_s$ between nodes i and j:
- Add column/row coupling i to Vs
- Constraint: $v_i - v_j = V_s$

#### Current Sources

Current sources are easy—they appear directly in the RHS vector.

**At node i**: Add $I_s$ to the i-th entry of the source vector

#### Capacitors and Inductors (AC Analysis)

Replace with frequency-domain impedances:
- Capacitor: $Z_C = 1/(j\omega C)$, admittance $Y_C = j\omega C$
- Inductor: $Z_L = j\omega L$, admittance $Y_L = 1/(j\omega L)$

---

### Nodal vs Mesh Analysis

| Method | Best For | Avoids |
|--------|----------|--------|
| **Nodal (KCL-based)** | Circuits with many series elements, current sources | Writing current in terms of mesh currents |
| **Mesh (KVL-based)** | Planar circuits with many parallel elements, voltage sources | Finding node voltages for current sources |

**Rule of Thumb**: If the circuit has more nodes than meshes, use mesh analysis. Otherwise, use nodal analysis.

---

## Energy Conservation in Practice

### Power Balance Check

For any circuit in steady state:
$$P_{sources} = P_{dissipated}$$

**Example Verification**:

```
       10Ω
    ──/\/\/──┬──
    │        │
   (+)      20Ω
   10V       │
    │        │
    ────────┴──
```

Current: $I = 10V / (10 + 20)Ω = 0.333A$

Power from source: $P_s = 10V × 0.333A = 3.33W$
Power in 10Ω: $P_1 = (0.333)^2 × 10 = 1.11W$
Power in 20Ω: $P_2 = (0.333)^2 × 20 = 2.22W$

Check: $1.11 + 2.22 = 3.33W$ ✓

**Use power balance to verify simulation results!**

---

### Tellegen's Theorem

A powerful extension of conservation laws:

> For any circuit, the sum of powers delivered by all branches is zero:
$$\sum_k v_k \cdot i_k = 0$$

(Using associated reference directions)

**Applications**:
- Verify circuit solutions
- Derive sensitivity relationships
- Prove network theorems

---

## Conservation in Time-Domain Simulation

### State Equation Formulation

For circuits with energy storage:

```
       R          L
    ──/\/\/──┬──⊃⊃⊃──┐
    │        │       │
   (+)       │      (-)
   Vin      ═╪═ C    Vout
    │        │       │
    ─────────┴───────┘
```

**KCL at capacitor node**:
$$i_R = i_L + i_C$$
$$\frac{V_{in} - v_C}{R} = i_L + C\frac{dv_C}{dt}$$

**KVL through inductor**:
$$v_C = L\frac{di_L}{dt} + v_{out}$$

If output is across capacitor ($v_{out} = v_C$):
$$L\frac{di_L}{dt} = 0 \Rightarrow i_L = \text{constant}$$

Wait, that's wrong—let me redo. If the inductor connects to ground:

$$v_C = L\frac{di_L}{dt}$$

**State equations**:
$$\frac{dv_C}{dt} = \frac{1}{RC}V_{in} - \frac{1}{RC}v_C - \frac{1}{C}i_L$$
$$\frac{di_L}{dt} = \frac{1}{L}v_C$$

---

### Charge Conservation in Switched Circuits

When switches operate, conservation must still hold:

**Capacitor switching example**:

```
Before: C1 charged to V1, C2 charged to V2

After switch closes:
        ┌───────┐
        │       │
       ═╪═     ═╪═
       C1      C2
        │       │
        └───────┘

Total charge: Q = C1×V1 + C2×V2 (conserved!)
Final voltage: Vf = Q/(C1+C2) = (C1×V1 + C2×V2)/(C1+C2)
```

**Energy "lost"** to parasitic resistance (or radiation if truly ideal):
$$\Delta E = \frac{1}{2}\frac{C_1 C_2}{C_1 + C_2}(V_1 - V_2)^2$$

---

## SPICE Implementation

### How SPICE Uses Conservation Laws

SPICE internally builds and solves:

$$\mathbf{Y}(s) \cdot \mathbf{V}(s) = \mathbf{I}_s(s)$$

For transient analysis, capacitors and inductors become:

**Backward Euler**:
- Capacitor: $i = C(v_n - v_{n-1})/\Delta t$ → conductance stamp
- Inductor: $v = L(i_n - i_{n-1})/\Delta t$ → resistance stamp

### SPICE Convergence Issues

| Issue | Conservation-Related Cause | Fix |
|-------|---------------------------|-----|
| DC analysis fails | Floating node (no current path) | Add high-value resistor |
| Current doesn't balance | Missing ground reference | Add ground to circuit |
| Energy grows unbounded | Unphysical model | Check component values |

---

## Practical Design Checks Using Conservation

### Current Continuity Check

At every node, currents must sum to zero. In simulation:
- Sum all branch currents at each node
- Verify sum is within numerical tolerance (< 1pA typically)

### Voltage Loop Check

Around every loop, voltages must sum to zero. In simulation:
- Trace any closed path
- Sum voltages (with signs)
- Verify sum is within numerical tolerance (< 1nV typically)

### Energy Audit

For time-domain simulation:
- Track energy delivered by sources: $E_{in} = \int P_{source} dt$
- Track energy dissipated: $E_{diss} = \int I^2 R dt$
- Track energy stored: $E_{stored} = \frac{1}{2}CV^2 + \frac{1}{2}LI^2$
- Verify: $E_{in} = E_{diss} + \Delta E_{stored}$

---

## Summary: Engineering Applications

| Conservation Law | Engineering Check | Detects |
|-----------------|------------------|---------|
| KCL | Current balance at nodes | Open circuits, floating nodes |
| KVL | Voltage around loops | Grounding errors, polarity mistakes |
| Energy | Power balance | Simulation errors, unphysical results |
| Charge | Q before/after switching | Switching transient errors |

> **Engineering Principle**: If your simulation violates conservation laws, something is wrong—with your circuit, your model, or your simulator settings.
