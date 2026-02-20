## 📝 Exam Focus: Exponential Fourier Series

### What Examiners Are Looking For

You must be able to state the EFS analysis and synthesis pair from memory, evaluate the analysis integral for given periodic signals, and sketch the resulting spectra.

### Common Question Types

**Type 1: Compute X_k from first principles**
Given a piecewise-defined periodic signal, evaluate the FS integral. Most marks come from *setting up* the integral correctly (limits, exponential sign, 1/T₀ factor).

**Type 2: Identify X₀ by inspection**
Quick: X₀ is the average value. For a square pulse of amplitude A and duty cycle D, X₀ = AD.

**Type 3: Sketch magnitude and phase spectra**
Given X_k as a formula, plot |X_k| vs k and ∠X_k vs k. Must label axes and mark key values.

**Type 4: Reconstruct x(t) from given X_k**
Given a set of coefficients, write the synthesis equation and simplify using Euler's formula.

### Exam Tips

1. Always check: does your X₀ make physical sense as an average?
2. The exponent in analysis has a **minus** sign; synthesis has a **plus** sign
3. Choose [-T₀/2, +T₀/2] for symmetric signals to exploit even/odd symmetry
4. For piecewise signals, split the integral at the breakpoints
5. Verify: as k→∞, |X_k| should approach 0

### Marks Distribution (Typical)
- Setting up the integral correctly: 3–4 marks
- Evaluating the integral: 4–6 marks
- Drawing spectra: 3–5 marks
