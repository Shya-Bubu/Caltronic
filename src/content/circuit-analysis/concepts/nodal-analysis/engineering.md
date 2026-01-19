# Nodal Analysis - Engineering Perspective

## Practical Nodal Analysis Workflow

### Complete Procedure

1. **Draw circuit clearly** with nodes labeled
2. **Select reference node** (ground)
3. **Assign voltage variables** to all non-reference nodes
4. **Identify voltage sources**:
   - Source to ground: Node voltage is known
   - Floating source: Create supernode
5. **Write KCL** at each unknown node (or supernode)
6. **Solve** the system of equations
7. **Find branch currents** using Ohm's Law
8. **Verify** with power balance

---

## Example: Complete Analysis

```
           v₁          2Ω         v₂
    ┌──────○────────/\/\/─────────○──────┐
    │                                     │
   10V                                   5A ↓
    │              4Ω                     │
    │      ┌─────/\/\/─────┐             │
    │      │               │             │
    └──────┴───────────────┴─────────────┘
                  GND
```

### Step 1-3: Setup

- Reference: Bottom wire (GND)
- Unknowns: v₁, v₂

### Step 4: Handle Sources

- 10V source to ground: v₁ = 10V (known!)
- 5A current source: Direct contribution to KCL

### Step 5: KCL at v₂

$$\frac{v_1 - v_2}{2} = \frac{v_2 - 0}{4} + 5$$

Substitute v₁ = 10:
$$\frac{10 - v_2}{2} = \frac{v_2}{4} + 5$$
$$5 - \frac{v_2}{2} = \frac{v_2}{4} + 5$$
$$-\frac{v_2}{2} - \frac{v_2}{4} = 0$$
$$-\frac{3v_2}{4} = 0$$
$$v_2 = 0V$$

### Step 6: Find Currents

- Current through 2Ω: $I_{2Ω} = \frac{10-0}{2} = 5A$ (left to right)
- Current through 4Ω: $I_{4Ω} = \frac{0-0}{4} = 0A$

### Step 7: Verify

Power from 10V source: Need current through it.
KCL at v₁: $I_s = I_{2Ω} + I_{4Ω} = 5 + 0 = 5A$
P_source = 10 × 5 = 50W (delivered)

Power to 5A source: P = v₂ × 5 = 0 × 5 = 0W
Power in 2Ω: P = 5² × 2 = 50W (absorbed)
Power in 4Ω: P = 0² × 4 = 0W

Check: 50W = 50W ✓

---

## Supernode Example

```
           v₁               v₂
    ┌──────○────(+6V)───────○──────┐
    │                               │
   2A↑                            3Ω
    │                               │
    │              4Ω              │
    └────────────/\/\/─────────────┘
                  GND
```

### Identify Supernode

6V source connects v₁ and v₂ (both non-reference) → Supernode!

### Equations

**Constraint**: v₁ - v₂ = 6 ... (1)

**KCL around supernode** (currents entering = leaving):
$$2 = \frac{v_2}{3} + \frac{v_1}{4}$$

Wait—check the topology. Let me redraw:

```
                  v₁     (+6V)     v₂
               ┌──○──────┤├────────○──┐
               │                       │
    2A ↑       │         4Ω          3Ω
               │    ┌───/\/\/──┐      │
    ───────────┴────┴──────────┴──────┘
                     GND
```

**Constraint**: v₁ - v₂ = 6 ... (1)

**KCL (supernode)**: Current from 2A = Currents leaving through 4Ω and 3Ω

Note: 4Ω and 3Ω both go to ground. 4Ω is connected... let me reconsider the circuit.

**Simpler Supernode Example**:

```
        2A →    v₁          v₂
    ○───────────○──(+6V)────○───────○
    │           │            │       │
    │          2Ω           4Ω      │
    │           │            │       │
    └───────────┴────────────┴───────┘
                   GND
```

**Equations**:

Constraint: v₁ - v₂ = 6

KCL for supernode (current in = current out):
$$2 = \frac{v_1}{2} + \frac{v_2}{4}$$

From constraint: v₁ = v₂ + 6

Substitute:
$$2 = \frac{v_2 + 6}{2} + \frac{v_2}{4}$$
$$2 = \frac{v_2}{2} + 3 + \frac{v_2}{4}$$
$$-1 = \frac{3v_2}{4}$$
$$v_2 = -\frac{4}{3}V$$
$$v_1 = -\frac{4}{3} + 6 = \frac{14}{3}V$$

---

## Conductance Matrix Method

For circuits with only resistors and current sources:

### Build G Matrix by Inspection

$$\mathbf{Gv} = \mathbf{i}$$

| Entry | Value |
|-------|-------|
| $G_{ii}$ | Sum of conductances at node i |
| $G_{ij}$ | −(conductance between i and j) |
| $i_k$ | Net current source into node k |

### Example

```
         v₁         v₂
    ┌────○────/\/\/──○────┐
    │    │    2Ω     │    │
   1A↑  4Ω          3Ω   2A↓
    │    │           │    │
    └────┴───────────┴────┘
              GND
```

**G matrix**:
$$G_{11} = G_4 + G_2 = \frac{1}{4} + \frac{1}{2} = \frac{3}{4}$$
$$G_{22} = G_2 + G_3 = \frac{1}{2} + \frac{1}{3} = \frac{5}{6}$$
$$G_{12} = G_{21} = -G_2 = -\frac{1}{2}$$

**Current vector**:
$$i_1 = +1A, \quad i_2 = -2A$$

**System**:
$$\begin{bmatrix} 3/4 & -1/2 \\ -1/2 & 5/6 \end{bmatrix} \begin{bmatrix} v_1 \\ v_2 \end{bmatrix} = \begin{bmatrix} 1 \\ -2 \end{bmatrix}$$

---

## Software Implementation

### SPICE Uses Nodal Analysis!

SPICE (and most circuit simulators) use nodal analysis internally:

```spice
* Example SPICE netlist
V1 1 0 10V
R1 1 2 2k
R2 2 0 4k
.OP
.END
```

SPICE automatically:
1. Assigns node numbers
2. Builds conductance matrix
3. Handles voltage sources with MNA
4. Solves the system

---

## Common Pitfalls

| Mistake | Solution |
|---------|----------|
| Wrong sign on conductance | G_ij is always negative |
| Forgetting supernode constraint | Always write v_i - v_j = V_source |
| Current direction errors | Define positive direction clearly |
| Using node voltage in Ohm's Law wrong | Current = (V_higher - V_lower)/R |

---

## Summary Table

| Situation | Approach |
|-----------|----------|
| Current source | Direct current in KCL |
| Voltage source to ground | Node voltage = source voltage |
| Floating voltage source | Use supernode |
| Dependent source | Express in terms of node voltages |
