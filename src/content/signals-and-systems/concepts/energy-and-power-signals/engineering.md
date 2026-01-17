# Engineering Applications

> From circuit analysis to communication systems.

---

## Origin: Electrical Circuits

The energy/power classification comes from circuit theory:

For current $i(t)$ through resistance $R$:
- **Power**: $p(t) = i^2(t) R$ (instantaneous)
- **Energy**: $E = \int p(t) \, dt = \int i^2(t) R \, dt$

We normalize to $R = 1\Omega$ for signal analysis, giving:
$$P(t) = |x(t)|^2$$

[[visual:v3]]

---

## Communication Systems

### Data Bursts (Energy Signals)
- Finite duration pulses
- Total energy determines transmission power
- Example: Radar pulse

### Carrier Waves (Power Signals)
- Continuous sinusoids
- Average power determines transmitter rating
- Example: Radio broadcast

---

## Real-World Implications

| Application | Signal Type | Why |
|-------------|-------------|-----|
| **Battery-powered sensor** | Energy | Fixed energy budget |
| **Power plant output** | Power | Continuous generation |
| **Data packet** | Energy | Finite duration |
| **Test tone** | Power | Continuous for testing |

---

## Power Calculation Examples

### Sinusoid: $x(t) = A\cos(\omega_0 t)$

Average power:
$$P = \frac{1}{T_0}\int_0^{T_0} A^2\cos^2(\omega_0 t) \, dt = \frac{A^2}{2}$$

The power of a sinusoid is **half the amplitude squared**.

### DC Signal: $x(t) = A$

$$P = A^2$$

The power equals amplitude squared.

---

## Energy Spectral Density (Preview)

For energy signals, we can describe how energy is distributed across frequencies:

$$E = \int_{-\infty}^{\infty} |X(f)|^2 \, df$$

Where $X(f)$ is the Fourier transform. This leads to **Parseval's theorem**.

---

## Power Spectral Density (Preview)

For power signals, we describe power distribution:

$$P = \int_{-\infty}^{\infty} S_x(f) \, df$$

Where $S_x(f)$ is the power spectral density. Essential for noise analysis.

---

## Practical Notes

### Most Physical Signals
- Start and stop eventually → technically energy signals
- But often modeled as power signals for analysis simplicity

### Design Considerations
- **Amplifier power rating**: Based on average power handling
- **Antenna gain**: Related to radiated power
- **Battery life**: Total energy budget
