# Open Methods and Fixed-Point Iteration

> **Why This Matters**: Bisection is safe, but sometimes you need speed. Open methods try to jump toward the root using local shape information. Fixed-point iteration then shows that many of those methods can be understood inside one broader framework.

## Newton-Raphson Starts from Taylor Expansion

The lecture derives Newton-Raphson from the first-order Taylor approximation around the current guess $x_0$:

$$
f(x) = f(x_0) + (x-x_0)f'(x_0) + \mathcal{O}((x-x_0)^2)
$$

If you ignore the higher-order terms and demand that the next point satisfy $f(x)\approx 0$, then

$$
0 \approx f(x_0) + (x-x_0)f'(x_0)
$$

Rearranging gives

$$
x \approx x_0 - \frac{f(x_0)}{f'(x_0)}
$$

Turning this into an iteration,

$$
\boxed{x_{k+1}=x_k-\frac{f(x_k)}{f'(x_k)}}
$$

[[visual:newton-tangent-geometry]]

This formula is one of the most famous in all of computational mathematics. Geometrically, you stand on the graph at $(x_k,f(x_k))$, draw the tangent line, and take the point where that tangent crosses the $x$-axis as the next guess.

That geometry is the reason Newton's method can be so fast. Instead of using only sign information, it uses the slope to predict where zero should be.

## Running Newton-Raphson on $x^2-2$

For the lecture's standard example,

$$
f(x)=x^2-2, \qquad f'(x)=2x
$$

the update becomes

$$
x_{k+1}=x_k-\frac{x_k^2-2}{2x_k}
$$

Starting from $x_0=1$, the lecture note gives:

- $x_1=1.5$
- $x_2\approx 1.416667$
- $x_3\approx 1.414216$

[[visual:newton-iteration-history]]

That speed is striking. In only a few steps, the estimate is already extremely close to $\sqrt{2}$.

> **Key Insight**: Newton-Raphson is fast because the tangent line contains local shape information that bisection deliberately ignores.

But that power has a price. If the initial guess is poor, or if $f'(x_k)$ is small, the method can jump away from the desired root rather than toward it.

## The Secant Method Removes the Exact Derivative

The next method in the lecture asks a practical question: what if derivatives are awkward to compute?

Instead of using $f'(x_k)$ directly, the secant method approximates it by a finite slope between the two most recent iterates:

$$
f'(x_k)\approx\frac{f(x_k)-f(x_{k-1})}{x_k-x_{k-1}}
$$

Substituting this into Newton's formula gives

$$
x_{k+1}=x_k-\frac{(x_k-x_{k-1})f(x_k)}{f(x_k)-f(x_{k-1})}
$$

which the lecture also writes as

$$
\boxed{x_{k+1}=\frac{x_{k-1}f(x_k)-x_kf(x_{k-1})}{f(x_k)-f(x_{k-1})}}
$$

[[visual:secant-geometry]]

The geometry has changed from a tangent to a line through two sampled points on the curve. That is why the method is called the **secant** method.

## Secant on the Same Example

Using $x_0=0$ and $x_1=1$ for the equation $x^2-2=0$, the lecture note shows the sequence:

- $x_2=2$
- $x_3\approx 1.333333$
- $x_4=1.4$
- $x_5\approx 1.414634$
- $x_6\approx 1.414211$

[[visual:secant-iteration-history]]

The secant method usually converges more quickly than bisection and often nearly as impressively as Newton, but it does not require an analytic derivative.

That makes it attractive in engineering settings where function evaluation is easy but symbolic differentiation is inconvenient.

## Newton vs. Secant

| Feature | Newton-Raphson | Secant |
|---------|----------------|--------|
| Uses derivative? | Yes | No exact derivative |
| Information per step | One point + slope | Two points + secant slope |
| Typical speed | Very fast locally | Fast locally |
| Main risk | Bad derivative or bad initial guess | Unstable early steps or poor point pair |

You can think of secant as a derivative-free Newton-like method.

## Fixed-Point Iteration: A Wider Lens

Now the lecture zooms out and introduces a much broader idea. A fixed-point iteration has the form

$$
\boxed{x_{k+1}=g(x_k)}
$$

If this converges to some limit $x^\ast$, then necessarily

$$
x^\ast = g(x^\ast)
$$

which means the solution is a **fixed point** of the mapping.

To connect this with root-finding, the lecture rewrites the original problem using

$$
g(x)=x-\mu f(x)
$$

so that

$$
x=g(x) \iff x-(x-\mu f(x))=0 \iff \mu f(x)=0
$$

and therefore, for nonzero $\mu$, the fixed point is a root of $f(x)=0$.

[[visual:fixed-point-cobweb]]

This is a powerful mental shift. You are no longer asking "how do I solve $f(x)=0$ directly?" You are asking "can I build a mapping that pulls iterates toward the solution?"

## Why the Slope of g(x) Matters

The lecture note emphasizes the local slope condition. If

$$
|g'(x)| \leq L < 1
$$

in the region of interest, then nearby points get pulled closer together:

$$
|g(x_k)-g(x_{k-1})| \leq L|x_k-x_{k-1}|
$$

Since $x_{k+1}=g(x_k)$, this implies

$$
|x_{k+1}-x_k|\leq L|x_k-x_{k-1}|
$$

So the difference between successive iterates shrinks geometrically. This is the contraction idea behind the Banach fixed-point theorem.

## Banach Fixed-Point Theorem in Engineering Language

The lecture states two conditions for convergence on an interval $[a,b]$:

- the mapping sends the interval into itself: $g([a,b])\subset [a,b]$
- there exists $0<\gamma<1$ such that $|g(x_1)-g(x_2)|\leq \gamma |x_1-x_2|$

This theorem is deeper than it first appears. It is not only about scalar intervals. The lecture notes remark that the same idea extends to higher-dimensional spaces and even spaces of functions. So fixed-point thinking is not a side topic. It is one of the central ideas behind numerical analysis.

## The Linear Example Shows the Role of μ

The lecture then studies the simple linear equation

$$
f(x)=ax+b
$$

and uses the fixed-point iteration

$$
x_{k+1}=x_k-\mu(ax_k+b)=(1-\mu a)x_k-\mu b
$$

By expanding the sequence, the lecture arrives at

$$
x_k=(1-\mu a)^k x_0-\frac{b}{a}\left(1-(1-\mu a)^k\right)
$$

So the iteration converges to $-b/a$ only when the geometric factor decays:

$$
|1-\mu a|<1
$$

which gives

$$
\boxed{0<\mu<\frac{2}{a}}
$$

[[visual:mu-parameter-behavior]]

This is an extremely important lesson. Even when the fixed point is correct, a poor choice of $\mu$ can make the method diverge.

## Back to the Nonlinear Example

For

$$
f(x)=x^2-2
$$

the lecture sets

$$
g(x)=x-\mu(x^2-2)
$$

and studies how the behavior changes with $\mu$. The notes highlight that convergence depends both on the slope condition and on whether the chosen interval maps into itself.

This is where fixed-point iteration becomes subtle. You are not only choosing an initial guess. You are choosing the **iteration law** itself.

> **Watch Out**: The same root-finding problem can converge beautifully or diverge badly depending on how you rewrite it as $x=g(x)$.

<details>
<summary><strong>Pause & Think</strong>: Why can two algebraically equivalent rearrangements of the same equation behave differently under fixed-point iteration?</summary>

Because fixed-point iteration depends on the geometry of g(x), especially the size of g'(x) near the fixed point. Two rearrangements may have the same solution but completely different slopes and interval-mapping behavior.

</details>

## Summary

This concept ties three major ideas together:

- Newton-Raphson comes from first-order Taylor linearization and uses derivative information directly
- Secant approximates the derivative using two recent points, making it derivative-free but still Newton-like
- Fixed-point iteration reframes root-finding as repeated application of a mapping $g(x)$

The key formulas to remember are

$$
\boxed{x_{k+1}=x_k-\frac{f(x_k)}{f'(x_k)}}
$$

$$
\boxed{x_{k+1}=x_k-\frac{(x_k-x_{k-1})f(x_k)}{f(x_k)-f(x_{k-1})}}
$$

$$
\boxed{x_{k+1}=g(x_k), \qquad g(x)=x-\mu f(x)}
$$

and the central fixed-point condition is

$$
\boxed{|g'(x)|<1 \text{ near the fixed point}}
$$

You now have the fast, locally intelligent side of equation solving. The final concept will show how these methods connect to higher-order Taylor ideas and to formal convergence rates.
