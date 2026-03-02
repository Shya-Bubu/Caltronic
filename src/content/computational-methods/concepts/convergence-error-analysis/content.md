# Convergence and Error Analysis

> **Why This Matters**: Approximations are only useful if you can quantify *how wrong* they are. Convergence analysis tells you how the error shrinks as you add terms or iterate — and whether it shrinks at all. Without this analysis, you're flying blind: you might stop too early (bad accuracy) or iterate too long (wasted computation). This is the science behind knowing when your computation is "good enough."

## Two Faces of Big-O: Growth AND Error

In the previous concept, you learned Big-O for growth: $O(N^3)$ means "scales cubically." Now let's see Big-O's other personality — describing how *errors shrink*.

The idea is the same notation, but in the opposite direction:
- **Growth**: $f(N) = O(N^3)$ as $N \to \infty$ — cost grows with problem size
- **Error**: $\varepsilon_k = O(x^{k+1})$ as $x \to 0$ — error shrinks with more terms

This dual use of Big-O is one of the most powerful tools in numerical analysis.

## Case Study: Taylor Series for $e^x$

Let's work through the lecture notes' detailed example — approximating $e^x$ using a truncated Taylor series.

The $k$-term approximation is:

$$E_k = \sum_{m=0}^{k} \frac{x^m}{m!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots + \frac{x^k}{k!}$$

The exact value is $e^x = E_k + \varepsilon_k$, where the approximation error is everything we left out:

$$\boxed{\varepsilon_k(x) = \frac{x^{k+1}}{(k+1)!} + \frac{x^{k+2}}{(k+2)!} + \cdots = O(x^{k+1}) \quad \text{as } x \to 0}$$

[[visual:taylor-error-table]]

The lecture notes provide a detailed numerical table showing how the error decreases. Let's study it:

| Approximation | Error Order | $x = 2$ ($e^2 \approx 7.389$) | $x = 1$ ($e \approx 2.718$) | $x = 0.5$ ($e^{0.5} \approx 1.649$) |
|---------|------------|---------|---------|---------|
| $E_0 = 1$ | $O(x)$ | $\varepsilon_0 \approx 6.389$ | $\varepsilon_0 \approx 1.718$ | $\varepsilon_0 \approx 0.649$ |
| $E_1 = 1 + x$ | $O(x^2)$ | $\varepsilon_1 \approx 4.389$ | $\varepsilon_1 \approx 0.718$ | $\varepsilon_1 \approx 0.149$ |
| $E_2 = 1 + x + x^2/2$ | $O(x^3)$ | $\varepsilon_2 \approx 2.389$ | $\varepsilon_2 \approx 0.218$ | $\varepsilon_2 \approx 0.024$ |
| $E_3$ | $O(x^4)$ | $\varepsilon_3 \approx 1.056$ | $\varepsilon_3 \approx 0.052$ | $\varepsilon_3 \approx 0.003$ |

[[visual:error-vs-terms]]

Notice two striking patterns:
1. **For smaller $x$, convergence is faster**: At $x = 0.5$, three terms gives 0.2% error. At $x = 2$, the same three terms still have 14% error.
2. **Each additional term gains one power of $x$**: The error order goes from $O(x)$ to $O(x^2)$ to $O(x^3)$ to $O(x^4)$ — each term "buys" you one more power of accuracy.

<details>
<summary><strong>Pause & Think</strong>: For x = 0.1, how many Taylor terms do you need for the error to be less than 10⁻⁶?</summary>

The error is approximately $\varepsilon_k \approx \frac{x^{k+1}}{(k+1)!}$. With $x = 0.1$:

- $k = 0$: $\varepsilon \approx 0.1^1/1! = 0.1$
- $k = 1$: $\varepsilon \approx 0.1^2/2! = 0.005$
- $k = 2$: $\varepsilon \approx 0.1^3/6 \approx 1.7 \times 10^{-4}$
- $k = 3$: $\varepsilon \approx 0.1^4/24 \approx 4.2 \times 10^{-6}$
- $k = 4$: $\varepsilon \approx 0.1^5/120 \approx 8.3 \times 10^{-8}$ ✓

**Answer: 4-5 terms are sufficient.** For small $x$, convergence is extremely rapid because each term shrinks by a factor of $\sim x/(k+1)$.

</details>

## Graphical Exploration: The Log-Log Trick

The lecture notes introduce a powerful graphical technique. If error $= C \cdot x^m$, then taking logarithms:

$$\log(\text{error}) = \log C + m \cdot \log x$$

This is a straight line on a log-log plot with **slope = $m$** (the convergence order).

[[visual:loglog-error-plot]]

You can estimate the order from two data points:

$$\boxed{m \approx \frac{\log(\varepsilon(x_2)/\varepsilon(x_1))}{\log(x_2/x_1)}}$$

This is a practical technique: plot the error on a log-log scale, draw a straight line through the data points, and read off the slope. If the slope is 3, your error is $O(x^3)$.

[[visual:loglog-slope-demo]]

## The Analytic Proof: $\varepsilon_k = O(x^{k+1})$

The lecture notes provide an elegant proof using the geometric series bound. For fixed $k$ and $|x| \leq (k+2)/2$:

$$|\varepsilon_k| = \left|\frac{x^{k+1}}{(k+1)!} + \frac{x^{k+2}}{(k+2)!} + \cdots\right| \leq \frac{|x|^{k+1}}{(k+1)!}\left(1 + \frac{|x|}{k+2} + \frac{|x|^2}{(k+3)(k+2)} + \cdots\right)$$

Each ratio $\frac{|x|}{k+j} \leq \frac{1}{2}$ for $j \geq 2$, so the series is bounded by a geometric series:

$$|\varepsilon_k| \leq \frac{|x|^{k+1}}{(k+1)!}\left(1 + \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \cdots\right) = \frac{|x|^{k+1}}{(k+1)!} \times 2$$

$$\boxed{|\varepsilon_k| \leq \underbrace{\frac{2}{(k+1)!}}_{\text{constant w.r.t. } x} |x|^{k+1} = O(x^{k+1})}$$

[[visual:error-bound-visualization]]

> **Key Insight**: The bound $\frac{2}{(k+1)!}$ gets incredibly small incredibly fast. At $k = 5$: $2/720 \approx 0.003$. At $k = 10$: $2/39916800 \approx 5 \times 10^{-8}$. The factorial in the denominator guarantees convergence for *any* finite $x$.

## Convergence of Iterative Methods

Now let's shift from series to algorithms. An iterative method $f_k$ converges to value $P$ if:

$$\varepsilon_k = P - f_k \to 0 \quad \text{as } k \to \infty$$

The rigorous definition: for any threshold $\epsilon > 0$, there exists some $N_\epsilon$ such that $|P - f_k| < \epsilon$ for all $k > N_\epsilon$.

**The Practical Problem**: This criterion requires knowing $P$ — the exact answer we're trying to compute! Since we don't know $P$, we use a **surrogate criterion**:

$$\boxed{|f_k - f_{k-1}| < \epsilon}$$

[[visual:iterative-convergence]]

If successive approximations are getting close to each other, the sequence is converging. This is justified by the theory of **Cauchy sequences** — if $|f_k - f_{k-1}|$ gets arbitrarily small, the sequence converges to some limit.

### MATLAB Implementation (Directly from the Lecture Notes)

The lecture notes provide working MATLAB code for computing $e^{0.5}$ iteratively:

```matlab
THRESH = 1e-3;         % Convergence threshold
x = 0.5;               % Evaluation point
Eapprox = 1; Eprev = 0; n = 0;
while abs(Eprev - Eapprox) > THRESH
    n = n + 1;
    E = 1;
    for I = 1:n
        E = E * x / I;   % Compute x^n / n! iteratively
    end
    Eprev = Eapprox;
    Eapprox = Eapprox + E;
end
```

Output: `exp(0.5) = 1.648721; Eapprox = 1.648698 (error 0.000023) in 5 iterations`

[[visual:matlab-convergence-demo]]

<details>
<summary><strong>Pause & Think</strong>: The code computes x^n/n! as E = E*x/I in a loop. Why not compute x^n and n! separately?</summary>

Computing $x^n$ and $n!$ separately causes **overflow** for large $n$. At $n = 170$, $n! > 10^{308}$ exceeds the IEEE 64-bit double precision maximum. But the *ratio* $x^n/n!$ stays small (it goes to 0). By computing $E = E \times x/I$ iteratively, you never form the large intermediate values — each step multiplies the previous term by $x/n$, keeping the values manageable. This is a classic numerical stability technique.

</details>

## Rate of Convergence

The **rate** (or **order**) of convergence tells you how fast the error shrinks per iteration:

$$\boxed{|P - f_{k+1}| \leq C|P - f_k|^m \quad \text{as } k \to \infty}$$

[[visual:rate-of-convergence-comparison]]

| Rate $m$ | Name | Behavior | Example |
|----------|------|----------|---------|
| $m = 1$ | Linear | Error multiplied by constant $C < 1$ each step | Taylor series, bisection |
| $m = 2$ | Quadratic | Correct digits roughly **double** each step | Newton-Raphson |
| $m > 2$ | Superquadratic | Even faster | Modified Newton methods |

For the Taylor series: $m = 1$ (linear convergence). The lecture notes prove this analytically — the ratio $|\varepsilon_{k+1}/\varepsilon_k|$ approaches a constant as $k \to \infty$.

Despite the "linear" label, Taylor convergence is practically fast because the constant $C = |x|/(k+2) \to 0$ as $k$ grows — each successive step is more effective than the last.

<details>
<summary><strong>Pause & Think</strong>: Newton-Raphson has m = 2. If the error at step k is 10⁻³, what's the error at step k+3?</summary>

With quadratic convergence ($m = 2$, assuming $C \approx 1$):
- Step $k$: error $\approx 10^{-3}$ (3 correct digits)
- Step $k+1$: error $\approx (10^{-3})^2 = 10^{-6}$ (6 digits)
- Step $k+2$: error $\approx (10^{-6})^2 = 10^{-12}$ (12 digits)
- Step $k+3$: error $\approx (10^{-12})^2 = 10^{-24}$ (! — exceeds 64-bit precision)

**Three more iterations give you machine-precision accuracy.** This explosive convergence is why Newton-Raphson is the method of choice whenever derivatives are available.

</details>

## Summary

Here's what you need to remember from this concept:

- **Order of convergence**: The Taylor error is $\varepsilon_k = O(x^{k+1})$ — each additional term gains one power of accuracy
- **Log-log plots** reveal the convergence order as the slope: $m = \Delta(\log \varepsilon)/\Delta(\log x)$
- **Analytic error bound**: $|\varepsilon_k| \leq \frac{2}{(k+1)!}|x|^{k+1}$ — the factorial guarantees convergence for any $x$
- **Practical convergence criterion**: $|f_k - f_{k-1}| < \epsilon$ because we don't know the true answer $P$
- **Rate of convergence**: $|P - f_{k+1}| \leq C|P - f_k|^m$ — linear ($m=1$) vs. quadratic ($m=2$)
- Quadratic convergence doubles the number of correct digits per step — spectacularly fast

> **This concept is foundational** — every numerical method you'll study in future lessons will be analyzed using exactly these tools. You now have the mathematical framework to answer "how accurate is this?" and "how fast does it converge?" for any iterative algorithm.
