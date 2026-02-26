# Pulling It All Together

You've completed the Fourier Transform toolkit. Let's see how all the pieces fit.

## The Complete FT Framework

| Tool | What It Does | Why You Care |
|------|-------------|-------------|
| **FT Definition** | $x(t) \to X(j\omega)$ | Converts time to frequency |
| **Inverse FT** | $X(j\omega) \to x(t)$ | Converts frequency back to time |
| **Linearity** | $ax + by \to aX + bY$ | Analyze complex signals component-by-component |
| **Time Shift** | $x(t-t_0) \to e^{-j\omega t_0} X$ | Delay adds linear phase |
| **Frequency Shift** | $e^{j\omega_0 t} x(t) \to X(j(\omega-\omega_0))$ | Modulation shifts spectrum |
| **Time Scaling** | $x(at) \to \frac{1}{|a|} X(j\omega/a)$ | Compression ↔ bandwidth expansion |
| **Differentiation** | $x'(t) \to j\omega X$ | Derivatives become multiplication |
| **Convolution** | $x * h \to X \cdot H$ | THE big result — convolution → multiplication |
| **Parseval's** | $E = \int |X(j\omega)|^2 d\omega / 2\pi$ | Energy from spectrum |

## The Frequency Response: Tying It All Together

The frequency response $H(j\omega)$ is the FT of the impulse response $h(t)$. For any LTI system:

$$Y(j\omega) = H(j\omega) \cdot X(j\omega)$$

This is the most important equation in signals and systems. It says: **to find the output, just multiply the input spectrum by the system's frequency response.** No convolution integral needed.

## Looking Ahead

With the FT complete, you're ready for the Laplace Transform — which generalizes the FT by replacing $j\omega$ with the complex variable $s = \sigma + j\omega$. The Laplace Transform can handle signals that the FT cannot (like growing exponentials and unstable systems), making it the foundation of control theory.
