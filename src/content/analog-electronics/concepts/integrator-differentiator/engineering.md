# Engineering Application

## Activity 5: Integrator (Modified - Active LPF)

[[visual:diag-engineering-01]]

### Components
- Rs = 39 kΩ (input resistor)
- R = 22 kΩ (parallel with C for DC stability)
- C = 1 µF (feedback capacitor)
- Power: ±15V

### Time Constant
$$\tau = RC = 22k\Omega \times 1\mu F = 22 \text{ ms}$$

### Step 1: Build the Modified Integrator

Connect R (22kΩ) in parallel with C (1µF) in the feedback path.

### Step 2: Sinusoidal Input Test
- Input: **200 Hz, 1Vpp sinusoidal**
- Expected output: Sinusoidal, phase-shifted by 90° (lagging)
- Sketch both waveforms on the same time scale

### Step 3: Square Wave Input Test
- Input: **1 kHz, 1Vpp square wave**
- Expected output: **Triangle wave**
- Why? Integration of constant = ramp. Alternating constants → triangle!

### Step 4: Frequency Response (Square Wave)

| Frequency | Vi (Vpp) | Vo (Vpp) | Gain |
|-----------|----------|----------|------|
| 100 Hz    |          |          |      |
| 200 Hz    |          |          |      |
| 300 Hz    |          |          |      |
| 400 Hz    |          |          |      |
| 500 Hz    |          |          |      |
| 1 kHz     |          |          |      |
| 2 kHz     |          |          |      |

### Step 5: Observation
**Gain decreases with frequency** because:
- Higher frequency → less time to integrate → smaller output
- This is characteristic of a **low-pass filter**

---

## Activity 6: Differentiator (Modified - Active HPF)

### Components
- R = 10 kΩ (feedback resistor)
- C = 0.047 µF (input capacitor)
- R1 = 470 Ω (series with C for stability)
- Power: ±15V

### Time Constant
$$\tau = RC = 10k\Omega \times 0.047\mu F = 0.47 \text{ ms}$$

### Step 1: Build the Modified Differentiator

Add R1 (470Ω) in series with C (0.047µF) at the input.

### Step 2: Triangular Input Test
- Input: **200 Hz, 1Vpp triangular wave**
- Expected output: **Square wave**
- Why? Derivative of ramp = constant. Alternating ramps → square!

### Step 3: Frequency Response (Sinusoidal)

| Frequency | Vi (Vpp) | Vo (Vpp) | Gain |
|-----------|----------|----------|------|
| 100 Hz    |          |          |      |
| 200 Hz    |          |          |      |
| 300 Hz    |          |          |      |
| 400 Hz    |          |          |      |
| 500 Hz    |          |          |      |
| 1 kHz     |          |          |      |
| 2 kHz     |          |          |      |

### Step 4: Observation
**Gain increases with frequency** because:
- Higher frequency → faster rate of change → larger derivative
- This is characteristic of a **high-pass filter**

---

*For mathematical analysis, continue to the Mathematics layer.*
