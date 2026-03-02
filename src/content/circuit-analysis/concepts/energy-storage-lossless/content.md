# Energy Storage and the Lossless Property

> **Why This Matters**: Resistors dissipate energy as heat — once the energy is gone, it's gone forever. Capacitors and inductors are fundamentally different: they **store** energy and can give it all back. This lossless property has profound consequences for circuit behavior, from ensuring zero net energy flow under periodic excitation to enabling the design of resonant circuits, filters, and energy-harvesting systems.

## Energy Entering a Capacitor

The lecture derives the energy entering a charge-controlled capacitor during any time interval $[t_1, t_2]$. Starting from the power expression:

$$w_C(t_1, t_2) = \int_{t_1}^{t_2} v \cdot i\,dt$$

Since $i = dq/dt$, we can change the variable of integration from $t$ to $q$:

$$\boxed{w_C(t_1, t_2) = \int_{q_1}^{q_2} \hat{v}(q)\,dq}$$

[[visual:energy-integral-capacitor]]

This result is remarkable: the energy entering the capacitor depends **only on the initial and final charges** $q_1 = q(t_1)$ and $q_2 = q(t_2)$ — not on the path taken, not on the waveforms $v(t)$ or $i(t)$, not on how fast or slow the charging happened. The energy is **path-independent**.

> **Key Insight**: Path independence is the mathematical statement of the lossless property. If energy depended on the path, some energy would be lost during certain paths — which is exactly what happens in resistors (where energy loss depends on the current waveform).

### For a Linear Capacitor

When $\hat{v}(q) = q/C$ (linear capacitor), the integral evaluates to:

$$w_C(t_1, t_2) = \int_{q_1}^{q_2} \frac{q}{C}\,dq = \frac{1}{2C}(q_2^2 - q_1^2) = \frac{1}{2}C(v_2^2 - v_1^2)$$

[[visual:energy-stored-linear]]

The energy stored in a capacitor at voltage $V$ (starting from $q = 0$, $v = 0$) is:

$$\boxed{E_C = \frac{1}{2}CV^2 = \frac{1}{2}\frac{Q^2}{C} = \frac{1}{2}QV}$$

All three forms are equivalent — pick whichever is most convenient.

<details>
<summary><strong>Pause & Think</strong>: A 100μF capacitor charged to 400V (as in a camera flash). How much energy is stored?</summary>

$$E = \frac{1}{2} \times 100 \times 10^{-6} \times 400^2 = \frac{1}{2} \times 10^{-4} \times 160{,}000 = 8 \text{ J}$$

That's enough energy to produce a bright flash for about 1 millisecond. The capacitor stores the energy slowly (over ~1 second of charging) and releases it very quickly (in ~1 ms) — the peak power delivered is $8/0.001 = 8000$ W but only for an instant.

</details>

## Energy Entering an Inductor (By Duality)

By the same argument with flux-controlled inductors:

$$\boxed{w_L(t_1, t_2) = \int_{\Phi_1}^{\Phi_2} \hat{i}(\Phi)\,d\Phi}$$

[[visual:energy-integral-inductor]]

For a linear inductor ($\hat{i}(\Phi) = \Phi/L$):

$$w_L(t_1, t_2) = \frac{1}{2L}(\Phi_2^2 - \Phi_1^2) = \frac{1}{2}L(i_2^2 - i_1^2)$$

$$\boxed{E_L = \frac{1}{2}Li^2}$$

## The Lossless Property

> **Theorem**: In a periodic regime where $v(t) = v(t + T)$ and $i(t) = i(t + T)$, the total energy entering a charge-controlled capacitor (or flux-controlled inductor) over any period is **zero**.

[[visual:lossless-property-demo]]

**Proof**: Under periodic excitation, $q(t) = q(t + T)$, so $q_1 = q_2$ and:

$$w_C(t_1, t_1 + T) = \int_{q_1}^{q_1} \hat{v}(q)\,dq = 0$$

This means capacitors and inductors **borrow and return** energy every cycle — they never consume it. Over one complete period:

- Half the cycle: energy flows INTO the element (charging)
- Other half: energy flows OUT (discharging)
- Net energy transfer: exactly zero

[[visual:energy-flow-periodic]]

This is fundamentally different from resistors, where $w_R = \int I^2 R\,dt > 0$ always.

> **Practical Consequence**: In steady-state AC circuits, the average power consumed by ideal capacitors and inductors is zero. Only resistors dissipate real power. This is why your power bill charges you for **watts** (real power) not volt-amperes (apparent power) — the reactive power flowing to and from capacitors/inductors in the power grid cancels over each cycle.

<details>
<summary><strong>Pause & Think</strong>: If a capacitor stores energy but doesn't dissipate it, why do real capacitors warm up slightly?</summary>

Real capacitors have **equivalent series resistance (ESR)** — a small parasitic resistance due to lead wires, plate resistance, and dielectric losses. This ESR dissipates $I^2 \times ESR$ power as heat. In an ideal capacitor (ESR = 0), no heating occurs. In electrolytic capacitors, ESR can be significant (~0.1-1 Ω) and causes noticeable heating at high ripple currents.

</details>

## Nonlinear Case: Relaxation Points

For nonlinear capacitors, the q-v characteristic doesn't pass through the origin and can have multiple zero crossings. The energy stored depends on the choice of **reference point** $q^*$ (the relaxation point):

$$E_C(Q) = \int_{q^*}^{Q} \hat{v}(q)\,dq \geq 0 \text{ for all } Q$$

[[visual:relaxation-points]]

A **relaxation point** $q^*$ is any charge where the stored energy is zero — i.e., the capacitor is "fully relaxed." For a linear capacitor, there's only one: $q^* = 0$ (equivalently $v = 0$). But nonlinear capacitors (with multiple $q$-$v$ zero crossings) can have multiple relaxation points.

The condition $\int_{q^*}^{q} \hat{v}(q)\,dq \geq 0$ for all $q$ ensures that energy is always non-negative — you can't extract more energy than was stored. This is a fundamental physical constraint.

[[visual:nonlinear-energy-landscape]]

<details>
<summary><strong>Pause & Think</strong>: A nonlinear capacitor has q-v characteristic q = v³. Is v = 0 a relaxation point? Is v = 1 a relaxation point?</summary>

At $v = 0$: $q^* = 0$, and $E(Q) = \int_0^Q \hat{v}(q)dq = \int_0^Q q^{1/3}dq = \frac{3}{4}Q^{4/3} \geq 0$ for all $Q$. ✓ Yes, $q^* = 0$ is a relaxation point.

At $v = 1$: $q^* = 1$, and $E(Q) = \int_1^Q q^{1/3}dq = \frac{3}{4}(Q^{4/3} - 1)$. This is negative for $Q < 1$. ✗ No, $q^* = 1$ is NOT a relaxation point because energy would be negative for some charge values.

</details>

## Power Flow Analysis

The instantaneous power entering a capacitor:

$$p_C(t) = v_C(t) \cdot i_C(t) = v_C \cdot C\frac{dv_C}{dt} = \frac{d}{dt}\left[\frac{1}{2}Cv_C^2\right]$$

[[visual:falstad-energy-flow]]

This shows that the power is the time derivative of stored energy. When $p > 0$, the capacitor is *absorbing* power (charging). When $p < 0$, it's *delivering* power (discharging).

For periodic excitation at frequency $f$: the voltage and current are 90° out of phase, so the power oscillates between positive and negative with average value of zero — confirming the lossless property.

## Summary

Here are the essential takeaways:

- **Energy stored**: $E_C = \frac{1}{2}Cv^2$ (capacitor), $E_L = \frac{1}{2}Li^2$ (inductor) — always non-negative
- **Path independence**: Energy depends only on initial and final states, not on the waveform shape
- **Lossless property**: Over one period of periodic excitation, net energy entering is zero — energy is borrowed and returned
- **Practical consequence**: Ideal C and L consume zero average power; only real power (dissipated in R) costs money
- **Nonlinear extension**: Relaxation points $q^*$ define zero-energy references for nonlinear capacitors

> **This concept completes the energy picture** — resistors dissipate, capacitors and inductors store. In any circuit, the power balance always holds: sources deliver, resistors dissipate, and C/L temporarily store and return energy.
