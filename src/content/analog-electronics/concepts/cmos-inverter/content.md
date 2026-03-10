# The CMOS Inverter — Why CMOS Won

> **Why This Matters**: The CMOS inverter is arguably the most important circuit in all of electronics. It eliminated the static power problem that plagued NMOS and PMOS logic, enabling the integration of billions of transistors on a single chip. Every processor, memory chip, and digital system you use today is built on CMOS technology. Understanding this circuit is understanding the foundation of modern computing.

## The Problem CMOS Solves

NMOS inverters have a fatal flaw: **static power dissipation**. When the output is LOW, current flows continuously from $V_{DD}$ through the load and driver to ground — wasting power as heat even when nothing is switching.

$$P_{static} = V_{DD} \cdot I_{DS} \neq 0 \quad \text{(NMOS problem)}$$

Scale this to millions of gates, and the chip melts. The elegant solution? **Use a PMOS transistor as the load instead of another NMOS.** This is the CMOS (Complementary MOS) idea.

## The CMOS Inverter Circuit

CMOS stands for **Complementary MOS** — it uses a complementary pair of transistors:

- **PMOS** ($T_2$, sometimes called $T_P$): source connected to $V_{DD}$ (pull-up)
- **NMOS** ($T_1$, sometimes called $T_N$): source connected to ground (pull-down)
- Both gates are connected together → **common input** $V_{in}$
- Both drains are connected together → **common output** $V_{out}$

[[visual:cmos-inverter-img]]

The crucial property: **when one transistor is ON, the other is OFF.** There is never a direct path from $V_{DD}$ to ground in either logic state.

## Operation Analysis

### When $V_{in}$ = LOW (0 V):

$$T_1 \text{ (NMOS)}: V_{GS} = 0 - 0 = 0 < V_{Tn} \implies \text{OFF}$$

$$T_2 \text{ (PMOS)}: V_{GS} = 0 - V_{DD} = -V_{DD} \implies |V_{GS}| = V_{DD} > |V_{Tp}| \implies \text{ON}$$

- PMOS is ON → conducts, pulling $V_{out}$ up to $V_{DD}$
- NMOS is OFF → no path to ground
- **No current flows** from $V_{DD}$ to ground!

$$V_{out} = V_{DD} \quad \text{and} \quad I_{DD} = 0$$

### When $V_{in}$ = HIGH ($V_{DD}$):

$$T_1 \text{ (NMOS)}: V_{GS} = V_{DD} - 0 = V_{DD} > V_{Tn} \implies \text{ON}$$

$$T_2 \text{ (PMOS)}: V_{GS} = V_{DD} - V_{DD} = 0 \implies |V_{GS}| = 0 < |V_{Tp}| \implies \text{OFF}$$

- NMOS is ON → conducts, pulling $V_{out}$ down to 0 V
- PMOS is OFF → no path from $V_{DD}$
- **No current flows** from $V_{DD}$ to ground!

$$V_{out} = 0 \text{ V} \quad \text{and} \quad I_{DD} = 0$$

[[visual:cmos-state-analysis]]

> **Key Insight**: In **both** logic states, one transistor is completely OFF, breaking the current path between $V_{DD}$ and ground. This means **zero static power dissipation**: $P_{static} = 0$. Current only flows during the brief switching transitions. This is the CMOS breakthrough.

## The Voltage Transfer Characteristic (VTC)

[[visual:cmos-vtc-plotly]]

The CMOS inverter VTC is nearly ideal:
- **Full output swing**: $V_{out}$ goes from 0 V to $V_{DD}$ (no threshold voltage loss)
- **Sharp transition**: the switch between HIGH and LOW is abrupt
- **Symmetric threshold**: the switching point is at approximately $V_{DD}/2$
- **High noise margins**: large separation between valid logic levels

Compare this to the NMOS inverter:

| Feature | NMOS Inverter | CMOS Inverter |
|---------|--------------|---------------|
| $V_{out}$(HIGH) | $V_{DD} - V_T$ (degraded) | **$V_{DD}$ (full)** |
| $V_{out}$(LOW) | ~0 V | ~0 V |
| Static power | $V_{DD} \cdot I$ (significant) | **≈ 0** |
| Transition sharpness | Gradual | **Very sharp** |
| Noise margins | Moderate | **Excellent** |

## Power — The CMOS Advantage

[[visual:power-comparison-plotly]]

CMOS power consumption comes only from **dynamic switching**:

$$\boxed{P_{dynamic} = C_L \cdot V_{DD}^2 \cdot f}$$

where:
- $C_L$ = load capacitance (gate capacitances of the next stage)
- $V_{DD}$ = supply voltage
- $f$ = switching frequency

No switching ($f = 0$) → zero power. This is why your phone battery lasts all day even with billions of transistors — most of them are not switching at any given moment.

> **Watch Out**: CMOS does have a small **leakage current** in real devices (subthreshold conduction), but it's many orders of magnitude less than NMOS static current. In modern ultra-small transistors (< 10 nm), leakage is becoming more significant — managing it is a major design challenge.

<details>
<summary><strong>Pause & Think</strong>: If CMOS only consumes power when switching, what happens as clock frequencies increase?</summary>

Power increases linearly with frequency: P = CL × VDD² × f. This is why modern processors hit a "power wall" around 4 GHz — beyond that, the dynamic power becomes unmanageable. The solution has been multi-core processors (more cores at lower frequency) rather than single cores at higher frequency. CMOS technology determines the fundamental power-performance trade-off of all computing.

</details>

## CMOS vs Previous Technologies

[[visual:technology-comparison]]

| Technology | Static Power | Speed | Density | Era |
|-----------|-------------|-------|---------|-----|
| PMOS | HIGH | Slow | Good | 1960s |
| NMOS | HIGH | Fast | Good | 1970s |
| **CMOS** | **≈ 0** | **Fast** | **Highest** | **1980s–present** |

CMOS combined the best of both worlds: the speed of NMOS (since it uses NMOS for pull-down) with the zero static power that comes from complementary operation. The only cost: CMOS requires both NMOS and PMOS transistors, roughly doubling the transistor count. But this trade-off has been overwhelmingly worth it.

## The Complementary Principle

The key design rule of CMOS:

$$\boxed{\text{NMOS pulls down (to GND)} \quad \text{PMOS pulls up (to } V_{DD}\text{)}}$$

For every logic function:
- The **pull-down network** (PDN) uses NMOS transistors
- The **pull-up network** (PUN) uses PMOS transistors
- PUN and PDN are **complementary** — when one is ON, the other is OFF

This principle extends to all CMOS logic gates, as you'll see in the next concept.

[[visual:falstad-cmos-inverter]]

## Summary

- CMOS = **Complementary MOS** — pairs NMOS (pull-down) with PMOS (pull-up)
- In every logic state, **one transistor is OFF** — no $V_{DD}$-to-ground path
- **Static power ≈ 0** — current flows only during switching transitions
- **Full output swing**: $V_{out}$ = 0 V or $V_{DD}$ (no threshold voltage loss)
- Dynamic power: $P = C_L V_{DD}^2 f$ — proportional to switching frequency
- The **complementary principle**: NMOS pulls down, PMOS pulls up, never both ON simultaneously
- CMOS dominates all modern digital electronics due to its unmatched power efficiency at scale
