# Engineering Applications

> Where CT and DT signals live in real systems.

---

## Analog vs Digital Systems

| Aspect | Analog (CT) | Digital (DT) |
|--------|-------------|--------------|
| **Signal type** | Continuous-time | Discrete-time |
| **Components** | Resistors, capacitors, op-amps | Processors, memory, ADC/DAC |
| **Processing** | Continuous in time | Sample-by-sample |
| **Noise** | Accumulates | Can be corrected |
| **Flexibility** | Fixed by hardware | Programmable |

---

## The ADC and DAC

Two critical components bridge the CT and DT worlds:

### ADC (Analog-to-Digital Converter)
```
Continuous Signal → [ADC] → Discrete Signal
    x(t)                        x[n]
```

The ADC performs:
1. **Sampling** — Take values at regular intervals
2. **Quantization** — Round to discrete amplitude levels

### DAC (Digital-to-Analog Converter)
```
Discrete Signal → [DAC] → Continuous Signal
     x[n]                      x(t)
```

The DAC reconstructs a smooth signal from samples.

---

## Real-World Sampling Rates

| Application | Sampling Rate | Why |
|-------------|---------------|-----|
| **CD Audio** | 44.1 kHz | Human hearing up to ~20 kHz |
| **Phone calls** | 8 kHz | Voice is ~4 kHz bandwidth |
| **DVD Video** | 48 kHz | Slightly higher quality |
| **Medical ECG** | 250-500 Hz | Heart signals are slow |
| **Radar** | MHz range | High-frequency reflections |

---

## Aliasing: The Danger of Undersampling

If you sample too slowly, high frequencies "fold back" and appear as lower frequencies.

**Example**: A 15 kHz tone sampled at 10 kHz looks like a 5 kHz tone.

This is called **aliasing**, and it's irreversible once it happens.

### Prevention
- Use an **anti-aliasing filter** before sampling
- Sample at **at least 2× the highest frequency** (Nyquist criterion)

---

## Practical Considerations

### Memory and Storage
- Discrete signals use finite memory
- Higher sampling rate = more data
- Trade-off: quality vs storage/bandwidth

### Processing Power
- Digital filters process sample-by-sample
- Real-time: must process one sample before next arrives
- Faster sampling = more computation per second

### Quantization Error
- Continuous amplitudes → discrete levels
- More bits = finer resolution = less error
- CD audio: 16 bits = 65,536 levels

---

## System Design Implications

When designing a digital signal processing system:

1. **Determine bandwidth** — What's the highest frequency you need?
2. **Choose sampling rate** — At least 2× bandwidth (often higher)
3. **Select bit depth** — Balance precision vs data rate
4. **Add anti-aliasing filter** — Prevent frequency folding
5. **Design for real-time** — Can you process fast enough?
