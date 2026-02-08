# Exam Strategies: System Properties

## Testing Linearity
**Method**: Check if T{ax₁ + bx₂} = aT{x₁} + bT{x₂}
**Common non-linear indicators**: |x|, x², sin(x), constants added

## Testing Time-Invariance
**Method**: 
1. Find y(t) for input x(t)
2. Find y₁(t) for input x(t-t₀)
3. Check if y₁(t) = y(t-t₀)

## Testing Causality
**Look for**: x(t+a) with a>0 → non-causal
