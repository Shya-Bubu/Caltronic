# Depletion-Mode MOSFETs — Normally ON

> **Why This Matters**: Depletion-mode MOSFETs are the opposite of everything you've learned so far. They're "normally ON" — the channel exists without any gate voltage. This makes them essential as load devices in MOS logic circuits and as constant-current sources. Understanding them completes your picture of the MOSFET family.

## Enhancement vs Depletion — The Key Difference

So far, you've studied **enhancement-mode** MOSFETs. They're normally OFF: no channel exists at $V_{GS} = 0$, and you must apply voltage to **create** (enhance) the channel.

A **depletion-mode** MOSFET flips this around completely:

| Feature | Enhancement Mode | Depletion Mode |
|---------|-----------------|----------------|
| At $V_{GS} = 0$ | **OFF** (no channel) | **ON** (channel exists) |
| Gate voltage purpose | Create the channel | Remove (deplete) the channel |
| Turn-ON | Apply $V_{GS} > V_T$ | Already ON |
| Turn-OFF | Remove gate voltage | Apply $V_{GS} < V_T$ (negative for NMOS) |
| $V_T$ sign (NMOS) | Positive | **Negative** |

> **Key Insight**: The term "depletion" refers to what the gate voltage does — it **depletes** (removes) the existing channel. In enhancement mode, the gate enhances (creates) the channel. Same physics, opposite starting condition.

## Physical Structure — The Built-In Channel

[[visual:depletion-structure-img]]

The cross-section above reveals the crucial difference: a depletion-mode NMOS has a **pre-formed n-type channel** physically implanted between the source and drain during manufacturing.

This channel is created by **ion implantation** — doping atoms are deliberately injected into the surface region to create a thin n-type layer even with zero gate voltage. The result:

- At $V_{GS} = 0$: the channel already exists → current can flow → **transistor is ON**
- Apply negative $V_{GS}$: the electric field pushes electrons out of the channel, narrowing it → current decreases
- At $V_{GS} = V_T$ (where $V_T < 0$): the channel is fully depleted → current drops to zero → **transistor is OFF**

$$\boxed{V_{GS} = 0 \implies \text{Channel exists} \implies I_{DS} > 0 \quad \text{(normally ON)}}$$

[[visual:depletion-operation-schematic]]

## Operating Conditions

### Normal Operation ($V_{GS} = 0$)

With zero gate voltage, the implanted channel connects source to drain, and current flows freely if $V_{DS} > 0$:

$$I_{DSS} = \frac{K}{2}(0 - V_T)^2 = \frac{K}{2}V_T^2$$

This special current $I_{DSS}$ — the drain current at $V_{GS} = 0$ — is an important datasheet parameter.

### Partial Depletion ($V_T < V_{GS} < 0$)

Applying negative $V_{GS}$ partially depletes the channel, reducing the current:

$$I_{DS} = \frac{K}{2}(V_{GS} - V_T)^2 \quad \text{(same equation as enhancement mode!)}$$

Since $V_{GS}$ is between $V_T$ (negative) and zero, the overdrive $V_{GS} - V_T$ is positive but smaller than $|V_T|$, giving reduced current.

### Full Depletion / Cutoff ($V_{GS} \leq V_T$)

When $V_{GS}$ reaches $V_T$ (negative), the channel is completely depleted:

$$V_{GS} \leq V_T \implies I_{DS} = 0 \quad \text{(transistor OFF)}$$

### Enhancement Mode Operation ($V_{GS} > 0$)

A depletion-mode device can also operate with **positive** $V_{GS}$. This makes the channel even wider and carries more current than $I_{DSS}$:

$$V_{GS} > 0 \implies I_{DS} > I_{DSS}$$

This dual capability — operating on both sides of $V_{GS} = 0$ — is unique to depletion-mode devices.

[[visual:depletion-transfer-curve]]

<details>
<summary><strong>Pause & Think</strong>: Can you operate a depletion-mode MOSFET in the same regions (cutoff/triode/saturation) as an enhancement-mode device?</summary>

Yes! The three operating regions exist for depletion-mode devices too, with the same boundary conditions. The only difference is that VT is negative, so the device can be ON with VGS = 0 (or even slightly negative). The current equations are identical — only the threshold voltage value changes.

</details>

## The Current Equation — Same Formula, Different VT

The beautiful thing about depletion-mode MOSFETs is that the **same equations** apply. The only change is the value of $V_T$:

**In saturation** ($V_{DS} \geq V_{GS} - V_T$):

$$\boxed{I_{DS} = \frac{K}{2}(V_{GS} - V_T)^2} \quad \text{where } V_T < 0$$

**At $V_{GS} = 0$** (the special case):

$$I_{DSS} = \frac{K}{2}(0 - V_T)^2 = \frac{K}{2}V_T^2$$

**Normalised transfer curve**:

$$\frac{I_{DS}}{I_{DSS}} = \left(\frac{V_{GS} - V_T}{-V_T}\right)^2 = \left(1 - \frac{V_{GS}}{V_T}\right)^2$$

[[visual:depletion-normalized-curve]]

## Why Depletion-Mode Matters: The MOS Load

The primary application of depletion-mode MOSFETs is as **load devices** in MOS logic circuits. In the next concept, you'll see MOS inverters where the load transistor has its gate connected to its source ($V_{GS} = 0$), making it act as a **constant-current source**.

This is far superior to using a resistor as a load because:

1. **Chip area** — a MOSFET takes far less area than a resistor of equivalent value
2. **Better circuit performance** — the current-source behaviour gives higher gain
3. **Easier fabrication** — MOSFETs are built with the same process as the driver transistors

[[visual:depletion-load-comparison]]

## The Complete MOSFET Family

[[visual:mosfet-family-summary]]

You now know all four types of MOSFET:

| Type | Channel at $V_{GS}=0$ | Turn ON | Turn OFF | $V_T$ (NMOS) |
|------|----------------------|---------|----------|---------------|
| N-Enhancement | No channel | $V_{GS} > +V_T$ | $V_{GS} < +V_T$ | Positive |
| N-Depletion | Channel exists | Already ON | $V_{GS} < V_T$ | Negative |
| P-Enhancement | No channel | $V_{GS} < -|V_T|$ | $V_{GS} > -|V_T|$ | Negative |
| P-Depletion | Channel exists | Already ON | $V_{GS} > V_T$ | Positive |

[[visual:falstad-depletion-mosfet]]

## Summary

- Depletion-mode MOSFETs are **normally ON** — a channel exists at $V_{GS} = 0$
- The channel is **physically implanted** during fabrication (not field-induced)
- **Negative** $V_{GS}$ depletes (removes) the channel; **positive** $V_{GS}$ enhances it further
- The threshold voltage $V_T$ is **negative** for n-channel depletion devices
- $I_{DSS}$ = drain current at $V_{GS} = 0$ — a key datasheet parameter
- Same current equations as enhancement mode — only $V_T$ changes
- Primary use: **load devices** in MOS logic circuits (gate tied to source)
