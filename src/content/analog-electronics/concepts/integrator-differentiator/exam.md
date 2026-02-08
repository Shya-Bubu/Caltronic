# Exam Strategy

## Essential Formulas

### Integrator
| Formula | Expression |
|---------|------------|
| Time domain | Vo = −(1/RC)∫Vin dt |
| Transfer function | H(s) = −1/(sRC) |
| Magnitude | \|H(jω)\| = 1/(ωRC) |
| Phase | −90° |
| Condition | RC >> T (period) |

### Differentiator
| Formula | Expression |
|---------|------------|
| Time domain | Vo = −RC(dVin/dt) |
| Transfer function | H(s) = −sRC |
| Magnitude | \|H(jω)\| = ωRC |
| Phase | −90° |
| Condition | RC << T (period) |

## Wave Transformations to Know

### Integrator (square → triangle)
- Input: Square wave (alternating +V and -V)
- Each half-cycle: ∫(constant) dt = ramp
- Alternating ramps = triangle wave

### Differentiator (triangle → square)
- Input: Triangle wave (alternating slopes)
- Each half-cycle: d(ramp)/dt = constant
- Alternating constants = square wave

## Common Exam Questions

### Type 1: Identify output waveform
"A 1kHz triangular wave is input to a differentiator. What is the output?"
- **Square wave** at 1kHz (derivative of ramp = constant)

### Type 2: Calculate output amplitude
"Integrator: Rs = 10kΩ, C = 1µF, Vin = 1V square at 1kHz. Find Vo(pp)."
- τ = RC = 10ms
- Period T = 1ms, half-period = 0.5ms
- Vo change = (Vin/RC) × t = (1/0.01) × 0.0005 = 0.05V per half-period
- Vo(pp) ≈ 0.1V (triangle peak-to-peak)

### Type 3: Why modify the circuit?
"Why add a resistor in parallel with the feedback capacitor in an integrator?"
- To prevent DC saturation / limit low-frequency gain
- Creates a defined DC operating point
- Converts ideal integrator to active LPF

## Common Mistakes

❌ Confusing which component goes where (C: feedback for integrator, input for differentiator)
❌ Forgetting the negative sign in output equations
❌ Not understanding why modifications are needed (stability!)
❌ Confusing phase lead vs lag

## Homework: Analog Computer

Key insight for solving differential equations:
1. Integrators provide ∫ operation
2. Summers (inverting) provide + and − operations
3. Inverting amps provide sign change and scaling
4. Combine to implement: dy/dt + ay = x(t)
