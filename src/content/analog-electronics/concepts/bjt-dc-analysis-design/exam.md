# Exam Guide: DC Analysis and Circuit Design

## Typical Questions
| Pattern | Marks | Time |
|---------|-------|------|
| **Find Q-point (ICQ, VCEQ) from given circuit** | 6-8 | 6 min |
| **Design R values for given specs** | 6-10 | 8 min |
| **Draw DC equivalent circuit** | 3-4 | 3 min |
| **Round to standard 5% resistors** | 2-3 | 2 min |

## Common Mistakes
- **Forgetting to remove capacitors for DC**: All caps are open at DC. If you leave them in, you'll include the source/load incorrectly.
- **Using IC instead of IE in the emitter loop**: KVL has IE·RE, not IC·RE. They're close (IE ≈ IC for large β) but use the exact value in exams.
- **Rounding before the final step**: Keep full precision throughout calculations. Only round to standard values at the very end.
