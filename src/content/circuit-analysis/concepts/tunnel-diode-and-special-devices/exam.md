## Exam Focus: Tunnel Diode, Glow Tube, and Special Devices

### Common Question Patterns

1. **Classify a device from its v-i curve**: Given a plot, determine whether the device is voltage-controlled, current-controlled, both, or neither. Apply the vertical line test (voltage-controlled) and horizontal line test (current-controlled).
2. **Identify the tunnel diode's regions**: Given the N-shaped curve, label the peak point $(V_p, I_p)$, valley point $(V_v, I_v)$, and the negative differential resistance (NDR) region between them.
3. **Explain why a device fails a controllability test**: For the tunnel diode, show that a vertical line in the NDR region crosses the curve three times, so $\hat{i}(v)$ is not single-valued. For the glow tube, show that a horizontal line in the fold-back region crosses the S-curve multiple times.
4. **Bilateral symmetry**: Given a characteristic, determine whether $f(v,i) = f(-v,-i)$. Check if the curve is symmetric about the origin.
5. **Harmonic generation**: Given a nonlinear $i = f(v)$ and a sinusoidal input, identify which harmonics appear. Use trig identities to expand $\sin^2$, $\sin^3$, etc.

### Common Mistakes

- **Confusing the vertical and horizontal line tests**: The vertical line test checks for voltage-controlled ($\hat{i}(v)$ single-valued). The horizontal line test checks for current-controlled ($\hat{v}(i)$ single-valued). Students frequently mix these up.
- **Assuming "nonlinear" means "not voltage-controlled"**: A device can be both nonlinear and voltage-controlled. The PN-junction diode is a clear example. Controllability is about single-valuedness, not linearity.
- **Confusing N-type and S-type curves**: The tunnel diode's N-shaped curve is multi-valued in voltage (fails vertical line test). The glow tube's S-shaped curve is multi-valued in current (fails horizontal line test). Students sometimes swap these.
- **Forgetting that bilateral means origin symmetry, not axis symmetry**: A bilateral resistor satisfies $f(v,i) = f(-v,-i)$, meaning the curve is unchanged by 180-degree rotation about the origin. This is not the same as symmetry about the $v$-axis or the $i$-axis.
- **Claiming diodes are bilateral**: The PN-junction diode has an exponential forward curve and a flat reverse curve. It is decidedly not symmetric about the origin; it is unilateral.

### Exam Tips

- When given a $v$-$i$ curve, immediately apply both line tests to classify the device. State your conclusion explicitly: "The vertical line at $v = V_0$ crosses the curve at three points, so the device is not voltage-controlled."
- For harmonic generation problems, expand powers of $\sin(\omega t)$ using standard identities: $\sin^2(\omega t) = \frac{1}{2}(1 - \cos 2\omega t)$, $\sin^3(\omega t) = \frac{3}{4}\sin\omega t - \frac{1}{4}\sin 3\omega t$.
- If a problem mentions "negative resistance," clarify whether it is voltage-controlled NDR (S-type, like the glow tube) or current-controlled NDR (N-type, like the tunnel diode). The terminology can be confusing because the "negative resistance region" in an N-type curve refers to a region where $dv/di < 0$.
- For bilateral resistor problems, note that only odd harmonics appear under symmetric excitation. If the problem says the resistor is bilateral and you find even harmonics, re-check your expansion.
- Always sketch the curve and mark the multi-valued region explicitly. This makes your reasoning visible to the grader.
