# Exam Preparation: Fourier Series Properties

## Common Question Types

### Type 1: Apply Time-Shift Property
**Given:** Xk for x(t), find Yk for y(t) = x(t - t₀)

**Solution:**
$$Y_k = X_k \cdot e^{-jk\omega_0 t_0}$$

**Example:** If X₁ = 2 and t₀ = T₀/4:
$$Y_1 = 2 \cdot e^{-j \cdot 1 \cdot \omega_0 \cdot T_0/4} = 2 \cdot e^{-j\pi/2} = -2j$$

### Type 2: Combine Properties
**Given:** Find coefficients for y(t) = 2x(t-1) + 3x(-t)

**Solution:** Use linearity with time-shift and time-reversal:
$$Y_k = 2X_k e^{-jk\omega_0} + 3X_{-k}$$

### Type 3: Verify Conjugate Symmetry
**Given:** Coefficients for a signal
**Ask:** Is the signal real?

Check: If $X_{-k} = X_k^*$ for all k, signal is real.

## Key Formulas

| Property | Time Domain | Fourier Coefficients |
|----------|-------------|---------------------|
| Linearity | αx(t) + βy(t) | αXk + βYk |
| Time Shift | x(t - t₀) | Xk·e^(-jkω₀t₀) |
| Time Reversal | x(-t) | X₋k |
| Time Scaling | x(αt) | Xk with αω₀ |
| Conjugate | x*(t) | Xk* |
| Real signals | x(t) = x*(t) | X₋k = Xk* |

## Common Mistakes

1. **Wrong sign in time shift:** It's e^(-jkω₀t₀), not e^(+jkω₀t₀)
2. **Forgetting ω₀ requirement:** Linearity only works if signals share the same ω₀
3. **Confusing scaling:** Time scaling changes ω₀, not the Xk values
4. **Phase calculation:** Watch the linear phase term -kω₀t₀

## Practice Problems

**Problem 1:** x(t) has X₁ = 3e^(jπ/4). Find coefficient at k=1 for x(t - T₀/8).

**Solution:**
$$Y_1 = X_1 \cdot e^{-j \cdot 1 \cdot \omega_0 \cdot T_0/8}$$
$$= 3e^{j\pi/4} \cdot e^{-j \cdot 2\pi/T_0 \cdot T_0/8}$$
$$= 3e^{j\pi/4} \cdot e^{-j\pi/4} = 3e^{j0} = 3$$

**Problem 2:** If x(t) is real and X₃ = 2 - j, what is X₋₃?

**Solution:** By conjugate symmetry:
$$X_{-3} = X_3^* = (2 - j)^* = 2 + j$$

**Problem 3:** y(t) = x(2t) where x(t) has ω₀ = 5 rad/s. What is y(t)'s fundamental?

**Solution:** New ω₀' = 2 × 5 = 10 rad/s

## Time-Shift Effects Summary

For x(t - t₀):
- |Yk| = |Xk| (magnitude unchanged)
- ∠Yk = ∠Xk - kω₀t₀ (phase shifts linearly with k)

Higher harmonics experience larger phase shifts!

## Exam Tips

- Draw a diagram of the original and transformed signal
- Identify which property applies
- Check units (t₀ should be in seconds, ω₀ in rad/s)
- Verify answers using conjugate symmetry for real signals
- Remember: time shift affects only phase, not magnitude
