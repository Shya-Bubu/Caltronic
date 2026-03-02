# Exam Guide: Linearization Methods

## Typical Question Patterns

| Pattern | Marks | Time |
|---------|-------|------|
| **Diode linearization** — "Derive the small-signal model for a diode at I₀ = 2 mA." | 5-6 | 5 min |
| **Pendulum** — "Linearize the pendulum equation. State the validity range." | 4-5 | 4 min |
| **Jacobian** — "Find matrices A and B for ẋ₁ = x₁x₂ + u, ẋ₂ = x₁² at (x₀, u₀)." | 6-8 | 8 min |
| **Conceptual** — "Why is linearization a special case of approximation? What does it enable?" | 4 | 4 min |

## Common Mistakes

- **Forgetting the validity condition**: ALWAYS state "valid for small perturbations around the operating point." Without this, the answer is incomplete.
- **Wrong Jacobian evaluation point**: The Jacobian must be evaluated AT the equilibrium point, not at a general point. First find equilibrium, then differentiate.
- **Confusing rd with static resistance**: The small-signal resistance rd = Vt/I₀ is NOT V₀/I₀. rd is the slope dV/dI at the operating point; V₀/I₀ is the DC resistance.
