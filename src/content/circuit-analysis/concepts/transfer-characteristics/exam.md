## Exam Focus: Transfer Characteristics

### Common Question Patterns

1. **Derivation from first principles**: Given two resistors in series with specified $v$-$i$ characteristics, derive the transfer characteristic $v_o(v_i)$ step by step. Expect to write KCL, KVL, express $v_i = f(i)$ and $v_o = h(i)$, and eliminate $i$.
2. **Parametric construction**: Compute $(v_i, v_o)$ pairs for several values of $i$ and sketch the transfer characteristic curve in the $v_i$-$v_o$ plane.
3. **Identifying gain and offset**: Given a transfer characteristic curve or equation, determine the slope (gain) and any voltage offset at a specified operating region.
4. **Comparison of linear vs. nonlinear**: Explain how the transfer characteristic of a diode-resistor series circuit differs from that of a purely resistive voltage divider.

### Common Mistakes

- **Omitting KCL or KVL**: Students sometimes jump directly to the transfer relation without establishing that $i_1 = i_2 = i$ (KCL, series constraint) and $v_i = v_1 + v_2$ (KVL). Every derivation must begin with these two statements. Omitting them costs marks and leads to errors in more complex problems.
- **Confusing driving-point with transfer characteristic**: The driving-point characteristic is the $v$-$i$ relationship at the input port. The transfer characteristic is $v_o$ vs. $v_i$. These are different functions, plotted in different planes, and answering one when the question asks for the other is a common error.
- **Failing to eliminate the parameter**: Some students present $v_i(i)$ and $v_o(i)$ separately and stop, without combining them into $v_o(v_i)$. If a closed-form elimination is not feasible, you must at least construct the curve parametrically by tabulating $(v_i, v_o)$ pairs.
- **Incorrect diode model application**: In the PN-junction example, students sometimes write the output as the voltage across the diode rather than across the resistor. The problem statement specifies which element carries the output -- read it carefully.
- **Ignoring the sub-threshold region**: For a diode-resistor circuit, the region $v_i < V_\gamma$ produces $v_o \approx 0$. Students who assume $v_o = v_i - V_\gamma$ for all $v_i$ miss this flat portion of the transfer curve and lose marks on the sketch.

### Exam Tips

- Write the five-step procedure (KCL, KVL, output expression, eliminate parameter, plot) at the top of your answer. This structures your work and ensures you do not skip a step.
- When parametric elimination is impractical, present a neat table with columns $i$, $v_1$, $v_2$, $v_i = v_1 + v_2$, $v_o = v_2$ and plot the $(v_i, v_o)$ points. Choose enough points to capture any curvature.
- Label the axes of your transfer characteristic sketch clearly: $v_i$ on the horizontal axis, $v_o$ on the vertical axis. Mark key features such as the turn-on voltage and the asymptotic slope.
