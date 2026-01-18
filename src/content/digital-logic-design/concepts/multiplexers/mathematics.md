# Mathematical Analysis: Multiplexers

## 2:1 MUX Equation

$$Y = \overline{S} \cdot X_0 + S \cdot X_1$$

This is a direct SOP implementation of the selection function.

**Verification**:
- S = 0: Y = 1·X₀ + 0·X₁ = X₀ ✓
- S = 1: Y = 0·X₀ + 1·X₁ = X₁ ✓

---

## General N:1 MUX Equation

For 2^n:1 MUX with select lines S_{n-1}, ..., S_1, S_0:

$$Y = \sum_{i=0}^{2^n - 1} X_i \cdot m_i(S_{n-1}, ..., S_0)$$

Where $m_i$ is the minterm corresponding to binary value i.

**4:1 MUX**:
$$Y = \overline{S_1}\overline{S_0}X_0 + \overline{S_1}S_0X_1 + S_1\overline{S_0}X_2 + S_1S_0X_3$$

---

## MUX as Universal Function Generator

[[visual:v5]]

**Theorem**: Any Boolean function of n variables can be implemented with a 2^n:1 MUX.

**Proof**: 
Let f(x₁, x₂, ..., xₙ) be any Boolean function.
- Use x₁, ..., xₙ as select inputs
- For each minterm mᵢ, set data input Xᵢ = f(mᵢ) ∈ {0, 1}

Then output Y equals f for all inputs. ∎

---

## Reduced Variable MUX Implementation

**Theorem**: An n-variable function can be implemented with 2^(n-1):1 MUX.

**Method**: Shannon Expansion

$$f(x_1, ..., x_n) = \overline{x_n} \cdot f(x_1, ..., x_{n-1}, 0) + x_n \cdot f(x_1, ..., x_{n-1}, 1)$$

Use x₁, ..., x_{n-1} as select lines. For each select combination:
- If f(0) = f(1) = 0, connect 0
- If f(0) = f(1) = 1, connect 1
- If f(0) = 0, f(1) = 1, connect xₙ
- If f(0) = 1, f(1) = 0, connect x̄ₙ

---

## Tree Expansion

### Building 8:1 from 2:1 MUX

$$Y_{8:1} = \overline{S_2} \cdot Y_{4:1}^{low} + S_2 \cdot Y_{4:1}^{high}$$

Where each 4:1 is similarly built from 2:1 MUX.

**Total 2:1 MUX needed**: 2^n - 1 for 2^n:1 MUX
- 4:1 needs 3 × (2:1)
- 8:1 needs 7 × (2:1)
- 16:1 needs 15 × (2:1)

---

## Gate Complexity

| MUX Type | AND Gates | OR Gates | NOT Gates |
|----------|-----------|----------|-----------|
| 2:1 | 2 | 1 | 1 |
| 4:1 | 4 | 1 | 2 |
| 8:1 | 8 | 1 | 3 |
| 2^n:1 | 2^n | 1 | n |

**Total gates for 2^n:1**: 2^n + n + 1

---

## Propagation Delay

For tree-structured MUX:
$$T_{delay} = \log_2(N) \times T_{2:1\_MUX}$$

This is better than ripple structures!

---

## Relationship to Decoders

A decoder generates all minterms. MUX uses these minterms.

**Equivalence**:
$$\text{MUX} = \text{Decoder} + \text{AND-OR array}$$

The decoder selects which data input, the AND-OR passes it through.
