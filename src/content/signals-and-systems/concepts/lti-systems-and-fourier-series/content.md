## 📋 Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

- LTI systems: linearity and time-invariance
- Impulse response $h(t)$ and convolution: $y(t) = x(t) * h(t)$
- Eigenfunctions of LTI systems: $e^{st}$ is an eigenfunction with eigenvalue $H(s)$
- EFS: $x(t) = \sum_k X_k\,e^{jk\omega_0 t}$
- Frequency response: $H(j\omega) = \int h(t)\,e^{-j\omega t}\,dt$

</details>

---

## 🎯 The Big Idea

What happens when you pass a periodic signal through an LTI system?

The answer is beautifully simple: **each FS coefficient gets multiplied by the system's frequency response at that harmonic frequency.** The output is still periodic with the same period, and its FS coefficients are:

$$Y_k = H(jk\omega_0) \cdot X_k$$

This is the payoff for all the FS machinery — it turns convolution into multiplication.

---

## 📖 Why Complex Exponentials Are Special

### Eigenfunctions of LTI Systems

If you input $e^{st}$ into an LTI system, the output is:

$$y(t) = H(s)\,e^{st}$$

The complex exponential passes through unchanged in shape, only scaled by the complex number $H(s)$. This is the eigenfunction property.

For Fourier analysis, set $s = j\omega$:

$$e^{j\omega t} \xrightarrow{H} H(j\omega)\,e^{j\omega t}$$

The basis function $e^{j\omega t}$ is an eigenfunction with eigenvalue $H(j\omega)$.

---

## 📖 Periodic Input Through an LTI System

### Setup

Input: $x(t) = \sum_k X_k\,e^{jk\omega_0 t}$ (periodic, EFS known)

System: LTI with frequency response $H(j\omega)$

### Derivation

By **linearity**, the output is the sum of responses to each harmonic:

$$y(t) = \sum_k X_k \cdot H(jk\omega_0)\,e^{jk\omega_0 t}$$

This is itself an EFS! So the output FS coefficients are:

$$\boxed{Y_k = H(jk\omega_0) \cdot X_k}$$

### What This Means

| Input harmonic | System effect | Output harmonic |
|:---:|:---:|:---:|
| $X_k\,e^{jk\omega_0 t}$ | Multiplied by $H(jk\omega_0)$ | $Y_k\,e^{jk\omega_0 t}$ |

- $|Y_k| = |H(jk\omega_0)| \cdot |X_k|$ — each harmonic's amplitude is scaled
- $\angle Y_k = \angle H(jk\omega_0) + \angle X_k$ — each harmonic's phase is shifted
- The **output is still periodic** with the same period $T_0$

---

## 📖 Practical Interpretation

### No Convolution Needed!

In the time domain, you'd need to compute $y(t) = x(t) * h(t)$ (convolution integral — tedious).

In the FS domain: just multiply each coefficient by the corresponding frequency response value. This is why Fourier analysis is so powerful for LTI system analysis.

### Filtering Perspective

An LTI system acts as a **frequency-selective filter** on the FS:

- **Lowpass filter**: $|H(jk\omega_0)|$ decreases with $k$ → attenuates high harmonics → smoothing
- **Highpass filter**: $|H(jk\omega_0)|$ increases with $k$ → amplifies high harmonics → sharpening
- **Bandpass filter**: $|H(jk\omega_0)|$ peaks at certain $k$ → selects specific harmonics

This connects directly to the differentiation (highpass) and integration (lowpass) properties — they are just special LTI systems!

---

## 📖 Example: RC Lowpass Filter

Consider an RC circuit with:

$$H(j\omega) = \frac{1}{1 + j\omega RC}$$

If the input is a square wave with $X_k = \frac{\sin(k\omega_0 T_1)}{k\pi}$, then:

$$Y_k = \frac{1}{1 + jk\omega_0 RC} \cdot \frac{\sin(k\omega_0 T_1)}{k\pi}$$

For large $k$: $|H(jk\omega_0)| \approx \frac{1}{k\omega_0 RC} \to 0$. The high harmonics are heavily attenuated.

Result: the sharp square wave becomes a smooth, rounded waveform. **This is exactly what you see on an oscilloscope when you put a square wave through an RC filter!**

---

## 📖 Output Power via Parseval's Theorem

Combining with Parseval's:

$$P_{out} = \sum_k |Y_k|^2 = \sum_k |H(jk\omega_0)|^2 \cdot |X_k|^2$$

Each harmonic's power is scaled by $|H(jk\omega_0)|^2$. This lets you compute output power without finding $y(t)$ in the time domain.

---

## ⚠️ Common Mistakes

| Mistake | Correction |
|---------|-----------|
| Trying to convolve in the time domain | Use $Y_k = H(jk\omega_0)X_k$ — much simpler |
| Forgetting that $H$ is evaluated at discrete frequencies $k\omega_0$ | Not at all $\omega$, just at the harmonic frequencies |
| Assuming the output period changes | The output has the same period $T_0$ as the input |
| Computing $H(j\omega_0)$ only once | Must evaluate $H$ at every $k\omega_0$ separately |

---

## 📝 Summary

- **Key result**: $Y_k = H(jk\omega_0) \cdot X_k$ — multiplication replaces convolution
- The output is periodic with the same period as the input
- LTI systems act as frequency-selective filters on the FS coefficients
- Lowpass → smooth output; highpass → sharp output; bandpass → selective
- Output power: $P_{out} = \sum |H(jk\omega_0)|^2 |X_k|^2$
- This is the foundation for frequency-domain system analysis
