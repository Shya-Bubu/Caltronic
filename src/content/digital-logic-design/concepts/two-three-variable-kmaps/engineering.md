# Two and Three Variable K-Maps - Engineering Perspective

## Professional Application

These smaller K-maps are perfect for quick simplification during design reviews, exams, and for understanding before tackling larger problems.

---

## Complete 2-Variable Analysis

### All Possible Groups

```
      B
    0   1
  ┌───┬───┐
A 0│ 0 │ 1 │
  ├───┼───┤
 1│ 2 │ 3 │
  └───┴───┘
```

| Group | Cells | Term |
|-------|-------|------|
| Single | {0} | $\bar{A}\bar{B}$ |
| Single | {1} | $\bar{A}B$ |
| Single | {2} | $A\bar{B}$ |
| Single | {3} | $AB$ |
| Row 0 | {0,1} | $\bar{A}$ |
| Row 1 | {2,3} | $A$ |
| Col 0 | {0,2} | $\bar{B}$ |
| Col 1 | {1,3} | $B$ |
| All | {0,1,2,3} | 1 |

---

## Complete 3-Variable Analysis

### Standard Groupings

**Groups of 2**:
- Horizontal pairs: Adjacent columns
- Vertical pairs: Both rows, same column
- Wrap-around pairs: Columns 00 and 10

**Groups of 4**:
- Full row: 4 cells in one row
- Left half: Columns 00, 01 (both rows)
- Right half: Columns 11, 10 (both rows)
- Middle: Columns 01, 11 (both rows)
- Wrap-around: Columns 00, 10 (both rows)

**Group of 8**: All cells (function = 1)

---

## Systematic Minimization Procedure

### Step 1: Fill the K-Map

Transfer truth table values to correct cells.

### Step 2: Identify Isolated 1s

Any 1 with no adjacent 1s must be its own group.

### Step 3: Find Largest Groups

Look for groups of 4 first, then 2, then singles.

### Step 4: Ensure Coverage

Every 1 must be in at least one group.

### Step 5: Check for Redundancy

Can any group be removed while maintaining coverage?

### Step 6: Read the Expression

OR together all the group terms.

---

## Worked Example: F(A,B,C) = Σm(0, 2, 3, 4, 6)

### Step 1: Fill K-Map

```
       BC
     00  01  11  10
   ┌────┬────┬────┬────┐
A 0│  1 │  0 │  1 │  1 │   (m0=1, m1=0, m3=1, m2=1)
   ├────┼────┼────┼────┤
  1│  1 │  0 │  0 │  1 │   (m4=1, m5=0, m7=0, m6=1)
   └────┴────┴────┴────┘
```

### Step 2: Find Groups

**Group 1**: m0, m2, m4, m6 (columns 00 and 10, wrap-around)
- Both columns have B=0
- C varies, A varies
- Term: $\bar{B}$

**Group 2**: m2, m3 (row A=0, columns 11 and 10)
- A=0, C varies, B varies
- Wait: BC=11 means B=1, C=1; BC=10 means B=1, C=0
- So B=1 is constant!
- Term: $\bar{A}B$

### Step 3: Check Coverage

- m0: In Group 1 ✓
- m2: In Group 1 and Group 2 ✓
- m3: In Group 2 ✓
- m4: In Group 1 ✓
- m6: In Group 1 ✓

All covered!

### Step 4: Result

**F = $\bar{B}$ + $\bar{A}B$**

### Step 5: Verify (Optional)

Apply Boolean algebra: $\bar{B} + \bar{A}B = \bar{B} + \bar{A}$ (absorption)

Actually let's double-check by expansion:
$\bar{B}$ = m0, m2, m4, m6
$\bar{A}B$ = m1, m3

Wait, that gives m0,m1,m2,m3,m4,m6. But m1 shouldn't be included!

Let me re-examine Group 2. m2 and m3:
- m2: A=0, BC=10
- m3: A=0, BC=11

B varies (1 in m3, 1 in m2? No, BC=10 means B=1, C=0; BC=11 means B=1, C=1)
So B=1 is constant, C varies, A=0 constant.
Term: $\bar{A}B$ covers m1, m3... but we have m2, m3 selected!

Error! Let me recheck cell positions:
- m2 = ABC=010 → row A=0, column BC=10 ✓
- m3 = ABC=011 → row A=0, column BC=11 ✓

These are adjacent (columns 10 and 11 are adjacent in Gray code).
In column 10: B=1, C=0
In column 11: B=1, C=1
So B stays 1, C varies, A stays 0.
Term: $\bar{A}B$

But $\bar{A}B$ as a Boolean term covers minterms where A=0 AND B=1:
- ABC=010 (m2) ✓
- ABC=011 (m3) ✓

Yes! Correct.

So final answer: **F = $\bar{B}$ + $\bar{A}B$**

---

## Common Group Patterns (3-Variable)

### Four Corners (Wrap-Around)
```
       BC
     00  01  11  10
   ┌────┬────┬────┬────┐
A 0│  1 │    │    │  1 │
   ├────┼────┼────┼────┤
  1│  1 │    │    │  1 │
   └────┴────┴────┴────┘
```
Term: $\bar{B}$ (all have B=0)

### Full Row
```
       BC
     00  01  11  10
   ┌────┬────┬────┬────┐
A 0│  1 │  1 │  1 │  1 │
   ├────┼────┼────┼────┤
  1│    │    │    │    │
   └────┴────┴────┴────┘
```
Term: $\bar{A}$

### Two-Column Block
```
       BC
     00  01  11  10
   ┌────┬────┬────┬────┐
A 0│    │  1 │  1 │    │
   ├────┼────┼────┼────┤
  1│    │  1 │  1 │    │
   └────┴────┴────┴────┘
```
Term: C (columns 01 and 11 both have C=1)

---

## Summary Tables

### 2-Variable Group → Term

| Group Type | Example Cells | Term |
|------------|---------------|------|
| Single | {0} | $\bar{A}\bar{B}$ |
| Row | {0,1} | $\bar{A}$ |
| Column | {0,2} | $\bar{B}$ |
| All 4 | {0,1,2,3} | 1 |

### 3-Variable Group → Term

| Group Size | Variables in Term |
|------------|-------------------|
| 1 | 3 (full minterm) |
| 2 | 2 |
| 4 | 1 |
| 8 | 0 (constant 1) |
