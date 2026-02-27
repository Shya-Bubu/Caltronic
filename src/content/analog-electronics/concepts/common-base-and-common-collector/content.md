# Common-Base and Common-Collector Configurations

> **Why This Matters**: CE is versatile but not always the right choice. CB excels at high frequencies (no Miller effect). CC (emitter follower) is the go-to buffer for impedance matching. Knowing all three lets you pick the right tool for the job.

## Common-Base Configuration

[[visual:cb-circuit-overview]]

In the CB configuration, input is at the emitter and output is at the collector. The base is AC grounded.

**Key properties**: non-inverting, high voltage gain ($A_V \approx g_m R_C$), current gain $\alpha \approx 1$, very low $R_{in} \approx r_e$, very high $R_{out}$.

## Common-Collector (Emitter Follower)

[[visual:cc-circuit-overview]]

In CC, input is at the base and output is at the emitter. The collector is connected to $V_{CC}$ (AC ground).

**Key properties**: non-inverting, $A_V \approx 1$ (voltage follower), current gain $\beta + 1$, very high $R_{in}$, very low $R_{out}$.

## Comparing All Three Configurations

[[visual:three-config-gain-comparison]]

[[visual:three-config-rin-comparison]]

[[visual:three-config-rout-comparison]]

<details>
<summary><strong>Pause & Think</strong>: Why is CB's R_in so much lower than CC's?</summary>

CB input is at the emitter — you're looking into $r_e = V_T/I_C \approx 25\Omega$. CC input is at the base — you're looking into $r_\pi + (\beta+1)R_E$, which is much larger because the base current is $\beta$ times smaller than the emitter current.

</details>

## CB's High-Frequency Advantage

[[visual:cb-frequency-advantage]]

CB avoids the **Miller effect** that plagues CE at high frequencies. In CE, $C_{BC}$ is multiplied by $(1 + |A_V|)$, creating a huge effective input capacitance. In CB, $C_{BC}$ is between output and ground — no multiplication.

## CC as a Buffer

[[visual:cc-buffer-application]]

[[visual:cascading-ce-cc]]

The emitter follower's unity voltage gain seems useless — until you consider impedance transformation. It converts a high-impedance source into a low-impedance output, preventing loading effects.

## Choosing the Right Configuration

[[visual:application-selection-guide]]

[[visual:summary-table-all-configs]]

## Summary

- CB: high voltage gain, non-inverting, low R_in, best for high-frequency RF applications
- CC: A_V ≈ 1, high current gain, high R_in, low R_out, ideal as buffer/impedance matcher
- CE: highest power gain, moderate impedances, workhorse for general amplification
- Real systems cascade multiple configurations: CE for gain + CC for output buffering
