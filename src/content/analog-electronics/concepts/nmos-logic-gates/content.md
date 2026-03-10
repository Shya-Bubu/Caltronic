# NMOS NOR and NAND Gates

> **Why This Matters**: The NAND and NOR gates are **universal logic gates** — any digital function can be built using only NAND gates or only NOR gates. Understanding how to construct them from individual MOSFETs bridges the gap between transistor-level physics and the logic design you'll use throughout your career.

## From Inverter to Multi-Input Gates

You've seen how a single NMOS driver + load creates an inverter. To build gates with multiple inputs, we add more NMOS driver transistors. The arrangement — **parallel or series** — determines whether we get NOR or NAND.

The rule is simple and worth memorising:

$$\boxed{\text{Parallel drivers} \to \text{NOR} \qquad \text{Series drivers} \to \text{NAND}}$$

## The NMOS NOR Gate

### Circuit Structure

A 2-input NMOS NOR gate has:
- A **load** transistor ($T_3$) connected to $V_{DD}$ (enhancement or depletion load)
- Two **driver** transistors ($T_1$ and $T_2$) connected in **parallel** between the output and ground
- Inputs A and B control $T_1$ and $T_2$ respectively

[[visual:nmos-nor-nand-img]]

### How It Works

The output goes **LOW** if **either or both** inputs are HIGH (because any ON driver pulls the output to ground). The output goes **HIGH** only if **both** inputs are LOW (both drivers OFF, load pulls up).

| A | B | $T_1$ | $T_2$ | $Y$ |
|---|---|-------|-------|-----|
| 0 | 0 | OFF | OFF | **1** (HIGH) |
| 0 | 1 | OFF | ON | **0** (LOW) |
| 1 | 0 | ON | OFF | **0** (LOW) |
| 1 | 1 | ON | ON | **0** (LOW) |

[[visual:nmos-truth-tables-img]]

This is exactly the truth table for the **NOR** function:

$$\boxed{Y = \overline{A + B}}$$

> **Key Insight**: Parallel drivers implement OR logic (any driver can pull the output low), and the load provides the inversion (HIGH when no driver is ON). Together: NOR = OR + NOT.

## The NMOS NAND Gate

### Circuit Structure

A 2-input NMOS NAND gate has:
- A **load** transistor ($T_3$) connected to $V_{DD}$
- Two **driver** transistors ($T_1$ and $T_2$) connected in **series** between the output and ground
- Inputs A and B control $T_1$ and $T_2$ respectively

### How It Works

The output goes **LOW** only if **both** inputs are HIGH (both drivers in series are ON, providing a complete path to ground). If **either** input is LOW, the series chain is broken and the load pulls the output HIGH.

| A | B | $T_1$ | $T_2$ | $Y$ |
|---|---|-------|-------|-----|
| 0 | 0 | OFF | OFF | **1** (HIGH) |
| 0 | 1 | OFF | ON | **1** (HIGH) |
| 1 | 0 | ON | OFF | **1** (HIGH) |
| 1 | 1 | ON | ON | **0** (LOW) |

This is the truth table for **NAND**:

$$\boxed{Y = \overline{A \cdot B}}$$

[[visual:nmos-nand-analysis]]

> **Key Insight**: Series drivers implement AND logic (all must be ON to pull down), and the load provides the inversion. Together: NAND = AND + NOT.

<details>
<summary><strong>Pause & Think</strong>: Why is NOR preferred over NAND in NMOS logic?</summary>

In NMOS logic, NOR gates are faster and more practical than NAND gates. Why? In a NOR gate, the parallel drivers share the pull-down path — each driver independently provides a low-resistance path to ground. In a NAND gate, the series drivers stack their resistances: $R_{total} = R_1 + R_2$, making the pull-down slower. Also, the body effect in series transistors increases the threshold voltage of the upper transistor, degrading performance further.

</details>

## Parallel vs Series: The Design Trade-Off

[[visual:parallel-vs-series]]

| Feature | Parallel (NOR) | Series (NAND) |
|---------|---------------|---------------|
| Pull-down resistance | $R_{on}/n$ (faster) | $n \times R_{on}$ (slower) |
| Body effect | No stacking | Upper transistors affected |
| Speed | **Faster** | Slower |
| Preferred in | NMOS logic | CMOS logic |

For **fan-in** (number of inputs), increasing the number of drivers:
- **NOR**: each parallel driver adds another path to ground (good)
- **NAND**: each series driver adds another resistance in the chain (bad)

This is why NOR was the preferred gate in early NMOS processors.

## Extending to More Inputs

The principle scales to any number of inputs:

**3-input NOR**: Three drivers in parallel → $Y = \overline{A + B + C}$

**3-input NAND**: Three drivers in series → $Y = \overline{A \cdot B \cdot C}$

$$\text{n-input NOR: n parallel drivers + 1 load}$$

$$\text{n-input NAND: n series drivers + 1 load}$$

[[visual:three-input-gates]]

## Static Power — Still a Problem

Like the inverter, NMOS NOR and NAND gates suffer from **static power dissipation** whenever the output is LOW:

- **NOR**: output LOW when any driver is ON → static power in 3 out of 4 input combinations
- **NAND**: output LOW only when all drivers are ON → static power in 1 out of 4 input combinations

NAND gates have lower average static power than NOR gates because the output is LOW less often. But neither eliminates the problem — only CMOS does that.

[[visual:falstad-nmos-nor]]

## Summary

- **NOR gate**: parallel drivers → $Y = \overline{A + B}$ — any input HIGH → output LOW
- **NAND gate**: series drivers → $Y = \overline{A \cdot B}$ — all inputs HIGH → output LOW
- **Parallel = faster pull-down** (NOR preferred in NMOS logic)
- **Series = slower pull-down** (NAND preferred in CMOS logic instead)
- Both NOR and NAND are **universal gates** — any logic function can be built from either
- Static power dissipation remains a problem — CMOS is the solution
