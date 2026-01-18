# Basic Logic Gates: The Foundation of Digital Systems

## The Light Switch Analogy

Imagine a room with a light and a switch. The light can only be **ON** or **OFF** — there's no dimmer. This binary nature (only two states) is exactly how digital systems work.

In electronics:
- **OFF** = 0 volts = Logic **0** = **FALSE**
- **ON** = 5 volts = Logic **1** = **TRUE**

Every computer, from your smartphone to supercomputers, is built from billions of simple circuits that understand only these two states.

---

## The Three Fundamental Operations

### 1. NOT Gate (Negation) — The Inverter

[[visual:v1]]

The NOT gate is the simplest: whatever you put in, you get the opposite out.

| Input (X) | Output (Z) |
|:---------:|:----------:|
| 0 | 1 |
| 1 | 0 |

**Intuition**: Think of a toggle switch. Press it once (1), light goes off (0). Press again (0), light comes on (1).

**Symbol**: A triangle with a small bubble at the output.

**Expression**: $Z = \overline{X}$ (read as "Z equals NOT X")

---

### 2. OR Gate — At Least One

[[visual:v3]]

The OR gate outputs 1 if **any** input is 1. It only outputs 0 when **all** inputs are 0.

| X₀ | X₁ | Z |
|:--:|:--:|:-:|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

**Intuition**: Two light switches in parallel. If either switch is on, the light is on. Only when both are off does the light go off.

**Expression**: $Z = X_0 + X_1$ (the + means OR, not addition)

---

### 3. AND Gate (Conjunction) — All Required

[[visual:v2]]

The AND gate outputs 1 only when **all** inputs are 1.

| X₀ | X₁ | Z |
|:--:|:--:|:-:|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**Intuition**: Two switches in series. The light only turns on when **both** switches are on.

**Expression**: $Z = X_0 \cdot X_1$ (the · means AND)

---

## Voltage Representation

In real circuits:
- Logic **0** ≈ 0V (ground)
- Logic **1** ≈ 5V (or 3.3V in modern circuits)

When you look at a NOT gate built from a transistor:
- If input is 0V (OFF), the transistor doesn't conduct, so output connects to 5V (ON)
- If input is 5V (ON), the transistor conducts, pulling output to 0V (OFF)

This is how the inversion happens physically!

---

## Key Insight

These three simple operations (NOT, OR, AND) are so powerful that **any digital computation** can be performed using combinations of them. Your computer's processor contains billions of these gates working together.

> **Remember**: 
> - NOT = opposite
> - OR = at least one (inclusive)
> - AND = all of them
