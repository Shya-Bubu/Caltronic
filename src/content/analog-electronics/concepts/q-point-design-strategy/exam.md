# Exam Patterns — Q-Point Design Strategy

## How This Appears in Exams

Q-point design is a **core exam topic** worth 10-15 marks. Expect questions that require you to:

- Calculate the safe VCEQ range for given specs (5 marks)
- Explain why the AC load line makes the upper limit tighter (3 marks)
- Determine the minimum ICQ for undistorted output (3-5 marks)
- Sketch DC and AC load lines on characteristic curves (5 marks)

## Common Question Types

| Type | Marks | What They Test |
|------|-------|---------------|
| "Find the range of VCEQ for undistorted 7Vpp output" | 5 | Safe zone calculation with margins |
| "Why is the AC load line steeper than the DC load line?" | 3 | Understanding R5∥RL < R4+R5 |
| "Calculate the minimum ICQ" | 3 | Vp / (R5∥RL) calculation |
| "Sketch both load lines on IC vs VCE axes" | 5 | Intersection at Q-point, AC line through Q-point |

## Mark Allocation Tips

- Always show the **margin calculation** explicitly (1V for cutoff, 1V for saturation, 3V for AC load line)
- State the **peak voltage** Vp = Vpp/2 early — examiners check for this
- When sketching load lines, label the **intercepts** on both axes
- Clearly mark the Q-point at the **intersection** of the DC load line and the chosen IB curve

## Common Mistakes

1. **Using Vpp instead of Vp** — Vp = Vpp/2 = 3.5V, not 7V
2. **Forgetting the AC load line adjustment** — the safe zone is 4.5-7.5V, not 4.5-10.5V
3. **Setting ICQ below the minimum** — must exceed Vp/(R5∥RL)
4. **Confusing DC and AC load line slopes** — DC: -1/(R4+R5), AC: -1/(R5∥RL)
