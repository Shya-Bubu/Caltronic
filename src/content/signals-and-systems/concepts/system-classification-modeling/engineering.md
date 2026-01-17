# System Classification and Modeling - Engineering Applications

> **Engineering perspective**: Understanding system classification determines which mathematical tools you use and how you implement solutions.

---

## 1. Continuous-Time Systems in Practice

### RC Low-Pass Filter
The simplest continuous-time system:
- **Equation**: RC(dv_out/dt) + v_out = v_in
- **Time constant**: τ = RC
- **Response**: Exponential approach to steady state

### RLC Second-Order Systems
- Used in: Tuned circuits, oscillators, power supplies
- **Natural frequency**: ω₀ = 1/√(LC)
- **Damping ratio**: ζ = R/(2)√(C/L)

---

## 2. Discrete-Time Systems in Practice

### Digital Filters
Implemented in DSP chips and software:
- **Moving average**: y[n] = (x[n] + x[n-1] + x[n-2])/3
- **Exponential smoothing**: y[n] = αx[n] + (1-α)y[n-1]

### Financial Systems
- Bank balance: y[n] = (1+r)y[n-1] + d[n]
- Investment growth models
- Discrete because transactions happen at intervals

---

## 3. Conversion Between Domains

### Sampling (Continuous → Discrete)
- Sample rate: f_s ≥ 2f_max (Nyquist)
- Aliasing if rate too low
- ADC implementation

### Reconstruction (Discrete → Continuous)
- DAC with zero-order hold
- Interpolation filters
- Smooth output approximation

---

## 4. Implementation Considerations

### Choosing System Type
| Factor | Continuous | Discrete |
|--------|------------|----------|
| Implementation | Analog circuits | Digital processors |
| Precision | Limited by components | Arbitrary (more bits) |
| Flexibility | Hardware changes | Software changes |
| Cost | Often cheaper for simple | Cheaper for complex |

---

## Key Takeaway

Choose continuous when analog is natural (audio, RF). Choose discrete when flexibility, precision, or digital integration is needed.
