## Exam Focus: Parallel Connections and the Duality Principle

### Common Question Patterns

1. **Graphical parallel addition**: Given two $v$-$i$ curves, construct the parallel combination by adding currents at each voltage level (vertical stacking).
2. **Duality translation**: Given a series-circuit theorem or result, state the dual for parallel circuits by substituting dual terms.
3. **Duality matching**: Fill in a table of dual pairs (voltage source $\leftrightarrow$ current source, inductance $\leftrightarrow$ capacitance, mesh $\leftrightarrow$ node, etc.).
4. **Mixed series-parallel**: Identify series and parallel subgroups in a circuit, reduce step by step, and find the overall driving-point characteristic.
5. **Zener diode regulator analysis**: Model the Zener diode as a PWL element, place it in parallel with a load, and find the combined characteristic and operating point.
6. **Prove controllability**: Show that the parallel combination of voltage-controlled resistors is voltage-controlled.

### Common Mistakes

- **Adding voltages instead of currents in parallel**: The parallel rule adds currents at equal voltage. Students sometimes add voltages (the series rule).
- **Incorrect duality substitutions**: The most commonly confused pairs are: resistance $\leftrightarrow$ conductance (not resistance $\leftrightarrow$ resistance), open circuit $\leftrightarrow$ short circuit (not open $\leftrightarrow$ open), and mesh $\leftrightarrow$ node. Getting even one pair wrong invalidates the dual statement.
- **Applying parallel addition to current-controlled elements**: The clean parallel rule requires voltage-controlled elements ($i = \hat{i}(v)$). If both elements are current-controlled, you cannot simply add the $\hat{v}$ functions -- you need the parametric approach instead.
- **Forgetting that parallel conductances add, not resistances**: In parallel, $G_\text{eq} = G_1 + G_2$, which gives $R_\text{eq} = R_1 R_2 / (R_1 + R_2)$. Students sometimes write $R_\text{eq} = R_1 + R_2$ by habit from series circuits.
- **Not verifying duality claims**: When asked to "state the dual," students sometimes just swap voltage and current without also swapping all other dependent terms (sources, KVL/KCL, connection types). The substitution must be comprehensive and consistent.

### Exam Tips

- Memorise the duality table. It appears frequently on exams, either as a fill-in-the-blank or as the basis for translating a known result.
- For graphical addition, use a table with columns $v$, $i_1$, $i_2$, $i = i_1 + i_2$. Choose voltage values at the breakpoints and a few intermediate points.
- When reducing a mixed series-parallel circuit, work from the innermost combination outward. At each step, state whether you are applying the series rule or the parallel rule.
- If a problem asks "is this result voltage-controlled?" after a parallel combination, the answer is yes if both inputs were voltage-controlled. State the theorem and verify the function is single-valued.
- For the Zener diode example, clearly identify the two regions (Zener off, Zener on) and solve each separately. The breakpoint is at $v = -V_Z$.
