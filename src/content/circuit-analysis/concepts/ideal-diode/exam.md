## Exam Focus: The Ideal Diode

### Common Question Patterns

1. **Solve an ideal diode circuit**: Given a circuit with one or more ideal diodes, determine which diodes conduct and which are reverse biased. Find all voltages and currents.
2. **Sketch the v-i characteristic**: Draw the ideal diode's characteristic on the v-i plane and label the two modes.
3. **Transfer characteristic**: Given an input voltage range, sketch the output voltage of a circuit containing an ideal diode (e.g., a half-wave rectifier).
4. **Multiple diodes**: Circuits with two or more ideal diodes where you must determine which combination of states is consistent.

### Common Mistakes

- **Forgetting to check consistency**: Students often assume a state, solve the circuit, and write down the answer without verifying that the assumed state is consistent. Always check: if you assumed forward conducting, is $i \geq 0$? If you assumed reverse biased, is $v \leq 0$?
- **Getting the direction wrong**: Current flows from anode to cathode (in the direction the triangle points). If you set up the current reference in the wrong direction, all your consistency checks will fail.
- **Trying too many combinations blindly**: With $n$ diodes, there are $2^n$ possible state combinations. Instead of trying all of them, use physical reasoning to eliminate impossible states first. For instance, two diodes in parallel with the same polarity will both be in the same state.
- **Confusing ideal and real diodes**: The ideal diode has zero forward voltage drop. Do not add 0.7V unless the problem specifically asks for the real diode model.

### Exam Tips

- Always start by assuming the most "obvious" state (e.g., if the source voltage is positive and the diode is oriented in the forward direction, try forward conducting first).
- Draw the equivalent circuit after replacing each diode with an open or short circuit. This makes the linear analysis straightforward.
- For transfer characteristics, identify the critical input voltage at which the diode switches state (the "breakpoint"). Then sketch the output in each region separately.
- Label the anode and cathode on every diode in the circuit before beginning the analysis. This prevents sign errors.
- Remember: the ideal diode absorbs zero power in both modes. This is a useful sanity check.
