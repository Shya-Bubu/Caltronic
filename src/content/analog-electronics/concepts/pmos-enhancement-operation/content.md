# The P-Channel Enhancement MOSFET

> **Why This Matters**: You cannot build CMOS logic — the technology behind every modern processor — without understanding both NMOS and PMOS transistors. The PMOS is the NMOS's complement: everything works in reverse. Master both, and CMOS circuits become intuitive.

## The Mirror Image of NMOS

The PMOS transistor is the exact **complement** of the NMOS. Where NMOS uses electrons, PMOS uses holes. Where NMOS needs positive gate voltage, PMOS needs negative. Think of it as looking at the NMOS in a mirror — every polarity and doping type is reversed.

[[visual:pmos-cross-section-img]]

The structural differences are immediately visible in the cross-section:

| Feature | NMOS | PMOS |
|---------|------|------|
| Substrate | p-type | **n-type** |
| Source/Drain regions | n⁺ | **p⁺** |
| Channel carriers | Electrons | **Holes** |
| Turn-ON voltage | $V_{GS} > +V_T$ | $V_{GS} < -|V_T|$ |

The PMOS has **p⁺ source and drain regions** embedded in an **n-type substrate**. The channel that forms between them is **p-type** — it conducts through holes, not electrons.

## How the PMOS Channel Forms

For an NMOS, you apply positive $V_{GS}$ to attract electrons. For a PMOS, you apply **negative $V_{GS}$** to attract holes:

1. A **negative gate voltage** (gate more negative than source) creates an electric field pointing upward through the oxide
2. This field **repels electrons** (majority carriers in the n-type substrate) from the surface
3. It **attracts holes** (minority carriers) toward the surface
4. When $|V_{GS}|$ exceeds $|V_T|$, enough holes accumulate to form a **p-type inversion layer** — the channel

$$\boxed{|V_{GS}| > |V_T| \implies \text{p-channel forms} \implies \text{PMOS turns ON}}$$

Or equivalently, since $V_T$ for PMOS is negative:

$$V_{GS} < V_T \quad \text{(where } V_T < 0 \text{, typically } V_T \approx -1 \text{ to } -2 \text{ V)}$$

[[visual:pmos-biased-img]]

> **Key Insight**: The PMOS threshold voltage $V_T$ is **negative**. The condition $V_{GS} < V_T$ means the gate must be sufficiently negative relative to the source. In CMOS circuits where the source connects to $V_{DD}$, this means the gate must be pulled LOW to turn the PMOS ON.

## Current Flow in PMOS

Once the p-channel is formed and $V_{DS}$ is applied (with drain more negative than source, i.e., $V_{DS} < 0$), current flows:

- **Hole flow**: from Source → through p-channel → to Drain (holes move toward the more negative terminal)
- **Conventional current $I_D$**: from Source → through channel → to Drain (same direction as hole flow)
- **Gate current**: $i_G = 0$ (still insulated by oxide — this never changes)

[[visual:pmos-current-direction]]

<details>
<summary><strong>Pause & Think</strong>: In a PMOS, does conventional current flow from drain to source or source to drain?</summary>

Conventional current flows from **source to drain** in a PMOS (the opposite of NMOS). This is because holes flow from source to drain, and since holes are positive carriers, conventional current follows the same direction. In NMOS, electrons flow from source to drain, but conventional current opposes electron flow, so it goes drain to source.

</details>

## PMOS Operating Regions

The three regions work identically to NMOS, but with reversed voltage polarities:

### Cutoff ($|V_{GS}| < |V_T|$ or equivalently $V_{GS} > V_T$ since $V_T < 0$)

$$I_{DS} = 0$$

### Triode ($|V_{GS}| > |V_T|$ and $|V_{DS}| < |V_{GS}| - |V_T|$)

$$I_{DS} = K_p\left[(|V_{GS}| - |V_T|)|V_{DS}| - \frac{|V_{DS}|^2}{2}\right]$$

### Saturation ($|V_{GS}| > |V_T|$ and $|V_{DS}| \geq |V_{GS}| - |V_T|$)

$$\boxed{I_{DS} = \frac{K_p}{2}(|V_{GS}| - |V_T|)^2}$$

where $K_p = \mu_p C_{ox}' \frac{W}{L}$.

[[visual:pmos-vi-curves]]

> **Watch Out**: Hole mobility $\mu_p$ is about 2–3 times lower than electron mobility $\mu_n$. This means a PMOS transistor needs to be 2–3× wider than an NMOS to carry the same current. This is why PMOS transistors in CMOS layouts are always physically larger.

## The NMOS-PMOS Duality

[[visual:nmos-vs-pmos-comparison]]

Every PMOS parameter and condition is the "mirror" of its NMOS counterpart:

| Parameter | NMOS | PMOS |
|-----------|------|------|
| $V_T$ | Positive (+1 to +2 V) | Negative (−1 to −2 V) |
| Turn ON when | $V_{GS} > V_T$ | $V_{GS} < V_T$ (i.e., $|V_{GS}| > |V_T|$) |
| Channel type | n-type (electrons) | p-type (holes) |
| $I_D$ direction | Drain → Source | Source → Drain |
| Carrier mobility | Higher ($\mu_n$) | Lower ($\mu_p \approx \mu_n/2.5$) |
| Typical use in CMOS | Pull-down network (to GND) | Pull-up network (to $V_{DD}$) |

This duality is not just academic — it's the foundation of CMOS design. In CMOS circuits, NMOS and PMOS transistors are paired so that one is always ON while the other is OFF, creating logic gates with zero static power consumption.

[[visual:pmos-circuit-symbol]]

## Why PMOS Alone Isn't Enough

If PMOS is just a mirror of NMOS, why do we need both?

PMOS-only logic (called **PMOS logic**) was actually the first commercial MOS technology in the 1960s. But it had a critical weakness: **holes are slower than electrons**. Since $\mu_p < \mu_n$, PMOS gates switch more slowly than NMOS gates.

NMOS-only logic was faster but had another problem: **static power dissipation** (current flows even when the output isn't switching).

The breakthrough came when engineers realised: **combine both types** to get the best of each world. That's CMOS — and we'll build it in a later concept.

[[visual:falstad-pmos-basic]]

## Summary

- The PMOS has **p⁺ source/drain** regions in an **n-type substrate** — everything reversed from NMOS
- Turn-ON requires $V_{GS} < V_T$ where $V_T$ is **negative** (gate must be pulled low relative to source)
- The channel conducts through **holes**, which have lower mobility than electrons ($\mu_p \approx \mu_n/2.5$)
- Current equations are identical to NMOS but use **absolute values** of voltages
- PMOS transistors must be ~2.5× wider than NMOS to achieve the same current capability
- In CMOS design, PMOS acts as the **pull-up** network (connected to $V_{DD}$)
