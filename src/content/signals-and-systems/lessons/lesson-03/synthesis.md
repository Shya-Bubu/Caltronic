# Lesson 03 Synthesis: The Power of Convolution

## Key Insights

### 1. The Impulse Response Defines Everything

For any LTI system, if you know h[n] (the impulse response), you can compute the output for ANY input x[n].

$$y[n] = x[n] * h[n] = \sum_{k=-\infty}^{\infty} x[k] \cdot h[n-k]$$

### 2. Why This Works

The proof relies on three properties:
1. **Impulse decomposition**: Any signal = sum of scaled, shifted impulses
2. **Time invariance**: Shifted input → shifted output
3. **Linearity**: Scaled inputs → scaled outputs, summed inputs → summed outputs

### 3. Graphical Convolution

To compute y[n₀]:
1. **Flip** h[k] to get h[-k]
2. **Shift** to get h[n₀ - k]
3. **Multiply** x[k] · h[n₀ - k] point by point
4. **Sum** all the products

### 4. Convolution Properties

| Property | Formula |
|----------|---------|
| Commutative | x * h = h * x |
| Associative | (x * h₁) * h₂ = x * (h₁ * h₂) |
| Distributive | x * (h₁ + h₂) = x*h₁ + x*h₂ |

## What's Next

- Continuous-time convolution (integral form)
- Convolution in the frequency domain (multiplication!)
- BIBO stability from impulse response
