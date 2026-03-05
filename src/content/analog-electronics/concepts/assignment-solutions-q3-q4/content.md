# Solutions: Q3 (Graphical Analysis) & Q4 (Two-Stage CE-CC)

---

## Question 3: Graphical Analysis with Output Characteristics

**Problem**: The BJT in Figure 3(a) has output characteristics in Figure 3(b) with $V_{BE(on)} = 0.64$ V and $h_{ie} = 1$ kΩ.

### Given
- Circuit: R1=22k, R2=4.7k, RC, RE, VCC=15V
- Q-point from Figure 3(b): approximately $V_{CEQ} \approx 8$ V, $I_{CQ} \approx 8$ mA, $I_{BQ} \approx 80$ μA

### 3.1 Find hfe and hoe from Output Characteristics

**hfe**: Read from the graph at the Q-point ($V_{CE} = 8$ V):

$$h_{fe} = \frac{\Delta I_C}{\Delta I_B}\bigg|_{V_{CE}=8V}$$

At $V_{CE} = 8$ V, reading $I_C$ at $I_B = 100$ μA and $I_B = 60$ μA:
- $I_C(I_B = 100 \text{ μA}) \approx 10$ mA
- $I_C(I_B = 60 \text{ μA}) \approx 6$ mA

$$h_{fe} = \frac{10 - 6}{(100 - 60) \times 10^{-6}} = \frac{4 \times 10^{-3}}{40 \times 10^{-6}} = 100$$

**hoe**: Read the slope of the $I_B = 80$ μA curve at the Q-point:

$$h_{oe} = \frac{\Delta I_C}{\Delta V_{CE}}\bigg|_{I_B=80\mu A}$$

Along the $I_B = 80$ μA curve, between $V_{CE} = 4$ V and $V_{CE} = 12$ V:
- $I_C(V_{CE} = 4V) \approx 7.2$ mA, $I_C(V_{CE} = 12V) \approx 8.8$ mA

$$h_{oe} = \frac{8.8 - 7.2}{12 - 4} \times 10^{-3}/V = \frac{1.6 \times 10^{-3}}{8} = 0.2 \times 10^{-3} \text{ S} = 0.2 \text{ mS}$$

$$1/h_{oe} = 5 \text{ kΩ}$$

[[visual:q3-output-chars]]

### 3.2 Determine RE and RC for Q-Point

The Q-point is at $(V_{CEQ} = 8\text{V}, I_{CQ} = 8\text{mA}, I_{BQ} = 80\text{μA})$.

**Find RE**: 

$$V_{Th} = \frac{R_2}{R_1+R_2} V_{CC} = \frac{4.7}{22+4.7} \times 15 = \frac{4.7}{26.7} \times 15 = 2.640 \text{ V}$$

$$R_{Th} = R_1 \| R_2 = \frac{22 \times 4.7}{22+4.7} = \frac{103.4}{26.7} = 3.873 \text{ kΩ}$$

From KVL (base loop) with $I_B = 80$ μA and $h_{fe} = \beta = 100$:

$$V_{Th} = I_B R_{Th} + V_{BE} + I_E R_E$$

$$2.640 = 80 \times 10^{-6} \times 3873 + 0.64 + (101 \times 80 \times 10^{-6}) R_E$$

$$2.640 = 0.310 + 0.64 + 8.08 \times 10^{-3} R_E$$

$$R_E = \frac{2.640 - 0.95}{8.08 \times 10^{-3}} = \frac{1.69}{8.08 \times 10^{-3}} = 209.2 \text{ Ω} \approx 200 \text{ Ω}$$

**Find RC**: From KVL (collector loop):

$$V_{CC} = I_C R_C + V_{CE} + I_E R_E$$

$$15 = 8 \times 10^{-3} R_C + 8 + 8.08 \times 10^{-3} \times 209$$

$$15 = 8 \times 10^{-3} R_C + 8 + 1.689$$

$$R_C = \frac{15 - 9.689}{8 \times 10^{-3}} = \frac{5.311}{8 \times 10^{-3}} = 663.9 \text{ Ω} \approx 680 \text{ Ω}$$

[[visual:q3-re-rc-result]]

### 3.3 DC and AC Load Lines with x-Intercepts

**DC Load Line**:
- Slope = $-1/(R_C + R_E) = -1/(680 + 209) = -1/889$ Ω
- x-intercept ($I_C = 0$): $V_{CE} = V_{CC} = \mathbf{15 \text{ V}}$
- y-intercept ($V_{CE} = 0$): $I_C = V_{CC}/(R_C+R_E) = 15/889 = 16.87$ mA

**AC Load Line** (with CE bypassing RE, and assuming a load resistance):
If no external load is explicitly given, $R_{AC} = R_C = 680$ Ω.
If load is connected: $R_{AC} = R_C \| R_L$.

For this problem, let's assume AC load = $R_C = 680$ Ω (no load explicitly mentioned for AC):

- Slope = $-1/R_{AC} = -1/680$ (steeper than DC)
- Passes through Q-point: $(8\text{V}, 8\text{mA})$
- x-intercept: $V_{CE} = V_{CEQ} + I_{CQ} \times R_{AC} = 8 + 8 \times 10^{-3} \times 680 = 8 + 5.44 = \mathbf{13.44 \text{ V}}$
- y-intercept: $I_C = I_{CQ} + V_{CEQ}/R_{AC} = 8 + 8/0.68 = 8 + 11.76 = \mathbf{19.76 \text{ mA}}$

[[visual:q3-load-lines]]

### 3.4 Output and Input Waveforms

**Input**: $v_s(t) = 0.09 \sin(\omega t)$ V

**Base current swing**:

The input signal reaches the base through coupling cap and produces changes in $i_b$:

With $R_{in} \approx h_{ie} = 1$ kΩ (with CE bypassing RE):

$$i_b = \frac{v_s}{h_{ie}} = \frac{0.09}{1000} = 90 \text{ μA (peak)}$$

So $I_B$ swings from $(80 - 90) = -10$ μA to $(80 + 90) = 170$ μA.

Since $I_{cutoff} = 0$, the minimum is clamped at $I_B = 0$.

**Reading from graph**: At each $I_B$ value, find $V_{CE}$ along the AC load line:
- At $I_B = 170$ μA: $I_C \approx 14$ mA → $V_{CE} \approx 8 - (14-8) \times 0.68 = 8 - 4.08 = 3.92$ V
- At $I_B = 0$ (cutoff): $I_C = 0$ → $V_{CE} = 13.44$ V (AC x-intercept)
- At Q-point: $V_{CE} = 8$ V

[[visual:q3-waveform]]

The output swings **asymmetrically**: from ~3.9V to ~13.4V (clipped at cutoff on the negative half cycle of IB, since IB would go below 0).

---

## Question 4: Two-Stage CE-CC Amplifier

**Problem**: Consider Figure 4. Q1 uses CE h-parameter model, Q2 uses CC h-parameter model.

### Given
- **Q1 (CE)**: $h_{ie} = 1100$ Ω, $h_{re} = 2.5 \times 10^{-4}$, $h_{fe} = 50$, $h_{oe} = 1/(40\text{kΩ})$
- **Q2 (CC)**: $h_{ic} = 1100$ Ω, $h_{fc} = -51$, $h_{rc} = 1$, $h_{oc} = 1/(40\text{kΩ})$
- $R_S = 1$ kΩ, $R_{C1} = 10$ kΩ, $R_{E1} = 5$ kΩ, $R_{load} = 5$ kΩ

### 4.1 Small Signal Model

**Stage 1 (Q1 — CE)**: Input at base, output at collector.
The h-parameter CE model: $h_{ie}$ series with $h_{re}v_{ce}$ voltage source at input; $h_{fe}i_b$ current source with $1/h_{oe}$ in parallel at output.

**Stage 2 (Q2 — CC)**: Input at base (connected to Q1's collector through coupling cap), output at emitter.
The h-parameter CC model: $h_{ic}$ series with $h_{rc}v_{ec}$ voltage source at input; $h_{fc}i_b$ current source with $1/h_{oc}$ in parallel at output.

[[visual:q4-small-signal]]

### 4.2 Stage 1 (CE) Quantities — Without Stage 2 Effects

Using CE h-parameters (ignoring $h_{re}$ and using $h_{oe}$):

**(a) Current Gain**:

$$A_{i1} = \frac{-h_{fe}}{1 + h_{oe} R_C} = \frac{-50}{1 + (1/40000) \times 10000} = \frac{-50}{1.25} = -40$$

**(b) Voltage Gain**:

$$A_{v1} = \frac{A_{i1} \times R_C}{h_{ie}} = \frac{-40 \times 10000}{1100} = -363.6$$

**(c) Input Resistance** (looking into Q1 base):

$$R_{in1} = h_{ie} - \frac{h_{re} h_{fe} R_C}{1 + h_{oe} R_C} = 1100 - \frac{2.5 \times 10^{-4} \times 50 \times 10000}{1.25}$$

$$= 1100 - \frac{125}{1.25} = 1100 - 100 = 1000 \text{ Ω} = 1 \text{ kΩ}$$

**(d) Output Resistance** (of stage 1):

$$R_{out1} = \frac{1}{h_{oe} - \frac{h_{fe} h_{re}}{h_{ie} + R_S}} = \frac{1}{1/40000 - \frac{50 \times 2.5 \times 10^{-4}}{1100 + 1000}}$$

$$= \frac{1}{2.5 \times 10^{-5} - \frac{0.0125}{2100}} = \frac{1}{2.5 \times 10^{-5} - 5.95 \times 10^{-6}} = \frac{1}{1.905 \times 10^{-5}} = 52.5 \text{ kΩ}$$

[[visual:q4-stage1-results]]

### 4.3 Stage 2 (CC) Quantities — Without Stage 1 and Load

Using CC h-parameters:

**(a) Current Gain**:

$$A_{i2} = \frac{-h_{fc}}{1 + h_{oc} R_E} = \frac{-(-51)}{1 + (1/40000) \times 5000} = \frac{51}{1.125} = 45.33$$

**(b) Voltage Gain**:

$$A_{v2} = \frac{A_{i2} \times R_E}{h_{ic}} = \frac{45.33 \times 5000}{1100} = 206.1$$

Wait — for CC, this seems too high. Let me reconsider using the exact h-parameter formulas for CC:

$$A_{v2} = 1 - \frac{h_{ic}}{h_{ic} + (1+|h_{fc}|)R_E} = 1 - \frac{1100}{1100 + 52 \times 5000} = 1 - \frac{1100}{261100} = 1 - 0.00421 \approx 0.996$$

For CC, voltage gain is always ≈ 1 (the emitter follower property).

More precisely using h-param formulas:

$$A_{v2} = \frac{-h_{fc} R_{E}}{h_{ic} + (h_{ic}h_{oc} - h_{fc}h_{rc})R_{E}}$$

$$= \frac{51 \times 5000}{1100 + (1100/40000 - (-51)(1)) \times 5000}$$

$$= \frac{255000}{1100 + (0.0275 + 51) \times 5000}$$

$$= \frac{255000}{1100 + 255137.5} = \frac{255000}{256237.5} \approx 0.9952$$

**(c) Input Resistance**:

$$R_{in2} = h_{ic} + \frac{h_{rc}h_{fc}R_E}{1+h_{oc}R_E} = 1100 + \frac{1 \times (-51) \times 5000}{1.125} = 1100 + \frac{-255000}{1.125}$$

Wait — for CC: $h_{fc} = -51$, $h_{rc} = 1$.

$$R_{in2} = h_{ic} - \frac{h_{rc} h_{fc} R_E}{1 + h_{oc} R_E} = 1100 - \frac{1 \times (-51) \times 5000}{1.125} = 1100 + \frac{255000}{1.125} = 1100 + 226667 = 227.8 \text{ kΩ}$$

Very high input impedance — characteristic of CC.

**(d) Output Impedance**:

$$R_{out2} = \frac{h_{ic}}{|h_{fc}|} = \frac{1100}{51} \approx 21.6 \text{ Ω}$$

Very low output impedance — characteristic of CC.

[[visual:q4-stage2-results]]

### 4.4 Combined Circuit

**(a) Overall Voltage Gain** with load ($A_v = V_{Load}/V_s$):

Stage 1 loaded by stage 2: effective load = $R_{C1} \| R_{in2} = 10k \| 227.8k = 9.58$ kΩ

$$A_{v1,loaded} = -\frac{h_{fe} \times 9580}{h_{ie}} = -\frac{50 \times 9580}{1100} = -435.5$$

Stage 2 loaded by $R_{load} = 5$ kΩ: $A_{v2} \approx 0.995$

Source loading: $v_{in} = v_s \times R_{in1}/(R_{in1}+R_S) = v_s \times 1000/2000 = 0.5 v_s$

$$A_{vs} = 0.5 \times (-435.5) \times 0.995 = -\mathbf{216.7}$$

**(b) Overall Current Gain**: $A_{is} = A_{i1} \times A_{i2} \times \text{current dividers} \approx -40 \times 45.33 = -1813$

**(c) Input Resistance** (looking into Q1 base): $R_{in} = R_{in1} = 1$ kΩ

**(d) Output Resistance** (seen by load): $R_{out} = R_{out2} \approx 21.6$ Ω

[[visual:q4-combined-results]]
