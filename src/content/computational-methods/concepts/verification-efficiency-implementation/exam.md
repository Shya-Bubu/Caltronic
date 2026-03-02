# Exam Guide: Verification, Efficiency, and Implementation

## Typical Question Patterns

| Pattern | Marks | Time |
|---------|-------|------|
| **ADC SNR calculation** — "How many bits for 80 dB SNR?" | 3-4 | 3 min |
| **Stability analysis** — "Find the maximum step size for stable Euler integration." | 5-6 | 6 min |
| **Complexity comparison** — "Compare O(n²) and O(n³) for n = 500." | 4 | 4 min |
| **V&V distinction** — "Distinguish verification and validation with examples." | 5 | 5 min |
| **Multi-physics** — "Explain electro-thermal coupling in power devices." | 6-8 | 7 min |

## Mark Allocation Tips

- **ADC problems**: Show the formula, substitute N, compute. If asked for minimum bits: solve N ≥ (SNR - 1.76)/6.02 and round up.
- **Stability**: Write the amplification factor, apply the stability condition |factor| ≤ 1, solve for h. Show all algebra.
- **Complexity**: Compute actual operation counts for the given n. A table comparing algorithms earns full marks.

## Common Mistakes

- **Stability ≠ convergence**: An unstable method can still converge if you're lucky with the initial conditions. But stability guarantees that small errors don't explode. Always check both.
- **O(n log n) always faster than O(n²)**: Not for small n! Big-O hides constant factors. For n < 50, the "slower" algorithm might be faster in practice.
- **Verification = testing**: Verification is broader than testing. It includes mathematical analysis (do conservation laws hold?), convergence studies, and comparison with known analytical solutions.
