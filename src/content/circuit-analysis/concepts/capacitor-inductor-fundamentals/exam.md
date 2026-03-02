# Exam Guide: Capacitors and Inductors

## Typical Question Patterns

| Pattern | Marks | Time |
|---------|-------|------|
| **V-I computation** — "Given v(t), find i(t) for a capacitor." | 3-4 | 3 min |
| **Energy calculation** — "Find energy stored in C=10μF at v=5V." | 2-3 | 2 min |
| **DC steady state** — "Find all voltages/currents after the switch has been closed for a long time." | 5-8 | 8 min |
| **q-v / Φ-i curves** — "Is this capacitor charge-controlled or voltage-controlled?" | 3-4 | 3 min |

## Common Mistakes

- **Forgetting the time derivative**: Writing $i = Cv$ instead of $i = C\frac{dv}{dt}$. The derivative is essential — without it, you're treating a capacitor as a resistor.
- **Wrong DC behavior**: Some students think capacitors are short circuits at DC (wrong — they're open circuits). Remember: $i = C \cdot 0 = 0$ at DC.
- **Mixing C and L duals**: The inductor is a short at DC, the capacitor is open. Don't swap them.
- **Energy formula**: $E = \frac{1}{2}Cv^2$, NOT $Cv^2$ or $\frac{1}{2}CV$. The squared voltage and the ½ are both essential.
