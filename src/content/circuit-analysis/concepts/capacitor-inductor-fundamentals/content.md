# Capacitors and Inductors: Energy Storage Elements

> **Why This Matters**: Until now, every element you've studied — resistors, voltage sources, current sources — is *memoryless*. Its output depends only on what's happening right now. Capacitors and inductors are fundamentally different: they **store energy** and their behavior depends on their entire past history. This single property transforms circuits from algebraic puzzles into dynamic systems governed by differential equations.

## Two New Elements, Two New Relationships

In GP118 (your first-year physics course), you met capacitors and inductors briefly. Now let's formalize them as circuit elements with precise voltage-current relationships.

### The Capacitor: Charge Storage

A capacitor stores energy in an electric field between two conducting plates separated by a dielectric. The fundamental relationship is:

$$C = \frac{q}{v}$$

where $q$ is the stored charge and $v$ is the voltage across the plates. Differentiating with respect to time gives the **capacitor V-I relationship**:

$$\boxed{i = C\frac{dv}{dt}}$$

[[visual:capacitor-vi-relationship]]

Think about what this equation says: current flows through a capacitor **only when its voltage is changing**. A constant voltage means zero current — the capacitor acts like an open circuit at DC steady state. A rapidly changing voltage means large current.

The integral form is equally important — it tells you the voltage *given* a current history:

$$\boxed{v(t) = v(t_0) + \frac{1}{C}\int_{t_0}^{t} i(\tau)\,d\tau}$$

[[visual:capacitor-circuit-schematic]]

This integral is the key to understanding **memory**: the capacitor voltage at time $t$ depends on the current at *every instant* from $t_0$ to $t$. It remembers its entire charging history. Contrast this with a resistor, where $v = Ri$ depends only on the *current right now*.

> **Key Insight**: A capacitor at DC steady state is an **open circuit** ($i = C \cdot 0 = 0$). This is how you find steady-state values in first-order circuits: replace capacitors with open circuits and solve the resulting resistive circuit.

### The Inductor: Magnetic Energy Storage

An inductor stores energy in a magnetic field, typically in a coil of wire wound around a core. The fundamental relationship is:

$$L = \frac{\Phi}{i}$$

where $\Phi$ is the magnetic flux linkage and $i$ is the current. Differentiating gives the **inductor V-I relationship**:

$$\boxed{v = L\frac{di}{dt}}$$

[[visual:inductor-vi-relationship]]

The inductor is the **dual** of the capacitor: voltage appears only when current is *changing*. A constant current means zero voltage — the inductor acts like a short circuit (a wire) at DC steady state.

$$\boxed{i(t) = i(t_0) + \frac{1}{L}\int_{t_0}^{t} v(\tau)\,d\tau}$$

[[visual:inductor-circuit-schematic]]

> **Key Insight**: An inductor at DC steady state is a **short circuit** ($v = L \cdot 0 = 0$). This gives you the other half of the steady-state analysis: replace inductors with short circuits.

<details>
<summary><strong>Pause & Think</strong>: A 10 μF capacitor has voltage v(t) = 5sin(1000t) V across it. What is the current?</summary>

Apply $i = C\frac{dv}{dt}$:

$$i = 10 \times 10^{-6} \times \frac{d}{dt}[5\sin(1000t)] = 10^{-5} \times 5000\cos(1000t) = 50\cos(1000t) \text{ mA}$$

Notice that the current **leads** the voltage by 90° — the current peak occurs when the voltage is zero (maximum rate of change). This is a fundamental property of capacitors in AC circuits.

</details>

## The Duality Principle

Look at the two V-I relationships side by side:

| Property | Capacitor | Inductor |
|----------|-----------|----------|
| **Stored energy** | $\frac{1}{2}Cv^2$ (electrostatic) | $\frac{1}{2}Li^2$ (magnetic) |
| **V-I law** | $i = C\frac{dv}{dt}$ | $v = L\frac{di}{dt}$ |
| **Integral form** | $v = v_0 + \frac{1}{C}\int i\,dt$ | $i = i_0 + \frac{1}{L}\int v\,dt$ |
| **DC behavior** | Open circuit ($i = 0$) | Short circuit ($v = 0$) |
| **Resists changes in** | Voltage | Current |
| **State variable** | Voltage $v_C$ | Current $i_L$ |
| **q-v / Φ-i curve** | $q = \hat{q}(v)$ | $\Phi = \hat{\Phi}(i)$ |

[[visual:duality-comparison]]

Every theorem about capacitors has a dual theorem about inductors — swap $v \leftrightarrow i$, $C \leftrightarrow L$, $R \leftrightarrow G$, series $\leftrightarrow$ parallel.

## Two-Terminal Characteristics

The lecture introduces the idea of **charge-controlled** vs. **voltage-controlled** capacitors, and **flux-controlled** vs. **current-controlled** inductors:

[[visual:qv-characteristic]]

For a **linear time-invariant** capacitor, the q-v curve is a straight line through the origin with slope $C$. This means $C(v) = \frac{d\hat{q}(v)}{dv}$ is a constant. For nonlinear capacitors (like varactors), $C(v)$ varies with voltage — this is the **small-signal capacitance** at operating point $v$.

Similarly, a linear inductor has a straight-line $\Phi$-$i$ characteristic with slope $L$. Nonlinear inductors (ferrite cores near saturation) have $L(i)$ that decreases at high currents.

[[visual:nonlinear-characteristics]]

<details>
<summary><strong>Pause & Think</strong>: A time-varying capacitor has C(t) = 2 + sin(t). How is i related to v?</summary>

For a time-varying capacitor: $q(t) = C(t) \cdot v(t)$, so:

$$i = \frac{dq}{dt} = C(t)\frac{dv}{dt} + v(t)\frac{dC}{dt}$$

Notice the **extra term** $v \cdot dC/dt$! For time-invariant capacitors, $dC/dt = 0$ and this reduces to the familiar $i = C\frac{dv}{dt}$. Time-varying capacitors appear in MEMS devices and parametric amplifiers.

</details>

## The Four Basic Circuit Elements

The lecture notes present an elegant organizing principle. There are four fundamental circuit variables — voltage $v$, current $i$, charge $q$, and flux $\Phi$ — and four corresponding elements defined by the relationships between pairs:

[[visual:four-elements-map]]

| Element | Defining relationship | Variables linked |
|---------|----------------------|-----------------|
| **Resistor** | $f_R(v, i) = 0$ | $v$ and $i$ directly |
| **Capacitor** | $f_C(q, v) = 0$ | $q$ and $v$ ($i = dq/dt$) |
| **Inductor** | $f_L(\Phi, i) = 0$ | $\Phi$ and $i$ ($v = d\Phi/dt$) |
| **Memristor** | $f_M(\Phi, q) = 0$ | $\Phi$ and $q$ (the "missing" link) |

The **memristor** (postulated by Leon Chua in 1971 and physically realized in 2008 by HP Labs) completes the symmetry. It links charge $q$ and flux $\Phi$ — the two integrated variables that the other three elements leave unconnected.

[[visual:falstad-rc-charging]]

<details>
<summary><strong>Pause & Think</strong>: Why can't you have a circuit with only capacitors and voltage sources (no resistors)?</summary>

If you connect a voltage source directly across a capacitor, KVL forces the capacitor voltage to equal the source voltage *instantaneously*. But $i = C\frac{dv}{dt}$, and if the voltage steps from 0 to $V$ in zero time, $dv/dt \to \infty$, implying infinite current. This violates the bounded current assumption. In practice, there's always some wire resistance, but the idealized circuit has no solution without a resistor to limit the current. This leads directly to the **impulse function** you'll study in the next concept.

</details>

## Summary

Here's what you need to carry forward:

- **Capacitor**: $i = C\frac{dv}{dt}$ — current flows only when voltage changes; open circuit at DC
- **Inductor**: $v = L\frac{di}{dt}$ — voltage appears only when current changes; short circuit at DC
- **Memory**: Both elements remember their past via integration — $v_C(t)$ depends on the entire history of $i(\tau)$ for $\tau < t$
- **Duality**: Every capacitor property has an inductor dual (swap $v \leftrightarrow i$, $C \leftrightarrow L$)
- **Energy stored**: $E_C = \frac{1}{2}Cv^2$ and $E_L = \frac{1}{2}Li^2$ — always positive, stored not dissipated
- **Four elements**: R, C, L, and the memristor complete the symmetry of circuit element relationships

> **You've taken a major step forward** — from static resistive circuits to dynamic circuits with memory. Everything that follows in this lesson builds on these two V-I relationships. Take a moment to make sure you're comfortable with $i = C\dot{v}$ and $v = L\dot{i}$ before moving on.
