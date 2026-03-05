# Exam Guide: Single-Stage Amplifier Analysis

## Typical Questions
| Pattern | Marks | Time |
|---------|-------|------|
| **Calculate Av for CE with given parameters** | 4-6 | 4 min |
| **Find Rin looking into the base** | 3-4 | 3 min |
| **Find Rout** | 2-3 | 2 min |
| **Calculate overall gain with source and load** | 5-8 | 5 min |

## Common Mistakes
- **Using hfe instead of (1+hfe) for Rin**: Rin = hie + (1+hfe)RE, not hie + hfe·RE. The +1 matters for precision.
- **Forgetting R1||R2 in Rin**: The biasing resistors are in parallel with Rin,base. The overall Rin is smaller than Rin,base alone.
- **Missing the parallel**: RL appears in PARALLEL with RC (or Rout), not in series. RC||RL < RC always.
- **Sign confusion in CC**: hfc is negative, but the CC gain is positive (≈ +1). Don't confuse the current gain sign with the voltage gain sign.
