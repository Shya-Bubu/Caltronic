# Mathematical Foundation

> **Rigor Level**: Complete derivations of resistor behavior from first principles.

## Setup

<!-- DIAGRAM: diag-mathematics-01 -->

**What we're deriving**: The relationship between material properties and electrical resistance.

**Starting assumptions**:
1. Ohmic material (current density proportional to electric field)
2. Uniform cross-section conductor
3. Steady-state conditions (no time-varying fields)

**Notation**:
- $R$ — Resistance [Ω]
- $\rho$ — Resistivity [Ω·m]
- $L$ — Length [m]
- $A$ — Cross-sectional area [m²]

## Derivation: Resistance Formula

**Step 1**: Start from the microscopic Ohm's law.

Current density $\vec{J}$ is proportional to electric field $\vec{E}$:

$$\vec{J} = \sigma \vec{E}$$

where $\sigma = 1/\rho$ is conductivity.

**Step 2**: Relate to macroscopic quantities.

For a uniform conductor of length $L$ and area $A$:
- Total current: $I = J \cdot A$
- Voltage across length: $V = E \cdot L$

Substituting into $J = \sigma E$:

$$\frac{I}{A} = \sigma \frac{V}{L}$$

**Step 3**: Solve for voltage-current relationship.

$$V = \frac{L}{\sigma A} I = \frac{\rho L}{A} I$$

Comparing with Ohm's law $V = IR$, we identify:

$$\boxed{R = \frac{\rho L}{A}}$$

> 🤔 **Pause & Reflect**: This formula says resistance is proportional to length and inversely proportional to area. How does this match the water pipe analogy from the intuition layer?

<details>
<summary>Click to reveal answer</summary>

Perfect match! For water pipes:
- Longer pipe = more friction = higher flow resistance ✓
- Wider pipe = easier flow = lower resistance ✓

The mathematics confirms what intuition suggested. This cross-validation is a hallmark of good physical models.

</details>

## Temperature Dependence

For metals, resistivity increases with temperature:

$$\rho(T) = \rho_0 [1 + \alpha(T - T_0)]$$

where:
- $\rho_0$ = resistivity at reference temperature $T_0$ (usually 20°C)
- $\alpha$ = temperature coefficient of resistivity [1/°C]

Therefore:

$$R(T) = R_0 [1 + \alpha(T - T_0)]$$

**Typical values of α**:

| Material | α (ppm/°C) |
|----------|------------|
| Copper | +3900 |
| Carbon | -500 |
| Nichrome | +100 |
| Constantan | ±20 |

> 🤔 **Pause & Reflect**: Why does carbon have a *negative* temperature coefficient while metals are positive?

<details>
<summary>Click to reveal answer</summary>

**Metals**: Higher temperature → more atomic vibrations → more electron scattering → higher resistance

**Carbon (semiconductor-like)**: Higher temperature → more charge carriers freed from lattice → lower resistance

This is why carbon film resistors are less stable with temperature than metal film ones.

</details>

<!-- DIAGRAM: diag-mathematics-02 -->

## Special Cases

**Case 1**: Wire resistance (small R)

For a copper wire of 1mm diameter and 1m length:
$$R = \frac{(1.7 \times 10^{-8})(1)}{(\pi (0.5 \times 10^{-3})^2)} = 0.022\Omega$$

Negligible for most circuits but significant in power transmission.

**Case 2**: Thin film resistor (large R)

By making a very thin, long path (spiral pattern), resistances of MΩ are achievable in a small package.

## Key Results

| Result | Expression | Conditions |
|--------|------------|------------|
| Resistance | $R = \rho L / A$ | Uniform conductor |
| Temperature variation | $R(T) = R_0[1 + \alpha(T-T_0)]$ | Linear approximation |
| Power dissipation | $P = I^2R = V^2/R$ | DC or RMS for AC |

---

*For exam strategies and common question patterns, continue to the Exam layer.*
