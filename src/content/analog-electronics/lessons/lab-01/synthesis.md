# Lab 01 Synthesis: Op-Amp Applications

## What You've Learned

### The 6 Activities - Summary

| Activity | Configuration | Key Formula | Key Insight |
|----------|---------------|-------------|-------------|
| **1** | Inverting Amp | Av = −R2/R1 | Negative sign = phase inversion |
| **2** | Non-Inverting Amp | Av = 1 + R2/R1 | Gain always ≥ 1, high Zin |
| **3** | Differential Amp | Vo = (R2/R1)(Vi2−Vi1) | CMRR measures noise rejection |
| **4** | Summing Amp | Vo = −Σ(Rf/Rn)Vn | Weighted addition of signals |
| **5** | Integrator | Vo = −(1/RC)∫Vin dt | C in feedback, becomes LPF |
| **6** | Differentiator | Vo = −RC(dVin/dt) | C at input, becomes HPF |

## The Golden Rules (Foundation of Everything!)

1. **No current into inputs**: I+ = I− = 0
2. **Virtual short**: V+ = V− (with negative feedback)

These two rules let you analyze ANY op-amp circuit!

## Common Mistakes to Avoid

| Mistake | Consequence | Fix |
|---------|-------------|-----|
| Forgetting negative sign in inverting | Wrong phase prediction | Always check which input receives signal |
| Using R2/R1 for non-inverting | Gain off by 1 | Non-inverting = 1 + R2/R1 |
| Mismatched resistors in diff amp | Poor CMRR | Use precision resistors |
| No modification in integrator | DC saturation | Add parallel R with C |
| No modification in differentiator | HF noise | Add series R with C |

## Connections to Theory

- **KCL** at virtual ground node → all gain formulas
- **Impedance (ZC = 1/sC)** → transfer functions for integrator/differentiator
- **Superposition** → differential amplifier analysis
- **Bode plots** → frequency response of modified circuits

## Pre-Lab Derivations Checklist

- [ ] Inverting amplifier: Av = −R2/R1
- [ ] Non-inverting amplifier: Av = 1 + R2/R1
- [ ] Differential amplifier: Vo = (R2/R1)(Vi2 − Vi1) when R2/R1 = R4/R3
- [ ] Summing amplifier: Vo = −(Rf/R1)V1 − (Rf/R2)V2
- [ ] Integrator: Vo = −(1/RC)∫Vin dt
- [ ] Differentiator: Vo = −RC(dVin/dt)

## Homework Reminders

1. **Homework 1 (CMRR)**: Calculate Vo with different CMRR values
2. **Homework 2 (Rise Time)**: How rise time limits bandwidth
3. **Homework 3 (Analog Computer)**: Design circuit to solve differential equations

---

*You now have the foundation to understand virtually any analog signal processing circuit!*
