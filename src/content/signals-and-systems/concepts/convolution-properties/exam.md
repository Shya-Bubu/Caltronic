# Exam Focus: Convolution Properties

## Essential Properties

- **Commutative**: x * h = h * x
- **Associative**: (x * h₁) * h₂ = x * (h₁ * h₂)  
- **Distributive**: x * (h₁ + h₂) = x * h₁ + x * h₂
- **Identity**: x * δ = x
- **Shift**: delays add up
- **Differentiate**: d/dt(x*h) = (dx/dt)*h = x*(dh/dt)

## Exam Application Tips

1. Use commutativity to flip the simpler signal
2. Use associativity to pre-combine cascade systems
3. Use distributivity to handle parallel systems
4. Remember: duration of y = duration of x + duration of h

## Common Mistakes

- Forgetting that * is NOT multiplication
- Not recognizing when to use associativity to simplify
- Wrong sign on time shifts in the result
