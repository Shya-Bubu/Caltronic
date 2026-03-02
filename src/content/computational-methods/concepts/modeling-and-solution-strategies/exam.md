# Exam Guide: Modeling and Solution Strategies

## Typical Question Patterns

| Pattern | Marks | Time |
|---------|-------|------|
| **Define and compare** — "Define modeling and abstraction. When is a simple model preferable?" | 5 | 5 min |
| **Optimization problem** — "Set up a least-squares objective for fitting y = ae^(bx) to data." | 6-8 | 8 min |
| **Regularization analysis** — "Explain the effect of λ on model complexity. Sketch the bias-variance curve." | 6 | 6 min |
| **State-space formulation** — "Write state-space equations for an RLC circuit." | 6-8 | 8 min |

## Mark Allocation Tips

- **State-space problems**: Identify the state variables (capacitor voltages, inductor currents), write the derivative equations, and organize into matrix form. Each matrix (A, B, C, D) earns marks.
- **Regularization**: Always mention the trade-off between fit quality and model simplicity. Sketch the bias-variance curve for full marks.

## Common Mistakes

- **State variables**: Choosing the wrong state variables (e.g., resistor voltage — not a valid state). Only energy-storage elements (C, L) provide independent state variables.
- **Regularization = throwing away data**: No. Regularization constrains the *solution*, not the *data*. All data points are used; the penalty just limits how extreme the solution can be.
- **Confusing relaxation with regularization**: Relaxation is a problem-solving strategy (start simple, add complexity). Regularization is a mathematical technique (add penalty term). Different concepts.
