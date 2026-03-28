# Higher-Order Methods and Convergence Properties

> **Why This Matters**: Fast numerical methods are not magic. Their speed comes from how much local information they exploit and from how the error transforms from one iteration to the next. This concept closes the lesson by showing how higher derivatives create higher-order root updates, and how the lecture proves the convergence behavior of the main methods.

## Moving Beyond First-Order Taylor Approximation

Newton-Raphson came from truncating Taylor's theorem after the linear term. The lecture now asks: what if you keep one more term?

Starting at $x_0$, the second-order expansion is

$$
f(x)=f(x_0)+(x-x_0)f'(x_0)+\frac{1}{2}(x-x_0)^2f''(x_0)+\mathcal{O}((x-x_0)^3)
$$

Assume the cubic and higher-order terms are negligible, and impose the root condition $f(x)=0$. Then the unknown correction must satisfy a quadratic relation rather than a linear one.

This is the basic idea behind **Newton-like higher-order methods**. Instead of using only slope, you also use curvature.

## Halley's Method from the Second-Order Expansion

The lecture carefully manipulates the second-order Taylor equation and substitutes a Newton-style estimate into the denominator where needed. After simplification, it reaches

$$
\boxed{x_{k+1}=x_k-\frac{2f(x_k)f'(x_k)}{2(f'(x_k))^2-f(x_k)f''(x_k)}}
$$

This is **Halley's method**.

[[visual:halley-vs-newton-error]]

It resembles Newton-Raphson, but there is one more derivative and a more elaborate denominator. That extra complexity is there for a reason: for a simple root, Halley's method achieves **cubic** local convergence, while Newton is only quadratic.

So the trade-off becomes clear:

- Newton is simpler and already very fast
- Halley is more algebraically demanding but can converge even faster near the root

## Another Route to the Same Formula

The lecture also derives Halley's method by solving the second-order Taylor approximation as a quadratic in $(x_{k+1}-x_k)$ and then simplifying the square-root expression through binomial expansion.

That derivation matters because it reveals a deeper idea:

- Newton-Raphson appears when you keep only the first correction term
- Halley's method appears when you keep one more term in the approximation

So higher-order methods are not unrelated tricks. They are part of a hierarchy built from richer local approximations.

> **Key Insight**: The order of the method reflects how many powers of the current error are canceled by the update law.

## Householder's Methods: The General Family

The lecture then introduces the broader **Householder family**. The derivation starts from the assumption that a simple root $x=a$ exists, so

$$
f(x)=(x-a)p(x)
$$

and then studies

$$
F(x)=\frac{1}{f(x)}
$$

through its derivatives. By comparing asymptotic patterns in the derivatives of $F(x)$, the lecture arrives at the general Householder iteration

$$
x_{k+1}=x_k+\ell \frac{F^{(\ell-1)}(x_k)}{F^{(\ell)}(x_k)}
$$

and proves that its local convergence order is

$$
\boxed{\mathcal{O}((x-a)^{\ell+1})}
$$

[[visual:householder-order-comparison]]

Two special cases are especially important:

- $\ell=1$ gives Newton-Raphson with quadratic order
- $\ell=2$ gives Halley's method with cubic order

This is a lovely structural result. It shows Newton and Halley are not isolated formulas. They belong to a systematic ladder of methods.

## Revisiting Bisection Convergence

The lecture does not stop with formulas. It also proves convergence properties method by method.

For bisection, the interval endpoints satisfy

$$
|a_k-b_k|=\frac{1}{2^k}|a_0-b_0|
$$

and because the true root remains inside the interval, the midpoint error satisfies

$$
|x_k-x^\ast|\leq\frac{b-a}{2^{k+1}}
$$

[[visual:bisection-linear-convergence]]

The lecture then shows a rate statement of the form

$$
|x_{k+1}-x^\ast|\leq \frac{1}{2}|x_k-x^\ast|
$$

which means bisection has **linear** convergence.

That is the formal version of the engineering intuition you already had: every step halves the uncertainty, but no step does anything more dramatic than that.

## Fixed-Point Convergence Revisited

For the fixed-point iteration

$$
x_{k+1}=x_k-\mu f(x_k)
$$

the lecture expands $f(x_k)$ around the root $x^\ast$ with $f(x^\ast)=0$ and obtains

$$
|x_{k+1}-x^\ast|\leq |1-\mu f'(x^\ast)|\,|x_k-x^\ast|
$$

provided the higher-order terms remain small.

[[visual:fixed-point-convergence-factor]]

So fixed-point iteration is again **linear**, with contraction factor

$$
\boxed{|1-\mu f'(x^\ast)|}
$$

This factor tells you more than "does it converge?" It tells you **how strongly** it contracts near the solution. A factor close to zero means fast linear convergence. A factor close to one means painfully slow convergence.

The lecture also warns about a subtle case: if $f'(x^\ast)=0$, fixed-point iteration may fail to converge. That issue often appears near multiple roots.

## Why Multiple Roots Are Difficult

The notes point out that if $x^\ast$ is a double root, then

$$
f(x)=(x-x^\ast)^2 g(x)
$$

which forces

$$
f'(x^\ast)=0
$$

That matters because many local convergence formulas assume a nonzero derivative at the root. Once that assumption breaks, the elegant convergence story can weaken or collapse.

This is why multiple roots often make otherwise strong methods behave disappointingly.

## Newton-Raphson Has Quadratic Convergence

The lecture then gives the classic local analysis of Newton's method by expanding both numerator and denominator around a simple root $x^\ast$ with $f'(x^\ast)\neq 0$.

After careful algebra, the dominant term becomes

$$
\boxed{|x_{k+1}-x^\ast|\leq \frac{1}{2}\left|\frac{f''(x^\ast)}{f'(x^\ast)}\right|\,|x_k-x^\ast|^2}
$$

[[visual:newton-quadratic-convergence]]

This is the signature result:

- bisection: linear
- fixed-point: linear
- Newton-Raphson: quadratic
- Halley: cubic

That hierarchy is the true summary of the lesson.

## Choosing the Right Method with Convergence in Mind

[[visual:method-selection-comparison]]

When you stand back and compare the methods, the decision depends on what you value most.

If you need certainty from minimal assumptions, choose bisection.

If you have a carefully designed mapping and want a flexible framework, fixed-point iteration is natural.

If you can evaluate derivatives and you are near a simple root, Newton is usually the practical sweet spot.

If second derivatives are cheap and local refinement is the goal, Halley or another Householder method becomes attractive.

## Summary

This final concept completes the lesson's convergence story:

- keeping second-order Taylor information leads to Halley's method
- Householder's family generalizes Newton and Halley into a hierarchy
- bisection converges linearly because the bracket width halves each iteration
- fixed-point iteration converges linearly when the contraction factor stays below 1
- Newton-Raphson converges quadratically near a simple root
- multiple roots are difficult because derivative-based local assumptions can degenerate

The most important boxed results are

$$
\boxed{x_{k+1}=x_k-\frac{2f(x_k)f'(x_k)}{2(f'(x_k))^2-f(x_k)f''(x_k)}}
$$

$$
\boxed{|x_{k+1}-x^\ast|\leq \frac{1}{2}|x_k-x^\ast| \quad \text{(bisection)}}
$$

$$
\boxed{|x_{k+1}-x^\ast|\leq |1-\mu f'(x^\ast)|\,|x_k-x^\ast| \quad \text{(fixed point)}}
$$

$$
\boxed{|x_{k+1}-x^\ast|\leq C|x_k-x^\ast|^2 \quad \text{(Newton)}}
$$

That is the deeper message of the lecture: solving equations is not only about finding the next iterate. It is about understanding how the error itself evolves under the method you chose.
