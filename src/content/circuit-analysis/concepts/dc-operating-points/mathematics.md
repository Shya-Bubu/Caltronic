# Mathematical Foundations: DC Operating Points

> Rigorous formulation of operating point equations and solution methods.

---

## Operating Point Definition

For a circuit comprising a nonlinear element with characteristic $f_a(v,i) = 0$ and an external network with characteristic $f_b(v, i) = 0$:

The **operating point** Q is a solution $(V_Q, I_Q)$ that simultaneously satisfies:

$$f_a(V_Q, I_Q) = 0 \quad \text{and} \quad f_b(V_Q, I_Q) = 0$$

---

## Load Line: Linear External Network

From lecture Page 20, for a voltage source $E_b$ in series with resistor $R_b$:

**KVL:** $E_b = v + R_b i$

Rearranging:
$$i = \frac{E_b - v}{R_b} = -\frac{1}{R_b}v + \frac{E_b}{R_b}$$

This is the **load line** — a straight line in the i-v or v-i plane.

**Slope:** $-1/R_b$  
**v-intercept:** $(E_b, 0)$  
**i-intercept:** $(0, E_b/R_b)$

---

## Back-to-Back Connection (Lecture Pages 21-22)

Two one-ports $N_a$ and $N_b$ connected at nodes 1 and 1':

**Kirchhoff's Laws:**
- KVL: $v_a = v_b = v$
- KCL: $i_a = -i_b$ (currents flow opposite)

**Constraints:**
$$f_a(v, i) = 0 \quad \text{(from } N_a \text{)}$$
$$f_b(v, -i) = 0 \quad \text{(from } N_b \text{, with sign flip)}$$

**Operating point:** Find $(v, i)$ satisfying both equations.

### Example from Lecture (Page 22)

$$f_a(v, i) = 4v^2 - i = 0 \implies i = 4v^2$$
$$f_b(v, i) = v - E_b - R_b i = 0 \implies i = \frac{v - E_b}{R_b}$$

Setting equal:
$$4v^2 = \frac{v - E_b}{R_b}$$

$$4R_b v^2 - v + E_b = 0$$

**Quadratic formula:**
$$v = \frac{1 \pm \sqrt{1 - 16R_b E_b}}{8R_b}$$

For $E_b = 2V$, $R_b = 0.25\Omega$:

$$v = \frac{1 \pm \sqrt{1 - 8}}{2} = \frac{1 \pm \sqrt{-7}}{2}$$

**Wait, that should be:** Let me recalculate from lecture:

Actually, the load line for $N_b$ is:
$$i_b = \frac{1}{R_b}(v_b - E_b)$$

With $i_a = -i_b$ and $v_a = v_b = v$:

$$4v^2 = -\frac{1}{R_b}(v - E_b) = -\frac{v}{R_b} + \frac{E_b}{R_b}$$

$$4R_b v^2 + v - E_b = 0$$

$$v = \frac{-1 \pm \sqrt{1 + 16R_b E_b}}{8R_b}$$

For $E_b = 2$, $R_b = 1/4$:

$$v = \frac{-1 \pm \sqrt{1 + 8}}{2} = \frac{-1 \pm 3}{2}$$

**Solutions:** $v = 1V$ or $v = -2V$

**Currents:** $i = 4(1)^2 = 4A$ or $i = 4(-2)^2 = 16A$

---

## Newton-Raphson Method (Lecture Page 22)

For equation $f(x) = 0$, iterate:

$$x_{n} = x_{n-1} - \frac{f(x_{n-1})}{f'(x_{n-1})}$$

**Geometric interpretation:** Tangent line at $x_{n-1}$ intersects x-axis at $x_n$.

**Convergence:** Quadratic convergence if:
1. Initial guess $x_0$ close enough to solution
2. $f'(x) \neq 0$ near solution
3. $f$ is smooth

**For circuits:** Set up $F(v) = i_{device}(v) - i_{loadline}(v) = 0$ and iterate.

---

## Existence and Uniqueness

**Linear passive circuits:** Unique solution always exists.

**Nonlinear circuits:** May have:
1. **Unique solution** (typical for monotonic characteristics)
2. **Multiple solutions** (bistable circuits, e.g., tunnel diode)
3. **No solution** (inconsistent constraints)

---

## Summary: Mathematical Rigor

**Operating point:**
- Solution to $f_a(v, i) = 0$ and $f_b(v, i) = 0$
- Graphical: intersection of two curves

**Load line:**
- $i = (E_b - v)/R_b$
- Linear constraint from external circuit

**Back-to-back:**
- $v_a = v_b$, $i_a = -i_b$
- Leads to system of two equations

**Newton-Raphson:**
- Iterative: $x_n = x_{n-1} - f/f'$
- Quadratic convergence near solution
