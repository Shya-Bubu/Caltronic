# Exam Guide: Continuity and Impulse

## Typical Question Patterns

| Pattern | Marks | Time |
|---------|-------|------|
| **Initial conditions** — "Find v_C(0⁺) given the circuit before and after switching." | 4-6 | 5 min |
| **Impulse response** — "A current impulse acts on a capacitor. Find v_C(t)." | 3-5 | 4 min |
| **Proof-based** — "Prove the continuity property for capacitor voltage." | 5-7 | 8 min |

## Common Mistakes

- **Confusing initial conditions**: $v_C(0^+) = v_C(0^-)$, NOT $v_C(0^+) = V_{\text{source}}$. The capacitor starts at its pre-switch voltage, not the new source voltage.
- **Thinking everything is continuous**: Only $v_C$ and $i_L$ are continuous. Resistor current, capacitor current, etc. CAN jump.
- **Wrong impulse area**: For $i = CE\delta(t)/\Delta$... no! The area is $CE$, not $CE/\Delta$. The $\Delta$ cancels in the limiting process.
