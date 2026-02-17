## Exam Focus: Series Connection of Two-Terminal Resistors

### Common Question Patterns

1. **Graphical addition**: Given two $v$-$i$ curves, construct the series combination by adding voltages at each current level. Present the result as a table of $(v, i)$ points or a sketched curve.
2. **Algebraic addition**: Given $v_1 = \hat{v}_1(i)$ and $v_2 = \hat{v}_2(i)$, find $v = \hat{v}_1(i) + \hat{v}_2(i)$ and evaluate at specific current values.
3. **Parametric representation**: Series connection of a voltage-controlled resistor and a current-controlled resistor. Express the result parametrically and compute points.
4. **Reversed terminals**: One resistor is flipped; compute $v = -\hat{v}_1(-i) + \hat{v}_2(i)$ and compare with the non-reversed case.
5. **Driving-point characteristic**: Given a combination circuit, identify which elements are in series, apply KCL and KVL, and derive the port $v$-$i$ relationship.
6. **Identify controllability type**: Prove that the series combination of current-controlled resistors is current-controlled. Explain why series connection of voltage-controlled resistors may not be voltage-controlled.

### Common Mistakes

- **Adding currents instead of voltages**: In series, KCL forces equal currents and KVL forces voltages to add. Students sometimes add currents (which is the parallel rule) instead of voltages.
- **Forgetting to check that both elements are current-controlled**: The clean series addition rule $v = \hat{v}_1(i) + \hat{v}_2(i)$ only works when both elements have single-valued $\hat{v}(i)$ representations. If one element is only voltage-controlled, you must use the parametric approach.
- **Sign errors in the reversed-terminal case**: When one element is flipped, both $v$ and $i$ are negated for that element: the contribution is $-\hat{v}_1(-i)$, not $-\hat{v}_1(i)$ or $\hat{v}_1(-i)$. Missing either negation produces incorrect results.
- **Confusing "horizontal stacking" with "vertical stacking"**: Series addition stacks $v$-$i$ curves **horizontally** (adding voltages at equal current). Parallel addition stacks **vertically** (adding currents at equal voltage). Mixing these up is extremely common.
- **Neglecting that bilateral resistors are immune to reversal**: For a bilateral element, $\hat{v}(-i) = -\hat{v}(i)$, so $-\hat{v}(-i) = \hat{v}(i)$. The reversed and non-reversed cases give identical results. Students sometimes spend effort on sign corrections that ultimately cancel.

### Exam Tips

- When performing graphical addition, create a table with columns: $i$, $v_1$, $v_2$, $v = v_1 + v_2$. Choose current values that include the breakpoints of both curves.
- Always state the KCL and KVL equations explicitly before proceeding. This shows your reasoning and catches sign errors early.
- For the parametric case, define your parameter clearly (usually $i$ for series) and show how each variable depends on it.
- If the problem asks "is the result current-controlled?", check whether the sum $\hat{v}_1(i) + \hat{v}_2(i)$ produces a single-valued function. For two current-controlled elements, the answer is always yes.
- Sketch your result. Even a rough sketch helps you catch errors: the series combination should be "wider" (more voltage at each current) than either individual curve.
