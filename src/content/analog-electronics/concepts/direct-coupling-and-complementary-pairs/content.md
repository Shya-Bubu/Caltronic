# Direct Coupling and Complementary NPN-PNP Pairs

> **Why This Matters**: Multi-stage amplifiers are the foundation of almost every analog system — from microphone preamps to sensor interfaces. Understanding how to couple stages without losing signal and how complementary transistors improve stability is essential for real-world design.

## Why Multiple Stages?

A single transistor amplifier can only achieve so much gain. The BC549, for example, has an $h_{fe}$ of about 220. If you need a voltage gain of 600, a single common-emitter stage with emitter degeneration will fall short — the gain is limited by the ratio of collector resistance to emitter resistance, and practical constraints on resistor values cap this.

The solution is to cascade two amplifier stages. Stage 1 provides some gain, and stage 2 provides the rest. The total gain is the product of the individual stage gains:

$$A_{v,\text{total}} = A_{v1} \times A_{v2}$$

But here's the critical question: **how do you connect these two stages?**

[[visual:two-stage-block-diagram]]

## Capacitor Coupling vs Direct Coupling

The conventional approach is **capacitor coupling** — you place a coupling capacitor between the collector of Stage 1 and the base of Stage 2. The capacitor blocks the DC operating point of Stage 1 from affecting Stage 2, letting each stage have its own independent bias circuit.

This works, but has drawbacks:

- Each stage needs its own bias resistor network — that's more components
- The coupling capacitor creates a **high-pass filter**, cutting off low frequencies
- At low frequencies, the capacitor's impedance ($1/\omega C$) becomes significant and the gain drops
- More components means more cost, more board space, and more potential failure points

**Direct coupling** eliminates the interstage capacitor entirely. The collector of Q1 connects directly to the base of Q2 — no capacitor in between.

[[visual:coupling-comparison-schematic]]

<details>
<summary><strong>Pause & Think</strong>: If there's no coupling capacitor, what happens to the DC bias of Stage 2?</summary>

The DC voltage at the collector of Q1 becomes the base voltage of Q2. This means the bias conditions of both stages are **interdependent** — you cannot set them independently. This is both the challenge and the elegance of direct coupling.

</details>

## The Complementary NPN-PNP Trick

[[visual:full-two-stage-circuit]]

If you tried to direct-couple two NPN transistors, you'd run into a problem: the collector voltage of Q1 (typically several volts above ground) would forward-bias Q2's base-emitter junction by a large amount, driving Q2 deep into saturation.

The solution is to use **complementary transistors** — an NPN for Stage 1 and a PNP for Stage 2 (or vice versa). In this lab, you use:

- **Q1: BC549 (NPN)** — the first stage
- **Q2: BC556 (PNP)** — the second stage

With a PNP in Stage 2, the collector voltage of Q1 (which serves as VB2) needs to be *above* VCC to forward-bias the base-emitter junction in the correct direction — but since the PNP's emitter is connected towards VCC through R4, the biasing works naturally.

[[visual:npn-pnp-bias-flow]]

> **Key Insight**: The NPN collector pulls the voltage *down* from VCC. This lower voltage, applied to the PNP base, correctly forward-biases the PNP because its emitter is at a higher voltage (connected towards VCC through R4). The two transistor types complement each other perfectly.

## Thermal Stability — the Hidden Advantage

[[visual:thermal-drift-comparison]]

Temperature changes affect transistor parameters, particularly $I_{CBO}$ (collector-base leakage current) and $V_{BE}$ (base-emitter voltage). When temperature rises:

- $I_{CBO}$ roughly doubles for every 10°C increase
- $V_{BE}$ decreases by about 2 mV/°C

In a circuit with two NPN transistors, both drift in the **same direction** — if temperature increases, both $I_C$ values increase, and the operating points shift together. This cumulative drift can push the circuit into saturation or cutoff.

With an NPN-PNP pair, the drifts partially **cancel each other**:

| Parameter | NPN Effect | PNP Effect | Net |
|-----------|-----------|-----------|-----|
| $I_{CBO}$ increase | $I_{C1}$ ↑ → $V_{C1}$ ↓ | $V_{B2}$ ↓ → $I_{C2}$ ↓ | Partial cancellation |
| $V_{BE}$ decrease | $I_{C1}$ ↑ | $I_{C2}$ ↓ | Partial cancellation |

This inherent negative feedback makes the complementary pair **thermally more stable** than using the same type of transistor for both stages.

[[visual:falstad-two-stage-amplifier]]

## One Bias Circuit, Two Stages

The beauty of direct coupling is that a single voltage divider ($R_a$ and $R_b$) at the input sets the DC conditions for the entire amplifier. Here's the chain of dependencies:

$$V_{B1} = \frac{R_b}{R_a + R_b} \cdot V_{CC}$$

$$I_{C1} \approx \frac{V_{B1} - V_{BE1}}{R_2}$$

$$V_{C1} = V_{CC} - I_{C1}(R_1 + R_2) = V_{B2}$$

$$I_{C2} = \frac{V_{CC} - V_{B2} - V_{BE2}}{R_4 + R_5}$$

[[visual:bias-chain-flowchart]]

Every resistor value you choose affects downstream quantities. Change $R_b$ and you change $V_{B1}$, which changes $I_{C1}$, which changes $V_{C1} = V_{B2}$, which changes $I_{C2}$. This interconnectedness is what makes the design challenging — and satisfying when it works.

<details>
<summary><strong>Pause & Think</strong>: Why is this "one bias circuit" approach practical for mass production?</summary>

Fewer components means: lower cost, smaller PCB area, fewer solder joints (higher reliability), and simpler assembly. In mass production, every eliminated component saves significant cost when multiplied by thousands of units.

</details>

## The E12 Resistor Series

[[visual:e12-values-table]]

When selecting resistor values, you cannot choose arbitrary values. Standard resistors come in fixed series. The E12 series provides 12 values per decade:

$$1.0, \ 1.2, \ 1.5, \ 1.8, \ 2.2, \ 2.7, \ 3.3, \ 3.9, \ 4.7, \ 5.6, \ 6.8, \ 8.2$$

Each value can be multiplied by any power of 10 (e.g., 2.2 → 22Ω, 220Ω, 2.2kΩ, 22kΩ, ...). When your calculation gives you, say, 140Ω, you pick the nearest E12 value: **150Ω**. This rounding introduces small errors, but with 5% tolerance resistors, being within 10% of your target is perfectly acceptable.

## The BC549 and BC556 Datasheets

Your design relies on these h-parameter values (at $V_{CE} = 5V$, $I_C = 2mA$, $f = 1kHz$):

| Parameter | BC549 (Q1, NPN) | BC556 (Q2, PNP) |
|-----------|-----------------|-----------------|
| $h_{fe}$ | 220 | 220 |
| $h_{ie}$ | 2.7 kΩ | 1.6 kΩ |
| $h_{re}$ | $1.5 \times 10^{-4}$ | $1.5 \times 10^{-4}$ |
| $h_{oe}$ | 18 μS ($\approx 56$ kΩ) | 18 μS ($\approx 56$ kΩ) |
| $V_{CEO,\text{max}}$ | 30V (BC549) | 80V (BC556) |
| $P_{\text{max}}$ | 500 mW | 500 mW |

> **Watch Out**: These are *typical* values. Real transistors have manufacturing spread — $h_{fe}$ for BC549 ranges from 200 to 450. Your design should work across this range, or at least you should be aware that the actual gain may differ from your calculated value.

[[visual:hfe-spread-histogram]]

## Summary

- **Direct coupling** eliminates the interstage capacitor, reducing component count and improving low-frequency response
- **Complementary NPN-PNP pairs** provide inherent thermal stability through opposing drift directions
- A **single bias network** controls both stages, but this creates interdependent DC conditions
- Resistors must be chosen from the **E12 standard series**, introducing rounding errors that are acceptable within tolerance
- The **h-parameter model** provides the small-signal quantities needed for AC analysis

The next concept takes this circuit and derives its AC equivalent — the starting point for calculating gain, input impedance, and output impedance.
