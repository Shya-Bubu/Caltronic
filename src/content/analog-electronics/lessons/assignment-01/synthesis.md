# Synthesis: BJT Tutorial

## The Big Picture

You've now covered the entire BJT analysis pipeline:

| Stage | What You Do | Tools |
|-------|------------|-------|
| **DC Analysis** | Find the Q-point (ICQ, VCEQ) | KVL, Thevenin, β relation |
| **AC Model** | Replace BJT with h-parameter equivalent | Simplified CE/CC/CB model |
| **AC Analysis** | Calculate Av, Ai, Rin, Rout | Circuit analysis on small-signal model |
| **Graphical** | Draw DC/AC load lines, construct waveforms | Output characteristics, load line equations |
| **Multi-stage** | Account for inter-stage loading | Cascade individual stage results |
| **Feedback** | Identify topology, apply feedback analysis | Series-shunt, shunt-series, etc. |

## Key Formulas to Remember

| Parameter | CE Configuration | CC Configuration |
|-----------|-----------------|-----------------|
| **Q (series)** | $Q = \omega_o L/R$ | $Q = \omega_o RC$ |
| **Voltage Gain** | $A_v = -h_{fe}R_C / (h_{ie} + h_{fe}R_E)$ | $A_v \approx 1$ |
| **Input R** | $R_{in} = h_{ie} + (1+h_{fe})R_E$ | $R_{in} = h_{ic} + (1+h_{fc})R_E$ |
| **Output R** | $R_{out} = R_C / (1 + h_{oe}R_C)$ | $R_{out}$ is low |
| **Current Gain** | $A_i = -h_{fe}$ | $A_i = -(1+h_{fe})$ |

## The Design Flow

```
Specifications → DC Design → Q-Point Verification → AC Model → 
Small-Signal Analysis → Load Lines → Multi-Stage Cascade → Feedback
```

Every tutorial question follows some portion of this flow. The key is knowing **where in the pipeline each question sits** and applying the right technique.

## What's Next

With this foundation, you're ready for:
- **FET amplifiers** — same analysis flow, different device model
- **Frequency response** — adding capacitor effects back in
- **Op-amp circuits** — the BJT amplifier taken to its logical extreme
