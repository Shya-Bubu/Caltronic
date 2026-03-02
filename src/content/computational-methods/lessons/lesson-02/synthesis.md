# Bringing It All Together

You now have a sharp, nuanced understanding of four foundational computational concepts. Let's cement the distinctions with one powerful example that uses **all four simultaneously**.

## The Complete Pipeline: Simulating a Nonlinear Circuit

Imagine you need to simulate a circuit containing a diode (nonlinear) driven by a continuous-time input, and you want to estimate the probability of meeting a bandwidth specification given component tolerances.

**Step 1 — Discretization**: Convert the continuous-time circuit equations into discrete time steps:
$$v_{n+1} = v_n + h \cdot f(v_n, i_n)$$

**Step 2 — Linearization**: At each time step, linearize the diode equation around the current operating point:
$$i \approx g_d \cdot v$$

**Step 3 — Approximation**: Solve using a finite number of Newton-Raphson iterations (approximating the exact solution):
$$v^{(k+1)} = v^{(k)} - \frac{f(v^{(k)})}{f'(v^{(k)})}$$

**Step 4 — Random Sampling**: Repeat the entire simulation 1000 times with randomly varied component values to estimate yield.

## The Decision Checklist

When you encounter a computational method, ask yourself:

| Question | If yes → |
|----------|----------|
| Is something complex being replaced by something simpler? | **Approximation** |
| Is a continuous quantity being converted to discrete points? | **Discretization** |
| Is a nonlinear function being replaced by a linear one near a point? | **Linearization** (a special case of approximation) |
| Is randomness being used to estimate a quantity? | **Random Sampling** |

## Looking Ahead

In the next lessons, you'll see these four concepts applied in specific numerical methods:
- **Root-finding** uses linearization (Newton-Raphson) and approximation (convergence tolerance)
- **Numerical integration** uses discretization (quadrature rules) and sometimes random sampling (Monte Carlo integration)
- **ODE solvers** combine discretization (time stepping) with approximation (truncation order)

Every method is built from these building blocks. Now you can recognize them on sight.
