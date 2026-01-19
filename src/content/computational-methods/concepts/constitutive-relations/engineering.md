# Constitutive Relations - Engineering Perspective

## Component Models in Practice

### Resistor Models

#### Level 1: Ideal Resistor
$$v = iR$$

**Use when**: Simple DC/low-frequency analysis, hand calculations

#### Level 2: Resistor with Parasitics
```
    ┌───⊃⊃⊃───┐
    │   Ls    │
    ─┬─/\/\/──┼──
     │  R     │
    ─┴────┤├──┴──
          Cp
```

$$Z = \frac{R + j\omega L_s}{1 + j\omega C_p(R + j\omega L_s)}$$

**Typical values**:
- Through-hole: Ls ≈ 10nH, Cp ≈ 0.5pF
- SMD 0603: Ls ≈ 1nH, Cp ≈ 0.1pF

**Use when**: Frequencies above 10 MHz, high-precision measurements

#### Level 3: Temperature-Dependent Resistor

$$R(T) = R_0[1 + \alpha(T - T_0) + \beta(T - T_0)^2]$$

- α ≈ +3900 ppm/°C for copper (positive TCR)
- α ≈ -400 to +100 ppm/°C for thin film (depends on composition)

**Use when**: Wide temperature range, precision applications

---

### Capacitor Models

#### Level 1: Ideal Capacitor
$$i = C\frac{dv}{dt}$$

**Use when**: Low-frequency analysis, conceptual design

#### Level 2: Capacitor with ESR and ESL
```
    Ls     ESR
    ⊃⊃⊃───/\/\/───┤├───
                   C
```

$$Z = j\omega L_s + ESR + \frac{1}{j\omega C}$$

**Self-resonant frequency**:
$$f_{SRF} = \frac{1}{2\pi\sqrt{L_s C}}$$

**Typical values by type**:
| Type | ESR | ESL | SRF |
|------|-----|-----|-----|
| Ceramic (MLCC) | 1-100 mΩ | 0.5-2 nH | 10 MHz - 1 GHz |
| Aluminum Electrolytic | 10-1000 mΩ | 5-20 nH | 10-100 kHz |
| Tantalum | 50-500 mΩ | 2-5 nH | 100 kHz - 1 MHz |
| Film | 1-50 mΩ | 5-20 nH | 1-10 MHz |

**Use when**: Switching power supplies, high-frequency bypassing, EMI analysis

#### Level 3: Voltage-Dependent Capacitance (Ceramic)

Class 2 ceramics (X7R, X5R, Y5V) lose capacitance with DC bias:

$$C(V_{DC}) = C_0 \times f(V_{DC})$$

Typical X7R: Loses 30-50% capacitance at rated voltage!

**Use when**: Filtering in power supplies, precision timing circuits

---

### Inductor Models

#### Level 1: Ideal Inductor
$$v = L\frac{di}{dt}$$

**Use when**: Low-frequency analysis, conceptual design

#### Level 2: Inductor with Parasitics
```
        Rdc        L
    ────/\/\/────⊃⊃⊃────┬────
                        │
                       ═╪═ Cp
                        │
    ────────────────────┘
```

$$Z = \frac{j\omega L + R_{DC}}{1 - \omega^2 L C_p + j\omega R_{DC} C_p}$$

**Self-resonant frequency**:
$$f_{SRF} = \frac{1}{2\pi\sqrt{LC_p}}$$

**Use when**: RF circuits, switching regulators, EMI filters

#### Level 3: Core Saturation Model

$$B = \mu_0 \mu_r H = \frac{\mu_0 \mu_r N i}{l_e}$$

Core saturates when $B > B_{sat}$ (typically 0.3-0.5T for ferrites)

$$L(i) = \frac{L_0}{1 + (i/I_{sat})^n}$$

**Use when**: Power inductors, switching converters, transformers

---

### Diode Models

#### Level 1: Ideal Diode
```
Forward: v = 0, i ≥ 0
Reverse: i = 0, v ≤ 0
```

**Use when**: Understanding rectifier topology

#### Level 2: Constant Voltage Drop Model
```
Forward: v = Vf (typically 0.6-0.7V for Si)
Reverse: i = 0
```

**Use when**: Hand calculations, quick estimates

#### Level 3: Shockley Diode Equation
$$i = I_s(e^{v/(nV_T)} - 1)$$

Where:
- Is ≈ 10⁻¹² to 10⁻¹⁵ A (saturation current)
- n ≈ 1-2 (ideality factor)
- VT = kT/q ≈ 26mV at room temperature

**Use when**: Precision analog circuits, temperature effects matter

#### Level 4: SPICE Diode Model
Adds:
- Series resistance Rs
- Junction capacitance Cj(V)
- Transit time τ
- Breakdown voltage BV
- Temperature coefficients

**Use when**: Full transient simulation, switching behavior

---

### MOSFET Models

#### Level 1: Switch Model
```
ON:  Rds(on) ≈ 0 (short)
OFF: Rds(off) = ∞ (open)
```

**Use when**: Digital logic analysis, power switching topology

#### Level 2: Square Law Model
$$I_D = \frac{k_n}{2}(V_{GS} - V_{TH})^2 (1 + \lambda V_{DS}) \quad \text{(saturation)}$$

Where:
- kn = μnCox(W/L) (transconductance parameter)
- VTH ≈ 0.7V (threshold voltage)
- λ ≈ 0.01-0.1 V⁻¹ (channel length modulation)

**Use when**: Hand analysis of analog circuits

#### Level 3: BSIM Models (Level 49+)

Full physical model with 300+ parameters accounting for:
- Short channel effects
- Velocity saturation
- Drain-induced barrier lowering (DIBL)
- Gate leakage
- Subthreshold conduction
- Temperature effects

**Use when**: Production-level IC design, foundry-supplied parameters

---

## Engineering Selection Guidelines

### Choosing Model Complexity

| Situation | Recommended Model Level |
|-----------|------------------------|
| Back-of-envelope calculation | Level 1 (ideal) |
| Hand analysis with reasonable accuracy | Level 2 (simple parasitics) |
| Preliminary simulation | Level 2-3 |
| Production design verification | Level 3-4 (full SPICE models) |
| High-frequency (>100 MHz) | Level 3+ with S-parameters |

### Red Flags: When Simple Models Fail

| Symptom | Likely Missing Physics |
|---------|----------------------|
| Simulation doesn't match bench | Parasitic capacitance/inductance |
| Unexpected oscillations | Feedback through parasitics |
| Power supply ripple too high | ESR, ESL of capacitors |
| Efficiency lower than expected | Core losses, switch losses |
| Temperature drift | TCR, VBE(T) effects |

---

## SPICE Component Syntax

### Basic Components

```spice
* Resistor
R1 node1 node2 1k

* Capacitor
C1 node1 node2 100n IC=0

* Inductor
L1 node1 node2 10u IC=0

* Diode
D1 anode cathode D1N4148

* MOSFET
M1 drain gate source bulk NMOS W=10u L=1u
```

### Including Parasitics

```spice
* Capacitor with ESR and ESL
.subckt CAP_REAL p n PARAMS: C=100n ESR=10m ESL=1n
L1 p 1 {ESL}
R1 1 2 {ESR}
C1 2 n {C}
.ends

* Usage
X1 node1 node2 CAP_REAL C=100n ESR=50m ESL=2n
```

---

## Summary: Engineering Model Selection

| Component | Start With | Add Complexity For |
|-----------|------------|-------------------|
| Resistor | v = iR | HF: parasitics; Power: TCR |
| Capacitor | i = Cdv/dt | HF: ESR/ESL; Precision: DC bias |
| Inductor | v = Ldi/dt | HF: SRF; Power: saturation |
| Diode | Vf = 0.7V | Precision: Shockley; Switching: Cj, τ |
| MOSFET | Switch model | Analog: square law; IC: BSIM |

> **Engineering Principle**: Use the simplest model that captures the physics relevant to your problem. Add complexity only when simpler models fail to match reality.
