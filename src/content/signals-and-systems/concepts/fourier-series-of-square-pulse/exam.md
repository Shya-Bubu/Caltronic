## 📝 Exam Focus: Fourier Series of the Square Pulse Train

### What Examiners Are Looking For

This is a *favourite* exam question. You must derive the FS of the square pulse from first principles and understand the sinc spectrum.

### Common Question Types

**Type 1: Derive X_k from the integral**
Given a pulse train diagram, set up and evaluate the FS integral step by step. This is the most common question — expect 8–10 marks.

**Type 2: Sketch the spectrum**
Given X_k = sin(kω₀T₁)/(kπ), sketch |X_k| vs k. Label zero crossings and the main lobe.

**Type 3: Effect of changing T₁ or T₀**
How does the spectrum change if you make the pulse narrower? Wider? Change the period?

**Type 4: Numerical substitution**
Given specific T₀ and T₁, compute X₀, X₁, X₂, X₃ as numbers.

### Exam Tips

1. Always compute X₀ separately (it's the duty cycle 2T₁/T₀)
2. Use [-T₀/2, +T₀/2] and the fact that x(t)=0 outside [-T₁,+T₁] to simplify limits
3. The key simplification: ω₀T₀ = 2π → cancels to give 1/(kπ) factor
4. Zero crossings of the sinc envelope occur when kω₀T₁ = nπ
5. For an even signal: all X_k are real (no phase plot needed)

### Marks Distribution (Typical)
- Setting up the integral correctly: 2–3 marks
- Evaluating and simplifying to sinc form: 4–5 marks
- Sketching and interpreting the spectrum: 3–4 marks
