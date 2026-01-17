# Mathematical Foundations: Series and Parallel Connections

> Rigorous derivation of driving-point characteristics for series and parallel resistors.

---

## Series Connection: Current-Controlled Case

From lecture Pages 9-11

**Given:** Two current-controlled resistors:
$$v_1 = \hat{v}_1(i_1), \quad v_2 = \hat{v}_2(i_2)$$

**Kirchhoff's Laws:**
- **KCL:** $i_1 = i_2 = i$ (same current through both)
- **KVL:** $v = v_1 + v_2$ (voltages add)

**Derivation:**
$$v = v_1 + v_2 = \hat{v}_1(i_1) + \hat{v}_2(i_2) = \hat{v}_1(i) + \hat{v}_2(i)$$

**Result:** The series combination is also **current-controlled**:
$$v = \hat{v}_{series}(i)$$

where $\hat{v}_{series}(i) = \hat{v}_1(i) + \hat{v}_2(i)$.

### Graphical Interpretation

On the **v-i plane**:
- For each value of $i$, find $v_1(i)$ and $v_2(i)$
- Add them: $v_{total}(i) = v_1(i) + v_2(i)$
- This is **horizontal addition** (adding voltages along the horizontal axis for fixed current)

---

## Parallel Connection: Voltage-Controlled Case

From lecture Pages 12-13

**Given:** Two voltage-controlled resistors:
$$i_1 = \hat{i}_1(v_1), \quad i_2 = \hat{i}_2(v_2)$$

**Kirchhoff's Laws:**
- **KVL:** $v_1 = v_2 = v$ (same voltage across both)
- **KCL:** $i = i_1 + i_2$ (currents add)

**Derivation:**
$$i = i_1 + i_2 = \hat{i}_1(v_1) + \hat{i}_2(v_2) = \hat{i}_1(v) + \hat{i}_2(v)$$

**Result:** The parallel combination is also **voltage-controlled**:
$$i = \hat{i}_{parallel}(v)$$

where $\hat{i}_{parallel}(v) = \hat{i}_1(v) + \hat{i}_2(v)$.

### Graphical Interpretation

On the **v-i plane**:
- For each value of $v$, find $i_1(v)$ and $i_2(v)$
- Add them: $i_{total}(v) = i_1(v) + i_2(v)$
- This is **vertical addition** (adding currents along the vertical axis for fixed voltage)

---

## Duality Theorem

**Statement:** The series connection of current-controlled resistors is **dual** to the parallel connection of voltage-controlled resistors.

**Formal mapping:**

| Series (current-controlled) | Parallel (voltage-controlled) |
|-----------------------------|-------------------------------|
| $v = \hat{v}_1(i) + \hat{v}_2(i)$ | $i = \hat{i}_1(v) + \hat{i}_2(v)$ |
| KVL: voltages add | KCL: currents add |
| Same current: $i_1 = i_2$ | Same voltage: $v_1 = v_2$ |
| Horizontal addition on v-i plane | Vertical addition on v-i plane |

**Dual transformation:**
- Replace $v \leftrightarrow i$
- Replace series ↔ parallel
- Replace KVL ↔ KCL

---

## Mixed Case: Parametric Representation

From lecture Page 11:

**Problem:** $\mathcal{R}_1$ is current-controlled but $\mathcal{R}_2$ is voltage-controlled.

**Result:** The series combination is **neither** voltage-controlled nor current-controlled globally.

**Solution:** Use **parametric representation** with parameter $v_2$ (voltage across $\mathcal{R}_2$):

$$v = \hat{v}_1(i) + v_2$$

$$i = \hat{i}_2(v_2)$$

As $v_2$ varies from $-\infty$ to $+\infty$, these equations trace out the driving-point characteristic.

**Example:** If $\hat{v}_1(i) = Ri$ and $\hat{i}_2(v_2) = Gv_2$:

$$v = R\hat{i}_2(v_2) + v_2 = RGv_2 + v_2 = (RG + 1)v_2$$
$$i = Gv_2$$

Eliminate $v_2$: $v_2 = i/G$

$$v = (RG + 1)\frac{i}{G} = Ri + \frac{i}{G} = (R + 1/G)i$$

This is linear with resistance $R + 1/G$ (series combination!).

---

## Driving-Point Characteristic

**Definition (Lecture Page 9):** The v-i characteristic of a one-port in terms of its port voltage and port current.

**Why "driving-point"?**

Because we consider the one-port as being "driven" by either:
- Voltage source $v$ (we set $v$, observe $i$)
- Current source $i$ (we set $i$, observe $v$)

The characteristic $f(v, i) = 0$ is what we observe **at the driving terminals**, independent of internal structure.

---

## Summary: Mathematical Rigor

**Series (current-controlled):**
- $v = \hat{v}_1(i) + \hat{v}_2(i)$
- Graphical: horizontal addition on v-i plane
- KVL enforces voltage sum

**Parallel (voltage-controlled):**
- $i = \hat{i}_1(v) + \hat{i}_2(v)$
- Graphical: vertical addition on v-i plane
- KCL enforces current sum

**Duality:**
- Swap $v \leftrightarrow i$, series ↔ parallel, KVL ↔ KCL

**Mixed case:**
- Use parametric equations when types don't match
