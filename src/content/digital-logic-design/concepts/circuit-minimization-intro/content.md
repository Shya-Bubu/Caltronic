# Circuit Minimization and Hamming Distance

> **Why This Matters**: The raw canonical SOP/POS expression always works — but it often has **redundant gates** that waste area, power, and time. Circuit minimization is about finding the **simplest equivalent expression** that produces the exact same truth table with fewer gates. The lecture introduces three minimization methods and a metric (Hamming distance) that tells you which terms can be merged.

## The Three Minimization Methods

The lecture lists three approaches to simplification, ordered from informal to formal:

[[visual:minimization-methods]]

| Method | Approach | Strengths | Limitations |
|--------|----------|-----------|-------------|
| **Boolean Algebra** | Hand-apply rules | No tools needed; good for small circuits | No guarantee you've found the minimum |
| **Karnaugh Map** | Graphical grouping | Visual, systematic, guaranteed minimum for ≤5 variables | Doesn't scale beyond 5–6 variables |
| **Quine–McCluskey** | Algorithmic (tabular) | Handles any number of variables; machine-implementable | Tedious by hand; O(3^n) worst case |

> In this lesson we focus on Boolean algebra minimization. Karnaugh maps and Quine–McCluskey are covered in the next lesson.

## Canonical vs Non-Canonical Forms

### Canonical Form
A **canonical** expression uses only full minterms or full maxterms — every variable appears in every term:

$$Z = \bar{A}BC + A\bar{B}C + AB\bar{C} + ABC \quad \text{(SOP canonical)}$$

### Non-Canonical Form
A **non-canonical** expression is any simplified form where some terms have fewer variables:

$$Z = AB + BC + AC \quad \text{(SOP non-canonical)}$$

Both represent the **same function** (same truth table), but the non-canonical form uses fewer gates.

[[visual:canonical-vs-noncanonical]]

### Converting Non-Canonical to Canonical

The lecture works through the example of converting a non-canonical expression back to canonical:

$$Z = A + \bar{A}B$$

**Step 1**: Is this just Z = A + B? Let's check:
$$A + \bar{A}B = A + \bar{A}B$$

Apply the second distributive law (or use the absorption trick):
$$= A(1) + \bar{A}B = A(B + \bar{B}) + \bar{A}B = AB + A\bar{B} + \bar{A}B$$

**Alternative shortcut** using the special property:
$$A + \bar{A}B = 1 - \bar{A} + \bar{A}B = 1 + \bar{A}(B - 1) = 1 + \bar{A}(0) = 1$$

Wait — that's wrong! Let's verify with truth table:

| A | B | A+ĀB |
|--|--|------|
| 0 | 0 | 0+1·0 = 0 |
| 0 | 1 | 0+1·1 = 1 |
| 1 | 0 | 1+0·0 = 1 |
| 1 | 1 | 1+0·1 = 1 |

So $A + \bar{A}B = A + B$. The lecture verifies this:
$$A + \bar{A}B = A + B$$

[[visual:noncanonical-verification]]

<details>
<summary><strong>Pause & Think</strong>: Prove algebraically that A + ĀB = A + B without using truth tables.</summary>

$$A + \bar{A}B = (A + \bar{A})(A + B) \quad \text{(second distributive law)}$$
$$= 1 \cdot (A + B) = A + B$$

This uses the uniquely-Boolean distributive law: $X + YZ = (X+Y)(X+Z)$. With $X=A$, $Y=\bar{A}$, $Z=B$: $(A+\bar{A})(A+B) = 1 \cdot (A+B) = A+B$. ✓

</details>

## Hamming Distance: The Minimization Metric

### What is Hamming Distance?

The **Hamming distance (HD)** between two binary terms is the **number of variables in which they differ**:

[[visual:hamming-distance-examples]]

| Term 1 | Term 2 | Differences | HD |
|--------|--------|-------------|-----|
| AB**C̄** | AB**C** | C̄ vs C (1 variable) | 1 |
| A**B̄**C̄ | A**B**C | B̄→B and C̄→C (2 variables) | 2 |
| **Ā̄B̄**C̄ | **A**B**C** | all 3 differ | 3 |

### Why HD Matters for Minimization

**The fundamental merging rule**: Two minterms can be **combined into one shorter term** if and only if their Hamming distance is **exactly 1**.

When HD = 1, the two terms differ in exactly one variable. That variable can be eliminated:

$$AB\bar{C} + ABC = AB(\bar{C} + C) = AB \cdot 1 = AB$$

[[visual:hd1-merging]]

The variable that differs (C in this case) disappears, reducing the term from 3 variables to 2.

> **Key Insight**: HD = 1 → eliminate 1 variable. This is the atomic step of every minimization method. Karnaugh maps visualise HD-1 adjacency as physical adjacency on the map. Quine-McCluskey tabulates HD-1 pairs algorithmically.

### What if HD > 1?

If HD = 2, you **cannot** directly combine the terms — they differ in too many variables. You need intermediate steps (using the idempotent trick to duplicate terms) or a graphical method.

If HD = 3 (for 3-variable terms), the terms have **nothing** in common — no simplification is possible between them directly.

<details>
<summary><strong>Pause & Think</strong>: For a 3-variable function with 4 minterms, what's the maximum number of HD-1 pairs you could find?</summary>

With 4 minterms, you have $\binom{4}{2} = 6$ possible pairs to check. In the best case, all 6 pairs have HD = 1, allowing extensive merging. In the worst case, none do (all differ by 2+ variables), and no algebraic simplification is possible from pairing alone.

The Karnaugh map arranges minterms so that HD-1 neighbours are physically adjacent, making it easy to spot all possible merges visually.

</details>

## Worked Example: Minimization with HD

Starting with 4 minterms from the majority voter:

$$Z = \bar{A}BC + A\bar{B}C + AB\bar{C} + ABC$$

**Check all pairs for HD = 1**:

| Pair | HD | Can merge? |
|------|-----|-----------|
| ĀBC, AB̄C | 2 | ✗ |
| ĀBC, ABC̄ | 2 | ✗ |
| ĀBC, ABC | 1 (A̅→A) | ✓ → BC |
| AB̄C, ABC̄ | 2 | ✗ |
| AB̄C, ABC | 1 (B̅→B) | ✓ → AC |
| ABC̄, ABC | 1 (C̅→C) | ✓ → AB |

[[visual:hd-pair-analysis]]

Three HD-1 pairs → three merged terms: BC, AC, AB.

$$Z = AB + BC + AC$$

**Gate count comparison**:

[[visual:gate-count-comparison]]

| | Canonical SOP | Minimised |
|---|---|---|
| AND gates | 4 × 3-input | 3 × 2-input |
| OR gate | 1 × 4-input | 1 × 3-input |
| NOT gates | 3 | 0 |
| **Total gates** | **8** | **4** |
| **Total gate inputs** | **19** | **9** |

**50% fewer gates, 53% fewer gate inputs!** And no inverters needed at all.

<details>
<summary><strong>Pause & Think</strong>: The minimised form AB+BC+AC has no complemented variables. Is this always the case after minimization?</summary>

No! It's a coincidence of this particular function (majority voter). In general, minimised expressions can still contain complemented variables. For example, $\bar{A}B + A\bar{B}$ (XOR) cannot be simplified further, and it has complements.

The absence of complements here means the majority voter doesn't need any NOT gates — a significant simplification that makes the implementation even cheaper.

</details>

## Summary

1. **Three minimization methods**: Boolean algebra (hand rules), Karnaugh maps (graphical), Quine-McCluskey (algorithmic)
2. **Canonical form**: Every variable in every term (raw SOP/POS). **Non-canonical**: Simplified with fewer variables per term.
3. **Hamming distance (HD)**: Number of variables that differ between two terms. HD = 1 → can merge and eliminate one variable.
4. **Merging rule**: $P\bar{X} + PX = P$ — the variable that differs drops out.
5. **Goal**: Minimise gate count, gate inputs, area, power, cost. Maximise speed and debuggability.

> **Hamming distance is the key metric**: it tells you exactly which terms can be simplified together. In the next lesson, Karnaugh maps will make finding HD-1 pairs visual and systematic — no more manual checking of every pair.
