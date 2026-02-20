## 📝 Exam Focus: Symmetry Properties of the Fourier Series

### What Examiners Are Looking For

You must be able to identify signal symmetries and apply the corresponding constraints on X_k. Symmetry questions often appear as "state the properties" or "verify using symmetry."

### Common Question Types

**Type 1: State the symmetry properties**
"For a real, even signal, what can you say about X_k?" → Purely real and even.

**Type 2: Verify computed coefficients**
"Given X_k, verify that conjugate symmetry holds." → Check X_{−k} = X_k*.

**Type 3: Predict FS form**
"Without computing, what is the form of X_k for sin(ω₀t)?" → Real, odd signal → X_k purely imaginary, X₀ = 0.

**Type 4: Exploit symmetry to simplify integration**
"Compute X_k for an even signal." → Use X_k = (2/T₀)∫₀^{T₀/2} x(t)cos(kω₀t) dt.

### Exam Tips

1. Memorise the table: Real → conjugate symmetric; Real+Even → real X_k; Real+Odd → imaginary X_k, X₀=0
2. If x(t) is odd, immediately write X₀ = 0 (free marks)
3. Use symmetry to catch computation errors — if X_k violates expected symmetry, recheck
4. The even-odd decomposition x(t) = x_e(t) + x_o(t) is useful for mixed signals

### Marks Distribution (Typical)
- Identifying symmetry: 2 marks
- Stating constraints on X_k: 3–4 marks
- Applying constraints in computation: 4–5 marks
