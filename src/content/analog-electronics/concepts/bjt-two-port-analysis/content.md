# BJT Two-Port Network Analysis

> **Why This Matters**: Two-port parameters give you a systematic, universal way to characterize any amplifier — regardless of its internal complexity. Once you have the h-parameters, you can compute gain, impedances, and cascade responses without redrawing the small-signal circuit.

## The Two-Port Model

[[visual:two-port-block-diagram]]

Any linear circuit with an input and output can be modeled as a **two-port network** described by four parameters. The most common parameter sets are h (hybrid), y (admittance), z (impedance), and ABCD (transmission).

## h-Parameters: The BJT Standard

[[visual:h-parameter-model]]

For BJTs, **h-parameters** are the standard:
- $h_{ie}$ = input impedance with output shorted ($= r_\pi$ for CE)
- $h_{re}$ = reverse voltage ratio ($\approx 0$, usually neglected)
- $h_{fe}$ = forward current gain ($= \beta$ for CE)
- $h_{oe}$ = output admittance ($= 1/r_o$ for CE)

[[visual:ce-h-parameter-equivalent]]

The two defining equations are:
$$V_1 = h_{ie} \cdot I_1 + h_{re} \cdot V_2$$
$$I_2 = h_{fe} \cdot I_1 + h_{oe} \cdot V_2$$

<details>
<summary><strong>Pause & Think</strong>: Why are h-parameters called "hybrid"?</summary>

Because they mix units: $h_{ie}$ is in Ohms, $h_{re}$ is dimensionless, $h_{fe}$ is dimensionless, and $h_{oe}$ is in Siemens. No other parameter set has this mix — that's why they're the most natural for BJTs.

</details>

## Other Parameter Sets

[[visual:y-parameter-model]]

[[visual:z-parameter-model]]

[[visual:parameter-conversion]]

## Deriving Gain from Parameters

[[visual:ce-gain-from-h-params]]

[[visual:cb-gain-from-h-params]]

## Cascading Stages

[[visual:two-stage-cascade-analysis]]

[[visual:practical-h-param-values]]

## Summary

- Two-port models systematically characterize any linear amplifier
- h-parameters are standard for BJTs: $h_{ie}$, $h_{re}$, $h_{fe}$, $h_{oe}$
- Simplified analysis: $h_{re} \approx 0$, giving $A_V \approx -h_{fe} \cdot R_L / h_{ie}$
- ABCD parameters are ideal for cascading stages (matrix multiplication)
- Same BJT, different configuration → different h-parameter subscripts (e, b, c)
