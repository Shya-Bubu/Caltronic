# Mathematical Foundations of LTI Response

## Formal Derivation

### Impulse Train Representation

Any discrete signal x[n] can be written as:

$$x[n] = \sum_{k=-\infty}^{\infty} x[k] \cdot \delta[n-k]$$

**Proof:** The sifting property of the delta function gives us x[k]·δ[n-k] = x[k] when n=k, and 0 otherwise.

### Applying LTI Properties

**Step 1: Time Invariance**

If $\delta[n] \xrightarrow{T} h[n]$, then:
$$\delta[n-k] \xrightarrow{T} h[n-k]$$

**Step 2: Homogeneity (Scaling)**

If $\delta[n-k] \xrightarrow{T} h[n-k]$, then:
$$x[k] \cdot \delta[n-k] \xrightarrow{T} x[k] \cdot h[n-k]$$

**Step 3: Superposition (Additivity)**

$$\sum_{k} x[k] \cdot \delta[n-k] \xrightarrow{T} \sum_{k} x[k] \cdot h[n-k]$$

### The Convolution Theorem

$$\boxed{y[n] = \sum_{k=-\infty}^{\infty} x[k] \cdot h[n-k] = x[n] * h[n]}$$

## Mathematical Properties

### Commutativity
$$x[n] * h[n] = h[n] * x[n]$$

Proof: Substitute m = n - k in the convolution sum.

### Associativity
$$(x * h_1) * h_2 = x * (h_1 * h_2)$$

### Distributivity
$$x * (h_1 + h_2) = x * h_1 + x * h_2$$
