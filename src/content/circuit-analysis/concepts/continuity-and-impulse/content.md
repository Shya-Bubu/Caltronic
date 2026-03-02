# Continuity Property and the Impulse Function

> **Why This Matters**: When a switch flips in a circuit, voltages and currents can change abruptly — but **not everything can jump**. Capacitor voltage and inductor current must remain continuous at switching instants. This constraint gives you the initial conditions you need to solve every first-order circuit. And when this continuity is *violated*, you encounter one of the most important mathematical objects in engineering: the impulse function δ(t).

## The Continuity Property: What Can't Jump

### Capacitor Voltage Continuity

> **Theorem**: If the current waveform $i(t)$ through a linear time-invariant capacitor remains bounded in a closed interval $[t_a, t_b]$, then the voltage $v(t)$ across the capacitor is a continuous function in $(t_a, t_b)$. In particular: $v(T^-) = v(T^+)$ for any $T$ in this interval.

[[visual:continuity-illustration]]

**Proof** (from the lecture): Start with the capacitor integral:

$$v(T + dt) - v(T) = \frac{1}{C}\int_T^{T+dt} i(\tau)\,d\tau$$

Since $i(t)$ is bounded in $[t_a, t_b]$, there exists some finite $M$ such that $|i(t)| \leq M$. Therefore:

$$|v(T + dt) - v(T)| \leq \frac{1}{C}\int_T^{T+dt} |i(\tau)|\,d\tau \leq \frac{M \cdot dt}{C}$$

As $dt \to 0$: $\frac{M \cdot dt}{C} \to 0$, so $v(T + dt) \to v(T)$.

$$\boxed{v(T^+) = v(T^-)}$$

[[visual:capacitor-continuity-proof]]

In plain English: **you cannot change a capacitor's voltage instantaneously with a finite current**. It would require infinite charge (the integral of current over zero time). Think of it physically: charging a capacitor requires moving electrons from one plate to the other. Moving a finite number of electrons takes a finite amount of time.

> **Key Insight**: This is why capacitor voltage $v_C$ is the **state variable** for RC circuits — it captures the circuit's "memory" and cannot be changed discontinuously by any bounded input.

### Inductor Current Continuity

By duality, the same argument applies to inductors:

> **Theorem**: If the voltage waveform $v_L(t)$ across a linear time-invariant inductor remains bounded in $[t_a, t_b]$, then the current $i_L(t)$ is continuous: $i_L(T^-) = i_L(T^+)$.

[[visual:inductor-continuity]]

$$i(T + dt) - i(T) = \frac{1}{L}\int_T^{T+dt} v(\tau)\,d\tau \to 0 \text{ as } dt \to 0$$

Physically: changing current through an inductor requires changing the magnetic field. Changing a finite-energy field in zero time would require infinite voltage — which is unbounded input.

<details>
<summary><strong>Pause & Think</strong>: A switch in an RL circuit opens at t = 0. The inductor was carrying 2A. What is i_L(0⁺)?</summary>

By the continuity property: $i_L(0^+) = i_L(0^-) = 2$ A.

The current cannot jump instantaneously. When you open a switch on an inductor carrying current, the inductor "insists" on maintaining its current. In practice, this can cause very large voltages across the switch (since $v = L \cdot di/dt$ and $di/dt$ is very large if the switch opens quickly). This is why inductors produce **arcing** when switches open — and why flyback diodes are used to protect circuits.

</details>

## Switching Circuits: Using Continuity

The continuity property is your **most important tool** for finding initial conditions in switching circuits. Here's the method:

1. **Before the switch** ($t < 0$): Analyze the circuit with the switch in its original position. Find $v_C(0^-)$ or $i_L(0^-)$.
2. **At the switching instant** ($t = 0$): Apply continuity: $v_C(0^+) = v_C(0^-)$ and $i_L(0^+) = i_L(0^-)$.
3. **After the switch** ($t > 0$): Analyze the new circuit with the switch in its new position, using the initial conditions from step 2.

[[visual:switching-example]]

> **Watch Out**: While $v_C$ and $i_L$ are continuous across switching instants, other quantities (like resistor voltage, source current, etc.) **can** and often **do** jump discontinuously. Only the state variables ($v_C$ for capacitors, $i_L$ for inductors) are guaranteed continuous.

[[visual:falstad-switch-rc]]

## The Impulse Function: When Continuity Breaks

What happens when the bounded-current condition is violated? Consider a capacitor charged by a step voltage through zero resistance:

[[visual:impulse-derivation]]

The lecture considers a 1F capacitor with a voltage source that ramps from 0 to $E$ volts in time $\Delta$:

$$i_C = C\frac{dv}{dt} = C \cdot \frac{E}{\Delta}$$

The current is a rectangular pulse of height $CE/\Delta$ and width $\Delta$. The area (total charge delivered) is:

$$\text{Area} = \frac{CE}{\Delta} \times \Delta = CE$$

Now take the limit as $\Delta \to 0$:
- The height $\to \infty$
- The width $\to 0$
- But the **area remains constant** at $CE$

[[visual:impulse-limiting-process]]

This limiting waveform is the **unit impulse function** $\delta(t)$:

$$\delta(t) = \begin{cases} \text{singular (infinite)} & t = 0 \\ 0 & t \neq 0 \end{cases}$$

with the defining property:

$$\boxed{\int_{-\epsilon_1}^{\epsilon_2} \delta(t)\,dt = 1 \quad \text{for any } \epsilon_1 > 0, \epsilon_2 > 0}$$

The impulse has zero width, infinite height, but unit area. It's not a function in the ordinary sense — it's a **distribution** (or generalized function).

<details>
<summary><strong>Pause & Think</strong>: If a 1μF capacitor is connected directly across a 5V battery at t = 0 (no resistance), describe the current waveform.</summary>

The voltage steps from 0 to 5V instantaneously, so:

$$i(t) = C\frac{dv}{dt} = 10^{-6} \times 5 \times \delta(t) = 5 \times 10^{-6} \delta(t)$$

This is an impulse of area $5 \times 10^{-6} = 5$ μC — exactly the charge needed to change the capacitor voltage by 5V. The current is theoretically infinite at $t = 0$ and zero everywhere else.

In a real circuit, wire resistance (even 0.01 Ω) limits the peak current and spreads the pulse over a finite (but very short) time. The total charge is still 5 μC regardless.

</details>

## Impulse Applied to a Capacitor: The Step Response

If the current impulse is $i(t) = A\delta(t - t_0)$, the resulting capacitor voltage is:

$$v_C(t) = \frac{1}{C}\int_0^t A\delta(\tau - t_0)\,d\tau = \begin{cases} 0 & t < t_0 \\ A/C & t > t_0 \end{cases}$$

[[visual:impulse-to-step]]

The impulse in current produces a **step** in voltage — exactly the unit step function $u(t-t_0)$ scaled by $A/C$. This makes physical sense: a burst of charge $A$ deposited instantaneously raises the voltage by $A/C$ (since $q = Cv$).

By duality, a voltage impulse across an inductor produces a step change in current:

$$\Delta i_L = \frac{1}{L}\int_0^{T+} A\delta(\tau)\,d\tau = \frac{A}{L}$$

[[visual:impulse-response-falstad]]

## The Substitution Theorem Connection

The lecture notes introduce the **substitution theorem** as a powerful technique:

> If a circuit $N$ has a unique solution $v = \hat{v}(t)$ across a port, then the port element can be replaced by a voltage source $\hat{v}(t)$ without affecting the rest of the circuit.

[[visual:substitution-theorem]]

This theorem is crucial for first-order circuit analysis: it lets you replace a capacitor (or inductor) with a source during analysis. You'll use it extensively when deriving the general solution in the next concepts.

<details>
<summary><strong>Pause & Think</strong>: Why does the substitution theorem require the circuit to have a "unique solution"?</summary>

If the circuit has multiple solutions (operating points), replacing the element with a source corresponding to *one* of those solutions creates a new circuit that might have different operating points. The substituted circuit $N_v$ could have three solutions instead of the original one — and you wouldn't know which one is the "real" one. Uniqueness ensures the replacement is faithful.

This typically fails with nonlinear elements that have multiple operating points (like tunnel diodes). For linear circuits with one capacitor, uniqueness is usually guaranteed.

</details>

## Summary

Take these key ideas with you:

- **Capacitor voltage cannot jump**: $v_C(T^+) = v_C(T^-)$ when current is bounded — this gives you initial conditions at switching instants
- **Inductor current cannot jump**: $i_L(T^+) = i_L(T^-)$ when voltage is bounded — the dual property
- **The impulse function** $\delta(t)$: infinite height, zero width, unit area — arises when a voltage step is applied to a capacitor with zero resistance
- An **impulse of current** produces a **step in voltage** across a capacitor (and vice versa for inductors)
- The **substitution theorem** allows you to replace C or L with equivalent sources during analysis

> **These continuity conditions are your gateway** to solving every switching circuit in the rest of this course. Whenever you see a switch, your first step is always: "what are $v_C(0^-)$ and $i_L(0^-)$?" — then apply continuity.
