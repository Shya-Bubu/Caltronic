# Exam Guide — Noise Margins & SRAM Cells

## What Examiners Ask

### Category 1: Noise Margin Calculation (4–6 marks)
- Define and calculate NMH and NML from given VOH, VOL, VIH, VIL
- Explain why output specs are tighter than input specs
- Compare noise margins across logic families

**Time allocation:** 5–8 minutes.

### Category 2: SRAM Cell Analysis (4–6 marks)
- Draw the cross-coupled BJT flip-flop
- Explain the two stable states
- Determine which transistor turns ON first given hFE mismatch

**Time allocation:** 8–10 minutes.

### Category 3: Output Loading (3–5 marks)
- Calculate the steady-state output HIGH voltage with a given load
- Determine if the output meets the VOH specification

**Time allocation:** 5 minutes.

## Common Mistakes

1. **Confusing NMH and NML formulas** — NMH = VOH - VIH (HIGH-side gap), NML = VIL - VOL (LOW-side gap). Getting the subtraction wrong gives negative or wrong values.
2. **Forgetting that SRAM startup is random** — The initial state depends on hFE mismatch, not on circuit design. Always state this explicitly.
3. **Using VOL instead of VIL in noise margin** — VOL is the output spec, VIL is the input spec. The margin is the gap BETWEEN corresponding output and input specs.

## Mark-Winning Tips

- Draw the noise margin voltage range diagram with both cascade circuits
- Label all four voltage parameters (VOH, VOL, VIH, VIL) with numerical values
- For the SRAM cell, trace the feedback loop: T1 collector → T2 base → T2 collector → T1 base
