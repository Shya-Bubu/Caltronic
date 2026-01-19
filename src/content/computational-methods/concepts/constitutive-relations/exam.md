# Constitutive Relations - Exam Preparation

## Essential Formulas to Memorize

### Basic Elements

| Element | Time Domain | Frequency Domain | Energy |
|---------|-------------|------------------|--------|
| Resistor | v = iR | Z = R | P = i²R (dissipated) |
| Capacitor | i = C dv/dt | Z = 1/(jωC) | W = ½Cv² |
| Inductor | v = L di/dt | Z = jωL | W = ½Li² |

### Nonlinear Elements

| Element | Equation | Small-Signal |
|---------|----------|--------------|
| Diode | i = Is(e^(v/Vt) - 1) | rd = Vt/Id |
| MOSFET | ID = (k/2)(VGS - VTH)² | gm = √(2k·ID) |

---

## Common Exam Question Types

### Type 1: Write Constitutive Relations

**Question**: "Write the constitutive relation for each component in the circuit."

**Strategy**: Identify each component and write its v-i relationship.

**Example**:
```
         R        C
    ────/\/\/──┬──┤├────
    │          │       │
   (+)         L      (-)
   Vs        ⊃⊃⊃     Vout
    │          │       │
    ──────────┴───────┘
```

**Answer**:
- Resistor: $v_R = i_R \cdot R$
- Capacitor: $i_C = C\frac{dv_C}{dt}$
- Inductor: $v_L = L\frac{di_L}{dt}$
- Voltage source: $v_s = V_s(t)$ (given function)

---

### Type 2: Combine with Conservation Laws

**Question**: "Derive the governing equation using KCL/KVL and constitutive relations."

**Strategy**:
1. Write KCL at nodes
2. Write KVL around loops
3. Substitute constitutive relations
4. Eliminate intermediate variables

**Example**: RC Circuit
```
        R
    ─┬─/\/\/─┬─
     │       │
    (+)     ═╪═ C   Vout = vC
    Vs       │
     │       │
    ─┴───────┴─
```

**Solution**:
- KVL: $V_s = v_R + v_C$
- Constitutive: $v_R = iR$ and $i = C\frac{dv_C}{dt}$
- Substitute: $V_s = RC\frac{dv_C}{dt} + v_C$

**Final equation**: $\frac{dv_C}{dt} + \frac{1}{RC}v_C = \frac{V_s}{RC}$

---

### Type 3: Frequency Domain Analysis

**Question**: "Find the impedance/transfer function."

**Strategy**:
1. Replace elements with impedances: R → R, C → 1/(jωC), L → jωL
2. Use series/parallel formulas
3. Apply voltage divider, etc.

**Example**: Find Z(jω) for series RLC
```
    ──R──L──C──
```

$$Z(j\omega) = R + j\omega L + \frac{1}{j\omega C}$$

$$= R + j\left(\omega L - \frac{1}{\omega C}\right)$$

**Resonance** when imaginary part = 0:
$$\omega_0 = \frac{1}{\sqrt{LC}}$$

At resonance: $Z = R$ (purely resistive)

---

### Type 4: Linearization

**Question**: "Find the small-signal model for the diode at ID = 1mA."

**Given**: Diode equation $i = I_s(e^{v/V_T} - 1)$, VT = 26mV

**Solution**:

Step 1: Find operating point voltage
$$V_D = V_T \ln\left(\frac{I_D}{I_s} + 1\right) \approx V_T \ln\left(\frac{I_D}{I_s}\right)$$

Step 2: Calculate small-signal resistance
$$r_d = \frac{dV}{dI}\bigg|_{I_D} = \frac{V_T}{I_D} = \frac{26mV}{1mA} = 26\Omega$$

Step 3: Small-signal model
Replace diode with rd = 26Ω (for small variations around operating point)

---

### Type 5: Energy Calculations

**Question**: "Calculate the energy stored in the capacitor/inductor."

**Formulas**:
- Capacitor: $W_C = \frac{1}{2}Cv^2 = \frac{1}{2}\frac{q^2}{C}$
- Inductor: $W_L = \frac{1}{2}Li^2 = \frac{1}{2}\frac{\phi^2}{L}$

**Example**: C = 100μF charged to 10V
$$W_C = \frac{1}{2}(100 \times 10^{-6})(10)^2 = 5 \times 10^{-3} J = 5mJ$$

---

### Type 6: Initial Conditions

**Question**: "For the given circuit, what happens at t = 0+ after the switch closes?"

**Key Rules**:
- Capacitor voltage cannot change instantly: $v_C(0^+) = v_C(0^-)$
- Inductor current cannot change instantly: $i_L(0^+) = i_L(0^-)$

**Example**: 
```
         t=0
    ──○/ ○──R──┬──
    │          │
   (+)        ═╪═ C (initially uncharged)
   Vs          │
    │          │
    ──────────┴──
```

At t = 0+:
- vC(0+) = 0 (was uncharged)
- By KVL: vR(0+) = Vs - vC(0+) = Vs
- Current: i(0+) = Vs/R

---

## Worked Problems

### Problem 1: RLC Circuit Analysis (15 marks)

**Q**: For the series RLC circuit with R = 100Ω, L = 10mH, C = 1μF:
(a) Find the resonant frequency
(b) Find the impedance at resonance
(c) Find the Q factor

**Solution**:

(a) Resonant frequency:
$$f_0 = \frac{1}{2\pi\sqrt{LC}} = \frac{1}{2\pi\sqrt{10 \times 10^{-3} \times 1 \times 10^{-6}}}$$
$$= \frac{1}{2\pi\sqrt{10^{-8}}} = \frac{1}{2\pi \times 10^{-4}} = 1591.5 \text{ Hz}$$

(b) Impedance at resonance:
$$Z(f_0) = R = 100\Omega$$

(c) Q factor:
$$Q = \frac{\omega_0 L}{R} = \frac{2\pi \times 1591.5 \times 0.01}{100} = \frac{100}{100} = 1$$

Or equivalently: $Q = \frac{1}{R}\sqrt{\frac{L}{C}} = \frac{1}{100}\sqrt{\frac{0.01}{10^{-6}}} = \frac{100}{100} = 1$

---

### Problem 2: Transient Analysis (10 marks)

**Q**: A 1mH inductor carrying 2A is suddenly disconnected from its source and connected across a 1kΩ resistor. Find:
(a) Initial energy stored
(b) Time constant
(c) Time for current to reach 0.5A

**Solution**:

(a) Initial energy:
$$W_L = \frac{1}{2}Li_0^2 = \frac{1}{2}(10^{-3})(2)^2 = 2 \text{ mJ}$$

(b) Time constant:
$$\tau = \frac{L}{R} = \frac{10^{-3}}{10^3} = 10^{-6} \text{ s} = 1 \text{ μs}$$

(c) Current decay:
$$i(t) = i_0 e^{-t/\tau} = 2e^{-t/\tau}$$

For i = 0.5A:
$$0.5 = 2e^{-t/\tau}$$
$$e^{-t/\tau} = 0.25$$
$$t = -\tau \ln(0.25) = 1\mu s \times 1.386 = 1.386 \text{ μs}$$

---

### Problem 3: Diode Circuit (10 marks)

**Q**: For the circuit below with Vs = 5V, R = 1kΩ, and a diode with Is = 10⁻¹² A, VT = 26mV:
(a) Find the DC operating point
(b) Find the small-signal resistance

```
         R=1kΩ
    ──┬─/\/\/──┬──
      │        │
     (+)      ─┴─
     5V       /_\  Diode
      │        │
      └────────┘
```

**Solution**:

(a) DC operating point:
Using KVL: $V_s = IR + V_D$
And diode equation: $I = I_s(e^{V_D/V_T} - 1)$

Iterative solution (or graphical):
- Assume VD ≈ 0.6V
- I = (5 - 0.6)/1000 = 4.4 mA
- Check: VD = VT × ln(I/Is) = 0.026 × ln(4.4×10⁻³/10⁻¹²) = 0.026 × 22.2 = 0.577V

Iterate: I = (5 - 0.577)/1000 = 4.42 mA
VD = 0.026 × ln(4.42×10⁻³/10⁻¹²) = 0.578V ✓

**Operating point**: ID ≈ 4.4 mA, VD ≈ 0.58V

(b) Small-signal resistance:
$$r_d = \frac{V_T}{I_D} = \frac{26 \text{ mV}}{4.4 \text{ mA}} = 5.9\Omega$$

---

## Common Mistakes to Avoid

| Mistake | Correction |
|---------|------------|
| Using wrong capacitor/inductor formula | Capacitor: i = C dv/dt; Inductor: v = L di/dt |
| Forgetting initial conditions | Always specify vC(0) or iL(0) for dynamic circuits |
| Wrong sign in small-signal model | rd is positive; polarity matters for controlled sources |
| Confusing DC and small-signal analysis | DC: Find operating point; Small-signal: Linearize around it |
| Using conductance when resistance asked | G = 1/R, double-check units |

---

## Quick Reference: Impedance Combinations

| Configuration | Formula |
|---------------|---------|
| Series | Z_total = Z1 + Z2 + ... |
| Parallel | 1/Z_total = 1/Z1 + 1/Z2 + ... |
| Voltage divider | Vout = Vin × Z2/(Z1 + Z2) |
| Current divider | I2 = Itotal × Z1/(Z1 + Z2) |
