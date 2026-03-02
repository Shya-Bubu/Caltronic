# Bringing It All Together

## The First-Order Circuit Toolkit

You now have a complete set of tools for analyzing any first-order circuit:

| Tool | When to Use |
|------|-------------|
| **V-I relationships** ($i = C\dot{v}$, $v = L\dot{i}$) | Setting up the differential equation |
| **Continuity property** | Determining initial conditions at switching instants |
| **Energy conservation** | Checking solutions, understanding power flow |
| **General solution** $x(t) = x(\infty) + [x(t_0)-x(\infty)]e^{-(t-t_0)/\tau}$ | Solving any DC-driven first-order circuit |
| **Inspection method** | Quick solutions using $x(t_0)$, $x(\infty)$, and $\tau$ |
| **Dynamic route** | Piecewise-linear circuits with multiple operating regions |

## The Three-Step Method

For any first-order circuit with DC sources:

1. **Find $x(t_0)$**: The initial condition — use continuity ($v_C$ or $i_L$ just before the switch)
2. **Find $x(\infty)$**: The steady-state value — replace C with open circuit, L with short circuit
3. **Find $\tau$**: The time constant — $\tau = R_{TH} \cdot C$ (RC) or $\tau = L / R_{TH}$ (RL)

Then substitute into the general formula. This inspection method works for *every* branch voltage and current in any first-order linear circuit — thanks to the substitution theorem.

## Looking Ahead

Second-order circuits (with both a capacitor AND an inductor) produce oscillatory responses — underdamped, critically damped, and overdamped. The foundation you've built here — differential equations, initial conditions, time constants — extends directly to those more complex systems.
