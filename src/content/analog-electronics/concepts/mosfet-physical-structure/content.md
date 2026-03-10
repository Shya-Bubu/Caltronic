# The MOSFET — What It Is and How It's Built

> **Why This Matters**: The MOSFET (Metal-Oxide-Semiconductor Field-Effect Transistor) is the most manufactured device in human history. More than 13 sextillion (1.3 × 10²²) MOSFETs have been built since 1960. Understanding its physical structure is the foundation for everything that follows — from individual transistor operation to billion-transistor processors.

## From BJTs to a New Kind of Transistor

In previous lessons, you learned about the BJT — a **current-controlled** device where a small base current controls a much larger collector current. The MOSFET takes a fundamentally different approach: it uses an **electric field** to control current flow.

The name tells you exactly how it's built:

- **Metal** — a metal (or polysilicon) gate electrode
- **Oxide** — a thin insulating layer of silicon dioxide (SiO₂)
- **Semiconductor** — the silicon substrate underneath

This M-O-S sandwich creates a capacitor-like structure. When you apply voltage to the metal gate, the electric field penetrates through the oxide and rearranges charge carriers in the semiconductor below. No current flows through the gate — the gate is completely insulated by the oxide.

> **Key Insight**: The oxide insulation is the MOSFET's superpower. Because the gate draws zero DC current ($i_G = 0$), the input impedance is essentially infinite. This means controlling a MOSFET costs almost no power — which is why billions of them can sit on a single chip without overheating.

## The Four-Terminal Structure

[[visual:nmos-3d-structure]]

The diagram above shows the three-dimensional structure of an **n-channel enhancement-mode MOSFET** — the most common type. Let's break down what you're seeing.

The device has **four terminals**:

| Terminal | Full Name | Connection |
|----------|-----------|------------|
| **G** | Gate | Metal electrode on top of the oxide |
| **D** | Drain | n⁺ doped region (where conventional current enters) |
| **S** | Source | n⁺ doped region (where conventional current leaves) |
| **B** | Body (Bulk) | The p-type substrate itself |

[[visual:nmos-2d-structure]]

The cross-sectional view makes the layer structure clearer. From top to bottom:

1. **Metal gate** — sits on top of the oxide, across the full width $W$
2. **Oxide layer (SiO₂)** — extremely thin (thickness $t_{ox}$, typically 1–10 nm in modern devices), acts as an insulator
3. **Channel region** — the gap of length $L$ between the source and drain where the conductive channel will form
4. **p-type substrate** — the body of the device, doped with acceptor atoms

The two n⁺ regions (source and drain) are **heavily doped** islands of n-type semiconductor embedded in the p-type substrate. Between them lies the channel region — and this is where all the action happens.

## Why the Structure Creates a Capacitor

Think of the gate-oxide-substrate stack as a parallel-plate capacitor:

$$C_{ox} = \frac{\varepsilon_{ox}}{t_{ox}} \cdot W \cdot L$$

where $\varepsilon_{ox}$ is the permittivity of silicon dioxide. The gate is one plate, the substrate is the other, and the oxide is the dielectric.

When you apply a positive voltage to the gate (for an NMOS device):

1. The electric field pushes holes (majority carriers in the p-type substrate) away from the surface
2. It attracts electrons (minority carriers) toward the surface
3. If the voltage is large enough, a thin layer of electrons accumulates at the surface — forming an **inversion layer**

This inversion layer is the **channel** — a conductive path of electrons connecting the source to the drain.

[[visual:channel-formation-plotly]]

## Key Dimensions: Width and Length

Two dimensions define the MOSFET's electrical behaviour:

$$\text{Channel Length } L: \text{ distance between source and drain (direction of current flow)}$$

$$\text{Channel Width } W: \text{ lateral extent of the channel (perpendicular to current flow)}$$

The ratio $W/L$ (called the **aspect ratio**) is one of the most important design parameters:

$$\boxed{I_{DS} \propto \frac{W}{L}}$$

A wider channel (larger $W$) allows more current to flow — like a wider highway carrying more cars. A shorter channel (smaller $L$) reduces the resistance — like a shorter road. Circuit designers adjust $W/L$ to set the current capability of each transistor.

[[visual:aspect-ratio-plotly]]

<details>
<summary><strong>Pause & Think</strong>: If you need a MOSFET that can carry twice the current of another, what would you change?</summary>

You'd double the $W/L$ ratio. You could either double the width $W$ (more common in layout), halve the length $L$ (limited by manufacturing technology), or some combination. This is why chip designers spend enormous effort on transistor sizing — the $W/L$ ratio directly determines current, speed, and area.

</details>

## The Oxide — Why It's So Important

The silicon dioxide layer is arguably the most critical part of the structure. It must be:

- **Extremely thin** — thin enough for the gate electric field to control the channel (modern oxides are just a few atoms thick)
- **Perfectly uniform** — any thickness variation changes the threshold voltage across the chip
- **Defect-free** — a single pinhole would short the gate to the substrate, destroying the device

$$\text{Oxide capacitance per unit area: } C_{ox}' = \frac{\varepsilon_{ox}}{t_{ox}}$$

The thinner the oxide, the stronger the gate's control over the channel. This is why Moore's Law has pushed oxide thickness from hundreds of nanometres in the 1970s down to less than 2 nm today.

> **Watch Out**: In real modern devices, the "oxide" isn't even SiO₂ anymore — it's a high-k dielectric material like hafnium dioxide (HfO₂) that provides the same capacitance with a physically thicker (and more robust) layer. But the operating principle is identical.

[[visual:mosfet-circuit-symbol]]

## Circuit Symbols

In circuit diagrams, you'll encounter the MOSFET symbol shown above. The key features are:

- The **gate** terminal is shown separated from the channel by a gap (representing the oxide insulation)
- The **arrow** on the body terminal points inward for NMOS (into the channel) — this tells you the substrate is p-type
- The **body terminal** is often connected to the source in discrete devices

For most circuit analysis, we treat the MOSFET as a **three-terminal device** (G, D, S) with the body tied to a fixed potential.

[[visual:falstad-mosfet-basic]]

## MOSFET vs BJT — A Structural Comparison

[[visual:mosfet-bjt-structure-compare]]

| Feature | BJT | MOSFET |
|---------|-----|--------|
| Control mechanism | Base current ($I_B$) | Gate voltage ($V_{GS}$) |
| Control terminal current | $I_B > 0$ (always) | $I_G = 0$ (DC) |
| Input impedance | Moderate (~kΩ) | Essentially infinite |
| Number of terminals | 3 (B, C, E) | 4 (G, D, S, B) |
| Key structure | Two back-to-back junctions | MOS capacitor over channel |
| Dominant in | Analog amplification | Digital logic, power switching |

## Summary

- The MOSFET is a **four-terminal device**: Gate, Drain, Source, and Body
- The **MOS structure** (Metal-Oxide-Semiconductor) forms a capacitor that controls the channel
- The **gate is insulated** by a thin SiO₂ layer — zero gate current ($i_G = 0$)
- The **channel** forms between the n⁺ source and drain regions when sufficient gate voltage is applied
- **$W/L$ ratio** determines current capability: $I_{DS} \propto W/L$
- The MOSFET's key advantage over the BJT: **voltage control with zero input current**
