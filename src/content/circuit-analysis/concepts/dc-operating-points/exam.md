## Exam Focus: DC Analysis and Operating Points

### Common Question Patterns

1. **Load-line construction**: Given a DC source $E_b$, a linear resistor $R_b$, and a nonlinear device characteristic $i = g(v)$, draw the load line and identify the operating point(s). The load line always passes through $(E_b, 0)$ on the voltage axis and $(0, E_b/R_b)$ on the current axis.
2. **Algebraic operating-point calculation**: Set the device equation equal to the load-line equation and solve the resulting nonlinear algebraic equation (often a quadratic). Identify all solutions and check which lie within the physical domain of the device.
3. **Graphical identification of multiple solutions**: Given two $v$-$i$ curves, count and label all intersections. State whether the circuit has a unique operating point, multiple operating points, or no operating point.
4. **Newton-Raphson iteration**: Given $f(v) = 0$ and an initial guess $v_0$, compute two or three Newton-Raphson iterates using $v_{n+1} = v_n - f(v_n)/f'(v_n)$. Show each step explicitly: evaluate $f$, evaluate $f'$, compute the ratio, update the guess.
5. **Back-to-back one-port analysis**: Partition a given circuit into two sub-circuits, state the KVL and KCL constraints ($v_a = v_b$, $i_a = -i_b$), and set up the operating-point equation.

### Common Mistakes

- **Incorrect load-line intercepts**: The voltage intercept is $v = E_b$ (not $E_b/R_b$), and the current intercept is $i = E_b/R_b$ (not $E_b$). Swapping these produces a line with the wrong slope and wrong operating points.
- **Sign errors in the quadratic formula**: When rearranging the operating-point equation into standard form $av^2 + bv + c = 0$, students frequently drop a minus sign. Always verify your equation by substituting one of the solutions back into both the device equation and the load-line equation.
- **Forgetting to check the domain**: A mathematical solution to the operating-point equation may lie outside the region where the device model is valid. For example, if the device characteristic is $i = 4v^2$ and is only defined for $v \geq 0$, a negative-voltage solution is not physically realisable.
- **Incorrect Newton-Raphson derivative**: The derivative $f'(x)$ must be computed correctly. For $f(v) = 4v^2 + 4v - 8$, the derivative is $f'(v) = 8v + 4$, not $8v$ or $4v + 4$. An incorrect derivative produces incorrect iterates.
- **Poor initial guess for Newton-Raphson**: Starting far from any root can cause divergence or convergence to an unexpected root. A quick sketch of the load line and device curve should always inform your choice of starting point.

### Exam Tips

- Begin every load-line problem by writing down the two equations explicitly: the device characteristic and the load line. Set them equal and simplify before attempting to solve.
- When a quadratic arises, compute the discriminant $\Delta = b^2 - 4ac$ first. If $\Delta < 0$, there are no real solutions (no operating point). If $\Delta = 0$, there is exactly one (tangent intersection). If $\Delta > 0$, there are two.
- For Newton-Raphson problems, present your work in a table with columns: $n$, $v_n$, $f(v_n)$, $f'(v_n)$, $v_{n+1}$. This format is clean, easy to grade, and reduces arithmetic errors.
- Always sketch the load line and device curve, even if the problem does not explicitly ask for a sketch. The sketch confirms whether your algebraic solutions are reasonable and catches gross errors.
- If asked "how many operating points?", the answer is always the number of intersections between the device curve and the load line. State this clearly and relate it to the discriminant or graphical evidence.
