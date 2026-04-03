# Exam Guide — MOSFET Switching Characteristics

## What Examiners Ask

### Category 1: Waveform Sketching (4–6 marks)
- Given an input pulse, sketch the output waveform showing exponential edges
- Label the time constants $\tau_1$ (falling) and $\tau_2$ (rising)
- Indicate which transistor controls each edge

**Time allocation:** 5–8 minutes. Show clear exponential curves, not straight lines.

### Category 2: ON Resistance and Output Voltage Calculation (4–6 marks)
- Calculate $R_{sat}$ given $V_{DS(ON)}$ and $I_{DS}$
- Calculate the steady-state output LOW voltage using $V_{o1} = \frac{R_o}{R_o + R_{sat}} V_{DD}$
- Determine time constants from given component values

**Time allocation:** 5–8 minutes.

### Category 3: Open-Drain/Collector Analysis (4–6 marks)
- Explain why open-drain outputs need external pull-up resistors
- Explain how time division multiplexing works on a shared bus
- Calculate the pull-up resistor value for a given LOW voltage requirement

**Time allocation:** 5–8 minutes.

## Common Mistakes

1. **Drawing symmetric rise/fall times** — The rising edge is slower than the falling edge because $R_{sat}(T_2) > R_{sat}(T_1)$. Show this asymmetry clearly.
2. **Forgetting that $R_{sat}$ is not constant** — The ON resistance varies with operating point, so the actual waveform is not a perfect exponential. State the approximation.
3. **Confusing open-drain with push-pull** — Open-drain outputs can only pull LOW. They rely on an external pull-up resistor for the HIGH state.
4. **Using the wrong formula** — There are two equivalent forms of the output voltage: $V_{o1} = \frac{R_o}{R_o + R_{sat}} V_{DD}$ and $V_{o1} = \frac{1}{1 + R_{sat}/R_o} V_{DD}$. Both are correct.

## Mark-Winning Tips

- Always state which transistor ($T_1$ or $T_2$) controls each switching edge
- Show the parasitic capacitor $C_o$ on your circuit diagram — it's the reason for all switching delays
- When calculating time constants, clearly identify which $R_{sat}$ you're using
