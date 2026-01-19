# Mesh Analysis - Engineering Perspective

## Professional Mesh Analysis Workflow

### Complete Procedure

1. **Verify circuit is planar** (redraw if needed)
2. **Identify all meshes** (inner loops)
3. **Assign mesh currents** (conventionally clockwise)
4. **Identify current sources**:
   - Source in outer branch: i_mesh = I_source
   - Shared source: Create supermesh
5. **Write KVL** for each mesh (or supermesh)
6. **Solve** the system
7. **Calculate branch currents** from mesh currents
8. **Verify** with power balance

---

## Complete Example

```
         4Ω              2Ω
    ┌───/\/\/────┬────/\/\/────┐
    │            │             │
   (+)          6Ω           (+)
   20V           │            10V
   (-)          │            (-)
    │            │             │
    └────────────┴─────────────┘
       
       i₁ ↻       i₂ ↻
```

### Step 1-3: Setup

- Planar: Yes
- Meshes: 2 (left and right windows)
- Currents: i₁ (left, CW), i₂ (right, CW)

### Step 5: Write KVL

**Mesh 1** (starting bottom-left, going clockwise):
$$+20 - 4i_1 - 6(i_1 - i_2) = 0$$
$$20 = 10i_1 - 6i_2 \quad ...(1)$$

**Mesh 2** (starting bottom-center, going clockwise):
$$-6(i_2 - i_1) - 2i_2 - 10 = 0$$
$$-10 = -6i_1 + 8i_2 \quad ...(2)$$

### Step 6: Solve

From (2): $6i_1 = 8i_2 + 10$ → $i_1 = \frac{4i_2 + 5}{3}$

Substitute into (1):
$$20 = 10 \cdot \frac{4i_2 + 5}{3} - 6i_2$$
$$60 = 40i_2 + 50 - 18i_2$$
$$10 = 22i_2$$
$$i_2 = \frac{10}{22} = \frac{5}{11} ≈ 0.455A$$

$$i_1 = \frac{4(5/11) + 5}{3} = \frac{20/11 + 55/11}{3} = \frac{75/11}{3} = \frac{25}{11} ≈ 2.27A$$

### Step 7: Branch Currents

- Through 4Ω: $i_1 = 2.27A$ (left to right)
- Through 2Ω: $i_2 = 0.455A$ (left to right)
- Through 6Ω: $i_1 - i_2 = 1.82A$ (downward)

### Step 8: Verify (Power Balance)

- P₂₀ᵥ = 20 × 2.27 = 45.4W (delivered)
- P₁₀ᵥ = 10 × 0.455 = 4.55W (delivered, since current enters +)

Wait—check polarities. 10V source has current i₂ entering its negative terminal.
Actually: P₁₀ᵥ = 10 × (-0.455) = -4.55W (absorbed, not delivered)

- P₄Ω = (2.27)² × 4 = 20.6W
- P₂Ω = (0.455)² × 2 = 0.41W
- P₆Ω = (1.82)² × 6 = 19.9W

Check: 45.4 = 4.55 + 20.6 + 0.41 + 19.9 ≈ 45.5W ✓

---

## Supermesh Example

```
        4Ω             2Ω
    ┌───/\/\/────┬────/\/\/────┐
    │            │             │
   (+)          3A↑           6Ω
   24V           │             │
   (-)          │             │
    │            │             │
    └────────────┴─────────────┘
       
       i₁ ↻       i₂ ↻
```

### Identify Supermesh

3A current source is shared between mesh 1 and mesh 2 → Supermesh!

### Equations

**Constraint** (from current source):
$$i_2 - i_1 = 3 \quad ...(1)$$

**Supermesh KVL** (trace around outside, skip current source):
Starting bottom-left, clockwise, going through both meshes:
$$+24 - 4i_1 - 2i_2 - 6i_2 = 0$$
$$24 = 4i_1 + 8i_2 \quad ...(2)$$

### Solve

From (1): $i_2 = i_1 + 3$

Substitute into (2):
$$24 = 4i_1 + 8(i_1 + 3)$$
$$24 = 12i_1 + 24$$
$$i_1 = 0A$$
$$i_2 = 3A$$

### Branch Currents
- Through 4Ω: 0A
- Through 2Ω: 3A
- Through 6Ω: 3A
- Through current source: 3A ✓

---

## Resistance Matrix Method

For circuits with only resistors and voltage sources:

### Build R Matrix by Inspection

$$\mathbf{Ri} = \mathbf{v}$$

| Entry | Value |
|-------|-------|
| $R_{ii}$ | Sum of resistances in mesh i |
| $R_{ij}$ | −(resistance shared between i and j) |
| $v_k$ | Sum of voltage rises in mesh k (CW) |

### Example Matrix

For the two-mesh circuit above:

$$R_{11} = 4 + 6 = 10Ω$$
$$R_{22} = 6 + 2 = 8Ω$$
$$R_{12} = R_{21} = -6Ω$$

$$v_1 = +20V, \quad v_2 = -10V$$

$$\begin{bmatrix} 10 & -6 \\ -6 & 8 \end{bmatrix} \begin{bmatrix} i_1 \\ i_2 \end{bmatrix} = \begin{bmatrix} 20 \\ -10 \end{bmatrix}$$

---

## Current Source in Outer Branch

```
        4Ω
    ┌───/\/\/────┐
    │            │
   2A↑          6Ω
    │            │
    └────────────┘
       i₁ ↻
```

When current source is in the outer branch of a mesh:

**The mesh current IS the source current**:
$$i_1 = 2A$$

No equation to solve—directly known!

---

## Comparing Branch and Mesh Currents

### Exclusive Branch (in one mesh only)

Branch current = Mesh current
$$I_{branch} = i_{mesh}$$

### Shared Branch (between two meshes)

Branch current = Difference of mesh currents
$$I_{branch} = i_{mesh1} - i_{mesh2}$$

Direction follows the mesh with positive coefficient.

---

## Common Mistakes

| Mistake | Correction |
|---------|------------|
| Wrong polarity for voltage source | Rise (+) when going − to + |
| Forgetting shared resistance | Include (i₁ - i₂)R for shared elements |
| Wrong supermesh boundary | Include both meshes, skip current source |
| Non-planar circuit | Mesh analysis doesn't work—use nodal |

---

## Decision Guide: Mesh vs Nodal

| Use Mesh When | Use Nodal When |
|---------------|----------------|
| More voltage sources | More current sources |
| Fewer meshes than (N-1) | Fewer nodes than meshes |
| Circuit is planar | Any topology |
| Need currents | Need voltages |
