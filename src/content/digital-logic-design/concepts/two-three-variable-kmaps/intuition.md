# Two and Three Variable K-Maps

## Starting Small, Building Confidence

Before tackling 4-variable maps, let's master the smaller ones. The principles are identical—just easier to see!

---

## Two-Variable K-Map

### Structure

```
      B
    0   1
  ┌───┬───┐
A 0│m0 │m1 │
  ├───┼───┤
 1│m2 │m3 │
  └───┴───┘
```

Just 4 cells:
- m0 = $\bar{A}\bar{B}$
- m1 = $\bar{A}B$
- m2 = $A\bar{B}$ (Note: Row A=1, Column B=0)
- m3 = $AB$

---

## 2-Variable Grouping Examples

### Example 1: Single Cell (No Simplification)

```
      B
    0   1
  ┌───┬───┐
A 0│ 0 │ 1 │
  ├───┼───┤
 1│ 0 │ 0 │
  └───┴───┘
```

Only m1 is 1. No grouping possible.
**Result**: F = $\bar{A}B$ (full minterm)

### Example 2: Two Adjacent Cells (Row)

```
      B
    0   1
  ┌───┬───┐
A 0│ 0 │ 0 │
  ├───┼───┤
 1│ 1 │ 1 │
  └───┴───┘
```

Group the two 1s in row A=1.
- A stays 1
- B varies → eliminated

**Result**: F = A

### Example 3: Two Adjacent Cells (Column)

```
      B
    0   1
  ┌───┬───┐
A 0│ 0 │ 1 │
  ├───┼───┤
 1│ 0 │ 1 │
  └───┴───┘
```

Group the two 1s in column B=1.
- B stays 1
- A varies → eliminated

**Result**: F = B

### Example 4: Group of Four (All Cells)

```
      B
    0   1
  ┌───┬───┐
A 0│ 1 │ 1 │
  ├───┼───┤
 1│ 1 │ 1 │
  └───┴───┘
```

All four cells form one group.
Both variables vary → both eliminated!

**Result**: F = 1 (always true)

---

## Three-Variable K-Map

### Structure

```
       BC
     00  01  11  10
   ┌────┬────┬────┬────┐
A 0│ m0 │ m1 │ m3 │ m2 │
   ├────┼────┼────┼────┤
  1│ m4 │ m5 │ m7 │ m6 │
   └────┴────┴────┴────┘
```

8 cells arranged as 2 rows × 4 columns.

**Remember**: Columns are in Gray code order: 00, 01, 11, 10 (not 00, 01, 10, 11!)

---

## 3-Variable Grouping Examples

### Example 1: Group of Two (Horizontal)

```
       BC
     00  01  11  10
   ┌────┬────┬────┬────┐
A 0│  0 │  1 │  1 │  0 │
   ├────┼────┼────┼────┤
  1│  0 │  0 │  0 │  0 │
   └────┴────┴────┴────┘
```

Group m1 and m3 (columns 01 and 11):
- A stays 0 → $\bar{A}$
- B varies → eliminated
- C stays 1 → C

**Result**: F = $\bar{A}C$

### Example 2: Group of Two (Vertical)

```
       BC
     00  01  11  10
   ┌────┬────┬────┬────┐
A 0│  0 │  0 │  1 │  0 │
   ├────┼────┼────┼────┤
  1│  0 │  0 │  1 │  0 │
   └────┴────┴────┴────┘
```

Group m3 and m7:
- A varies → eliminated
- B stays 1 → B
- C stays 1 → C

**Result**: F = BC

### Example 3: Group of Four (Full Row)

```
       BC
     00  01  11  10
   ┌────┬────┬────┬────┐
A 0│  0 │  0 │  0 │  0 │
   ├────┼────┼────┼────┤
  1│  1 │  1 │  1 │  1 │
   └────┴────┴────┴────┘
```

All of row A=1 forms one group:
- A stays 1 → A
- B varies → eliminated
- C varies → eliminated

**Result**: F = A

### Example 4: Wrap-Around Group!

```
       BC
     00  01  11  10
   ┌────┬────┬────┬────┐
A 0│  1 │  0 │  0 │  1 │
   ├────┼────┼────┼────┤
  1│  0 │  0 │  0 │  0 │
   └────┴────┴────┴────┘
```

m0 (column 00) and m2 (column 10) ARE adjacent (wrap-around!)

Group them:
- A stays 0 → $\bar{A}$
- B stays 0 → $\bar{B}$
- C varies → eliminated

**Result**: F = $\bar{A}\bar{B}$

---

## Multiple Groups Example

```
       BC
     00  01  11  10
   ┌────┬────┬────┬────┐
A 0│  1 │  1 │  0 │  0 │
   ├────┼────┼────┼────┤
  1│  1 │  1 │  1 │  0 │
   └────┴────┴────┴────┘
```

**Step 1**: Identify groups

Group 1: m0, m1, m4, m5 (square of 4)
- A varies, B stays 0, C varies
- Wait, B is NOT constant here... Let me recheck.

Looking at the 1s: m0, m1, m4, m5, m7

Group 1: m0, m1, m4, m5 (left 2 columns, both rows = 4 cells)
- A varies → eliminated
- BC = 00 or 01, so B varies but C varies too
- Actually: BC=00→$\bar{B}\bar{C}$, BC=01→$\bar{B}C$. Common: $\bar{B}$. Term: $\bar{B}$

Group 2: m5 and m7 (row 1, columns 01 and 11)
- A stays 1 → A
- B varies → eliminated
- C stays 1 → C
- Term: AC

**Result**: F = $\bar{B}$ + AC

Wait, let me verify m7 is covered. Yes, m7=111, row A=1, column BC=11. ✓

---

## Reading Groups: Step by Step

For any group:

1. **Look at A**: Is it always 0? → $\bar{A}$. Always 1? → A. Both? → eliminated.
2. **Look at B**: Same logic.
3. **Look at C**: Same logic.
4. **Combine** the non-eliminated variables with AND.

---

## Summary

| Map Size | Cells | Max Group | Groups of 1 | Groups of 2 | Groups of 4 |
|----------|-------|-----------|-------------|-------------|-------------|
| 2-var | 4 | 4 | 2 variables | 1 variable | Constant 1 |
| 3-var | 8 | 8 | 3 variables | 2 variables | 1 variable |

**Key Points**:
- Gray code ordering: 00, 01, 11, 10
- Wrap-around applies to all edges
- Bigger groups = simpler terms
- Each 1 must be in at least one group
