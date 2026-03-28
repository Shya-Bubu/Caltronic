# Graphical and Bracketing Methods

> **Why This Matters**: Before you throw an iterative algorithm at an equation, you need some idea of where the root actually is. Graphical methods give you that intuition. Bracketing methods then turn intuition into a guaranteed computational procedure.

## Starting with the Equation Itself

The lecture begins with the most basic question in root-finding:

$$
f(x) = 0
$$

You are looking for the values of $x$ that make the function vanish. That sounds simple, but in practice the equation may be nonlinear, have multiple roots, or even have complex-valued roots that cannot be seen on the real line.

The lecturer starts with the model example

$$
f(x) = x^2 - 2
$$

because it lets you compare methods against the known answer $x^\ast = \sqrt{2}$.

## Direct Graphical Method

The most direct visual idea is to plot

$$
y = f(x)
$$

and find where it intersects the axis $y=0$.

[[visual:direct-graph-x2minus2]]

For $f(x)=x^2-2$, the graph is a parabola. Where it crosses the horizontal axis, the equation is solved. This does not immediately give machine-precision accuracy, but it gives you three important things:

- a rough numerical estimate of the root
- a sense of whether roots are isolated or repeated
- a good interval to use as a starting bracket

This may seem almost too basic, but it is exactly how many engineering workflows begin. You plot first so you do not iterate blindly.

## Indirect Graphical Method: Plotting $1 / |f(x)|$

The lecture then introduces a beautiful trick:

$$
y = \frac{1}{|f(x)|}
$$

Whenever $f(x)$ gets close to zero, this reciprocal becomes very large. So instead of looking for axis crossings, you now look for **sharp peaks**.

[[visual:reciprocal-peak-x2minus2]]

For the same equation $x^2-2=0$, the reciprocal plot creates tall spikes near $x=\pm\sqrt{2}$. The lecturer points out that this often makes root locations easier to detect than reading graph intersections by eye.

> **Key Insight**: The direct plot tells you where the function changes sign. The reciprocal plot tells you where the function nearly vanishes, even if the graph is shallow near the root.

That matters when the function touches the axis gently, or when several roots are close together.

## Multiple Roots Become Easy to See

The lecture note gives the polynomial

$$
f(x) = x^2(x-2)(x+1)
$$

and evaluates the reciprocal instead of the raw function. This is a smart move. On the ordinary plot, multiple roots can be hard to distinguish. On the reciprocal plot, each root becomes a prominent spike.

[[visual:multiple-roots-reciprocal]]

Now you can immediately recognize that this polynomial has zeros at

- $x=-1$
- $x=0$ with multiplicity 2
- $x=2$

Notice what the graph is teaching you. The method is not yet "solving" the problem exactly. It is diagnosing the structure of the root set.

## Extending the Idea to Complex Roots

The lecturer then extends the same reciprocal idea to the complex plane by taking

$$
z = x + jy
$$

and plotting

$$
\frac{1}{|f(z)|}
$$

for a complex-valued grid. For the example

$$
f(z)=z^2+z+1
$$

the peaks occur at the complex roots.

[[visual:complex-root-plane]]

This is one of those ideas that feels simple but is actually very powerful. A contour or surface of $1/|f(z)|$ converts hidden complex zeros into visible geometric features. That is why the lecture notes mention signal-processing applications: poles and zeros often live in the complex plane, and visual probing helps you understand them before formal analysis begins.

<details>
<summary><strong>Pause & Think</strong>: Why does the reciprocal plot fail exactly at a root?</summary>

At a root, $f(x)=0$, so the quantity $1/|f(x)|$ would become infinite. In computation, you never truly get infinity because you sample the graph at discrete points, but you do see very large peaks near the sampled points closest to the root.

</details>

## From Seeing a Root to Guaranteeing a Root

Graphical methods are excellent for intuition, but engineers usually need a repeatable numerical method. That is where **bisection** enters.

Suppose $f(x)$ is continuous on an interval $[x_L,x_H]$, and suppose

$$
f(x_L) < 0, \qquad f(x_H) > 0
$$

Then the Intermediate Value Theorem guarantees that at least one root lies between them.

This is the key fact that bisection exploits. Instead of guessing where the root is, you keep halving the interval that is known to contain it.

## The Bisection Update Rule

The midpoint is

$$
x = \frac{x_L + x_H}{2}
$$

You evaluate $f(x)$.

- If $f(x)<0$, the root must lie between $x$ and $x_H$, so set $x_L=x$
- If $f(x)>0$, the root must lie between $x_L$ and $x$, so set $x_H=x$
- If $f(x)=0$, you have landed on the exact root

[[visual:bisection-interval-halving]]

The lecture note runs this for $f(x)=x^2-2$ with the initial bracket $[0,2]$. The iterates move like this:

| Step | Interval | Midpoint |
|------|----------|----------|
| Start | $[0,2]$ | $1$ |
| 1 | $[1,2]$ | $1.5$ |
| 2 | $[1,1.5]$ | $1.25$ |
| 3 | $[1.25,1.5]$ | $1.375$ |
| 4 | $[1.375,1.5]$ | $1.4375$ |

You can feel the logic here: every evaluation buys you one more bit of localization.

## Why Bisection Is So Dependable

The interval width obeys a simple law:

$$
|a_k-b_k| = \frac{1}{2^k}|a_0-b_0|
$$

If the true root is $x^\ast$, then it always remains trapped inside the interval, so the midpoint error satisfies

$$
\boxed{|x_k-x^\ast| \leq \frac{b-a}{2^{k+1}}}
$$

[[visual:bisection-error-decay]]

This is a wonderful engineering guarantee. It means the error shrinks predictably, iteration by iteration, regardless of the detailed curvature of the function.

The lecture note makes the estimate concrete:

- since $2^{10}=1024$, about 10 halvings improve the estimate by roughly $10^3$
- since $2^{20}\approx 10^6$, about 20 halvings improve it by roughly one million

That is not spectacularly fast, but it is extremely reliable.

> **Watch Out**: Bisection does **not** require derivatives, and it does **not** care about tangent geometry. But it **does** require a continuous real function and a sign change across the initial interval.

## MATLAB View of the Algorithm

The code in the lecture note is intentionally simple:

```matlab
f = @(x)[x.^2 - 2];
xL = 0;
xH = 2;
THRESH = 1e-3;

while abs(xL - xH) > THRESH
  x = (xL + xH)/2;
  if f(x) < 0
    xL = x;
  elseif f(x) > 0
    xH = x;
  else
    return
  end
end
```

This code reflects the theory exactly. The stopping rule is based on interval width, not on derivative information, and not even directly on the residual $f(x)$.

## When to Use These Methods

[[visual:method-role-map]]

Graphical and bracketing methods are ideal when:

- you are meeting the equation for the first time
- you want to detect how many real roots may exist
- you need a safe starting point for a faster method later
- the derivative is unavailable or unreliable

They are weaker when:

- you need many digits of accuracy quickly
- function evaluation is expensive and every iteration matters
- the important roots are complex and require more than real-axis scanning

## Summary

Here are the main takeaways from this concept:

- Plotting $y=f(x)$ is the simplest root-finding diagnostic tool
- Plotting $1/|f(x)|$ often makes roots easier to detect, especially multiple or closely spaced ones
- The same reciprocal idea extends to complex roots through $z=x+jy$
- Bisection converts a sign-changing bracket into a guaranteed iterative solver
- Its midpoint error satisfies

$$
\boxed{|x_k-x^\ast| \leq \frac{b-a}{2^{k+1}}}
$$

- Bisection is dependable because the root always stays trapped inside the interval

This is the calm, careful side of equation solving. In the next concept, we move to faster methods that use more information and therefore demand more caution.
