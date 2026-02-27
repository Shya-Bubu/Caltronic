# Pulling It All Together

## The Four Amplifier Types

| Type | Input | Output | Gain | Ideal R_in | Ideal R_out |
|------|-------|--------|------|-----------|------------|
| **Voltage** | V | V | A_V (dimensionless) | ∞ | 0 |
| **Current** | I | I | A_I (dimensionless) | 0 | ∞ |
| **Transconductance** | V | I | G_M (Siemens) | ∞ | ∞ |
| **Transresistance** | I | V | R_M (Ohms) | 0 | 0 |

## The Three BJT Configurations

| Property | CE | CB | CC |
|----------|----|----|-----|
| Voltage Gain | High (inverted) | High (non-inverted) | ≈ 1 |
| Current Gain | High (β) | ≈ 1 | High (β+1) |
| Power Gain | Highest | Moderate | Moderate |
| R_in | Medium | Low | High |
| R_out | Medium-High | High | Low |
| Best For | General-purpose | High-frequency | Impedance matching |

## The Big Picture

Every BJT amplifier is just one of CE, CB, or CC — or a combination. The two-port model gives you a systematic way to analyse any configuration: find R_in, R_out, and the appropriate gain. From there, you can cascade stages, match impedances, and design complete amplifier systems.
