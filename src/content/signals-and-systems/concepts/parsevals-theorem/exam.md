## 📝 Exam Focus: Parseval's Theorem

### What Examiners Are Looking For

Parseval's theorem is a classic exam question. You'll be asked to either prove it, apply it, or use it to verify a FS derivation.

### Common Question Types

**Type 1: Prove Parseval's theorem**
"Show that the average power of a periodic signal equals the sum of |X_k|²."
→ Substitute FS into the power integral, use orthogonality.

**Type 2: Compute power from FS coefficients**
"Given X_k = ..., find the average power."
→ Sum |X_k|² including DC term.

**Type 3: Verify FS result**
"Verify your FS by checking Parseval's theorem."
→ Compute time-domain power, sum |X_k|², check they match.

**Type 4: Power in N harmonics**
"What fraction of the total power is in the first 5 harmonics?"
→ Compute Σ|X_k|² for k = −5 to 5, divide by total power.

### Exam Tips

1. Always include k = 0 in the power sum
2. For real signals, simplify: P = |X₀|² + 2Σ|X_k|² (k = 1 to ∞)
3. Use Parseval's as a sanity check — if time-domain and frequency-domain powers disagree, you made an error
4. State the theorem clearly before applying it

### Marks Distribution (Typical)
- Statement of Parseval's theorem: 2 marks
- Derivation/proof: 4–5 marks
- Application to compute power: 3–4 marks
