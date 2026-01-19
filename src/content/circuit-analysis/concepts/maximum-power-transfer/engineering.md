# Maximum Power Transfer - Engineering Perspective

## Professional Application

### Design Problem

Given a source with known Thévenin equivalent, select load for:
1. Maximum power delivery, OR
2. Required efficiency target

These are often competing objectives!

---

## Complete Analysis

### Setup

Source: $V_{th}$, $R_{th}$
Load: $R_L$ (variable)

```
        R_th
    ┌───/\/\/───┬───○
    │           │
   V_th        R_L
    │           │
    └───────────┴───○
```

### Power Expression

Current: $I = \frac{V_{th}}{R_{th} + R_L}$

Power to load: 
$$P_L = I^2 R_L = \frac{V_{th}^2 R_L}{(R_{th} + R_L)^2}$$

---

## Power vs Load Resistance

Let's compute power for various $R_L$ values:

**Example**: $V_{th} = 10V$, $R_{th} = 5Ω$

| $R_L$ (Ω) | $I$ (A) | $P_L$ (W) | Efficiency |
|-----------|---------|-----------|------------|
| 1 | 1.67 | 2.78 | 17% |
| 2.5 | 1.33 | 4.44 | 33% |
| 5 | 1.00 | **5.00** | 50% |
| 10 | 0.67 | 4.44 | 67% |
| 20 | 0.40 | 3.20 | 80% |
| 50 | 0.18 | 1.64 | 91% |

Maximum power occurs at $R_L = R_{th} = 5Ω$

---

## Efficiency Analysis

### Definition

$$\eta = \frac{P_{load}}{P_{source}} = \frac{P_L}{P_{total}}$$

### Calculation

$$P_{total} = I^2(R_{th} + R_L)$$
$$P_L = I^2 R_L$$

$$\eta = \frac{R_L}{R_{th} + R_L}$$

### At Matched Condition

When $R_L = R_{th}$:
$$\eta = \frac{R_{th}}{2R_{th}} = 50\%$$

Half the power is dissipated in the source!

---

## Design Trade-offs

### Scenario 1: Antenna Receiver

- Signal power is tiny (microwatts)
- Efficiency doesn't matter (source isn't depleted)
- **Want maximum power** → Match impedances

**Example**: 50Ω antenna + 50Ω input amplifier

### Scenario 2: Power Grid

- Megawatts of power
- 1% efficiency loss = huge waste
- **Want high efficiency** → Make load resistance high

**Example**: Transmission lines have low $R_{th}$, loads have high $R_{th}$

### Scenario 3: Audio Amplifier

- Speaker typically 4Ω or 8Ω
- Amplifier output impedance typically < 0.5Ω
- **Low source impedance** → Most power to speaker

This is actually for efficiency AND power—damping factor matters too!

---

## Practical Applications

### 1. RF Systems

Antenna (50Ω typical) → Transmission line → Receiver

Mismatch causes reflections:
- Power reflected back
- Standing waves on line
- Potential damage to transmitter

**Solution**: Use matching networks

### 2. Battery/Source Characterization

Real battery: Ideal voltage + internal resistance

As battery ages: $R_{th}$ increases → less power available

**Test**: Measure open-circuit voltage and short-circuit current
$$R_{internal} = \frac{V_{oc}}{I_{sc}}$$

### 3. Solar Cell Maximum Power Point

Solar cell has variable $V_{th}$ and $R_{th}$ depending on light

MPPT (Maximum Power Point Tracking) continuously adjusts load to extract maximum power.

---

## Matching Networks

When $R_L \neq R_{th}$, use a matching network:

```
    Source        Matching        Load
                  Network
   [V_th, R_th] → [L, C network] → [R_L]
```

**L-match, π-match, T-match** networks transform impedance.

At RF frequencies, these are essential for efficient power transfer.

---

## Power Transfer with Complex Impedances

For AC circuits with inductance and capacitance:

**Maximum power when**: $Z_L = Z_{th}^*$ (complex conjugate)

If $Z_{th} = R_{th} + jX_{th}$, then $Z_L = R_{th} - jX_{th}$

The resistive parts match, and reactive parts cancel!

---

## Summary Table

| Application | Priority | Design Choice |
|-------------|----------|---------------|
| Communications | Max power | $R_L = R_{th}$ |
| Power distribution | Efficiency | $R_L >> R_{th}$ |
| Instrumentation | Accuracy | Depends on signal |
| Audio | Power + damping | Low source Z |
| Solar/battery | Max power | MPPT controller |

---

## Engineering Rules of Thumb

1. **Signal processing**: Match for max power transfer
2. **Power delivery**: Minimize source resistance
3. **When efficiency > 80% needed**: $R_L > 4 \times R_{th}$
4. **When efficiency > 90% needed**: $R_L > 9 \times R_{th}$
5. **Mismatched RF systems**: Expect reflections and losses
