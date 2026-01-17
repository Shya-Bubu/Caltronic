# System Classification and Modeling - Mathematics

> **Mathematical foundation**: The relationship between differential and difference equations, and their solutions.

---

## 1. Continuous-Time: Differential Equations

### First Order
```
dy/dt + ay = x(t)
```

**Solution** (homogeneous + particular):
```
y(t) = y_h(t) + y_p(t)
     = Ce^(-at) + particular solution
```

### Second Order
```
d²y/dt² + a(dy/dt) + by = x(t)
```

**Characteristic equation**: s² + as + b = 0
- Roots determine response type (overdamped, critically damped, underdamped)

---

## 2. Discrete-Time: Difference Equations

### First Order
```
y[n] - αy[n-1] = x[n]
```

**Solution**:
```
y[n] = αⁿy[0] + Σ αⁿ⁻ᵏx[k]
```

### Second Order
```
y[n] - a₁y[n-1] - a₂y[n-2] = x[n]
```

---

## 3. Relationship Between Domains

### Derivative Approximations
Forward difference: dy/dt ≈ (y[n+1] - y[n])/T
Backward difference: dy/dt ≈ (y[n] - y[n-1])/T

### Integral Approximation
∫y(t)dt ≈ T·Σy[n] (rectangular rule)

---

## 4. State-Space Representation

### Continuous
```
dx/dt = Ax + Bu
y = Cx + Du
```

### Discrete
```
x[n+1] = Ax[n] + Bu[n]
y[n] = Cx[n] + Du[n]
```

---

## 5. Stability Criterion

**Continuous**: All poles in left half-plane (Re(s) < 0)
**Discrete**: All poles inside unit circle (|z| < 1)
