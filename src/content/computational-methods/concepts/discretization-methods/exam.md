# Exam Guide: Discretization Methods

## Typical Question Patterns

| Pattern | Marks | Time |
|---------|-------|------|
| **Finite difference** — "Discretize d²y/dx² using central differences on a grid with h = 0.1." | 5-6 | 5 min |
| **DFT setup** — "For N = 256 samples at fs = 8 kHz, find frequency resolution and max frequency." | 4 | 3 min |
| **PDE discretization** — "Write the discretized form of Laplace's equation on a uniform grid." | 5-6 | 5 min |
| **Classification** — "Is this discretization or approximation? Justify." | 3-4 | 3 min |

## Common Mistakes

- **Confusing discretization with approximation**: Discretization changes the domain (continuous → discrete). Approximation changes the value (exact → approximate). They often coexist but are conceptually distinct.
- **Forward vs. central accuracy**: Students often use forward difference when central is more accurate and available. Always prefer central differences unless boundary conditions prevent it.
- **DFT frequency resolution**: Δf = fs/N, NOT fs/2 or N·fs. The maximum frequency is fs/2 (Nyquist), but the resolution between bins is fs/N.
