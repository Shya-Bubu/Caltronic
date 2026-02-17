## Voltage-Controlled vs Current-Controlled Nonlinear Resistors

> **Why This Matters**: Not all nonlinear devices can be analysed the same way. The tunnel diode’s N-shaped curve breaks the assumption that voltage uniquely determines current — a fact that has consequences for circuit analysis, oscillator design, and high-speed switching. Understanding controllability classification is what separates someone who can analyse textbook circuits from someone who can tackle real devices.

In the previous lessons we established that a nonlinear resistor is any memoryless two-terminal device whose $v$-$i$ relationship is not a straight line through the origin. We wrote that relationship abstractly as $f(v,i) = 0$, a curve in the $v$-$i$ plane. Now we need to make a sharper distinction: depending on the shape of that curve, the device may be classified as **voltage-controlled**, **current-controlled**, both, or neither. This classification matters because it determines which circuit analysis techniques you can apply and which connection rules (series or parallel) yield clean results.

Think of it like a road on a map. A "voltage-controlled" device is like a road where every address (voltage) has exactly one postbox (current). A "current-controlled" device is a road where every postbox has exactly one address. For most simple roads, both are true. But some twisty roads (like the tunnel diode’s N-shaped curve) break one of these rules.

A nonlinear resistor is called **voltage-controlled** if its characteristic can be written in the form $i = \hat{i}(v)$, where $\hat{i}$ is a single-valued function. In geometric terms, every vertical line (constant $v$) intersects the curve at most once. Given a voltage, you get exactly one current. The ordinary PN-junction diode satisfies this: $i = I_s(e^{v/V_T} - 1)$ assigns a unique $i$ to each $v$.

A nonlinear resistor is called **current-controlled** if its characteristic can be written in the form $v = \hat{v}(i)$, where $\hat{v}$ is a single-valued function. Every horizontal line (constant $i$) intersects the curve at most once. Given a current, you get exactly one voltage.

Many devices are both voltage-controlled and current-controlled. A linear resistor $v = Ri$ is trivially both. The PN-junction diode is also both, because the exponential is strictly monotonic and can be inverted. But not all devices are so cooperative.

[[visual:vc-cc-line-tests]]

## The Tunnel Diode: A Current-Controlled Device

The tunnel diode (also called the Esaki diode) has a characteristic curve shaped like the letter "N" when plotted in the $v$-$i$ plane with $v$ on the horizontal axis.

[[visual:tunnel-diode-vi]]

The curve rises from the origin, reaches a local maximum called the **peak point** $(V_p, I_p)$, then decreases through a region of **negative differential resistance**, reaches a local minimum called the **valley point** $(V_v, I_v)$, and finally rises again for larger voltages.

The critical observation is this: in the region between $V_p$ and $V_v$, a single value of voltage corresponds to **three** different values of current. Draw any vertical line in that voltage range and it crosses the N-shaped curve at three points. Therefore $\hat{i}(v)$ is **not** single-valued, and the tunnel diode is **not** voltage-controlled.

However, every horizontal line (constant $i$) crosses the curve at most once. No matter what current you specify, there is at most one corresponding voltage. So $\hat{v}(i)$ is single-valued, and the tunnel diode **is** current-controlled.

This is not just a mathematical curiosity. It has direct practical consequences:

- You **cannot** directly apply nodal analysis (which assumes voltage-controlled elements) to a circuit containing a tunnel diode in its multi-valued region.
- You **can** use the current-controlled representation $v = \hat{v}(i)$ and apply techniques suited to current-controlled elements.
- The negative resistance region is exploited in oscillators and high-speed switching circuits.

<details>
<summary><strong>Pause & Think</strong>: If you drew a vertical line at a voltage in the NDR region of the tunnel diode, how many intersection points would there be? What does this tell you about the device?</summary>

A vertical line in the NDR region intersects the N-shaped curve at **three** points. This means one voltage maps to three different currents, so the function $i = \hat{i}(v)$ is multi-valued. The tunnel diode is therefore **not** voltage-controlled in that region. However, every horizontal line still intersects at most once, confirming it is current-controlled.

</details>

## The Glow Tube: A Voltage-Controlled Device

The glow tube (a gas-discharge device) presents the dual situation. Its $v$-$i$ characteristic is S-shaped (sometimes called a "fold-back" curve). Starting from zero current, the voltage rises to a breakdown voltage, then the curve folds back: as current increases, the voltage actually decreases for a while before increasing again.

In this case, a single value of current can correspond to **multiple** voltages. A horizontal line in the folded region intersects the S-shaped curve at more than one point. So $\hat{v}(i)$ is **not** single-valued and the glow tube is **not** current-controlled.

But every vertical line crosses the S-curve at most once: given a voltage, there is a unique current. So the glow tube **is** voltage-controlled, with $i = \hat{i}(v)$ being single-valued.

[[visual:glow-tube-vi]]

The glow tube and the tunnel diode are duals of each other in terms of their controllability classification:

| Property | Tunnel Diode | Glow Tube |
|---|---|---|
| Curve shape | N-type (in $v$-$i$ plane) | S-type (in $v$-$i$ plane) |
| $\hat{i}(v)$ single-valued? | No (multi-valued in NDR region) | Yes |
| $\hat{v}(i)$ single-valued? | Yes | No (multi-valued in fold-back region) |
| Classification | Current-controlled | Voltage-controlled |
| Negative resistance | Voltage-controlled NDR | Current-controlled NDR |

## Comparison: Voltage-Controlled vs Current-Controlled

The following table summarises the essential distinction:

| Feature | Voltage-Controlled | Current-Controlled |
|---|---|---|
| Defining equation | $i = \hat{i}(v)$ | $v = \hat{v}(i)$ |
| Single-valuedness | Vertical line test: each $v$ gives one $i$ | Horizontal line test: each $i$ gives one $v$ |
| Key example | PN diode, glow tube | Tunnel diode |
| Suitable for nodal analysis? | Yes | Not directly |
| Series connection rule | Requires parametric form | Clean: voltages add at equal current |
| Parallel connection rule | Clean: currents add at equal voltage | Requires parametric form |

A device that satisfies both conditions (like a monotonic resistor or a standard PN diode) can be analysed using either framework. A device that satisfies neither -- for instance, a curve that is multi-valued in both directions -- would require a fully implicit treatment via $f(v,i) = 0$.

[[visual:vc-cc-summary-table]]

## Bilateral Resistors and Symmetry

A nonlinear resistor is called **bilateral** (or **symmetric**) if its characteristic satisfies:

$$f(v,i) = f(-v,-i)$$

Geometrically, this means the $v$-$i$ curve is symmetric about the origin. If the point $(v_0, i_0)$ lies on the curve, then so does $(-v_0, -i_0)$. You can rotate the curve by 180 degrees about the origin and it looks the same.

All linear resistors ($v = Ri$) are bilateral. Many nonlinear resistors are also bilateral -- for instance, a thermistor whose resistance depends on $|v|$ or $|i|$ symmetrically. However, the PN-junction diode is **not** bilateral: its forward and reverse behaviours are fundamentally different. The exponential curve is not symmetric about the origin.

Bilateral resistors have useful properties:

- Their odd-order harmonics are present in the output; even-order harmonics depend on the specific nonlinearity.
- They can be modelled using only odd powers of $v$ or $i$ in a Taylor expansion.
- They behave identically regardless of which terminal is labelled positive.

[[visual:bilateral-symmetry]]

## Harmonic Generation by Nonlinear Resistors

One of the most important consequences of nonlinearity is **harmonic generation**. If you apply a sinusoidal voltage $v(t) = V_0 \sin(\omega t)$ to a nonlinear resistor, the resulting current $i(t) = \hat{i}(v(t))$ is generally **not** sinusoidal. It contains the fundamental frequency $\omega$ plus integer multiples: $2\omega$, $3\omega$, $4\omega$, and so on. These are called **harmonics**.

To see why, consider a simple quadratic nonlinearity $i = av + bv^2$. Substituting $v = V_0\sin(\omega t)$:

$$i = aV_0\sin(\omega t) + bV_0^2\sin^2(\omega t)$$

Using the identity $\sin^2(\omega t) = \frac{1}{2}(1 - \cos(2\omega t))$:

$$i = aV_0\sin(\omega t) + \frac{bV_0^2}{2} - \frac{bV_0^2}{2}\cos(2\omega t)$$

The output contains:
- A DC component $\frac{bV_0^2}{2}$
- The fundamental $\omega$
- The second harmonic $2\omega$

Higher-order nonlinearities (cubic, quartic, etc.) produce correspondingly higher harmonics. This phenomenon is the basis for frequency multipliers, mixers, and explains distortion in amplifier circuits. For bilateral resistors (only odd-powered terms), only odd harmonics appear, which is why symmetric clipping produces only odd harmonics in audio amplifiers.

[[visual:harmonic-generation]]

[[visual:falstad-tunnel-diode]]

[[visual:ndr-region-highlighted]]


<details>
<summary><strong>Pause & Think</strong>: If you apply a 1 kHz sine wave to a diode (which has an exponential, not polynomial, nonlinearity), would you expect even harmonics, odd harmonics, or both?</summary>

The PN-junction diode is **not bilateral** (its curve is not symmetric about the origin), so both even and odd harmonics will be present. The exponential function, when expanded as a Taylor series, contains all powers of $v$: $e^{v/V_T} \approx 1 + v/V_T + v^2/(2V_T^2) + ...$. The quadratic term produces the 2nd harmonic, the cubic term produces the 3rd harmonic, and so on.

</details>

## Practical Applications of Negative Resistance

The tunnel diode's negative resistance region is not just a theoretical curiosity — it has been exploited in several practical applications:

- **Oscillators**: When biased in the NDR region, the tunnel diode can convert DC energy into AC oscillations. These oscillators can operate at extremely high frequencies (up to hundreds of GHz), making them useful in microwave circuits.
- **High-speed switches**: The tunnel diode can switch between its two stable states (either side of the NDR valley) in picoseconds, far faster than conventional transistors.
- **Amplifiers**: In the NDR region, the tunnel diode can provide power gain, which is exploited in low-noise amplifiers for satellite communications.
- **Memory elements**: The bistability of the tunnel diode (two stable operating points for the same bias voltage) can be used to store binary information.

## Summary

The classification of a nonlinear resistor as voltage-controlled, current-controlled, or both, depends entirely on the geometry of its $v$-$i$ curve. The tunnel diode, with its N-shaped curve, is current-controlled but not voltage-controlled. The glow tube, with its S-shaped curve, is voltage-controlled but not current-controlled. This distinction governs which analysis methods and connection rules apply. Bilateral resistors possess origin symmetry and produce only odd harmonics under sinusoidal excitation, while general nonlinear resistors produce both even and odd harmonics.
