# Applications and Extensions of Methods for Solving Equations — Part I

> **What you're about to learn**: Root-finding does not end with equations of the form $f(x)=0$. This lesson shows one of its most important extensions: optimization. You will learn how minima and maxima can be located by turning an optimization problem into a derivative-zero problem, then solving it with gradient-based and Newton-based iterations.

## Why This Lesson Matters

In engineering, you are often not asked to "find the root" directly. You are asked to do something more practical:

- minimize power loss
- maximize gain
- tune a parameter for the best response
- choose a design variable that gives the smallest error

These are optimization tasks. The lecture note shows that the computational machinery from the previous lesson can be reused here with only a small but important shift in viewpoint.

If you want to optimize a single-variable function

$$
f:\mathbb{R}\to\mathbb{R}
$$

then the critical points satisfy

$$
f'(x)=0
$$

That is the bridge. Optimization becomes an application of equation solving.

## The Three Main Threads of the Lesson

This lesson is compact, but it contains three deep ideas:

| Thread | Main idea | Why it matters |
|--------|-----------|----------------|
| **Optimization as root-finding** | Minima and maxima are tied to $f'(x)=0$ | Reuses the equation-solving mindset from lesson 05 |
| **Gradient methods** | Move using the sign and size of the derivative | Gives a simple practical algorithm with controllable step size |
| **Newton and approximate gradients** | Use richer local information or derivative approximations | Improves speed or removes analytic derivative dependence |

## The Important Parameter: Step Size

The lecture places special emphasis on the parameter $\mu$. This may look like a small implementation detail, but it is actually one of the most important ideas in the whole lesson.

If $\mu$ is too small, the method crawls.

If $\mu$ is too large, the method overshoots or diverges.

If $\mu$ is chosen well, the iteration becomes a practical optimization tool.

That is why the lecturer derives bounds on $\mu$ instead of presenting it as an arbitrary tuning knob.

## What You Should Keep in Mind While Reading

As you move through the lesson, keep these questions active:

- how does optimization reduce to a derivative-zero condition?
- why does the sign of $f'(x)$ tell you which direction to move?
- why does the sign of $f''(x^\ast)$ distinguish minima from maxima?
- why do both gradient methods and Newton-like methods still depend on step size?
- what can you do when the gradient is hard to compute exactly?

> **Key Insight**: This lesson is not replacing root-finding. It is extending root-finding into one of the most useful tasks in engineering computation.

Once you see that connection, optimization stops feeling like a separate subject. It becomes another natural application of the same computational principles you already built.
