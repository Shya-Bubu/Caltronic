# Four Variable K-Maps

## The Workhorse of Digital Design

The 4×4 K-map handles most practical combinational logic design problems. Master this, and you'll simplify circuits with confidence!

---

## Structure

```
         CD
       00  01  11  10
    ┌────┬────┬────┬────┐
 00 │ m0 │ m1 │ m3 │ m2 │
    ├────┼────┼────┼────┤
AB 01│ m4 │ m5 │ m7 │ m6 │
    ├────┼────┼────┼────┤
 11 │m12 │m13 │m15 │m14 │
    ├────┼────┼────┼────┤
 10 │ m8 │ m9 │m11 │m10 │
    └────┴────┴────┴────┘
```

16 cells arranged in 4 rows × 4 columns, both labeled with Gray code.

---

## Key Patterns to Recognize

### Pattern 1: Row of Four

A full row eliminates C and D:
```
         CD
       00  01  11  10
    ┌────┬────┬────┬────┐
 00 │  1 │  1 │  1 │  1 │  → Ā B̄
AB 01│    │    │    │    │
 11 │    │    │    │    │
 10 │    │    │    │    │
    └────┴────┴────┴────┘
```

### Pattern 2: Column of Four

A full column eliminates A and B:
```
         CD
       00  01  11  10
    ┌────┬────┬────┬────┐
 00 │    │  1 │    │    │
AB 01│    │  1 │    │    │  → C D̄
 11 │    │  1 │    │    │
 10 │    │  1 │    │    │
    └────┴────┴────┴────┘
```

### Pattern 3: 2×2 Square

Eliminates one variable from each axis:
```
         CD
       00  01  11  10
    ┌────┬────┬────┬────┐
 00 │    │    │    │    │
AB 01│    │  1 │  1 │    │  → B C
 11 │    │  1 │  1 │    │
 10 │    │    │    │    │
    └────┴────┴────┴────┘
```

### Pattern 4: Four Corners

The corners wrap around BOTH ways:
```
         CD
       00  01  11  10
    ┌────┬────┬────┬────┐
 00 │  1 │    │    │  1 │
AB 01│    │    │    │    │  → B̄ D̄
 11 │    │    │    │    │
 10 │  1 │    │    │  1 │
    └────┴────┴────┴────┘
```

---

## Valid Group Sizes

| Group Size | Shape | Variables Eliminated |
|------------|-------|---------------------|
| 1 | Single cell | 0 |
| 2 | 1×2 or 2×1 | 1 |
| 4 | 1×4, 4×1, or 2×2 | 2 |
| 8 | 2×4 or 4×2 | 3 |
| 16 | Entire map | 4 (F = 1) |

---

## Complete Example

**Function**: F(A,B,C,D) = Σm(0, 1, 2, 5, 8, 9, 10)

### Step 1: Fill the K-Map

```
         CD
       00  01  11  10
    ┌────┬────┬────┬────┐
 00 │  1 │  1 │  0 │  1 │
AB 01│  0 │  1 │  0 │  0 │
 11 │  0 │  0 │  0 │  0 │
 10 │  1 │  1 │  0 │  1 │
    └────┴────┴────┴────┘
```

### Step 2: Identify Groups

**Group 1**: m0, m1, m8, m9 (rows 00 and 10, columns 00 and 01)
- AB: 00 and 10 → B varies, A varies (but same in pairs)
- Wait, let me reconsider...

Actually: m0, m2, m8, m10 form the corner group!
- Columns 00 and 10 (wrap-around)
- Rows 00 and 10 (wrap-around)
- All have B=0, D=0
- Term: **$\bar{B}\bar{D}$**

**Group 2**: m0, m1, m8, m9
- Rows 00 and 10 (wrap-around)
- Columns 00 and 01
- A varies, B=0, C=0, D varies
- Term: **$\bar{B}\bar{C}$**

Wait, this overlaps with Group 1. Let me reconsider.

m0, m1 (row 00), m8, m9 (row 10):
- AB varies between 00 and 10, so A varies, B stays 0
- CD: 00 and 01, so C stays 0, D varies
- Term: $\bar{B}\bar{C}$

**Group 3**: m5 alone (or can we do better?)

Looking at m5: Can it group with m1 (vertical)? 
- m1: AB=00, CD=01
- m5: AB=01, CD=01
- Only A changes. ✓

Group m1, m5:
- B=0, C=0, D=1
- A varies
- Term: **$\bar{B}\bar{C}D$**

But m1 is already in Group 2... overlap is OK!

**Let me restart more carefully:**

1s at: m0, m1, m2, m5, m8, m9, m10

**Group A**: m0, m2, m8, m10 (four corners)
- B̄ D̄

**Group B**: m0, m1, m8, m9 (left two columns, rows 00 and 10)
- B̄ C̄

**Group C**: m1, m5 (column 01, rows 00 and 01)
- B̄ C̄ D ... wait, let me check.
- m1: ABCD = 0001 → Ā B̄ C̄ D
- m5: ABCD = 0101 → Ā B C̄ D
- B changes! Term: Ā C̄ D

Hmm, m1 covered by B̄ C̄, m5 needs more.

m5 = 0101. What's adjacent?
- m1 (0001) - differ in B ✓
- m4 (0100) - differ in D, but m4=0
- m7 (0111) - differ in C, but m7=0
- m13 (1101) - differ in A, but m13=0

So m5 can only pair with m1.
m1, m5: Ā C̄ D

**Final groups**:
1. m0, m2, m8, m10: $\bar{B}\bar{D}$
2. m1, m5: $\bar{A}\bar{C}D$

Check coverage:
- m0: ✓ (group 1)
- m1: ✓ (group 2)
- m2: ✓ (group 1)
- m5: ✓ (group 2)
- m8: ✓ (group 1)
- m9: ✗ NOT COVERED!
- m10: ✓ (group 1)

I need another group for m9!

m9 = 1001. Adjacent to:
- m1 (0001) - differ in A ✓
- m8 (1000) - differ in D ✓
- m11 (1011) - 0
- m13 (1101) - 0

Group m8, m9: $A\bar{B}\bar{C}$

Or larger: m0, m1, m8, m9?
- m0: 0000, m1: 0001, m8: 1000, m9: 1001
- B=0 always, C=0 always, A varies, D varies
- Term: $\bar{B}\bar{C}$

**Revised final**:
1. m0, m2, m8, m10: $\bar{B}\bar{D}$
2. m0, m1, m8, m9: $\bar{B}\bar{C}$
3. m1, m5: $\bar{A}\bar{C}D$

**Result**: F = $\bar{B}\bar{D} + \bar{B}\bar{C} + \bar{A}\bar{C}D$

---

## Tips for 4-Variable K-Maps

1. **Look for rows/columns of 4 first**
2. **Check all four corners** (they're often a group!)
3. **Remember BOTH wrap-arounds** (left-right AND top-bottom)
4. **2×2 squares are common** — look in the middle
5. **Overlap is your friend** — maximize group sizes

---

## Summary

The 4-variable K-map is your primary tool for manual Boolean minimization. With practice, you'll spot optimal groupings instantly!
