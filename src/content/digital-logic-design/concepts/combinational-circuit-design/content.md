# Designing Combinational Logic Circuits

> **Why This Matters**: Knowing individual gates is like knowing the alphabet. **Designing circuits** is writing sentences and paragraphs. This concept teaches you the systematic process of turning a real-world requirement into a working logic circuit — the core skill of digital design.

## The Design Flow

Every combinational circuit design follows the same three-step pipeline:

$$\text{Requirement} \longrightarrow \text{Truth Table} \longrightarrow \text{Logic Circuit}$$

[[visual:design-flow]]

**Step 1 — Requirement**: State the problem in plain English (or a formal specification).  
**Step 2 — Truth Table**: List all possible input combinations and the desired output for each.  
**Step 3 — Logic Circuit**: Convert the truth table to a Boolean expression, then to gates.

This pipeline is **universal** — it works for 2-variable problems and for 20-variable problems. The only thing that changes is the size of the truth table (and the need for optimisation).

## Worked Example: The Majority Voter

**Requirement**: Three people (A, B, C) each flip a switch (on = 1, off = 0). A bulb (Z) turns on if **at least two** switches are on.

[[visual:majority-voter-scenario]]

### Step 2: Truth Table

| A | B | C | A·B | B⊕C | Z |
|---|---|---|-----|-----|---|
| 0 | 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 0 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 | 0 | 1 |
| 1 | 0 | 0 | 0 | 0 | 0 |
| 1 | 0 | 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 1 | 1 | 1 |
| 1 | 1 | 1 | 1 | 0 | 1 |

[[visual:three-variable-truth-table]]

The lecture shows this exact truth table with columns for intermediate terms A·B and B⊕C, helping to verify the design.

<details>
<summary><strong>Pause & Think</strong>: How many rows does a truth table have for N input variables? If you had 10 inputs, how many rows would you need?</summary>

A truth table has $2^N$ rows. For 3 inputs: $2^3 = 8$ rows (manageable). For 10 inputs: $2^{10} = 1024$ rows. For 20 inputs: $2^{20} = 1,048,576$ rows!

This exponential growth is why we need **systematic methods** like Karnaugh maps and algorithmic minimisation — manually writing truth tables for large circuits is impractical.

</details>

## Sum of Products (SOP) — Minterms

### What is a Minterm?

A **minterm** is a product (AND) term that includes **every** input variable, either complemented or uncomplemented. For 3 variables (A, B, C), there are $2^3 = 8$ minterms.

The lecture provides the complete minterm table:

| Row | A | B | C | Minterm (SOP term) | Maxterm (POS term) |
|-----|---|---|---|-------------------|-------------------|
| 0 | 0 | 0 | 0 | Ā·B̄·C̄ | A+B+C |
| 1 | 0 | 0 | 1 | Ā·B̄·C | A+B+C̄ |
| 2 | 0 | 1 | 0 | Ā·B·C̄ | A+B̄+C |
| 3 | 0 | 1 | 1 | Ā·B·C | A+B̄+C̄ |
| 4 | 1 | 0 | 0 | A·B̄·C̄ | Ā+B+C |
| 5 | 1 | 0 | 1 | A·B̄·C | Ā+B+C̄ |
| 6 | 1 | 1 | 0 | A·B·C̄ | Ā+B̄+C |
| 7 | 1 | 1 | 1 | A·B·C | Ā+B̄+C̄ |

[[visual:minterm-maxterm-table]]

### The SOP Rule

To get the SOP expression:
1. **Identify rows where Z = 1** (in our example: rows 3, 5, 6, 7)
2. **Write the minterm** for each such row
3. **OR them together**

$$Z = \bar{A}BC + A\bar{B}C + AB\bar{C} + ABC$$

This is the **canonical SOP** form — it directly maps to a circuit with:
- **NOT layer**: Invert each variable
- **AND layer**: One AND gate per minterm
- **OR layer**: OR all minterms together

[[visual:sop-circuit-implementation]]

[[visual:falstad-sop-majority]]

> **Key Insight**: SOP is a brute-force but **guaranteed** approach. Any truth table can be mechanically converted to an SOP expression, and any SOP expression directly maps to a three-layer circuit (NOT → AND → OR).

<details>
<summary><strong>Pause & Think</strong>: Our SOP has 4 minterms of 3 variables each. How many total gates does this circuit need?</summary>

- **NOT gates**: 3 (one per variable: Ā, B̄, C̄)
- **AND gates**: 4 (one per minterm, each with 3 inputs)
- **OR gate**: 1 (4 inputs, combining all minterms)
- **Total**: 8 gates

This is a lot! The minimised version (next concept) might need significantly fewer. The SOP form is logically correct but often not the most efficient implementation.

</details>

## Products of Sum (POS) — Maxterms

### What is a Maxterm?

A **maxterm** is a sum (OR) term that includes every variable. The maxterm for a row is the **complement** of the minterm — every variable that is 1 in the row appears complemented, and vice versa.

### The POS Rule

To get the POS expression:
1. **Identify rows where Z = 0** (rows 0, 1, 2, 4)
2. **Write the maxterm** for each such row
3. **AND them together**

$$Z = (A+B+C)(A+B+\bar{C})(A+\bar{B}+C)(\bar{A}+B+C)$$

[[visual:pos-expression]]

### SOP vs POS: When to Use Which?

| Criterion | SOP | POS |
|-----------|-----|-----|
| Focus on | Rows where Z = **1** | Rows where Z = **0** |
| Use when | Few 1s in truth table | Few 0s in truth table |
| Circuit structure | NOT → AND → OR | NOT → OR → AND |

> **Duality**: SOP and POS are dual representations of the same function. Choose whichever has fewer terms (fewer rows with Z = 1 → use SOP; fewer rows with Z = 0 → use POS).

## The Three-Layer Implementation

The lecture shows the complete circuit implementation for the SOP majority voter:

[[visual:three-layer-circuit]]

The circuit has:
- **Layer 1 (NOT)**: Three inverters generate Ā, B̄, C̄
- **Layer 2 (AND)**: Four 3-input AND gates, one per minterm
- **Layer 3 (OR)**: One 4-input OR gate combines all minterms

The lecture notes the design goals for optimisation:
- **Area ↓** — fewer gates means smaller chip
- **Cost ↓** — fewer components to buy
- **Power consumption ↓** — fewer switching transistors
- **Speed ↑** — fewer gate delays in the critical path
- **Easy to troubleshoot and implement**

[[visual:optimization-goals]]

<details>
<summary><strong>Pause & Think</strong>: Why does the three-layer SOP circuit have a fixed propagation delay regardless of the number of minterms?</summary>

Every signal passes through exactly 3 gate layers: NOT → AND → OR. Adding more minterms increases the fan-in of the OR gate, but not the number of layers. So the total propagation delay is:

$$t_{pd} = t_{NOT} + t_{AND} + t_{OR}$$

This is called a **two-level logic implementation** (NOT doesn't count as a "level" in standard terminology because it's applied to inputs, not intermediate results). Two-level logic is the fastest possible implementation for any combinational function.

</details>

## Summary

1. **Design flow**: Requirement → Truth table → Boolean expression → Gate circuit
2. **SOP** (Sum of Products): OR the minterms (rows where Z = 1). Circuit: NOT → AND → OR.
3. **POS** (Products of Sum): AND the maxterms (rows where Z = 0). Circuit: NOT → OR → AND.
4. **Minterms**: Product terms with ALL variables (complemented or not).
5. **Maxterms**: Sum terms with ALL variables (complemented or not).
6. **The canonical form works but is not optimised** — the next concepts show how to simplify.

> **The SOP/POS pipeline is your baseline**: it always works, always produces a correct circuit. Optimisation (Boolean algebra, Karnaugh maps) builds on top of this guaranteed starting point.
