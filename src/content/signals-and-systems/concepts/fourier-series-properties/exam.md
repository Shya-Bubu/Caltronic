## 📝 Exam Focus: Fourier Series Properties

### What Examiners Are Looking For

Properties questions test whether you can apply shortcuts instead of re-evaluating the FS integral. The most tested property is **time shifting**.

### Common Question Types

**Type 1: FS of shifted signal**
"Given that the FS of x(t) is X_k, find the FS of x(t − T₀/4)."
→ Multiply by e^{−jkω₀T₀/4} = e^{−jkπ/2}.

**Type 2: FS via linearity**
"Given FS of cos(ω₀t) and sin(ω₀t), find FS of 3cos(ω₀t) + 2sin(ω₀t)."
→ Scale and add.

**Type 3: Time reversal**
"If x(t) has FS coefficients X_k, find the coefficients of x(−t)."
→ Replace k with −k.

**Type 4: Magnitude unchanged under shift?**
"True or false: shifting a signal in time changes its magnitude spectrum."
→ False (only phase changes).

### Exam Tips

1. The time shift property is tested most often — know the formula cold
2. Always verify that linearity applies: check that fundamental frequencies match
3. For a real signal: $X_{-k} = X_k^*$, so time reversal gives $X_k^*$ (conjugate)
4. Time scaling changes $\omega_0$ but NOT $X_k$ — easy to confuse

### Marks Distribution (Typical)
- Applying the correct property: 2–3 marks
- Full derivation/simplification: 4–6 marks
- Identifying which property to use: 1–2 marks
