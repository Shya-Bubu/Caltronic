# Exam Patterns — SPICE Verification & Design Iteration

## How This Appears in Exams

SPICE simulation questions typically appear as 5-8 mark supplementary questions in design labs:

- Interpret a given Bode plot to identify bandwidth and midband gain (3-5 marks)
- Explain the effect of changing a specific component (2-3 marks)
- Calculate capacitor values for a given cutoff frequency (3 marks)
- Identify the cause of distortion from a waveform screenshot (2-3 marks)

## Common Question Types

| Type | Marks | What They Test |
|------|-------|---------------|
| "From this Bode plot, identify the midband gain and bandwidth" | 3-5 | Reading gain in dB, identifying -3dB points |
| "Why does reducing Cin cause gain loss at low frequencies?" | 2-3 | XC = 1/(2πfC) increases, creating a high-pass filter effect |
| "Calculate the minimum capacitor value for fL = 50Hz" | 3 | C = 1/(2π × f × R), choosing R correctly |
| "Explain the distortion in this output waveform" | 2-3 | Identifying clipping type (saturation vs cutoff) from waveform shape |

## Mark Allocation Tips

- Convert gain to dB before answering Bode plot questions: $A_{v,dB} = 20\log_{10}(600) = 55.6$ dB
- State the **-3dB definition**: bandwidth is measured where gain drops by 3dB from midband
- When asked about component effects, always explain the **mechanism**, not just the result

## Common Mistakes

1. **Confusing gain in linear and dB** — 600 linear = 55.6 dB, not 600 dB
2. **Not knowing the -3dB definition** — it's 0.707 of the midband voltage gain (half power)
3. **Ignoring the effect of bypass capacitor** — CE across R2 shorts R2 at AC, increasing gain
4. **Expecting exact values from simulation** — SPICE models differ from simplified h-parameter model
