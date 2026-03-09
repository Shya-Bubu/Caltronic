# Exam Patterns — Small-Signal Linearization

## How This Topic Appears in Exams

Small-signal linearization is typically tested as **Part (a)** of larger amplifier analysis questions, or as a standalone short-answer question worth 3–5 marks.

## Common Question Types

### Type 1: State the Assumptions (3 marks)
"List the conditions under which the BJT can be treated as a linear active two-port device."

**Expected answer:** (1) Properly biased in active region, (2) Signal small ($v_{be} \ll V_T$, practically < 10 mV), (3) Low frequency (parasitic capacitances negligible).

### Type 2: Derive the Linear Model (5–8 marks)
"Starting from $I_B = (I_S/\beta) \cdot e^{V_{BE}/V_T}$, show that for small signals $i_b = (I_{BQ}/V_T) \cdot v_{be}$."

**Key steps to show:**
1. Substitute $V_{BE} = V_{BEQ} + v_{be}$
2. Factor out $I_{BQ}$
3. Taylor expand $e^{v_{be}/V_T}$
4. Drop higher-order terms with justification ($v_{be} \ll V_T$)
5. Identify DC and AC components

### Type 3: Validity Check (2–3 marks)
"If the source signal is 15 mV peak, is the small-signal model valid? Justify."

**Answer:** Marginal. $v_{be}/V_T = 15/26 = 0.577$. Second-order error is $(0.577)^2/2 = 16.6\%$ — exceeds 10% threshold. Model will have significant error.

## Common Mistakes

1. **Confusing $v_{be}$ with the source voltage $v_s$.** The source voltage divides across $R_S$ and the input impedance — what reaches the base-emitter junction is typically much smaller than $v_s$.
2. **Forgetting the bias requirement.** Students derive the linearization but forget to state that the BJT must be in the active region.
3. **Using 26 mV as the limit.** The limit is $v_{be} \ll 26$ mV, not $v_{be} < 26$ mV. The practical limit is 10 mV.

## Time Management
- State assumptions: 1 minute
- Full derivation: 4–5 minutes
- Validity check: 1 minute
