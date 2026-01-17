# System Classification and Modeling - Exam Problems

## Problem 1 [10 marks]

For an RC circuit with R = 1kΩ, C = 1µF:

a) Write the differential equation relating input voltage to output voltage.
b) Find the time constant.
c) If input is a step of 5V at t=0, find v_out(t).

### Solution

**a)** The RC circuit equation:

```
RC × (dv_out/dt) + v_out = v_in
```

With values: 10⁻³ × (dv_out/dt) + v_out = v_in

**b)** Time constant:

τ = R × C = 1000Ω × 10⁻⁶F = **1 ms**

**c)** Step response:

```
v_out(t) = 5 × (1 - e^(-t/τ))
         = 5 × (1 - e^(-1000t)) V
```

---

## Problem 2 [10 marks]

The difference equation y[n] - 0.9y[n-1] = x[n] describes a system.

a) Is this continuous or discrete-time?
b) Find y[n] for n ≥ 0 if x[n] = δ[n] and y[-1] = 0.

### Solution

**a)** Discrete-time (uses indices [n] not (t))

**b)** Impulse response calculation:

| n | Calculation | y[n] |
|---|-------------|------|
| 0 | 0.9×(0) + 1 | 1 |
| 1 | 0.9×(1) + 0 | 0.9 |
| 2 | 0.9×(0.9) | 0.81 |
| 3 | 0.9×(0.81) | 0.729 |

**General formula:** y[n] = (0.9)ⁿ × u[n]

---

## Problem 3 [15 marks]

Convert the continuous system dy/dt + 2y = x to discrete form using backward difference with T = 0.1s.

### Solution

**Step 1:** Backward difference approximation

```
dy/dt ≈ (y[n] - y[n-1]) / T
```

**Step 2:** Substitute into the equation

```
(y[n] - y[n-1])/0.1 + 2×y[n] = x[n]
```

**Step 3:** Multiply through by 0.1

```
y[n] - y[n-1] + 0.2×y[n] = 0.1×x[n]
1.2×y[n] = y[n-1] + 0.1×x[n]
```

**Step 4:** Solve for y[n]

```
y[n] = 0.833×y[n-1] + 0.083×x[n]
```

---

## Exam Tips

| Key Formula | Description |
|-------------|-------------|
| τ = RC | Time constant for RC circuits |
| dy/dt ≈ (y[n]-y[n-1])/T | Backward difference |
| 5τ rule | System reaches ~99% of final value |
