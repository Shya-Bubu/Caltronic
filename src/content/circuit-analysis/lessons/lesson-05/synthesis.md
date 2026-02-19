# Summary: AC Phasors & Impedance

You have now completed the lesson on AC sinusoidal steady-state analysis using phasors. Let's consolidate the key ideas.

## The Big Picture

The single most important takeaway from this lesson is this: **phasors transform differential equations into algebra.** By representing sinusoids as complex numbers, you can analyse AC circuits using the same techniques you already know from DC analysis — KVL, KCL, voltage dividers, series and parallel combinations — except with complex-valued impedances instead of real-valued resistances.

This transformation is possible because of two key properties: the **additive property** (adding phasors is equivalent to adding sinusoids of the same frequency) and the **derivative property** (multiplying a phasor by $j\omega$ is equivalent to differentiating the corresponding sinusoid).

## Key Relationships

| Element | Time Domain | Phasor Domain | Impedance $Z$ |
|---------|------------|---------------|---------------|
| Resistor | $v = Ri$ | $\mathbf{V} = R\mathbf{I}$ | $R$ |
| Inductor | $v = L\frac{di}{dt}$ | $\mathbf{V} = j\omega L\mathbf{I}$ | $j\omega L$ |
| Capacitor | $i = C\frac{dv}{dt}$ | $\mathbf{V} = \frac{1}{j\omega C}\mathbf{I}$ | $\frac{1}{j\omega C}$ |

## Power Relationships

| Quantity | Formula | Unit |
|----------|---------|------|
| Instantaneous power | $p(t) = v(t)\cdot i(t)$ | W |
| Average (real) power | $P = \frac{1}{2}V_m I_m\cos(\theta_v - \theta_i) = V_{\text{rms}}I_{\text{rms}}\cos(\theta_v - \theta_i)$ | W |
| Reactive power | $Q = V_{\text{rms}}I_{\text{rms}}\sin(\theta_v - \theta_i)$ | VAR |
| Complex power | $\mathbf{S} = P + jQ = \mathbf{V}_{\text{rms}}\mathbf{I}_{\text{rms}}^*$ | VA |
| Power factor | $\text{pf} = \cos(\theta_v - \theta_i)$ | — |

## Analysis Techniques Learned

1. **Sinusoid ↔ phasor transformation** — extract amplitude and phase to form the phasor $V_m\angle\phi$
2. **Impedance-based analysis** — replace R, L, C with their impedances $Z_R = R$, $Z_L = j\omega L$, $Z_C = 1/(j\omega C)$ and apply KVL/KCL directly
3. **Series and parallel impedance combinations** — identical rules to DC resistors, but with complex arithmetic
4. **Y-Δ transformation** — convert between wye and delta configurations using the same formulas as DC, but with impedances
5. **Power analysis** — compute average power, reactive power, and complex power from phasor quantities

## What's Next

In the following lessons, you will apply these phasor techniques to more advanced circuit analysis methods — including AC nodal analysis, AC mesh analysis, Thevenin/Norton equivalents in the phasor domain, and frequency response analysis. The impedance concept you learned here is the foundation for all of these.
