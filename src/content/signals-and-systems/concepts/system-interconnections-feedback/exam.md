# System Interconnections and Feedback - Exam Problems

## Problem 1 [10 marks]

Two systems with H₁(s) = 10 and H₂(s) = 5 are connected.

a) Find overall transfer function if in cascade.
b) Find overall transfer function if in parallel.

### Solution

**a) Cascade connection:**

Transfer functions **multiply**:

```
H_total = H₁ × H₂ = 10 × 5 = 50
```

**b) Parallel connection:**

Transfer functions **add**:

```
H_total = H₁ + H₂ = 10 + 5 = 15
```

---

## Problem 2 [10 marks]

A unity negative feedback system has forward gain G(s) = 100.

a) Find the closed-loop transfer function T(s).
b) What is the DC gain of the closed-loop system?

### Solution

**a) Closed-loop transfer function:**

For unity feedback (H = 1):

```
T(s) = G / (1 + G)
     = 100 / (1 + 100)
     = 100/101
     ≈ 0.99
```

**b) DC gain:**

```
T(0) = 100/101 ≈ 0.99
```

The gain is very close to 1—feedback "tames" the high open-loop gain!

---

## Problem 3 [15 marks]

For the feedback system with G(s) = K/(s+2) and H(s) = 1:

a) Find the closed-loop transfer function.
b) For what value of K is the system marginally stable?

### Solution

**a) Closed-loop transfer function:**

```
T = G / (1 + GH)
  = [K/(s+2)] / [1 + K/(s+2)]
  = K / (s + 2 + K)
```

**b) Stability analysis:**

The system has one pole at s = -(2 + K).

For stability: pole must be in left half-plane
→ 2 + K > 0
→ K > -2

**Marginally stable** when pole is at s = 0:
→ 2 + K = 0
→ **K = -2**

---

## Problem 4 [15 marks]

Reduce this block diagram to find overall T = Y/X:

```
X → (+) → [G₁] → [G₂] → Y
      ↑                  │
      └─────── [H] ←─────┘
```

### Solution

**Step 1:** Identify forward path

```
Forward: G₁ × G₂
```

**Step 2:** Identify loop gain

```
Loop: G₁ × G₂ × H
```

**Step 3:** Apply feedback formula

```
T = Forward / (1 + Loop)
  = (G₁ × G₂) / (1 + G₁ × G₂ × H)
```

---

## Key Formulas

| Connection | Formula |
|------------|---------|
| Cascade | H_total = H₁ × H₂ |
| Parallel | H_total = H₁ + H₂ |
| Negative Feedback | T = G / (1 + GH) |
| Positive Feedback | T = G / (1 - GH) |
