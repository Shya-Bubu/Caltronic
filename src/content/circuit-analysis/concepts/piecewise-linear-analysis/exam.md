# Exam Preparation: Piecewise-Linear Analysis

> Question patterns for PWL synthesis and approximation.

---

## Common Question Types

### Type 1: Segment Identification
**Given:** PWL v-i curve  
**Strategy:** Identify breakpoints $E_1, E_2, ...$ and slopes $G_0, G_1, ...$

**Key:** Count segments and breakpoints (n segments → n-1 breakpoints)

### Type 2: PWL Function Representation
**Given:** Breakpoints and slopes  
**Strategy:** Write $i = G_0 v + \sum (G_k - G_{k-1})[v - E_k]^+$

**Lecture formula (Page 19):** Each breakpoint adds one term

### Type 3: Circuit Synthesis
**Given:** PWL characteristic  
**Strategy:** Each breakpoint → one concave/convex resistor

---

## Solution Strategies

### Reading PWL Graphs

**Step 1:** Mark all "kinks" (breakpoints) on the curve  
**Step 2:** Measure slopes in each linear region  
**Step 3:** For voltage-controlled (v-i plane): slopes are conductances $G_k$  
**Step 4:** Write formula using $[v - E_k]^+$ notation

**Quick check:** At $v < E_1$, only base term $G_0 v$ should remain

### Concave vs Convex Identification

**Concave (lecture Page 16):**
- Voltage-controlled
- Slopes **decrease** as you move right
- $G_1 < G_0$ (breakpoint "bends down")

**Convex (lecture Page 17):**
- Current-controlled
- Slopes **decrease** as you move up
- Dual of concave

### Circuit Element Count

For $(n+1)$ segments:
- **Diodes:** $n$ ideal diodes
- **Resistors:** $(n+1)$ resistors (including base)
- **Sources:** $n$ voltage/current sources (one per breakpoint)

---

## Time Management

**PWL questions: 5-10 minutes each**

- Segment identification: 2-3 min
- Formula writing: 3-4 min
- Circuit synthesis: 5-7 min

**Tip:** Draw clear markings on graph to avoid counting errors

---

## Common Errors

1. **Off-by-one errors:** $n$ segments ≠ $n$ breakpoints (it's $n-1$!)
2. **Wrong $[x]^+$ notation:** $[v - E]^+ = 0$ when $v < E$, NOT when $v > E$!
3. **Forgetting base conductance:** Formula needs $G_0 v$ term even if no breakpoint at origin
4. **Slope calculation errors:** $G = \Delta i / \Delta v$ (rise/run on v-i plane)

---

## Formula Summary

**Memorize:**
- Concave (voltage-controlled): $i = G[v - E]^+$ (single breakpoint)
- General: $i = G_0 v + \sum_{k=1}^n (G_k - G_{k-1})[v - E_k]^+$
- $[x]^+ = \max(0, x)$
- Synthesis: $n$ breakpoints → $n$ diodes

---

## Practice Problem Pattern

**Expected question:** "A PWL resistor has:  
- Region 1 ($v < 1V$): $G = 0.5$ S  
- Region 2 ($v > 1V$): $G = 0.2$ S  
Write the i-v equation."

**Solution:**
Breakpoint: $E_1 = 1V$  
Slopes: $G_0 = 0.5$, $G_1 = 0.2$

$$i = G_0 v + (G_1 - G_0)[v - E_1]^+$$
$$i = 0.5v + (0.2 - 0.5)[v - 1]^+$$
$$i = 0.5v - 0.3[v - 1]^+$$

**Verification:**
- At $v = 0.5V$: $i = 0.5(0.5) = 0.25A$ (slope 0.5) ✓
- At $v = 2V$: $i = 0.5(2) - 0.3(1) = 0.7A$ (slope 0.2) ✓
