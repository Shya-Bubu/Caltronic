# POS Minimization - Engineering Perspective

## Design Decision: SOP vs POS

### Gate Implementation

**SOP**: AND gates feeding into OR gate (AND-OR network)
**POS**: OR gates feeding into AND gate (OR-AND network)

With **NAND-only** or **NOR-only** implementations:
- SOP maps naturally to NAND-NAND
- POS maps naturally to NOR-NOR

### Practical Selection Criteria

| Factor | Choose SOP | Choose POS |
|--------|-----------|-----------|
| # of 1s vs 0s | Fewer 1s | Fewer 0s |
| Gate library | NANDs abundant | NORs abundant |
| Output characteristic | Active-high | Active-low |
| Subsequent logic | Needs OR | Needs AND |

---

## Systematic POS Procedure

### Input: Truth Table or K-Map

### Step 1: Identify All 0s
List all minterms where F = 0.

### Step 2: Group 0s in K-Map
Same grouping rules as SOP:
- Group sizes: 1, 2, 4, 8, 16, ...
- Rectangular shapes only
- Wrap-around permitted
- Maximize group sizes to minimize literals

### Step 3: Extract Maxterms
For each group of 0s:

| Variable Behavior | Include As |
|-------------------|------------|
| Constant at 0 | Uncomplemented |
| Constant at 1 | Complemented |
| Varies | Omitted |

### Step 4: Form Product
F = (M₁)(M₂)(M₃)...

---

## Worked Example: BCD < 5 Detector

**Specification**: Output 1 if BCD input is less than 5.

- F = 1 for: 0, 1, 2, 3, 4
- F = 0 for: 5, 6, 7, 8, 9
- F = X for: 10-15

### K-Map

```
         CD
       00  01  11  10
    ┌────┬────┬────┬────┐
 00 │  1 │  1 │  1 │  1 │
AB 01│  1 │  0 │  0 │  0 │
 11 │  X │  X │  X │  X │
 10 │  0 │  0 │  X │  X │
    └────┴────┴────┴────┘

1s at: m0, m1, m2, m3, m4
0s at: m5, m6, m7, m8, m9
Xs at: m10-m15
```

### SOP Analysis
Would need to cover 5 ones... let's see if POS is better.

### POS Analysis (grouping 0s)

**Group 1**: m5, m7 with m13(X), m15(X)
- 2×2 square: rows 01,11, cols 01,11
- B=1, D=1
- Both constant at 1 → complement both
- Maxterm: $(\bar{B} + \bar{D})$

**Group 2**: m6, m7 with m14(X), m15(X)
- 2×2 square: rows 01,11, cols 11,10
- B=1, C=1
- Maxterm: $(\bar{B} + \bar{C})$

**Group 3**: m8, m9 with m10(X), m11(X), m12(X), m13(X), m14(X), m15(X)
- Bottom two rows entirely (all X's in row 11!)
- A=1 constant
- Maxterm: $\bar{A}$

Wait, m8 and m9 are 0s. Row 11 is all X's (which we can treat as 0 for POS).
So rows 10 and 11, all columns = 8 cells → single variable: A=1

**Maxterm**: $\bar{A}$

**Result**: F = $\bar{A}(\bar{B} + \bar{C})(\bar{B} + \bar{D})$

Or factoring: F = $\bar{A}(\bar{B} + \bar{C})(\bar{B} + \bar{D})$

Let me simplify $(\bar{B} + \bar{C})(\bar{B} + \bar{D})$:
= $\bar{B} + \bar{C}\bar{D}$ (using distribution)

So F = $\bar{A}(\bar{B} + \bar{C}\bar{D})$

### Verification

Let's check:
- m0 (0000): $\bar{A}$=1, check rest: $\bar{B}$=1 → F=1 ✓
- m5 (0101): $\bar{A}$=1, $\bar{B}$=0, $\bar{C}$=1, $\bar{D}$=0, so $\bar{C}\bar{D}$=0, inner=0 → F=0 ✓
- m8 (1000): $\bar{A}$=0 → F=0 ✓

---

## Comparing SOP and POS

**Same function from above**:

**SOP approach**:
- Cover m0, m1, m2, m3, m4
- m0, m1, m2, m3: row 00 → $\bar{A}\bar{B}$
- m4: need to cover. m4 alone would be $\bar{A}B\bar{C}\bar{D}$
  - Or m4 with m0: columns 00, rows 00+01... not adjacent!
  - m4 with m12(X): $B\bar{C}\bar{D}$

**SOP Result**: F = $\bar{A}\bar{B} + B\bar{C}\bar{D}$

**POS Result**: F = $\bar{A}(\bar{B} + \bar{C}\bar{D})$

Both are equivalent! Gate counts may differ based on implementation.

---

## Don't Cares in POS

For POS, treat X as 0 when it helps enlarge groups of 0s.

This is the **opposite** of SOP, where X is treated as 1.

### Example Application

In the BCD example above, treating row 11 (all X's) as 0s allowed the $\bar{A}$ maxterm.

---

## POS to Gate Network

**F = $(A + B)(C + \bar{D})$**

```
     A ─────┐
            │─── OR ───┐
     B ─────┘          │
                       │─── AND ─── F
     C ─────┐          │
            │─── OR ───┘
     D̄ ─────┘
```

Two OR gates → one AND gate

---

## Key Engineering Formulas

### Literal Count
POS literal count = Σ(literals in each maxterm)

### Gate Count
- OR gates: one per maxterm
- AND gate: one (output)
- Inverters: as needed for complements

### Conversion Formula
$$F_{SOP} \cdot \overline{F_{POS}} = 0$$
(SOP and POS are equivalent representations)
