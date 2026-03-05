# Exam Guide: DC Biasing Configurations

## Typical Questions
| Pattern | Marks | Time |
|---------|-------|------|
| **Calculate VTh and RTh** | 3-4 | 2 min |
| **Find IB from KVL base loop** | 4-5 | 3 min |
| **Compare fixed vs voltage-divider stability** | 3-4 | 3 min |
| **Explain role of RE in stabilisation** | 3-4 | 3 min |

## Common Mistakes
- **Swapping R1 and R2 in VTh formula**: R2 is the bottom resistor (to ground). VTh = R2·VCC/(R1+R2).
- **Forgetting (β+1) in the KVL**: IE = (β+1)IB, not βIB. The emitter current includes the base current.
- **Assuming IE ≈ IC for IB calculation**: Use IE = (β+1)IB in the KVL equation, then IC = βIB separately.
