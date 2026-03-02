# Exam Guide: First-Order RC and RL Response

## Typical Questions
| Pattern | Marks | Time |
|---------|-------|------|
| **Find v_C(t) or i_L(t) after switching** | 6-10 | 10 min |
| **Determine R_TH and τ from complex circuit** | 4-6 | 5 min |
| **Multi-interval switching (piecewise solution)** | 8-12 | 15 min |
| **Derive the general formula from ODE** | 5-7 | 8 min |

## Common Mistakes
- **Wrong R_TH**: Must be the resistance *seen by C/L with sources off*. Not the total resistance. Not with sources on.
- **Forgetting initial condition**: x(t₀) comes from continuity, which comes from the PREVIOUS circuit state. Don't assume x(0) = 0.
- **Wrong τ for RL**: τ = L/R, NOT R·L. An easy error when switching between RC (τ = RC) and RL (τ = L/R).
- **Missing steady-state analysis**: x(∞) requires analyzing the circuit with C→open, L→short. Not replacing with R or leaving them in.
