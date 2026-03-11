# Convolution → Multiplication: The Laplace Domain

> **Why This Matters**: Convolution is powerful in theory, but it's a nightmare to compute in practice — you need to flip a function, slide it, multiply, and integrate for every single output value. The Laplace transform performs a mathematical miracle: it converts convolution (an integral) into simple multiplication (algebra). This single fact is why the Laplace transform is the most important tool in linear systems engineering.

## The Problem with Time-Domain Convolution

You've seen that for an LTI system:

$$y(t) = \int_{-\infty}^{\infty} x(\tau) \, h(t - \tau) \, d\tau$$

This works perfectly in theory. But try computing it for even moderately complex signals and you'll quickly see why engineers needed a better approach. The integral requires flipping, shifting, and integrating — often piecewise — for every value of $t$.

[[visual:convolution-difficulty]]

As the lecture notes say: **"Convolution operation is complex to perform in the time domain."**

## The Laplace Transform of Convolution

Here's the key derivation. Start with the convolution output and take its Laplace transform:

$$Y(s) = \mathcal{L}\{y(t)\} = \int_{-\infty}^{\infty} y(t) e^{-st} \, dt$$

Substitute the convolution integral for $y(t)$:

$$Y(s) = \int_{-\infty}^{\infty} \left[\int_{-\infty}^{\infty} x(\tau) h(t - \tau) \, d\tau \right] e^{-st} \, dt$$

[[visual:lecture-page-6]]

Now swap the order of integration (Fubini's theorem justifies this for well-behaved signals):

$$Y(s) = \int_{-\infty}^{\infty} x(\tau) \left[\int_{-\infty}^{\infty} h(t - \tau) e^{-st} \, dt \right] d\tau$$

Focus on the inner integral. Let $u = t - \tau$, so $dt = du$:

$$\int_{-\infty}^{\infty} h(t - \tau) e^{-st} \, dt = \int_{-\infty}^{\infty} h(u) e^{-s(u + \tau)} \, du = e^{-s\tau} \int_{-\infty}^{\infty} h(u) e^{-su} \, du$$

That last integral is exactly $H(s)$ — the Laplace transform of $h(t)$!

$$\int_{-\infty}^{\infty} h(t - \tau) e^{-st} \, dt = H(s) \cdot e^{-s\tau}$$

Substituting back:

$$Y(s) = \int_{-\infty}^{\infty} x(\tau) \cdot H(s) \cdot e^{-s\tau} \, d\tau = H(s) \int_{-\infty}^{\infty} x(\tau) e^{-s\tau} \, d\tau$$

[[visual:derivation-steps-plotly]]

And that integral is $X(s)$! So:

$$\boxed{Y(s) = H(s) \cdot X(s)}$$

> **Key Insight**: This is the **convolution theorem** — convolution in time becomes multiplication in the Laplace domain. This single equation transforms a complex integral computation into simple algebra. You'll use this formula more than almost any other in this course.

## Commutativity in Both Domains

Since convolution is commutative:

$$y(t) = h(t) * x(t) = x(t) * h(t)$$

In the Laplace domain:

$$Y(s) = H(s) \cdot X(s) = X(s) \cdot H(s)$$

Multiplication is commutative, so everything is consistent.

[[visual:commutativity-plotly]]

<details>
<summary><strong>Pause & Think</strong>: You know that Y(s) = H(s)·X(s). What does this suggest about finding h(t) from a known input-output pair?</summary>

Rearranging: $H(s) = Y(s)/X(s)$. If you know the Laplace transforms of both the input and the output, you can find the transfer function by division. Then inverse Laplace transform gives you $h(t)$. This is incredibly practical — measure the input and output, compute their ratio in the s-domain, and you've characterised the entire system.

</details>

## The Complete Framework

Let's step back and see the full picture:

| Domain | System relation | Operation |
|--------|----------------|-----------|
| **Time** | $y(t) = x(t) * h(t)$ | Convolution (integral) |
| **Laplace** | $Y(s) = H(s) \cdot X(s)$ | Multiplication (algebra) |

The Laplace transform acts as a bridge between the time domain (physical reality) and the s-domain (mathematical convenience):

$$x(t) \xrightarrow{\mathcal{L}} X(s) \xrightarrow{\times H(s)} Y(s) \xrightarrow{\mathcal{L}^{-1}} y(t)$$

[[visual:framework-bridge]]

This is the standard workflow for analysing LTI systems:
1. Transform the input to the s-domain: $X(s) = \mathcal{L}\{x(t)\}$
2. Multiply by the transfer function: $Y(s) = H(s) \cdot X(s)$
3. Inverse transform to get the output: $y(t) = \mathcal{L}^{-1}\{Y(s)\}$

<details>
<summary><strong>Pause & Think</strong>: Why not just always work in the Laplace domain?</summary>

While the Laplace domain simplifies convolution, you eventually need the time-domain output $y(t)$ — that's the actual physical signal the circuit produces. The inverse Laplace transform can be challenging (partial fractions, contour integration), so there's a trade-off. But for most engineering problems, the s-domain approach is far easier than direct convolution.

</details>

[[visual:workflow-plotly]]

## Summary

- Convolution in time domain is computationally expensive
- The **Laplace transform** converts convolution to multiplication: $Y(s) = H(s) \cdot X(s)$
- The derivation: swap integration order, change variables, factor out $H(s)$ and $X(s)$
- Convolution is commutative in both domains
- Standard workflow: $x(t) \xrightarrow{\mathcal{L}} X(s) \xrightarrow{\times H(s)} Y(s) \xrightarrow{\mathcal{L}^{-1}} y(t)$
- This is the foundation for transfer function analysis of circuits
