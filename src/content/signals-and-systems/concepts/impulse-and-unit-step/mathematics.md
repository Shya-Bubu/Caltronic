# Mathematical Foundation of the Impulse Function

> **Rigorous approach**: The delta function is technically a distribution, not a classical function. Here's the complete mathematical treatment.

---

## 1. Formal Definition

The Dirac delta δ(t) is defined as the limiting case of a sequence of functions δ_ε(t):

```
δ_ε(t) = {
  1/ε,  |t| < ε/2
  0,    |t| ≥ ε/2
}
```

As ε → 0:
```
δ(t) = lim_{ε→0} δ_ε(t)
```

### Key Properties
1. **Singularity**: δ(t) = 0 for all t ≠ 0
2. **Normalization**: ∫_{-∞}^{∞} δ(t) dt = 1
3. **Even symmetry**: δ(-t) = δ(t)

---

## 2. Distribution Theory

Technically, δ(t) is not a function but a **generalized function** or **distribution**. It's defined by its action under integration:

For any test function φ(t) that is continuous at t=0:
```
∫_{-∞}^{∞} δ(t) φ(t) dt = φ(0)
```

This is the **sifting property** in rigorous form.

---

## 3. Relationship with Unit Step

### Forward (Integration)
```
u(t) = ∫_{-∞}^{t} δ(τ) dτ
```

**Proof**:
For t < 0: The interval (-∞, t) doesn't contain τ=0, so integral = 0
For t > 0: The interval (-∞, t) contains τ=0, so integral = 1
For t = 0: By definition, u(0) = 1/2 (or 1, depending on convention)

### Reverse (Differentiation)
```
d/dt u(t) = δ(t)
```

**Proof** (distributional sense):
For any test function φ(t):
```
∫ (du/dt) φ(t) dt = -∫ u(t) (dφ/dt) dt  [integration by parts]
                   = -∫_0^∞ (dφ/dt) dt
                   = φ(0)
                   = ∫ δ(t) φ(t) dt
```

---

## 4. Scaling Property

```
δ(at) = (1/|a|) δ(t)
```

**Proof**:
Let a > 0. Using substitution u = at:
```
∫_{-∞}^{∞} δ(at) φ(t) dt = ∫_{-∞}^{∞} δ(u) φ(u/a) (du/a)
                          = (1/a) φ(0)
```

For a < 0, similar argument with absolute value.

**Important consequence**: δ(2t) = (1/2)δ(t), not 2δ(t)!

---

## 5. Time-Shift Property

```
∫_{-∞}^{∞} δ(t - t₀) f(t) dt = f(t₀)
```

**Proof**:
Substitution τ = t - t₀:
```
∫_{-∞}^{∞} δ(t - t₀) f(t) dt = ∫_{-∞}^{∞} δ(τ) f(τ + t₀) dτ = f(t₀)
```

---

## 6. Derivative Properties

### First Derivative
```
∫_{-∞}^{∞} δ'(t) φ(t) dt = -φ'(0)
```

**Proof**:
Integration by parts:
```
∫ δ'(t) φ(t) dt = [δ(t)φ(t)]_{-∞}^{∞} - ∫ δ(t) φ'(t) dt
                 = 0 - φ'(0)
                 = -φ'(0)
```

### n-th Derivative
```
∫_{-∞}^{∞} δ^{(n)}(t) φ(t) dt = (-1)^n φ^{(n)}(0)
```

---

## 7. Composition with Functions

### General Rule
```
δ(g(t)) = Σ_i (δ(t - t_i)) / |g'(t_i)|
```

where t_i are the simple zeros of g(t).

### Example: δ(t² - a²)
Zeros at t = ±a, so:
```
δ(t² - a²) = [δ(t - a) + δ(t + a)] / (2|a|)
```

---

## 8. Fourier Transform

The Fourier transform of δ(t):
```
F{δ(t)} = ∫_{-∞}^{�∞} δ(t) e^{-jωt} dt = 1
```

**Interpretation**: All frequencies equally represented—perfectly flat spectrum.

**Inverse**:
```
δ(t) = (1/2π) ∫_{-∞}^{∞} e^{jωt} dω
```

---

## 9. Laplace Transform

```
L{δ(t)} = ∫_0^∞ δ(t) e^{-st} dt = 1
```

**Shifted version**:
```
L{δ(t - t₀)} = e^{-st₀}  for t₀ > 0
```

---

## 10. Convolution Properties

### With arbitrary function
```
f(t) * δ(t) = f(t)
```

**Proof**:
```
f(t) * δ(t) = ∫_{-∞}^{∞} f(τ) δ(t - τ) dτ = f(t)
```

δ(t) is the **identity element** for convolution.

### Time-shifted delta
```
f(t) * δ(t - t₀) = f(t - t₀)
```

Convolution with δ(t - t₀) **shifts** the function.

---

## 11. Parseval's Identity for Impulse

```
∫_{-∞}^{∞} |δ(t)|² dt = ∫_{-∞}^{∞} |F{δ(t)}|² (dω/2π)
```

Left side is undefined (δ² doesn't exist classically), but in distribution sense, it confirms the constant spectrum.

---

## 12. Multi-dimensional Delta Functions

In 3D:
```
δ(r⃗) = δ(x)δ(y)δ(z)
```

with:
```
∫∫∫ δ(r⃗ - r⃗₀) f(r⃗) dV = f(r⃗₀)
```

Used in electrostatics for point charges:
```
ρ(r⃗) = q δ(r⃗ - r⃗₀)
```

---

## 13. Discrete-Time: Kronecker Delta

```
δ[n] = {
  1,  n = 0
  0,  n ≠ 0
}
```

Properties:
- Sifting: Σ_{n=-∞}^{∞} f[n] δ[n - n₀] = f[n₀]
- Identity for discrete convolution: f[n] * δ[n] = f[n]
- Z-transform: Z{δ[n]} = 1

---

## Advanced Topic: Green's Functions

The delta function is fundamental to Green's function theory. For a linear differential operator L:

```
L{G(t, τ)} = δ(t - τ)
```

Solving this gives the Green's function G, which then solves:
```
L{y(t)} = f(t)
```

via:
```
y(t) = ∫ G(t, τ) f(τ) dτ
```

This technique is used in:
- Quantum mechanics (propagators)
- Electrodynamics (point charge fields)
- Heat conduction (point source)

---

**This completes the rigorous mathematical treatment. Move to Exam layer for problem-solving practice.**
