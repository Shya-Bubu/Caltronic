# Exam Preparation: Series and Parallel Connections

> Question patterns for graphical addition and driving-point characteristics.

---

## Common Question Types

### Type 1: Series Connection (Horizontal Addition)
**Given:** Two current-controlled curves $v_1(i)$ and $v_2(i)$  
**Strategy:** For each $i$, add voltages: $v_{total} = v_1 + v_2$

**Lecture emphasis (Pages 9-11):** All currents equal in series

### Type 2: Parallel Connection (Vertical Addition)
**Given:** Two voltage-controlled curves $i_1(v)$ and $i_2(v)$  
**Strategy:** For each $v$, add currents: $i_{total} = i_1 + i_2$

**Lecture emphasis (Pages 12-13):** All voltages equal in parallel

### Type 3: Dual Identification
**Given:** Series/parallel network  
**Strategy:** Apply duality table (series ↔ parallel, $v$ ↔ $i$, $R$ ↔ $G$)

---

## Solution Strategies

### Graphical Addition Technique

**Series (horizontal addition on v-i plane):**
1. Pick several current values: $i_1, i_2, i_3, ...$
2. For each $i_k$: read $v_1(i_k)$ and $v_2(i_k)$ from individual curves
3. Calculate $v_{total}(i_k) = v_1(i_k) + v_2(i_k)$
4. Plot points $(v_{total}(i_k), i_k)$
5. Connect smoothly

**Parallel (vertical addition on v-i plane):**
1. Pick several voltage values: $v_1, v_2, v_3, ...$
2. For each $v_k$: read $i_1(v_k)$ and $i_2(v_k)$
3. Calculate $i_{total}(v_k) = i_1(v_k) + i_2(v_k)$
4. Plot points $(v_k, i_{total}(v_k))$
5. Connect smoothly

### Linear Case Check
For **linear resistors** in series: $R_{eq} = R_1 + R_2$  
For **linear resistors** in parallel: $1/R_{eq} = 1/R_1 + 1/R_2$

**Use this to verify your graphical result!**

---

## Time Management

**Series/parallel questions: 6-10 minutes each**

- Graphical addition (3-4 points): 5-7 min
- Analytical (linear): 2-3 min
- Duality application: 3-4 min

**Exam tip:** If curves are linear, skip graphical method and use formulas!

---

## Common Errors

1. **Wrong plane:** Series = horizontal addition, parallel = vertical addition (not vice versa!)
2. **Forgetting KCL/KVL:** Series → same current, parallel → same voltage
3. **Adding on wrong axis:** In series, add voltages (horizontal), not currents!
4. **Misreading control type:** Voltage-controlled vs current-controlled matters

---

## Formula Summary

**Series (current-controlled):**
- $v = v_1(i) + v_2(i)$
- Horizontal addition on v-i plane
- Linear: $R_{eq} = R_1 + R_2$

**Parallel (voltage-controlled):**
- $i = i_1(v) + i_2(v)$
- Vertical addition on v-i plane
- Linear: $G_{eq} = G_1 + G_2$ or $1/R_{eq} = 1/R_1 + 1/R_2$

---

## Practice Problem Pattern

**Expected question:** "Two resistors in series: $v_1 = 2i$ and $v_2 = i^2$. Find driving-point characteristic."

**Solution:**
Both are current-controlled → series combination is also current-controlled

$v = v_1 + v_2 = 2i + i^2$

**Verification points:**
- At $i = 0$: $v = 0$
- At $i = 1$: $v = 3$
- At $i = 2$: $v = 8$

**Answer:** $v = 2i + i^2$ (parabolic)
