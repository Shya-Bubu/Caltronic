# Exam Patterns — Amplifier Bandwidth

## Common Question Types

### Type 1: Calculate Lower Cutoff (3-5 marks)
"Given C_c = 10 μF and R_in = 5 kΩ, find the lower cutoff frequency."
**Answer:** f_L = 1/(2π × 5×10³ × 10×10⁻⁶) = 3.18 Hz.

### Type 2: Identify the Bottleneck (3 marks)
"Three capacitors give cutoffs at 15 Hz, 40 Hz, and 8 Hz. What is the amplifier's lower cutoff?"
**Answer:** 40 Hz — the highest of the three sets the actual cutoff.

### Type 3: Design the Capacitor (3-5 marks)
"Choose a coupling capacitor so the lower cutoff is below 20 Hz when R_in = 10 kΩ."
**Answer:** C > 1/(2π × 20 × 10⁴) = 0.796 μF. Use C = 1 μF or larger.

## Common Mistakes
1. **Using the lowest cutoff instead of the highest** as the amplifier's f_L.
2. **Forgetting the bypass capacitor** contributes its own cutoff.
3. **Confusing -3 dB with half-voltage.** -3 dB is half power = 1/√2 voltage ≈ 0.707V.

## Time Management
- Single cutoff calculation: 2 minutes
- Complete bandwidth analysis with multiple caps: 5-8 minutes
