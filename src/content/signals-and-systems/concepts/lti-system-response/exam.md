# Exam Strategies: LTI System Response

## Common Question Types

### Type 1: Identify Impulse Response
"Given the input-output pairs, find h[n]"
- Use x[n] = δ[n] → y[n] = h[n]
- If given x[n] = δ[n-k], then y[n] = h[n-k]

### Type 2: Verify LTI Properties
"Show that the system is (or is not) LTI"
- Check linearity: αx₁ + βx₂ → αy₁ + βy₂
- Check time invariance: x[n-n₀] → y[n-n₀]

### Type 3: Compute Output
"Given x[n] and h[n], find y[n]"
- Apply convolution sum
- May need graphical convolution

## Key Formulas to Memorize

1. $y[n] = x[n] * h[n]$
2. $x[n] = \sum_k x[k]\delta[n-k]$
3. $\delta[n] \rightarrow h[n]$ defines the system

## Common Mistakes

- Forgetting to check BOTH linearity AND time invariance for LTI
- Confusing impulse response h[n] with step response s[n]
- Not recognizing that h[n] = s[n] - s[n-1]
