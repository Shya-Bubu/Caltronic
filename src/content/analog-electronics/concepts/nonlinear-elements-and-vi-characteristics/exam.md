# Exam Guide — Nonlinear Elements and V-I Characteristics

## How This Topic Appears in Exams

This concept is tested both directly (sketch V-I curves, apply the Ebers-Moll equation) and indirectly (as prerequisite knowledge for diode and transistor circuit analysis).

## Typical Question Types

| Type | Marks | Time |
|------|-------|------|
| Sketch diode V-I and label key features | 4-6 | 5 min |
| Calculate diode current at a given voltage using Ebers-Moll | 3-5 | 4 min |
| Graphical operating point (load-line intersection) | 6-8 | 8 min |
| Classify elements as linear/nonlinear from V-I curve | 3-4 | 3 min |

## Mark-Scoring Tips

1. **Include the exponential shape** — the V-I curve must show near-zero current for V < 0.5V and rapid rise above 0.6V. A straight diagonal line loses marks.
2. **Label I_S and V_T** on the Ebers-Moll equation. Markers look for correct parameters.
3. **On load-line questions**, draw both curves on the same axes, clearly mark the intersection as Q (operating point), and read off both V and I coordinates.

## Common Mistakes

- Drawing the diode V-I as a step function (it's smooth, not a discontinuous jump)
- Confusing $V_T$ (thermal voltage ≈ 25 mV) with the diode turn-on voltage (≈ 0.7V)
- Using $I_S$ in milliamps instead of amps ($I_S \approx 10^{-14}$ A, not mA)
- Forgetting the "−1" in the Ebers-Moll equation (matters for reverse bias)
