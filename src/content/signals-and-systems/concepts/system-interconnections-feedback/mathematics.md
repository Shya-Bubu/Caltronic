# System Interconnections and Feedback - Mathematics

> **Mathematical foundation**: Block diagram algebra and closed-loop transfer function derivation.

---

## 1. Cascade Connection

If systems H₁ and H₂ are in cascade:
```
Y = H₂(H₁·X)
Y/X = H₁·H₂
```

**Rule**: Cascade = multiply transfer functions

---

## 2. Parallel Connection

If systems H₁ and H₂ are in parallel:
```
Y = H₁·X + H₂·X = (H₁ + H₂)X
Y/X = H₁ + H₂
```

**Rule**: Parallel = add transfer functions

---

## 3. Feedback Connection

### Unity Negative Feedback
```
Y = G(X - Y)
Y = GX - GY
Y + GY = GX
Y(1 + G) = GX
```

**Closed-loop transfer function**:
```
T = Y/X = G/(1 + G)
```

### General Negative Feedback (forward G, feedback H)
```
E = X - HY
Y = GE = G(X - HY)
Y + GHY = GX
```

**Closed-loop transfer function**:
```
T = G/(1 + GH)
```

---

## 4. Block Diagram Reduction Rules

1. **Cascade blocks**: Multiply
2. **Parallel blocks**: Add
3. **Move summing junction past block G**: Add 1/G to that path
4. **Move pickoff point past block G**: Add G to that path
5. **Feedback loop**: Use T = G/(1 ± GH)

---

## 5. Sensitivity Function

Sensitivity of T to changes in G:
```
S = (∂T/T)/(∂G/G) = 1/(1 + GH)
```

With high loop gain (GH >> 1): S ≈ 1/GH → small

**Feedback reduces sensitivity to parameter variations!**
