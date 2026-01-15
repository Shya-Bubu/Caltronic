# Exam Preparation

> Common traps, examiner framing, and grading patterns.

---

## Typical Questions

### Type 1: Equation to Sketch (5-8 marks)

**Q: Sketch the signal:**
$$x(t) = \begin{cases} 2(1 - t) & 0 \leq t \leq 1 \\ 0 & \text{otherwise} \end{cases}$$

**A:**
1. At $t = 0$: $x = 2(1-0) = 2$
2. At $t = 1$: $x = 2(1-1) = 0$
3. Linear decrease from 2 to 0
4. Zero everywhere else

```
  2 ┤\
    │ \
    │  \
  0 ┼───\────────
    0   1
```

---

### Type 2: Sketch to Equation (5-8 marks)

**Q: Write the equation for this signal:**
```
     ┌─┐
  1 ─┤ │
     │ │
  0 ─┴─┴──────
    -2  0  2
```

**A:**
$$x(t) = \begin{cases} 1 & -2 \leq t \leq 0 \\ 0 & \text{otherwise} \end{cases}$$

Or: $x(t) = u(t+2) - u(t)$

---

### Type 3: Sketch After Operation (8-10 marks)

**Q: Given $x(t)$ is a triangle from -1 to 1 with peak 1, sketch $x(2t-1)$.**

**A:**
1. Factor: $x(2(t - 0.5))$
2. First compress by 2: triangle from -0.5 to 0.5
3. Then shift right by 0.5: triangle from 0 to 1
4. Peak still at center: $t = 0.5$

---

## Common Mistakes

| Mistake | Correction |
|---------|------------|
| Ignoring the "otherwise" case | Always show where signal is zero |
| Wrong direction for shifts | $x(t-a)$ shifts RIGHT by a |
| Mixing up scale and shift order | Factor properly: $x(at + b) = x(a(t + b/a))$ |
| Unlabeled axes | Always label t, x(t), and key values |

---

## Key Formulas

| Function | Definition |
|----------|------------|
| $u(t)$ | 1 for $t \geq 0$, 0 for $t < 0$ |
| $\text{rect}(t/\tau)$ | 1 for $|t| \leq \tau/2$ |
| $\text{tri}(t/\tau)$ | $1 - |t|/\tau$ for $|t| \leq \tau$ |
| $|t|$ | $t$ for $t \geq 0$, $-t$ for $t < 0$ |

---

## Practice Problem

**Q: Sketch $x(t) = 3\text{rect}\left(\frac{t-2}{4}\right)$**

**A:**
1. Original rect: from -0.5 to 0.5, height 1
2. Scale width by 4: from -2 to 2
3. Shift right by 2: from 0 to 4
4. Scale amplitude by 3: height 3

Rectangle from $t = 0$ to $t = 4$ with amplitude 3.
