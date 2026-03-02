# Exam Guide: Circuit Minimization and Hamming Distance

## Typical Questions
| Pattern | Marks | Time |
|---------|-------|------|
| **Calculate Hamming distance** | 2-3 | 2 min |
| **Minimize SOP using Boolean algebra** | 6-8 | 8 min |
| **Convert canonical ↔ non-canonical** | 4-5 | 4 min |
| **Compare gate counts** | 3-4 | 3 min |

## Common Mistakes
- **Merging with HD ≠ 1**: You can ONLY directly merge terms with HD = 1. HD = 2 requires intermediate steps or K-map grouping.
- **Forgetting to reuse terms**: The idempotent law (A+A=A) lets you pair one minterm with multiple neighbors. Forgetting this misses simplification opportunities.
- **Canonical confusion**: In a minterm, the variable is complemented when its value is 0, NOT when it's 1. Double-check complementation.
