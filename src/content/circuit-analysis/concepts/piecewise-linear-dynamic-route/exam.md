# Exam Guide: Piecewise-Linear Circuits

## Typical Questions
| Pattern | Marks | Time |
|---------|-------|------|
| **Dynamic route tracing** — "Given this PWL characteristic and initial v_C, trace the route." | 6-8 | 8 min |
| **Segment-by-segment solution** — "Find v_C(t) for all t ≥ 0." | 8-12 | 15 min |
| **Jump identification** — "Identify impasse points and describe the jump." | 4-6 | 5 min |
| **Convolution integral** — "Find the zero-state response given h(t) and x_s(t)." | 5-7 | 8 min |

## Common Mistakes
- **Wrong direction**: Check the sign of $i_C$ at the initial point to determine if $v_C$ increases or decreases.
- **Forgetting continuity at segment boundaries**: $v_C$ must be continuous across segment transitions. The final value of one segment = initial value of next.
- **Wrong Thevenin for each segment**: Each straight-line segment has its own $R_{TH}$ (slope) and $v_{oc}$ (intercept). Don't use the same Thevenin for all segments.
