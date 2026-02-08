# Exam Focus: Stability Analysis

## Key Rule
**Causal LTI system is BIBO stable ⟺ All poles in LHP (Re(s) < 0)**

## Quick Stability Check
1. Find poles (roots of denominator)
2. All Re(s) < 0? → STABLE
3. Any Re(s) > 0? → UNSTABLE
4. Simple poles at Re(s) = 0? → Marginally stable
5. Repeated poles at Re(s) = 0? → UNSTABLE

## Common Examples
- 1/(s+a), a>0 → Stable (pole at -a)
- 1/(s-a), a>0 → Unstable (pole at +a)
- 1/(s²+ω²) → Marginally stable (poles at ±jω)
