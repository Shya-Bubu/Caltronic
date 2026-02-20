## 📝 Exam Focus: LTI Systems and the FS

### What Examiners Are Looking For

This is a high-value exam topic. You need to show you can compute output FS coefficients and interpret the system as a filter.

### Common Question Types

**Type 1: Output FS coefficients**
"A square wave passes through a system with H(jω) = 1/(1+jωRC). Find Y_k."
→ Y_k = H(jkω₀) · X_k. Evaluate H at each harmonic.

**Type 2: Eigenfunction property**
"Show that e^{jωt} is an eigenfunction of an LTI system."
→ Compute y(t) = ∫h(τ)e^{jω(t−τ)}dτ = H(jω)e^{jωt}.

**Type 3: Output power**
"Find the output power when the input is periodic with given X_k."
→ P_out = Σ|H(jkω₀)|²|X_k|².

**Type 4: Filtering interpretation**
"How does an ideal lowpass filter affect a periodic signal?"
→ Removes harmonics above cutoff → smoother output.

### Exam Tips

1. Always state Y_k = H(jkω₀) · X_k before calculating
2. Evaluate H at EACH harmonic frequency separately
3. The output period is the same as the input
4. Combine with Parseval's for power questions

### Marks Distribution (Typical)
- Eigenfunction proof: 3–4 marks
- Y_k computation for given H and X_k: 4–5 marks
- Power calculation using Parseval's: 3–4 marks
