# Mesh Analysis - Mathematical Framework

## Formal Problem Statement

Given a **planar** circuit with:
- M meshes
- Resistors and voltage sources

Find: All mesh currents i₁, i₂, ..., i_M

---

## Standard Form

For circuits with only resistors and voltage sources:

$$\mathbf{R} \cdot \mathbf{i} = \mathbf{v}$$

Where:
- $\mathbf{R}$ = M × M resistance matrix
- $\mathbf{i}$ = M × 1 mesh current vector
- $\mathbf{v}$ = M × 1 voltage source vector

---

## Resistance Matrix Construction

### Diagonal Elements

$$R_{kk} = \sum_{\text{all resistors in mesh } k} R_j$$

(Sum of all resistances in mesh k)

### Off-Diagonal Elements

$$R_{kj} = -\sum_{\text{resistors shared by meshes } k \text{ and } j} R_m$$

(Negative sum of resistances shared between meshes k and j)

### Properties

- $\mathbf{R}$ is symmetric: $R_{kj} = R_{jk}$
- $\mathbf{R}$ is positive definite (for passive circuits)
- Off-diagonal elements are always ≤ 0

---

## Voltage Vector Construction

For mesh k:
$$v_k = \sum_{\text{voltage sources in mesh } k} (\pm V_s)$$

Sign convention (tracing clockwise):
- Voltage rise (− to +): positive
- Voltage drop (+ to −): negative

---

## KVL Derivation

For mesh k, KVL states:
$$\sum \text{voltage drops} = \sum \text{voltage rises}$$

Voltage drop across R in mesh k only:
$$V_R = i_k R$$

Voltage drop across R shared with mesh j:
$$V_R = (i_k - i_j) R$$

Combining all elements in mesh k:
$$\sum_j R_{kj} i_j = v_k$$

This gives one row of $\mathbf{Ri} = \mathbf{v}$.

---

## Example: Two-Mesh System

```
        R₁         R₂
    ┌───/\/\/───┬───/\/\/───┐
    │           │           │
   V₁          R₃          V₂
    │           │           │
    └───────────┴───────────┘
       i₁ ↻      i₂ ↻
```

### Resistance Matrix

$$R_{11} = R_1 + R_3$$
$$R_{22} = R_2 + R_3$$
$$R_{12} = R_{21} = -R_3$$

$$\mathbf{R} = \begin{bmatrix} R_1 + R_3 & -R_3 \\ -R_3 & R_2 + R_3 \end{bmatrix}$$

### Voltage Vector

$$\mathbf{v} = \begin{bmatrix} V_1 \\ -V_2 \end{bmatrix}$$

(Assuming both sources with + at top)

### System

$$\begin{bmatrix} R_1 + R_3 & -R_3 \\ -R_3 & R_2 + R_3 \end{bmatrix} \begin{bmatrix} i_1 \\ i_2 \end{bmatrix} = \begin{bmatrix} V_1 \\ -V_2 \end{bmatrix}$$

---

## Solution Methods

### Cramer's Rule (2×2)

For $\mathbf{Ri} = \mathbf{v}$:

$$i_1 = \frac{\det \begin{bmatrix} v_1 & R_{12} \\ v_2 & R_{22} \end{bmatrix}}{\det(\mathbf{R})}$$

$$i_2 = \frac{\det \begin{bmatrix} R_{11} & v_1 \\ R_{21} & v_2 \end{bmatrix}}{\det(\mathbf{R})}$$

### Matrix Inversion

$$\mathbf{i} = \mathbf{R}^{-1} \mathbf{v}$$

For 2×2:
$$\mathbf{R}^{-1} = \frac{1}{\det(\mathbf{R})} \begin{bmatrix} R_{22} & -R_{12} \\ -R_{21} & R_{11} \end{bmatrix}$$

---

## Handling Current Sources

### Case 1: Current Source in Outer Branch

If $I_s$ is in the outer branch of mesh k:
$$i_k = I_s$$ (known, not an unknown)

Remove mesh k from the system, substitute known value.

### Case 2: Current Source Shared Between Meshes (Supermesh)

If $I_s$ is between meshes j and k:

**Constraint equation**:
$$i_k - i_j = I_s$$

**Supermesh KVL**:
Combine KVL for meshes j and k, eliminating the branch with $I_s$.

This gives M-1 KVL equations + 1 constraint = M equations.

---

## Branch Current Extraction

After solving for mesh currents:

### Exclusive Branch

If resistor R is only in mesh k:
$$I_R = i_k$$

Direction: Same as mesh current direction

### Shared Branch

If resistor R is shared by meshes j and k:
$$I_R = i_k - i_j$$

Direction: Positive when flowing in mesh k's direction

---

## Numerical Example

Given: R₁ = 4Ω, R₂ = 2Ω, R₃ = 6Ω, V₁ = 20V, V₂ = 10V

$$\mathbf{R} = \begin{bmatrix} 4+6 & -6 \\ -6 & 2+6 \end{bmatrix} = \begin{bmatrix} 10 & -6 \\ -6 & 8 \end{bmatrix}$$

$$\mathbf{v} = \begin{bmatrix} 20 \\ -10 \end{bmatrix}$$

$$\det(\mathbf{R}) = 10 \times 8 - (-6)(-6) = 80 - 36 = 44$$

$$i_1 = \frac{20 \times 8 - (-6)(-10)}{44} = \frac{160 - 60}{44} = \frac{100}{44} = \frac{25}{11} ≈ 2.27A$$

$$i_2 = \frac{10 \times (-10) - (-6) \times 20}{44} = \frac{-100 + 120}{44} = \frac{20}{44} = \frac{5}{11} ≈ 0.45A$$

---

## Graph Theory Connection

### Mesh-Incidence Matrix

Define B (M × B matrix):
$$B_{mk} = \begin{cases} +1 & \text{branch } k \text{ in mesh } m, \text{ same direction} \\ -1 & \text{branch } k \text{ in mesh } m, \text{ opposite direction} \\ 0 & \text{branch } k \text{ not in mesh } m \end{cases}$$

### KVL in Matrix Form

$$\mathbf{B} \cdot \mathbf{v}_{branch} = \mathbf{0}$$

### Relationship to R Matrix

$$\mathbf{R} = \mathbf{B} \cdot \mathbf{R}_{diag} \cdot \mathbf{B}^T$$

where $\mathbf{R}_{diag}$ is diagonal matrix of branch resistances.

---

## Summary of Key Formulas

| Quantity | Formula |
|----------|---------|
| Diagonal $R_{kk}$ | $\sum_j R_j$ (all R in mesh k) |
| Off-diagonal $R_{kj}$ | $-\sum_m R_m$ (R shared between k and j) |
| Voltage vector $v_k$ | $\sum V_{source}$ (with proper signs) |
| System | $\mathbf{Ri} = \mathbf{v}$ |
| Solution | $\mathbf{i} = \mathbf{R}^{-1}\mathbf{v}$ |
| Supermesh constraint | $i_k - i_j = I_s$ |
