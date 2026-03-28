# Gradient Methods and the Step-Size Parameter

> **Why This Matters**: Gradient methods are among the simplest optimization algorithms you will ever meet, but they are also among the most widely used. Their whole success depends on one deceptively small symbol: $\mu$, the step size.

## The Basic Gradient Updates

The lecture introduces the two primary first-order optimization updates for a single-variable function:

For minimization,

$$
\boxed{x_{k+1}=x_k-\mu f'(x_k)}
$$

For maximization,

$$
\boxed{x_{k+1}=x_k+\mu f'(x_k)}
$$

with $\mu>0$.

[[visual:gradient-descent-ascent-rules]]

These formulas are wonderfully intuitive. If the derivative is positive, the function is increasing as you move right. So for minimization you move left, which is exactly what subtracting $\mu f'(x_k)$ does. For maximization you reverse the sign and move uphill instead.

## Why the Sign of the Derivative Controls Direction

The lecture includes a sign-based picture showing forward and backward moves under different derivative signs.

For minimization:

- if $f'(x_k)>0$, move backward
- if $f'(x_k)<0$, move forward

For maximization, the directions reverse.

[[visual:direction-from-slope-sign]]

This is one of those ideas that seems simple but is actually very deep. The algorithm is not guessing. It is using the derivative as a local directional indicator.

## The Role of μ

Now here is where the lecture becomes truly computational. The parameter $\mu$ sets how far you move in the chosen direction.

- small $\mu$ means cautious movement
- large $\mu$ means aggressive movement

[[visual:step-size-effect]]

If $\mu$ is too small, progress is slow.

If $\mu$ is too large, the iterates can overshoot the optimum and oscillate or diverge.

That makes $\mu$ more than a tuning convenience. It is part of the method itself.

## Local Convergence Analysis Near the Optimum

The lecture assumes $x^\ast$ is the optimum and expands the derivative near that point:

$$
f'(x_k)=f'(x^\ast)+(x_k-x^\ast)f''(x^\ast)+\frac{1}{2}(x_k-x^\ast)^2f'''(x^\ast)+\mathcal{O}((x_k-x^\ast)^3)
$$

Since $f'(x^\ast)=0$, the dominant term is controlled by $f''(x^\ast)$.

Substituting this into the gradient update gives

$$
|x_{k+1}-x^\ast| \leq |x_k-x^\ast|\,|1\pm \mu f''(x^\ast)|
$$

[[visual:local-gradient-convergence]]

This immediately shows two things:

- the convergence is **linear**
- the contraction depends on the curvature and the step size

This is the optimization version of the fixed-point analysis from lesson 05.

## The Step-Size Bound

From the condition for contraction, the lecture derives

$$
-1<1\pm \mu f''(x^\ast)<1
$$

which gives the practical local condition

$$
\boxed{0<\mu<\frac{2}{|f''(x^\ast)|}}
$$

[[visual:step-size-stability-bound]]

This formula is extremely important. It says the allowed step size is controlled by curvature.

- large curvature means you need a smaller step
- small curvature lets you take a larger step

That is exactly what your physical intuition should expect. If the objective changes sharply, large jumps are dangerous.

## Why the Lecture Recommends a Conservative Choice

The lecture then adds an important engineering note. Over a whole interval $[a,b]$, you may estimate curvature using something like

$$
\max_{x\in[a,b]} |f''(x)|
$$

but this may still be a rough estimate. So the lecturer recommends the safer practice

$$
\boxed{0<\mu \ll \frac{2}{\max_{x\in[a,b]}|f''(x)|}}
$$

[[visual:conservative-step-size]]

That "much less than" sign is a practical design recommendation, not only a theorem. It reflects the fact that real computations are not performed in a perfect asymptotic neighborhood of the optimum.

> **Watch Out**: A step size that looks allowed by a rough bound may still behave badly away from the optimum. Local convergence analysis is powerful, but it is still local.

## Gradient Ascent and Descent Are Structurally Similar

The lecture presents minimization and maximization separately, but the analysis leads to a pleasing symmetry.

- at a minimum, $f''(x^\ast)>0$
- at a maximum, $f''(x^\ast)<0$

Yet in both cases, the local step-size condition ends up with the same magnitude bound:

$$
0<\mu<\frac{2}{|f''(x^\ast)|}
$$

[[visual:min-max-symmetry]]

So the algorithmic difference between ascent and descent is only the sign in front of the derivative. The underlying stability story is the same.

<details>
<summary><strong>Pause & Think</strong>: Why does a large curvature require a smaller step size?</summary>

Because the derivative changes rapidly when curvature is large. If you use a large step in a highly curved region, the update can jump past the optimum and turn a correcting move into an oscillation.

</details>

## Summary

This concept gives you the core practical first-order optimization algorithm:

$$
\boxed{x_{k+1}=x_k\mp \mu f'(x_k)}
$$

with the upper sign used for ascent and the lower sign used for descent.

The lecture's main conclusions are:

- gradient methods use derivative sign and magnitude to choose direction and step length
- the step-size parameter $\mu$ controls both speed and stability
- the local convergence is linear
- the key local condition is

$$
\boxed{0<\mu<\frac{2}{|f''(x^\ast)|}}
$$

- in practice, a more conservative step size is usually safer over a full interval

This is the most accessible optimization method in the lesson, and it is also one of the most important. The final concept will show how you can keep the same optimization goal while either approximating the gradient or using Newton's richer local information.
