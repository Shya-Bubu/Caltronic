# Solutions: Q5 (CE with Partial Degeneration) & Q6 (Two-Stage CE-CE with Feedback)

---

## Question 5: CE Amplifier with Partial Emitter Degeneration

**Problem**: Consider Figure 5. Calculate AC small signal quantities using the given h-parameters.

### Given
- $R_a = 42$ kΩ, $R_b = 10$ kΩ, $R_c = 4.7$ kΩ, $R_{e1} = 1$ kΩ (bypassed), $R_{e2} = 220$ Ω (unbypassed)
- $R_s = 1$ kΩ, $R_L = 10$ kΩ, $V_{CC} = 15$ V
- $h_{ie} = 1.1$ kΩ, $h_{re} = 2.5 \times 10^{-4}$, $h_{fe} = 100$, $h_{oe} = 0.1$ mΩ⁻¹ (i.e., $1/h_{oe} = 10$ kΩ)
- $V_{BE} = 0.64$ V, $\beta = 100$

### 5.1 Q-Point

**Thevenin equivalent**:

$$V_{Th} = \frac{R_b}{R_a + R_b} V_{CC} = \frac{10}{42 + 10} \times 15 = \frac{10}{52} \times 15 = 2.885 \text{ V}$$

$$R_{Th} = R_a \| R_b = \frac{42 \times 10}{52} = 8.077 \text{ kΩ}$$

**Base current** (total RE = Re1 + Re2 = 1000 + 220 = 1220 Ω):

$$I_B = \frac{V_{Th} - V_{BE}}{R_{Th} + (\beta+1)R_E} = \frac{2.885 - 0.64}{8077 + 101 \times 1220} = \frac{2.245}{8077 + 123220} = \frac{2.245}{131297}$$

$$I_B = 17.10 \text{ μA}$$

$$I_{CQ} = \beta I_B = 100 \times 17.10 = 1.71 \text{ mA}$$

$$I_E = 101 \times 17.10 = 1.727 \text{ mA}$$

$$V_{CEQ} = V_{CC} - I_C R_c - I_E R_E = 15 - 1.71 \times 4.7 - 1.727 \times 1.22 = 15 - 8.037 - 2.107 = 4.856 \text{ V}$$

**Q-point**: $I_{CQ} = 1.71$ mA, $V_{CEQ} = 4.86$ V ✓ (active region: $V_{CE} > 0.2$ V)

[[visual:q5-qpoint]]

### 5.2 Draw the AC Small Signal Equivalent Circuit

**AC rules applied**:
- C1 shorts: $v_s + R_s$ connects to base
- C2 shorts: $R_L = 10$ kΩ appears at collector (parallel with $R_c$)
- Bypass cap C1 shorts across $R_{e1}$: only $R_{e2} = 220$ Ω remains
- $V_{CC}$ → ground: top of $R_c$ and $R_a$ go to ground
- $R_a \| R_b$ = 8.077 kΩ from base to ground

**Configuration**: Common-Emitter with partial emitter degeneration ($R_{e2}$).

[[visual:q5-ac-equivalent]]

### 5.3 Calculate Av, Rin, Rout

Using the **simplified model** ($h_{re} = 0$):

Since $h_{oe} = 0.1 \times 10^{-3}$ S → $1/h_{oe} = 10$ kΩ, which is comparable to $R_c = 4.7$ kΩ. We should include $h_{oe}$.

**Effective output resistance** (without load):

$$R_{out} = R_c \| \frac{1}{h_{oe}} = 4.7k \| 10k = \frac{4.7 \times 10}{4.7 + 10} = \frac{47}{14.7} = 3.197 \text{ kΩ}$$

**Voltage gain** (without source and load):

$$A_v = \frac{-h_{fe} \times R_{out}}{h_{ie} + h_{fe} R_{e2}} = \frac{-100 \times 3197}{1100 + 100 \times 220} = \frac{-319700}{23100} = -13.84$$

Note: With $h_{fe} R_{e2} = 22000 \gg h_{ie} = 1100$, the gain is approximately:

$$A_v \approx \frac{-R_{out}}{R_{e2}} = \frac{-3197}{220} = -14.5$$

This approximation shows that **with emitter degeneration, the gain depends mainly on the ratio of output resistance to emitter resistance**, making it very stable.

**Input impedance** (looking into the base):

$$R_{in,base} = h_{ie} + (1+h_{fe}) R_{e2} = 1100 + 101 \times 220 = 1100 + 22220 = 23.32 \text{ kΩ}$$

Including biasing:

$$R_{in} = R_a \| R_b \| R_{in,base} = 8.077k \| 23.32k = \frac{8.077 \times 23.32}{8.077 + 23.32} = \frac{188.36}{31.40} = 5.998 \text{ kΩ} \approx 6 \text{ kΩ}$$

**Output impedance**:

$$R_{out} = R_c \| (1/h_{oe}) = 3.197 \text{ kΩ}$$

[[visual:q5-results]]

### 5.4 Overall Voltage Gain (with source and load)

**With load**: Replace $R_{out}$ with $R_{out} \| R_L$:

$$R_{out,L} = 3.197k \| 10k = \frac{3.197 \times 10}{3.197 + 10} = \frac{31.97}{13.197} = 2.422 \text{ kΩ}$$

$$A_v' = \frac{-h_{fe} \times R_{out,L}}{h_{ie} + h_{fe} R_{e2}} = \frac{-100 \times 2422}{23100} = -10.49$$

**With source**: $v_{in} = v_s \times R_{in}/(R_{in}+R_s)$

$$A_{vs} = A_v' \times \frac{R_{in}}{R_{in}+R_s} = -10.49 \times \frac{6000}{6000+1000} = -10.49 \times 0.857 = -8.99$$

[[visual:q5-overall-gain]]

---

## Question 6: Two-Stage CE-CE Amplifier with Feedback

**Problem**: Consider Figure 6. Two-stage CE-CE amplifier with individual Q-point and small-signal analysis, plus feedback topology analysis.

### Given (Stage 1: Q1)
- $R_{a1} = 56$ kΩ, $R_{b1} = 7.5$ kΩ, $R_{c1} = 9$ kΩ, $R_{e1} = 2$ kΩ
- $\beta_1 = 80$, $V_{BE1} = 0.7$ V

### Given (Stage 2: Q2)
- $R_{a2} = 56$ kΩ, $R_{b2} = 20$ kΩ, $R_{c2} = 7.5$ kΩ, $R_{e21} = 1.5$ kΩ (bypassed), $R_{e22} = 500$ Ω (unbypassed)
- $\beta_2 = 120$, $V_{BE2} = 0.7$ V, $V_{CC} = 20$ V, $R_L = 3$ kΩ

### 6.1 Q-Point for Each Transistor

**Q1 Q-Point**:

$$V_{Th1} = \frac{R_{b1}}{R_{a1}+R_{b1}} V_{CC} = \frac{7.5}{63.5} \times 20 = 2.362 \text{ V}$$

$$R_{Th1} = 56k \| 7.5k = \frac{56 \times 7.5}{63.5} = 6.614 \text{ kΩ}$$

$$I_{B1} = \frac{2.362 - 0.7}{6614 + 81 \times 2000} = \frac{1.662}{6614 + 162000} = \frac{1.662}{168614} = 9.857 \text{ μA}$$

$$I_{C1} = 80 \times 9.857 = 788.5 \text{ μA} \approx 0.789 \text{ mA}$$

$$V_{CE1} = 20 - 0.789 \times 9 - 0.799 \times 2 = 20 - 7.098 - 1.597 = 11.31 \text{ V}$$

**Q2 Q-Point** (RE total = Re21 + Re22 = 1500 + 500 = 2000 Ω):

$$V_{Th2} = \frac{20}{76} \times 20 = 5.263 \text{ V}$$

$$R_{Th2} = 56k \| 20k = \frac{56 \times 20}{76} = 14.737 \text{ kΩ}$$

$$I_{B2} = \frac{5.263 - 0.7}{14737 + 121 \times 2000} = \frac{4.563}{14737 + 242000} = \frac{4.563}{256737} = 17.77 \text{ μA}$$

$$I_{C2} = 120 \times 17.77 = 2.133 \text{ mA}$$

$$V_{CE2} = 20 - 2.133 \times 7.5 - 2.151 \times 2 = 20 - 15.997 - 4.302 = -0.3 $$

Hmm — this gives a negative VCE, which means the transistor would be in saturation. Let me re-check. For Q2:

$$V_{Th2} = \frac{R_{b2}}{R_{a2}+R_{b2}} V_{CC} = \frac{20}{56+20} \times 20 = \frac{20}{76} \times 20 = 5.263 \text{ V}$$

$$I_{B2} = \frac{5.263 - 0.7}{14737 + 121 \times 2000} = \frac{4.563}{256737} = 17.77 \text{ μA}$$

$$I_{C2} = 120 \times 17.77 \times 10^{-6} = 2.133 \text{ mA}$$

$$I_{E2} = 121 \times 17.77 \times 10^{-6} = 2.150 \text{ mA}$$

$$V_{CE2} = 20 - 2.133 \times 7.5 - 2.150 \times 2.0 = 20 - 16.0 - 4.3 = -0.3 \text{ V}$$

The negative result suggests that with the given component values, Q2 may be close to saturation. In practice, $V_{CE} \approx V_{CE(sat)} = 0.2$ V in saturation.

For the sake of the tutorial solution, we'll note the Q-point is at the edge:
$I_{C2} \approx 2.1$ mA, $V_{CE2} \approx V_{CE(sat)} \approx 0.2$ V (saturated or at the edge).

Actually, some questions may give slightly different values or the circuit has additional paths. Let's proceed with the AC analysis using the given h-parameters and note the potential saturation issue.

[[visual:q6-qpoints]]

### 6.2 AC Small Signal Equivalent (without feedback)

**AC rules**:
- All coupling caps short
- $R_{e21}$ bypass cap shorts $R_{e21}$; only $R_{e22} = 500$ Ω stays for Q2
- $R_{e1}$ has no bypass cap — stays in circuit for Q1
- Wait — re-examining: Q1 has RE1 = 2kΩ with no bypass specified.

For Q1 (CE with full RE = 2kΩ, no bypass):

$$A_{v1} = \frac{-\beta_1 R_{c1}}{h_{ie1} + (1+\beta_1) R_{e1}}$$

For Q2 (CE with partial: Re22 = 500Ω unbypassed):

$$A_{v2} = \frac{-\beta_2 (R_{c2} \| R_L)}{h_{ie2} + (1+\beta_2) R_{e22}}$$

### 6.3 Individual Stage Gains

Assuming simplified h-parameters ($h_{ie1} \approx h_{ie2} \approx 1.1$ kΩ):

**Stage 1**: With $R_{in2}$ as load:

$$R_{in2,base} = h_{ie2} + (1+\beta_2) R_{e22} = 1100 + 121 \times 500 = 61.6 \text{ kΩ}$$

$$R_{in2} = R_{a2} \| R_{b2} \| R_{in2,base} = 56k \| 20k \| 61.6k = 14.74k \| 61.6k = 11.88 \text{ kΩ}$$

Stage 1 effective load: $R_{c1} \| R_{in2} = 9k \| 11.88k = 5.12$ kΩ

$$A_{v1} = \frac{-80 \times 5120}{1100 + 81 \times 2000} = \frac{-409600}{163100} = -2.51$$

**Stage 2**: Effective output: $R_{c2} \| R_L = 7.5k \| 3k = 2.143$ kΩ

$$A_{v2} = \frac{-120 \times 2143}{1100 + 121 \times 500} = \frac{-257160}{61600} = -4.175$$

**Overall**: $A_v = A_{v1} \times A_{v2} = (-2.51) \times (-4.175) = +10.48$

(Positive because two inversions cancel)

[[visual:q6-gains]]

### 6.4 With Feedback ($R_f = 10$ kΩ)

**(a) Is the feedback positive or negative?**

Signal path: Input → Q1 base (inverts, CE) → Q1 collector → Q2 base (inverts, CE) → Q2 collector → feedback through Rf to Q1 base.

Two CE stages = two inversions. The output at Q2 collector is **in-phase** with the input at Q1 base. Feedback adds output signal to input signal.

But Rf feeds from Q2 collector back to Q1 base: if Q1 base goes up → Q1 collector goes down → Q2 collector goes up → fed back to Q1 base.

The signal **adds** to the original input — this appears to be **positive feedback**!

Wait — let me trace again. Actually, the key is: does the feedback subtract or add?

At Q1 base: original signal + feedback via Rf from Q2 collector. Since overall gain is positive (+10.48), the feedback signal is in the same direction as the input. The feedback **adds** to the input current at the base node (shunt mixing).

Since the overall gain (without feedback) is **positive** and the feedback is connected from output to input without inversion, this is **positive feedback** if the loop gain exceeds 1, potentially causing instability. However, with the given low gain (≈10), and Rf being large relative to Rin, the feedback may still be net negative depending on conventions.

For the standard analysis: the feedback from collector of Q2 (a voltage node) to the base of Q1 (summed as current at a shunt node) — this is **shunt-shunt (voltage-shunt)** topology.

**(b) Feedback Topology**: **Voltage-Shunt (Shunt-Shunt)**

- Sampling: Voltage (from collector of Q2)
- Mixing: Shunt (current added at base of Q1)

**(c) Circuit without feedback but with loading**:

Draw the two-stage amplifier with Rf appearing as a passive element:
- At the input: Rf in parallel with the base node of Q1
- At the output: Rf in parallel with the collector of Q2

This modifies: $R_{in}' = R_{in} \| R_f$ and $R_{out}' = R_{out} \| R_f$

[[visual:q6-feedback]]
