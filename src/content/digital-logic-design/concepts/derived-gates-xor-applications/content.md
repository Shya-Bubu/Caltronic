# Derived Gates: XOR, NAND, NOR, XNOR and Applications

> **Why This Matters**: The three basic gates (NOT, OR, AND) can build anything — but some combinations appear so frequently that they deserve their own symbols and names. The XOR gate detects *difference*, making it essential for adders and error checking. NAND and NOR are **universal gates** — each one alone can implement any logic function — which is why real IC chips are built almost entirely from NAND or NOR gates.

## XOR: The "Difference Detector"

The **Exclusive OR** (XOR) outputs 1 when the inputs are **different**:

$$Z = X_0 \oplus X_1 \oplus \ldots \oplus X_{n-1}$$

| X₀ | X₁ | Z = X₀ ⊕ X₁ |
|----|-----|-------------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

[[visual:xor-truth-table-derivation]]

### Deriving XOR from Basic Gates

The truth table shows that Z = 1 in exactly two rows: (0,1) and (1,0). Writing the Sum of Products:

$$Z = \bar{X}_0 \cdot X_1 + X_0 \cdot \bar{X}_1$$

This reads: "output is 1 when X₀ is 0 AND X₁ is 1, **OR** when X₀ is 1 AND X₁ is 0." This requires two AND gates, two NOT gates, and one OR gate.

[[visual:xor-from-basic-gates]]

[[visual:falstad-xor-circuit]]

> **Key Insight**: XOR detects whether the inputs **differ**. When both inputs are the same (0,0 or 1,1), output is 0. When they differ (0,1 or 1,0), output is 1. This makes XOR the ideal gate for **comparison** operations.

## XOR Application 1: The Half Adder

Binary addition of two 1-bit numbers:

| X₀ | X₁ | Sum | Carry |
|----|-----|-----|-------|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

[[visual:half-adder-circuit]]

The **Sum** column is exactly XOR! The **Carry** column is exactly AND! So:
- **Sum = X₀ ⊕ X₁**
- **Carry = X₀ · X₁**

This two-gate circuit is called a **half adder** — "half" because it doesn't handle carry-in from a previous stage.

<details>
<summary><strong>Pause & Think</strong>: If 1+1 = 10 in binary (sum=0, carry=1), how does the XOR gate know to output 0 for the sum?</summary>

XOR outputs 0 when both inputs are the same. When both inputs are 1, the "sum digit" in binary addition is indeed 0 (with a carry of 1). The XOR gate naturally captures modulo-2 arithmetic: $1 \oplus 1 = 0$, just like $1 + 1 = 10_2$ where the sum digit is 0.

This is why XOR is sometimes called "addition modulo 2" — it gives you the last digit of binary addition without the carry.

</details>

## XOR Application 2: Binary Comparator

Since XOR outputs 0 when inputs are **equal** and 1 when they **differ**, you can compare two multi-bit numbers by XOR-ing corresponding bits and combining with AND:

[[visual:binary-comparator]]

For each bit position: $D_i = X_i \oplus Y_i$ — the "difference bit". If ALL difference bits are 0, the numbers are equal:

$$\text{EQUAL} = \overline{D_0 + D_1 + \ldots + D_{n-1}}$$

This is exactly how hardware comparators work in ALUs and memory address decoders.

## XOR Application 3: Controlled NOT Gate

The lecture introduces the **controlled NOT** (also called a **controlled inverter**):

| A | B | Z |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

[[visual:controlled-not]]

When A = 0: Z = B (pass-through). When A = 1: Z = B̄ (invert). By switching input A, you can **turn the NOT gate on and off** — this is a programmable inverter.

> **This is just XOR in disguise!** Z = A ⊕ B. The controlled NOT is the basis of the quantum CNOT gate, cryptographic stream ciphers (XOR with a key), and data bus transceivers.

## XOR Application 4: Two-Way Switches and Parity Check

**Two-way switches**: The lecture shows how XOR implements staircase lighting — the bulb toggles each time any switch is flipped. With N switches, the output is:

$$Z = S_1 \oplus S_2 \oplus \ldots \oplus S_N$$

[[visual:two-way-switches]]

**Parity check**: XOR of all bits in a word gives the **parity bit** — 0 if the number of 1s is even, 1 if odd. This is used for error detection in data transmission.

<details>
<summary><strong>Pause & Think</strong>: A byte has bits 10110011. What is its parity (XOR of all bits)?</summary>

$1 \oplus 0 = 1$, $1 \oplus 1 = 0$, $0 \oplus 1 = 1$, $1 \oplus 0 = 1$, $1 \oplus 0 = 0$, $0 \oplus 1 = 1$, $1 \oplus 1 = 0$.

Count of 1s: five (odd), so parity = 1. You can verify: XOR all bits sequentially and you get 1.

</details>

## NAND Gate: NOT-AND

The NAND gate is AND followed by NOT:

$$Z = \overline{X_0 \cdot X_1}$$

| X₀ | X₁ | Z |
|----|-----|---|
| 0 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

[[visual:nand-nor-xnor-symbols]]

The NAND gate is **universal** — any logic function can be built using only NAND gates. The lecture demonstrates key equivalences:

- **Single-input NAND = NOT**: When both inputs are tied together: $\overline{A \cdot A} = \bar{A}$
- **NAND + NOT = AND**: Two NAND gates: $\overline{\overline{A \cdot B}} = A \cdot B$

## NOR Gate: NOT-OR

$$Z = \overline{X_0 + X_1}$$

| X₀ | X₁ | Z |
|----|-----|---|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 0 |

NOR is also **universal**. Single-input NOR = NOT. The lecture shows how to build an OR gate from NAND gates:

[[visual:or-from-nands]]

## XNOR Gate: NOT-XOR

$$Z = \overline{X_0 \oplus X_1} = X_0 \odot X_1$$

The XNOR outputs 1 when inputs are the **same** (the "equality detector"):

| X₀ | X₁ | Z |
|----|-----|---|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

While XOR detects difference, XNOR detects **equality** — useful in comparators and pattern matching circuits.

[[visual:falstad-nand-to-not]]

<details>
<summary><strong>Pause & Think</strong>: Why are NAND and NOR called "universal" gates? Can XOR also be universal?</summary>

A gate is universal if it can implement NOT, AND, and OR (the three basic operations from which all logic is built). NAND can do all three: NOT = single-input NAND, AND = NAND + NOT, OR = De Morgan's. Same for NOR.

XOR is **NOT universal** — you cannot build a simple AND gate from XOR gates alone. XOR always preserves the number of 1s modulo 2, so it can never produce a function like AND that doesn't have this property.

</details>

## Summary

| Gate | Expression | Universal? | Key use |
|------|-----------|------------|---------|
| **XOR** | X₀ ⊕ X₁ | No | Adders, comparators, parity |
| **NAND** | (X₀·X₁)̄ | **Yes** | IC building block |
| **NOR** | (X₀+X₁)̄ | **Yes** | IC building block |
| **XNOR** | (X₀⊕X₁)̄ | No | Equality detection |

> **XOR is your most versatile derived gate**: it builds adders, comparators, parity checkers, controlled inverters, and staircase switches. **NAND/NOR are your most fundamental**: any function can be built from just one of these gate types.
