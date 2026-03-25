# Exam Practice — Integrators and Differentiators

## Question 1 (4 marks)

An ideal op-amp integrator is built using an input resistor $R = 10\text{ k}\Omega$ and a feedback capacitor $C = 1\text{ }\mu\text{F}$. The capacitor is initially uncharged ($V_{initial} = 0\text{V}$). 

A constant DC input voltage of $V_{in} = +2.0\text{ V}$ is applied at time $t=0$.

**(a)** State the formula for the output voltage $V_o(t)$ of an ideal inverting integrator. **(1 mark)**
**(b)** Calculate the time constant $\tau = RC$ in seconds. **(1 mark)**
**(c)** Calculate the output voltage exactly $0.05\text{ seconds}$ after the input is applied. **(1 mark)**
**(d)** The op-amp is powered by $\pm 15\text{V}$ supplies. At what time $t$ will the integrator saturate? **(1 mark)**

<details>
<summary><strong>Solution</strong></summary>

**(a)**
$$V_o(t) = -\frac{1}{RC} \int V_{in}(t) dt + V_{initial}$$

**(b)**
$$\tau = RC = 10\text{ k}\Omega \times 1\text{ }\mu\text{F} = (10 \times 10^3) \times (1 \times 10^{-6}) = 0.01\text{ s}$$

**(c)**
Since $V_{in}$ is a constant $+2.0\text{V}$, the integral simplifies to:
$$V_o(t) = -\frac{1}{0.01} \int_0^t 2.0 \,dt = -100 \times [2.0t] = -200t$$
At $t = 0.05\text{s}$:
$$V_o(0.05) = -200(0.05) = -10.0\text{ V}$$

**(d)**
Saturation occurs when the output reaches the supply rail of $-15\text{V}$.
$$-15 = -200t$$
$$t = \frac{15}{200} = 0.075\text{ seconds}$$
</details>

## Question 2 (3 marks)

Discuss the practical limitations of the ideal integrator and differentiator circuits, and explain how these circuits are modified in practice.

<details>
<summary><strong>Solution</strong></summary>

**Ideal Integrator Limitation:**
Real op-amps have tiny input offset voltages and bias currents. A capacitor completely blocks DC, meaning there is zero negative DC feedback to stabilize the op-amp. As a result, the integrator will continuously integrate these tiny error offsets, causing the output voltage to slowly "drift" until it hits saturation (the power supply rail), rendering the circuit useless over long periods.
**Fix:** A large resistor $R_F$ is placed in parallel with the feedback capacitor to provide a DC feedback path (turning it into a Lossy Integrator).

**Ideal Differentiator Limitation:**
The impedance of a capacitor ($X_C = \frac{1}{2\pi f C}$) approaches zero at very high frequencies. The gain of the differentiator ($R / X_C$) approaches infinity at high frequencies. Any tiny amount of high-frequency noise is enormously amplified and overwhelms the desired signal.
**Fix:** A small resistor $R_S$ is placed in series with the input capacitor to limit the maximum high-frequency gain.
</details>

## Question 3 (3 marks)

You are provided with an ideal inverting differentiator circuit where $C = 100\text{ nF}$ and $R = 20\text{ k}\Omega$. 

The input $V_{in}$ is a triangle wave that ramps from $0\text{V}$ to $5\text{V}$ in precisely $1\text{ ms}$, then ramps back down from $5\text{V}$ to $0\text{V}$ in the next $1\text{ ms}$.

**(a)** What is the rate of change $\frac{dV_{in}}{dt}$ during the rising portion of the triangle wave ($0$ to $1\text{ms}$)? **(1 mark)**
**(b)** What is the rate of change $\frac{dV_{in}}{dt}$ during the falling portion ($1\text{ms}$ to $2\text{ms}$)? **(1 mark)**
**(c)** Calculate the steady output voltage $V_o$ during the rising portion of the input wave. **(1 mark)**

<details>
<summary><strong>Solution</strong></summary>

**(a)**
During the rising slope, the voltage changes by $+5\text{V}$ over $1\text{ ms}$ ($0.001\text{ seconds}$).
$$\frac{dV_{in}}{dt} = \frac{\Delta V_{in}}{\Delta t} = \frac{5 - 0}{0.001} = +5000\text{ V/s}$$

**(b)**
During the falling slope, the voltage changes by $-5\text{V}$ over $1\text{ ms}$.
$$\frac{dV_{in}}{dt} = \frac{0 - 5}{0.001} = -5000\text{ V/s}$$

**(c)**
First, calculate the $RC$ time constant: $RC = (20 \times 10^3) \times (100 \times 10^{-9}) = 0.002\text{ s}$.
The differentiator formula is $V_o = -RC \frac{dV_{in}}{dt}$.
During the rising slope:
$$V_o = -(0.002) \times (+5000) = -10\text{ V}$$
*(The output is a steady $-10\text{V}$ DC square wave pulse during the ramp up. During the ramp down, it would jump to $+10\text{V}$).*
</details>
