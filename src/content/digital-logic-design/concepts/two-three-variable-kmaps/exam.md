# Two and Three Variable K-Maps - Exam Preparation

## Quick Reference Templates

### 2-Variable K-Map
```
      B
    0   1
  ┌───┬───┐
A 0│m0 │m1 │   m0=Ā B̄, m1=Ā B
  ├───┼───┤
 1│m2 │m3 │   m2=AB̄, m3=AB
  └───┴───┘
```

### 3-Variable K-Map
```
       BC
     00  01  11  10
   ┌────┬────┬────┬────┐
A 0│ m0 │ m1 │ m3 │ m2 │
   ├────┼────┼────┼────┤
  1│ m4 │ m5 │ m7 │ m6 │
   └────┴────┴────┴────┘
```

---

## Worked Examples

### Example 1: 2-Variable SOP

**Problem**: Minimize F(A,B) = Σm(0, 2, 3)

**Solution**:
```
      B
    0   1
  ┌───┬───┐
A 0│ 1 │ 0 │
  ├───┼───┤
 1│ 1 │ 1 │
  └───┴───┘
```

**Groups**:
- Group 1: m0, m2 (column B=0) → $\bar{B}$
- Group 2: m2, m3 (row A=1) → $A$

**Result**: F = $\bar{B}$ + A

---

### Example 2: 3-Variable SOP

**Problem**: Minimize F(A,B,C) = Σm(0, 1, 2, 4, 5)

**Solution**:
```
       BC
     00  01  11  10
   ┌────┬────┬────┬────┐
A 0│  1 │  1 │  0 │  1 │
   ├────┼────┼────┼────┤
  1│  1 │  1 │  0 │  0 │
   └────┴────┴────┴────┘
```

**Groups**:
- Group 1: m0, m1, m4, m5 (columns 00, 01 = $\bar{B}$... wait, check B values)
  - BC=00: B=0, BC=01: B=0. So $\bar{B}$? No, BC=00 means B=0, BC=01 means B=0. ✓
  - Term: $\bar{B}$
- Group 2: m0, m2 (row A=0, columns 00 and 10, wrap-around)
  - A=0, C=0 (both columns have C=0)
  - Term: $\bar{A}\bar{C}$

**Check coverage**:
- m0: ✓ (both groups)
- m1: ✓ (group 1)
- m2: ✓ (group 2)
- m4: ✓ (group 1)
- m5: ✓ (group 1)

**Result**: F = $\bar{B}$ + $\bar{A}\bar{C}$

Wait, I need to recheck Group 1:
- m0: BC=00, B=0, C=0
- m1: BC=01, B=0, C=1
- m4: BC=00, B=0, C=0
- m5: BC=01, B=0, C=1

B is always 0, C varies, A varies.
So term is $\bar{B}$? 

But $\bar{B}$ covers m0, m1, m4, m5 AND m2, m6 (all cells where B=0).
But m6 is not in our function...

Actually I made an error. Let me recheck the map:
- BC=00: B=0, C=0
- BC=01: B=0, C=1
- BC=11: B=1, C=1
- BC=10: B=1, C=0

So Group 1 (m0, m1, m4, m5) has:
- m0: B=0, C=0
- m1: B=0, C=1
- m4: B=0, C=0
- m5: B=0, C=1

All have B=0! So term is $\bar{B}$.

But the K-map shows m6 (BC=10) = 0, so $\bar{B}$ is correct for Group 1.

Final answer: **F = $\bar{B}$ + $\bar{A}\bar{C}$**

Hmm, but $\bar{B}$ already covers m0, m1, m4, m5. And $\bar{A}\bar{C}$ covers m0, m2.

We can simplify: $\bar{B}$ covers all except m2. $\bar{A}\bar{C}$ covers m2 (and m0, but overlap is OK).

Correct!

---

### Example 3: Wrap-Around Group

**Problem**: Minimize F(A,B,C) = Σm(0, 2, 4, 6)

**Solution**:
```
       BC
     00  01  11  10
   ┌────┬────┬────┬────┐
A 0│  1 │  0 │  0 │  1 │
   ├────┼────┼────┼────┤
  1│  1 │  0 │  0 │  1 │
   └────┴────┴────┴────┘
```

**Group**: All four 1s form one wrap-around group (columns 00 and 10)
- B=0 and B=1, so B varies
- C=0 in both columns
- A varies

Term: $\bar{C}$

**Result**: F = $\bar{C}$

---

## Common Mistakes

| Mistake | Correction |
|---------|------------|
| Binary column order | Use Gray code: 00, 01, 11, 10 |
| Forgetting wrap-around | Columns 00 and 10 ARE adjacent |
| Groups of 3 | Only powers of 2: 1, 2, 4 |
| Missing overlaps | Groups CAN and often SHOULD overlap |
| Redundant groups | Remove groups that don't uniquely cover any cell |

---

## Group-to-Term Quick Reference

### 2-Variable

| Group | Term |
|-------|------|
| m0 alone | $\bar{A}\bar{B}$ |
| m0, m1 | $\bar{A}$ |
| m0, m2 | $\bar{B}$ |
| m1, m3 | B |
| m2, m3 | A |
| All 4 | 1 |

### 3-Variable

| Group | Term |
|-------|------|
| Full row A=0 | $\bar{A}$ |
| Full row A=1 | A |
| Columns 00,01 (both rows) | $\bar{B}$ |
| Columns 01,11 (both rows) | C |
| Columns 11,10 (both rows) | B |
| Columns 00,10 (both rows) | $\bar{C}$ |

---

## Exam Checklist

- [ ] K-map labeled with Gray code (00, 01, 11, 10)
- [ ] Minterms placed in correct cells
- [ ] All 1s covered by at least one group
- [ ] Groups are powers of 2 (1, 2, 4)
- [ ] Groups are rectangular (including wrap-around)
- [ ] Largest possible groups used
- [ ] No redundant groups
- [ ] Expression is OR of group terms
