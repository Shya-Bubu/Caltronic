# Summary: Continuous vs Discrete Signals

**If you remember only this, remember these:**

1. **Continuous-time** $x(t)$ — defined for ALL values of t (smooth curve)
2. **Discrete-time** $x[n]$ — defined only at integers (stem plot)
3. **Sampling**: $x[n] = x(nT_s)$ converts CT to DT
4. **Nyquist**: Sample at $f_s > 2f_{max}$ or aliasing destroys information
5. CT uses integrals; DT uses summations — same concepts, different math

> **Why This Matters**
> Every digital system (computer, phone, audio) works with discrete signals.
> Understanding sampling is essential for DSP, communications, and embedded systems.
