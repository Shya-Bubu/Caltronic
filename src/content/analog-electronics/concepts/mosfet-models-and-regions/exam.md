# Exam Guide — MOSFET Models and Regions

## How This Topic Appears in Exams

MOSFET questions are a staple. Expect DC bias analysis, region identification, and V-I curve sketching.

## Typical Question Types

| Type | Marks | Time |
|------|-------|------|
| Identify operating region from given V_GS and V_DS | 3-5 | 3 min |
| Calculate I_DS in saturation given K and V_T | 4-6 | 5 min |
| Sketch I_DS vs V_DS family of curves | 5-8 | 7 min |
| DC bias analysis of CS amplifier | 8-12 | 12 min |
| Compare BJT and MOSFET saturation | 3-4 | 3 min |

## Mark-Scoring Tips

1. **State the region before calculating**. Write "Assuming saturation: V_DS ≥ V_GS − V_T" explicitly.
2. On V-I sketches, **label the boundary parabola** V_DS = V_GS − V_T separating triode from saturation.
3. For transfer characteristics, **plot V_out vs V_in** showing the inverted parabola and identify the gain as the slope.

## Common Mistakes

- Confusing MOSFET saturation (amplifier mode) with BJT saturation (switch ON)
- Forgetting the factor of 2 in the saturation equation: I_DS = (K/2)(V_GS − V_T)², not K(V_GS − V_T)²
- Using the triode equation when the MOSFET is in saturation (or vice versa)
- Applying V_GS = 0.7V (that's V_BE for a BJT, not V_T for a MOSFET)
