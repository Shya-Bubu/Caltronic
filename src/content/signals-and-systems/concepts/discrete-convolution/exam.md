# Exam Strategies: Discrete Convolution

## Common Question Types

### Type 1: Compute Convolution
"Find y[n] = x[n] * h[n]"
- Use flip-shift-multiply-sum
- Check output length = N₁ + N₂ - 1

### Type 2: Graphical Convolution
"Sketch y[n] given graphs of x[n] and h[n]"
- Flip h[k] to h[-k]
- Slide and compute at each n

### Type 3: Properties
"Use convolution properties to simplify..."
- Commutative: x * h = h * x
- Distributive: x * (h₁ + h₂) = x*h₁ + x*h₂
- x * δ[n-k] = x[n-k]

## Quick Computation Tips

1. **Count non-zero products:** Only overlapping regions contribute
2. **Use tabular method:** Create multiplication table
3. **Check endpoint values:** y[0] and y[N-1] often easy to verify

## Common Mistakes

- Forgetting to flip h[k] before shifting
- Wrong output length (should be N₁ + N₂ - 1)
- Confusing convolution (*) with multiplication (×)
- Missing the summation step
