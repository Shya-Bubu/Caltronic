# Solutions: Q1 (Circuit Design) & Q2 (Common-Base Analysis)

> **Try each question yourself first** before reading the solution. The teaching concepts (1-8) give you all the tools. Here, every step is shown with full derivations so you can follow the logic and fill in the gaps in your own solution.

---

## Question 1: Design Circuit for Specified Q-Point

**Problem**: Design the circuit in Figure 1 to obtain $I_E = 0.2$ mA, $V_E = +2$ V, and $V_C = +5$ V. Design for $I_{B2} = 0.1$ mA. Use standard 5% resistors. The transistor has $V_{BE} = 0.7$ V and $\beta = 100$.

[[visual:q1-circuit-figure]]

### Given
- $V_{CC} = +9$ V, $I_E = 0.2$ mA, $V_E = 2$ V, $V_C = 5$ V
- $\beta = 100$, $V_{BE} = 0.7$ V, $I_{B2} = 0.1$ mA
- Standard 5% resistors required

### Step 1: Find RE

The voltage across $R_E$ is $V_E$ (since the bottom of $R_E$ is grounded):

$$R_E = \frac{V_E}{I_E} = \frac{2}{0.2 \times 10^{-3}} = 10 \text{ kΩ}$$

**Standard 5% value**: 10 kΩ ✓ (exact match in E24 series)

### Step 2: Find IC and RC

$$I_C = \frac{\beta}{\beta + 1} I_E = \frac{100}{101} \times 0.2 = 0.198 \text{ mA}$$

The voltage across $R_C$ is $V_{CC} - V_C$:

$$R_C = \frac{V_{CC} - V_C}{I_C} = \frac{9 - 5}{0.198 \times 10^{-3}} = \frac{4}{0.198 \times 10^{-3}} = 20.2 \text{ kΩ}$$

**Standard 5% value**: 20 kΩ ✓ (closest E24 value)

### Step 3: Find VB and RB2

$$V_B = V_E + V_{BE} = 2 + 0.7 = 2.7 \text{ V}$$

$I_{B2}$ is the current through $R_{B2}$ (from base node to ground):

$$R_{B2} = \frac{V_B}{I_{B2}} = \frac{2.7}{0.1 \times 10^{-3}} = 27 \text{ kΩ}$$

**Standard 5% value**: 27 kΩ ✓ (exact match)

### Step 4: Find IB and RB1

$$I_B = \frac{I_E}{\beta + 1} = \frac{0.2}{101} = 1.98 \text{ μA}$$

The current through $R_{B1}$ is the sum of $I_{B2}$ and $I_B$:

$$I_{B1} = I_{B2} + I_B = 0.1 + 0.00198 = 0.10198 \text{ mA}$$

$$R_{B1} = \frac{V_{CC} - V_B}{I_{B1}} = \frac{9 - 2.7}{0.10198 \times 10^{-3}} = \frac{6.3}{0.10198 \times 10^{-3}} = 61.78 \text{ kΩ}$$

**Standard 5% value**: 62 kΩ ✓ (closest E24 value, only 0.35% error)

[[visual:q1-summary]]

### Final Design Values

| Component | Calculated | Standard 5% |
|-----------|-----------|-------------|
| $R_E$ | 10 kΩ | **10 kΩ** |
| $R_C$ | 20.2 kΩ | **20 kΩ** |
| $R_{B2}$ | 27 kΩ | **27 kΩ** |
| $R_{B1}$ | 61.78 kΩ | **62 kΩ** |

### Verification

With standard values, recheck the Q-point:
- $V_B = I_{B2} \times R_{B2} = 0.1 \times 27 = 2.7$ V ✓
- $V_E = V_B - V_{BE} = 2.7 - 0.7 = 2.0$ V ✓
- $I_E = V_E/R_E = 2.0/10k = 0.2$ mA ✓
- $V_C = V_{CC} - I_C R_C = 9 - 0.198 \times 20 = 9 - 3.96 = 5.04$ V (≈ 5V ✓)
- $V_{CE} = V_C - V_E = 5.04 - 2 = 3.04$ V > 0.2 V ✓ (active region confirmed)

---

## Question 2: Common-Base Amplifier Analysis

**Problem**: Consider the circuit in Figure 2 with $h_{fe} = h_{FE} = 200$, $h_{ie} = 1$ kΩ, $V_{BE} = 0.64$ V.

[[visual:q2-circuit-figure]]

### Given
- $R_s = 100$ Ω, $R_{E1} = 200$ Ω, $R_{E2} = 1.5$ kΩ, $R_1 = 180$ kΩ, $R_2 = 30$ kΩ
- $R_C = 4.7$ kΩ, $R_L = 10$ kΩ, $V_{CC} = 10$ V
- $h_{fe} = 200$, $h_{ie} = 1$ kΩ, $V_{BE} = 0.64$ V

### 2.1 DC Equivalent Circuit

Remove all capacitors (C1, C2, C3 → open circuits), remove the signal source and load:

[[visual:q2-dc-equivalent]]

What remains:
- $V_{CC} = 10$ V at top
- $R_1 = 180$ kΩ and $R_2 = 30$ kΩ form voltage divider
- Total emitter resistance: $R_E = R_{E1} + R_{E2} = 200 + 1500 = 1700$ Ω = 1.7 kΩ
- $R_C = 4.7$ kΩ
- Source $v_s$ and $R_s = 100$ Ω disconnected (coupling cap C1 is open)
- Load $R_L = 10$ kΩ disconnected (coupling cap C2 is open)

### 2.2 Find the Q-Point (ICQ, VCEQ)

**Step 1**: Thevenin equivalent of base biasing:

$$V_{Th} = \frac{R_2}{R_1 + R_2} \times V_{CC} = \frac{30}{180 + 30} \times 10 = \frac{30}{210} \times 10 = 1.429 \text{ V}$$

$$R_{Th} = R_1 \| R_2 = \frac{180 \times 30}{180 + 30} = \frac{5400}{210} = 25.71 \text{ kΩ}$$

**Step 2**: KVL around base-emitter loop:

$$V_{Th} = I_B R_{Th} + V_{BE} + I_E R_E$$

$$1.429 = I_B \times 25710 + 0.64 + 201 I_B \times 1700$$

$$0.789 = I_B (25710 + 341700) = I_B \times 367410$$

$$I_B = \frac{0.789}{367410} = 2.148 \text{ μA}$$

**Step 3**: Collector current and VCE:

$$I_{CQ} = \beta I_B = 200 \times 2.148 \times 10^{-6} = 429.5 \text{ μA} \approx 0.43 \text{ mA}$$

$$I_E = (\beta + 1) I_B = 201 \times 2.148 \times 10^{-6} = 431.7 \text{ μA} \approx 0.432 \text{ mA}$$

$$V_{CEQ} = V_{CC} - I_C R_C - I_E R_E = 10 - (0.4295)(4.7) - (0.4317)(1.7) = 10 - 2.019 - 0.734 = 7.25 \text{ V}$$

**Q-point**: $I_{CQ} \approx 0.43$ mA, $V_{CEQ} \approx 7.25$ V

[[visual:q2-qpoint-result]]

### 2.3 AC Small Signal Equivalent Circuit

Apply AC rules:
1. **C1 shorts**: $v_s$ with $R_s = 100$ Ω connects to the emitter through $R_{E1} = 200$ Ω
2. **C2 shorts**: $R_L = 10$ kΩ connects to the collector (in || with $R_C$)
3. **C3 shorts**: $R_{E2} = 1.5$ kΩ is bypassed (shorted)
4. **$V_{CC}$ → AC ground**: top of $R_C$ and $R_1$ go to ground
5. **R1 || R2** = 25.71 kΩ connects base to ground

**Configuration**: The signal enters at the **emitter** and the **base is AC-grounded** through R1||R2 → This is a **Common-Base (CB)** amplifier.

[[visual:q2-ac-equivalent-solution]]

**Assumptions for simplified model**:
1. $h_{re} \approx 0$ (negligible reverse voltage feedback)
2. $h_{oe} \approx 0$ ($1/h_{oe} \gg R_C$, output resistance very large)
3. Coupling and bypass capacitors have negligible impedance at the signal frequency
4. $V_{CC}$ is an ideal voltage source with zero AC impedance

### 2.4 Calculate Impedances and Gain

#### 2.4(a) Input Impedance Without Load (Looking Into C1)

Without the load ($R_L$ removed), we look into the node where $v_s$ connects after C1.

In the CB configuration, the input impedance looking into the emitter is:

$$R_{in,emitter} = \frac{h_{ie}}{1 + h_{fe}} = \frac{1000}{201} = 4.975 \text{ Ω}$$

But looking into C1, we see $R_{E1} = 200$ Ω in series with $R_{in,emitter}$:

Actually, for the CB configuration with $R_{E1}$ between the coupling cap and the emitter terminal:

The impedance looking into C1 is $R_{E1}$ in series with $R_{in,emitter}$ (the transistor emitter input resistance), and R1||R2 is at the base (to ground):

$$R_{in,emitter} = \frac{h_{ie} + R_{Th\_base}}{1 + h_{fe}}$$

Wait — let me be more careful. At the emitter, looking in, with the base connected to ground through $R_{B} = R_1 \| R_2 = 25.71$ kΩ:

$$R_{in,e} = \frac{h_{ie} + R_B}{1 + h_{fe}} \approx \frac{1000 + 25710}{201} = \frac{26710}{201} = 132.9 \text{ Ω}$$

Note: Since $R_B \gg h_{ie}$, the base resistor dominates.

Looking into C1, we see $R_{E1}$ in series with $R_{in,e}$:

$$R_{in} = R_{E1} + R_{in,e} = 200 + 132.9 = 332.9 \text{ Ω}$$

#### 2.4(b) Output Impedance Without Source (Looking Into C2)

Without the source, looking into C2 (the collector side):

With the simplified model ($h_{oe} = 0$):

$$R_{out} = R_C = 4.7 \text{ kΩ}$$

#### 2.4(c) Voltage Gain Without Source and Load Effects

The intrinsic voltage gain of the CB stage (from emitter input to collector output):

The current through the emitter is $i_e$, and $i_b = -i_e/(1+h_{fe})$ (base current is small fraction of emitter current, opposite direction).

The controlled current source delivers $h_{fe} i_b$ to the collector:

$$v_o = -h_{fe} i_b \times R_C = -h_{fe} \times \left(\frac{-i_e}{1+h_{fe}}\right) \times R_C = \frac{h_{fe}}{1+h_{fe}} i_e R_C$$

The input voltage at the emitter terminal (relative to ground, looking past RE1):

$$v_{in} = i_e \times R_{in,e} = i_e \times \frac{h_{ie} + R_B}{1+h_{fe}}$$

Wait — for the voltage gain "without the effects of load and source," we measure from the actual input terminal to the output terminal:

For CB, the voltage gain (without load and source) from the emitter terminal to the collector:

$$A_v = \frac{h_{fe} R_C}{h_{ie}} = \frac{200 \times 4700}{1000} = 940$$

Note: This is **positive** (no inversion in CB).

However, accounting for $R_{E1}$ in the emitter path:

$$A_v = \frac{h_{fe} R_C}{h_{ie} + (1+h_{fe}) R_{E1}} = \frac{200 \times 4700}{1000 + 201 \times 200} = \frac{940000}{41200} = 22.82$$

Actually, the question says "without the effects of load and source." Given the circuit topology, the most standard interpretation of voltage gain from $v_{in}$ (at the emitter-side coupling cap) to $v_{out}$ (at the collector-side coupling cap):

$$A_v = \frac{h_{fe} R_C}{h_{ie} + (1+h_{fe}) R_{E1}} = \frac{200 \times 4700}{1000 + 201 \times 200} = \frac{940000}{41200} \approx 22.8$$

### 2.5 Output Voltage Across RL When vs = 100 mV

Now include both source ($R_s = 100$ Ω) and load ($R_L = 10$ kΩ):

**Step 1**: Effective output resistance with load:

$$R_{out,eff} = R_C \| R_L = \frac{4700 \times 10000}{4700 + 10000} = \frac{47000000}{14700} = 3197 \text{ Ω} \approx 3.2 \text{ kΩ}$$

**Step 2**: Voltage gain with effective output:

$$A_v = \frac{h_{fe} \times R_{out,eff}}{h_{ie} + (1+h_{fe}) R_{E1}} = \frac{200 \times 3197}{1000 + 201 \times 200} = \frac{639400}{41200} = 15.52$$

**Step 3**: Input voltage divider (source loading):

$$v_{in} = v_s \times \frac{R_{in}}{R_{in} + R_s} = 100 \times \frac{332.9}{332.9 + 100} = 100 \times \frac{332.9}{432.9} = 76.9 \text{ mV}$$

**Step 4**: Output voltage:

$$v_o = v_{in} \times A_v = 76.9 \times 10^{-3} \times 15.52 = 1.19 \text{ V}$$

Or directly: $v_o = v_s \times \frac{R_{in}}{R_{in}+R_s} \times A_v = 100 \times 10^{-3} \times 0.769 \times 15.52 \approx 1.19$ V

[[visual:q2-final-answer]]

**The output voltage across $R_L$ is approximately 1.19 V** when $v_s = 100$ mV.
