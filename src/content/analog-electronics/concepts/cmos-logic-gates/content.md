# CMOS NAND and NOR Gates

> **Why This Matters**: CMOS NAND and NOR gates are the building blocks of every modern processor. The Intel Core i9 has over 10 billion transistors — nearly all of them arranged as CMOS NAND and NOR gates. Understanding how to extend the CMOS inverter concept to multi-input gates completes your mastery of MOS digital logic.

## The CMOS Design Rule — Extended

You learned the CMOS inverter principle: NMOS pulls down, PMOS pulls up, one is always OFF. This extends to multi-input gates with one simple rule:

$$\boxed{\text{PDN (pull-down): NMOS transistors} \quad \text{PUN (pull-up): PMOS transistors}}$$

And the **complementary rule**: the PUN topology is the **dual** (complement) of the PDN topology:

| PDN | PUN |
|-----|-----|
| Series NMOS | **Parallel PMOS** |
| Parallel NMOS | **Series PMOS** |

If NMOS transistors are in **series** in the PDN, the corresponding PMOS transistors are in **parallel** in the PUN — and vice versa.

## The CMOS NAND Gate

### Circuit Structure

A 2-input CMOS NAND gate has **4 transistors**:

- **PDN (pull-down)**: 2 NMOS transistors ($T_1$, $T_2$) in **series** between output and ground
- **PUN (pull-up)**: 2 PMOS transistors ($T_3$, $T_4$) in **parallel** between $V_{DD}$ and output

[[visual:cmos-nand-nor-img]]

### Operation — Walking Through the Truth Table

[[visual:cmos-nand-truth-img]]

**Case 1: A = 0, B = 0**
- PDN: Both NMOS OFF → no pull-down path
- PUN: Both PMOS ON (gates LOW) → both pull-up paths active
- **Output = $V_{DD}$ (HIGH)**

**Case 2: A = 0, B = 1**
- PDN: $T_1$ OFF (A=0) → series chain broken, no pull-down
- PUN: $T_3$ ON (A=0), $T_4$ OFF (B=1) → at least one pull-up path
- **Output = $V_{DD}$ (HIGH)**

**Case 3: A = 1, B = 0**
- PDN: $T_2$ OFF (B=0) → series chain broken, no pull-down
- PUN: $T_3$ OFF (A=1), $T_4$ ON (B=0) → at least one pull-up path
- **Output = $V_{DD}$ (HIGH)**

**Case 4: A = 1, B = 1**
- PDN: Both NMOS ON → complete path from output to ground
- PUN: Both PMOS OFF → no pull-up path
- **Output = 0 V (LOW)**

$$\boxed{Y = \overline{A \cdot B} \quad \text{(NAND function)}}$$

> **Key Insight**: Notice that in **every** input combination, either the PUN or PDN is ON — never both. This is the complementary principle at work, guaranteeing zero static power just like the CMOS inverter.

[[visual:cmos-nand-analysis-plotly]]

## The CMOS NOR Gate

### Circuit Structure

A 2-input CMOS NOR gate also has **4 transistors**, but with the topology swapped:

- **PDN (pull-down)**: 2 NMOS transistors in **parallel** between output and ground
- **PUN (pull-up)**: 2 PMOS transistors in **series** between $V_{DD}$ and output

### Operation

| A | B | NMOS $T_1$ | NMOS $T_2$ | PDN | PMOS $T_3$ | PMOS $T_4$ | PUN | $Y$ |
|---|---|------------|------------|-----|------------|------------|-----|-----|
| 0 | 0 | OFF | OFF | Open | ON | ON | Connected | **1** |
| 0 | 1 | OFF | ON | Connected | ON | OFF | Open | **0** |
| 1 | 0 | ON | OFF | Connected | OFF | ON | Open | **0** |
| 1 | 1 | ON | ON | Connected | OFF | OFF | Open | **0** |

$$\boxed{Y = \overline{A + B} \quad \text{(NOR function)}}$$

[[visual:cmos-nor-schematic]]

## CMOS NAND vs NOR — Which Is Preferred?

In CMOS (unlike NMOS-only logic), **NAND is preferred** over NOR:

| Factor | CMOS NAND | CMOS NOR |
|--------|-----------|----------|
| Series transistors | NMOS (fast, high $\mu_n$) | **PMOS (slow, low $\mu_p$)** |
| Parallel transistors | PMOS | NMOS |
| Pull-down speed | Fast (series NMOS) | Faster (parallel NMOS) |
| Pull-up speed | **Fast (parallel PMOS)** | Slow (series PMOS) |
| Overall speed | **Faster** | Slower |

The reason: in CMOS NOR, the PMOS transistors (already slow due to low $\mu_p$) are placed in **series**, making the pull-up even slower. In CMOS NAND, the slow PMOS transistors are in **parallel** (helping each other), while the series stack is NMOS (fast).

This is the opposite of NMOS-only logic, where NOR was preferred!

[[visual:nand-vs-nor-speed]]

<details>
<summary><strong>Pause & Think</strong>: In NMOS logic, NOR was preferred. In CMOS, NAND is preferred. Why the reversal?</summary>

In NMOS logic, the load is passive — speed depends only on the pull-down network. Parallel NMOS (NOR) pulls down faster than series NMOS (NAND).

In CMOS, both networks matter. The critical path for NAND is the series NMOS pull-down (fast electrons) and parallel PMOS pull-up (helps offset slow holes). For NOR, the critical path is the series PMOS pull-up (slow holes in series = very slow). The PMOS series stack in CMOS NOR is the bottleneck that makes NAND the better choice.

</details>

## Extending to More Inputs

The complementary duality rule scales to any number of inputs:

**n-input CMOS NAND** ($2n$ transistors):
- PDN: n NMOS in **series** → output LOW only when ALL inputs HIGH
- PUN: n PMOS in **parallel** → output HIGH when ANY input LOW

**n-input CMOS NOR** ($2n$ transistors):
- PDN: n NMOS in **parallel** → output LOW when ANY input HIGH
- PUN: n PMOS in **series** → output HIGH only when ALL inputs LOW

$$\text{Total transistors} = 2n \quad \text{(for an n-input gate)}$$

[[visual:scaling-comparison]]

## Complex Gates — Beyond NAND and NOR

The CMOS complementary approach works for any Boolean function. For example, the function $Y = \overline{A \cdot (B + C)}$ requires:

**PDN**: NMOS $T_A$ in series with ($T_B$ parallel $T_C$)
**PUN**: PMOS $T_A$ in parallel with ($T_B$ series $T_C$) — the dual topology

This is how complex gates like AOI (AND-OR-Invert) and OAI (OR-AND-Invert) are built in real CMOS chips.

## Transistor Sizing in CMOS Gates

To ensure equal rise and fall times, transistor widths must be adjusted:

**NAND gate**: Series NMOS transistors each need $W_n \times n$ (where $n$ = number of inputs) to maintain the same effective resistance as a single NMOS in the inverter. Parallel PMOS transistors keep their standard width.

**NOR gate**: Series PMOS transistors each need $W_p \times n$. Since PMOS is already wider, this makes NOR gates very area-intensive.

[[visual:falstad-cmos-nand]]

## Summary

- CMOS gates use the **complementary principle**: NMOS pull-down, PMOS pull-up
- **NAND**: series NMOS (PDN) + parallel PMOS (PUN) → $Y = \overline{A \cdot B}$
- **NOR**: parallel NMOS (PDN) + series PMOS (PUN) → $Y = \overline{A + B}$
- **Zero static power** in all CMOS gates — the complementary principle guarantees it
- **NAND is preferred** in CMOS because the slow PMOS transistors are in parallel (not series)
- Each n-input gate uses **$2n$ transistors** (double the NMOS-only count, but worth it for zero power)
- The **duality rule**: if PDN has series, PUN has parallel (and vice versa)
- Any Boolean function can be implemented as a CMOS gate using this approach
