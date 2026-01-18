# Exam Preparation: Combinational Circuit Design

## Key Concepts

### Design Flow
1. Requirement → 2. Truth Table → 3. Boolean Expression → 4. Circuit

### SOP vs POS
| Aspect | SOP | POS |
|--------|-----|-----|
| Focus on | Rows where output = 1 | Rows where output = 0 |
| Terms | Minterms (AND) | Maxterms (OR) |
| Combined by | OR | AND |

---

## Common Question Types

### Type 1: Write SOP from Truth Table

Given:
| A | B | Z |
|:-:|:-:|:-:|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

**Solution**: Rows 0 and 2 have Z=1
- Row 0: $\overline{A}\overline{B}$
- Row 2: $A\overline{B}$

**Answer**: $Z = \overline{A}\overline{B} + A\overline{B} = \overline{B}$

### Type 2: Minterm Notation

Express $f = AB + \overline{A}C$ using minterm notation for 3 variables.

**Solution**: Expand to canonical form, identify row numbers.
- Minterms where f=1: m₃, m₅, m₆, m₇

**Answer**: $f = \sum m(3,5,6,7)$

### Type 3: Draw Circuit from Expression

Draw: $Z = AB + \overline{B}C$

**Solution**: 
- Two 2-input AND gates
- One 2-input OR gate
- One NOT gate for B̄

---

## Formulas to Know

| Term | Definition |
|------|------------|
| Minterm mᵢ | AND of all variables where output=1 |
| Maxterm Mᵢ | OR of all variables where output=0 |
| SOP | $\sum$ minterms |
| POS | $\prod$ maxterms |

### Minterm Construction
Binary value i → variable is:
- Normal if bit = 1
- Complemented if bit = 0

### Maxterm Construction (opposite!)
Binary value i → variable is:
- Complemented if bit = 1
- Normal if bit = 0

---

## Practice Problems

1. Write the POS expression for: $f = \sum m(0,2,5,7)$ (3 variables)

2. Convert $f = \prod M(1,3,4)$ to SOP form.

3. How many minterms exist for a 4-variable function?

4. Implement $Z = ABC + \overline{A}B\overline{C}$ using 2-level logic.

---

## Common Mistakes

1. **Minterm/maxterm variable flip**: Remember minterm uses normal for 1, maxterm uses complemented for 1
2. **Forgetting to expand**: Canonical form requires all variables in each term
3. **SOP/POS confusion**: SOP = ORing ANDs, POS = ANDing ORs
