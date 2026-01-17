# Exam Problems: Impulse and Unit Step Functions

> **Exam strategy**: Master the fundamental properties first, then tackle applications. Time allocation: 20-30 min per problem.

---

## Problem 1: Basic Properties [10 marks, 15 min]

### Question

Given the following expressions, evaluate:

a) The integral of (t² + 2t)δ(t-1) from -2 to 3

b) The integral of cos(πt)δ(2t) from -∞ to ∞

c) d/dt [5u(t-2)]

d) Express f(t) = {3 for t>1; 0 for t<1} using unit step functions

### Solution

**a)** Using sifting property:

Since t=1 is in the interval [-2, 3]:

```
f(1) = 1² + 2×1 = 3 ✓
```

**b)** Using scaling property δ(2t) = (1/2)δ(t):

```
(1/2) × cos(π×0) = (1/2) × 1 = 0.5
```

**c)** Using δ(t) = du/dt:

```
d/dt [5u(t-2)] = 5δ(t-2)
```

**d)** Unit step representation:

```
f(t) = 3u(t-1)
```

Verification: For t<1, u(t-1)=0 → f=0. For t>1, u(t-1)=1 → f=3 ✓

---

## Problem 2: RC Circuit Analysis [15 marks, 20 min]

### Question

An RC circuit with R=10kΩ, C=1µF is initially at rest. At t=0, a voltage source V_in(t) = 5δ(t) is applied.

a) Find the output voltage across the capacitor V_out(t).
b) Calculate the total energy delivered to the capacitor.
c) Sketch V_out(t).

### Solution

**a)** For an RC circuit with impulse input:

Time constant: τ = RC = 10k × 1µ = 10 ms

The impulse response is:

```
h(t) = (1/RC) × exp(-t/RC) × u(t)
```

Output:

```
V_out(t) = 5 × (1/0.01) × exp(-t/0.01) × u(t)
         = 500 × exp(-100t) × u(t) Volts
```

**b)** Energy in capacitor:

Initial voltage V_out(0⁺) = 500V

```
E = (1/2) × C × V²
  = (1/2) × 1µF × (500)²
  = 0.125 J = 125 mJ
```

**c)** Sketch shows:
- Instantaneous jump to 500V at t=0
- Exponential decay with τ = 10ms
- V_out(10ms) ≈ 184V (falls to 36.8% of initial)

---

## Problem 3: System Impulse Response [15 marks, 25 min]

### Question

A system is described by:

```
d²y/dt² + 3(dy/dt) + 2y = dx/dt
```

a) Find the impulse response h(t) for this system.
b) If the input is x(t) = u(t), find y(t).

### Solution

**a)** Taking Laplace transform:

```
s²H(s) + 3sH(s) + 2H(s) = s
H(s) = s / (s² + 3s + 2)
     = s / [(s+1)(s+2)]
```

Partial fractions:

```
H(s) = 2/(s+1) - 1/(s+2)
```

Inverse Laplace:

```
h(t) = (2×exp(-t) - exp(-2t)) × u(t)
```

**b)** Using Y(s) = H(s) × X(s) = H(s)/s:

```
Y(s) = 1/[(s+1)(s+2)]
     = 1/(s+1) - 1/(s+2)
```

Inverse:

```
y(t) = (exp(-t) - exp(-2t)) × u(t)
```

---

## Problem 4: Train of Impulses [20 marks]

### Question

A signal x(t) is defined as:

```
x(t) = 2δ(t+1) - δ(t) + 3δ(t-2)
```

a) Sketch x(t).
b) Find y(t) = integral of x(τ)dτ from -∞ to t.
c) Compute z(t) = x(t) * h(t) where h(t) = exp(-t)u(t).

### Solution

**a)** Sketch shows three impulses:

| Location | Amplitude |
|----------|-----------|
| t = -1 | +2 |
| t = 0 | -1 |
| t = 2 | +3 |

**b)** Integrating impulses gives steps:

```
y(t) = 2u(t+1) - u(t) + 3u(t-2)
```

| Time Range | Value |
|------------|-------|
| t < -1 | 0 |
| -1 ≤ t < 0 | 2 |
| 0 ≤ t < 2 | 1 |
| t ≥ 2 | 4 |

**c)** Using sifting property of convolution:

```
z(t) = 2h(t+1) - h(t) + 3h(t-2)
     = 2×exp(-(t+1))×u(t+1) - exp(-t)×u(t) + 3×exp(-(t-2))×u(t-2)
```

---

## Quick Tips for Exam Success

| Tip | Details |
|-----|---------|
| **Scaling trap** | δ(at) = δ(t)/|a|, NOT a×δ(t) |
| **Check interval** | Sifting only works if t₀ is in integration range |
| **Draw sketches** | Helps catch sign errors |
| **Verify units** | Impulse has units of [signal]/[time] |
| **Initial conditions** | δ(t) creates instantaneous change at t=0 |

---

Time to practice with flashcards and quizzes!
