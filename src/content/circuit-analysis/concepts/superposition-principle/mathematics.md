# Superposition Principle - Mathematical Framework

## Formal Statement

For a linear circuit with n independent sources $s_1, s_2, ..., s_n$:

$$y = y_1 + y_2 + ... + y_n$$

where $y_k$ is the response due to source $s_k$ acting alone (all other sources "turned off").

---

## Mathematical Basis

### Linearity Definition

A system is **linear** if it satisfies:

1. **Homogeneity**: $f(\alpha x) = \alpha f(x)$
2. **Additivity**: $f(x_1 + x_2) = f(x_1) + f(x_2)$

Combined: $f(\alpha_1 x_1 + \alpha_2 x_2) = \alpha_1 f(x_1) + \alpha_2 f(x_2)$

### Linear Circuit Elements

**Resistor**: $v = Ri$ (linear in i and v)
**Capacitor**: $i = C\frac{dv}{dt}$ (linear in v)
**Inductor**: $v = L\frac{di}{dt}$ (linear in i)
**Linear dependent sources**: Output proportional to controlling variable

---

## Proof Sketch

Consider circuit equations in matrix form:
$$\mathbf{A}\mathbf{x} = \mathbf{b}$$

where $\mathbf{b}$ represents source contributions.

For two source vectors $\mathbf{b}_1$ and $\mathbf{b}_2$:
$$\mathbf{A}\mathbf{x}_1 = \mathbf{b}_1 \implies \mathbf{x}_1 = \mathbf{A}^{-1}\mathbf{b}_1$$
$$\mathbf{A}\mathbf{x}_2 = \mathbf{b}_2 \implies \mathbf{x}_2 = \mathbf{A}^{-1}\mathbf{b}_2$$

For total: $\mathbf{b} = \mathbf{b}_1 + \mathbf{b}_2$
$$\mathbf{x} = \mathbf{A}^{-1}\mathbf{b} = \mathbf{A}^{-1}(\mathbf{b}_1 + \mathbf{b}_2) = \mathbf{A}^{-1}\mathbf{b}_1 + \mathbf{A}^{-1}\mathbf{b}_2 = \mathbf{x}_1 + \mathbf{x}_2$$

---

## "Turning Off" Sources

### Voltage Source (V_s → 0)

Setting $V_s = 0$ means the element has zero voltage across it.

For an ideal voltage source, this is equivalent to a **short circuit**:
$$V = 0 \text{ (any current can flow)}$$

### Current Source (I_s → 0)

Setting $I_s = 0$ means the element carries zero current.

For an ideal current source, this is equivalent to an **open circuit**:
$$I = 0 \text{ (any voltage can appear)}$$

---

## Superposition with Matrix Methods

### Nodal Analysis

For nodal equations $\mathbf{G}\mathbf{v} = \mathbf{i}$:

With n current sources $I_1, I_2, ..., I_n$:
$$\mathbf{i} = \mathbf{i}_1 + \mathbf{i}_2 + ... + \mathbf{i}_n$$

Solution:
$$\mathbf{v} = \mathbf{G}^{-1}\mathbf{i} = \mathbf{G}^{-1}\mathbf{i}_1 + \mathbf{G}^{-1}\mathbf{i}_2 + ... = \mathbf{v}_1 + \mathbf{v}_2 + ...$$

### Mesh Analysis

For mesh equations $\mathbf{R}\mathbf{i} = \mathbf{v}$:

With m voltage sources $V_1, V_2, ..., V_m$:
$$\mathbf{v} = \mathbf{v}_1 + \mathbf{v}_2 + ... + \mathbf{v}_m$$

Solution:
$$\mathbf{i} = \mathbf{R}^{-1}\mathbf{v} = \mathbf{R}^{-1}\mathbf{v}_1 + \mathbf{R}^{-1}\mathbf{v}_2 + ... = \mathbf{i}_1 + \mathbf{i}_2 + ...$$

---

## General Formula

For a response $y$ (voltage or current) in terms of n independent sources:

$$y = \sum_{k=1}^{n} a_k s_k$$

where $a_k$ is the **transfer coefficient** from source k to response y.

### Transfer Coefficients

For voltage response due to voltage source:
$$a_k = \frac{v_y}{V_k}\bigg|_{\text{other sources = 0}}$$

For current response due to current source:
$$a_k = \frac{i_y}{I_k}\bigg|_{\text{other sources = 0}}$$

These are **dimensionless ratios** (for same type) or have units like Ω or S (for different types).

---

## Why Superposition Fails for Power

Power is quadratic in current or voltage:
$$P = I^2 R = \frac{V^2}{R}$$

For two contributions:
$$(I_1 + I_2)^2 R = I_1^2 R + 2I_1 I_2 R + I_2^2 R \neq I_1^2 R + I_2^2 R$$

The **cross term** $2I_1 I_2 R$ is missing if we just add individual powers.

### Correct Approach

1. Find total current: $I = I_1 + I_2$ (superposition OK)
2. Calculate power: $P = I^2 R = (I_1 + I_2)^2 R$

---

## Example: Formal Calculation

Circuit: 
- V₁ = 10V in series with R₁ = 2Ω
- V₂ = 5V in series with R₂ = 3Ω
- Both connected in parallel

Find: Current through R₁

**Using superposition:**

Due to V₁ (V₂ shorted):
$$I_1^{(V1)} = \frac{V_1}{R_1 + R_2||0} = \frac{V_1}{R_1} = \frac{10}{2} = 5A$$

Wait—need to reconsider. With V₂ shorted, R₂ is shorted too.

Let me redraw: 

```
    V₁=10V ─── R₁=2Ω ───┬─── R₂=3Ω ─── V₂=5V
                        │
                       GND
```

With V₂ shorted (=0):
Total from V₁ through R₁ and R₂ in series to ground:
$$I_1^{(V1)} = \frac{10}{2+3} = 2A$$

With V₁ shorted:
$$I_1^{(V2)} = \frac{5}{3+2} = 1A$$ (but opposite direction through R₁)
$$I_1^{(V2)} = -1A$$ (in original reference direction)

**Total**:
$$I_{R1} = 2 + (-1) = 1A$$

---

## Summary of Key Formulas

| Concept | Formula |
|---------|---------|
| Superposition | $y = y_1 + y_2 + ... + y_n$ |
| Linearity | $f(\sum \alpha_i x_i) = \sum \alpha_i f(x_i)$ |
| V-source off | Replace with short (V=0) |
| I-source off | Replace with open (I=0) |
| Transfer coefficient | $a_k = y / s_k$ |
| Power (AFTER superposition) | $P = (\sum I_k)^2 R$ |
