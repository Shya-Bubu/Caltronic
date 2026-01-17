# Continuous-Time Convolution: The Integral Form

> **Narrative thread:** We've mastered discrete convolution. Now we extend it to continuous signals — the math changes from sums to integrals, but the intuition remains the same.

---

## FROM BASICS: From Sums to Integrals

In discrete convolution, we had:

$$y[n] = \sum_{k=-\infty}^{\infty} x[k] \cdot h[n-k]$$

For continuous signals, the sum becomes an **integral**:

$$y(t) = \int_{-\infty}^{\infty} x(\tau) \cdot h(t-\tau) \, d\tau$$

This is called the **convolution integral**.

---

## THE BIG IDEA: Partitioning Continuous Signals

[[visual:v1]]

Just as discrete signals are sums of shifted impulses, continuous signals can be thought of as limits of thin rectangular strips:

### From Strips to Integral

1. Partition x(t) into strips of width Δ
2. Each strip approximated by $x(k\Delta) \cdot \delta(t - k\Delta) \cdot \Delta$
3. Sum all strips
4. Let Δ → 0
5. Summation → Integration!

$$x(t) = \lim_{\Delta \to 0} \sum_k x(k\Delta) \cdot \delta(t - k\Delta) \cdot \Delta = \int_{-\infty}^{\infty} x(\tau) \delta(t-\tau) \, d\tau$$

---

## BUILDING UNDERSTANDING: The Convolution Integral

[[visual:v2]]

### Definition

$$\boxed{y(t) = x(t) * h(t) = \int_{-\infty}^{\infty} x(\tau) \cdot h(t-\tau) \, d\tau}$$

### Same Four Steps!

| Step | Discrete | Continuous |
|------|----------|------------|
| **Flip** | h[-k] | h(-τ) |
| **Shift** | h[n-k] | h(t-τ) |
| **Multiply** | x[k]·h[n-k] | x(τ)·h(t-τ) |
| **Sum/Integrate** | Σ | ∫ |

The algorithm is identical — just continuous!

---

## Worked Example

Let:
$$x(t) = u(t) \quad \text{(unit step)}$$
$$h(t) = e^{-t}u(t) \quad \text{(exponential decay)}$$

### Solution

$$y(t) = \int_{-\infty}^{\infty} x(\tau) \cdot h(t-\tau) \, d\tau$$

Since both x and h are zero for negative arguments:
- x(τ) = u(τ) is 1 only for τ ≥ 0
- h(t-τ) = e^{-(t-τ)}u(t-τ) is non-zero only for τ ≤ t

For t > 0:
$$y(t) = \int_{0}^{t} 1 \cdot e^{-(t-\tau)} \, d\tau = e^{-t} \int_{0}^{t} e^{\tau} \, d\tau$$

$$y(t) = e^{-t}[e^{\tau}]_0^t = e^{-t}(e^t - 1) = 1 - e^{-t}$$

$$\boxed{y(t) = (1 - e^{-t})u(t)}$$

This is the step response of an RC circuit!

---

## Key Differences: Discrete vs Continuous

| Aspect | Discrete | Continuous |
|--------|----------|------------|
| **Signals** | x[n], h[n] | x(t), h(t) |
| **Operation** | Σ (sum) | ∫ (integral) |
| **Impulse** | δ[n] (Kronecker) | δ(t) (Dirac) |
| **Output length** | N₁ + N₂ - 1 | Depends on signal support |
| **Computation** | Direct calculation | Often requires calculus |

---

## Properties (Same as Discrete!)

| Property | Formula |
|----------|---------|
| Commutative | $x * h = h * x$ |
| Associative | $(x * h_1) * h_2 = x * (h_1 * h_2)$ |
| Distributive | $x * (h_1 + h_2) = x*h_1 + x*h_2$ |
| Identity | $x(t) * \delta(t) = x(t)$ |
| Delay | $x(t) * \delta(t-T) = x(t-T)$ |

---

## Frequency Domain Connection

Just like discrete, continuous convolution becomes multiplication:

$$\mathcal{L}\{x * h\} = X(s) \cdot H(s)$$
$$\mathcal{F}\{x * h\} = X(j\omega) \cdot H(j\omega)$$

This is why Laplace and Fourier transforms are so powerful!

---

## Common Mistakes

> ⚠️ **Mistake 1:** Wrong integration limits
> 
> Always check where both x(τ) AND h(t-τ) are non-zero

> ⚠️ **Mistake 2:** Confusing τ and t
> 
> τ is the integration variable, t is the time index of output

> ⚠️ **Mistake 3:** Forgetting causality constraints
> 
> For causal signals, limits often become [0, t] not [-∞, ∞]

---

## Key Takeaways

1. **Continuous convolution:** $y(t) = \int x(\tau)h(t-\tau)d\tau$
2. **Same algorithm:** Flip → Shift → Multiply → Integrate
3. **Same properties:** Commutative, associative, distributive
4. **Same identity:** $x(t) * \delta(t) = x(t)$
5. **Transform connection:** Convolution → Multiplication

---

*You've now mastered both discrete and continuous convolution — the foundation of all LTI system analysis!*
