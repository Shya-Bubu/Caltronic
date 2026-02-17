## Exam Focus: Piecewise-Linear (PWL) Approximation

### Common Question Patterns

1. **Synthesis**: Given a multi-segment PWL characteristic (as a graph or table), determine the decomposition parameters ($G_0$, $G_k$, $E_k$) and draw the equivalent circuit using ideal diodes, sources, and linear resistors.
2. **Analysis with region selection**: Given a circuit with PWL elements, assume a region, solve the linear circuit, and verify consistency.
3. **PWL approximation of a diode**: Replace the exponential diode curve with a 2- or 3-segment PWL model and solve a circuit using that model.
4. **Identify slope changes vs absolute slopes**: Given segment slopes, compute the incremental slope changes $G_k$ for the decomposition.
5. **Dual synthesis**: Given a current-controlled PWL characteristic, build the dual circuit using convex resistors in series.
6. **Multi-element region analysis**: Circuit with two PWL elements; enumerate possible region combinations and find the consistent one.

### Common Mistakes

- **Confusing absolute slope with incremental slope change**: The decomposition uses $G_k = (\text{slope of segment } k+1) - (\text{slope of segment } k)$. Students frequently use the absolute slope of segment $k+1$ instead of the difference.
- **Forgetting to check region consistency**: After solving a linear circuit for an assumed region, you must verify the solution lies within that region's bounds. Skipping this step can produce answers that violate the assumed model.
- **Incorrect breakpoint identification**: The breakpoint is on the independent variable axis ($v$-axis for voltage-controlled, $i$-axis for current-controlled). Students sometimes read it from the wrong axis.
- **Wrong circuit topology for the PWL type**: Voltage-controlled PWL uses concave resistors in **parallel**. Current-controlled PWL uses convex resistors in **series**. Mixing these topologies is a common error.
- **Negative slope changes**: When a characteristic has a segment with lower slope than the previous one, $G_k$ is negative. Students sometimes assume all $G_k$ must be positive and produce incorrect decompositions.
- **Using the wrong PWL diode model**: The 2-segment model ($V_\gamma = 0.7\,\text{V}$, $r_d$ forward resistance) is the default for hand analysis unless the problem specifies otherwise. Do not add breakdown unless asked.

### Exam Tips

- For synthesis problems, draw the PWL curve first, label all breakpoints and slopes, then compute $G_k$ values systematically in a table. Show your work: segment number, slope, incremental change.
- For region analysis, start with the most likely region (e.g., all diodes off, or the region suggested by source values). If inconsistent, change one element's region and re-solve.
- When approximating an exponential diode, choose $V_\gamma$ where the tangent line at the Q-point intersects the voltage axis. This gives the best local approximation.
- For circuits with multiple PWL elements, the number of region combinations grows multiplicatively. Be systematic: list all combinations and eliminate obviously impossible ones first.
- Always draw the circuit for each candidate region, replacing PWL elements with their linear equivalents (resistor + source). This makes the linear solve straightforward.
- Remember the duality: every result about voltage-controlled PWL in parallel has a dual about current-controlled PWL in series. Use this to cut your workload in half.
