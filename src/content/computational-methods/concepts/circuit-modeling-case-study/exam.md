# Exam Guide: Circuit Modeling Case Study

## Typical Question Patterns

| Pattern | Marks | Time |
|---------|-------|------|
| **Load line + ideal diode** — "Find the operating point using the ideal diode model." | 4 | 3 min |
| **Model comparison** — "Compare the ideal and constant-drop models for Vs = 3V." | 5-6 | 5 min |
| **Shockley Q-point** — "Set up the Newton-Raphson iteration for the Shockley operating point." | 6-8 | 7 min |
| **Model justification** — "Which model for [application]? Justify." | 4 | 4 min |

## Common Mistakes

- **Using Shockley when not needed**: If the question says "using the ideal/constant-drop model," don't use the Shockley equation.
- **Wrong load line intercepts**: I-intercept is Vs/(r+R), NOT Vs/R (don't forget the source resistance r).
- **Forgetting ρ in piecewise-linear**: The total resistance is r + R + ρ, not r + R.
