# Methods for Solving Equations

> **What you're about to learn**: A huge part of computational engineering comes down to one question: where does an equation become zero? This lesson turns that question into a practical toolkit. You will move from visual root hunting, to guaranteed bracketing, to fast open methods, to fixed-point thinking, and finally to higher-order updates that squeeze even more accuracy out of each iteration.

## Why This Lesson Matters

In electrical and electronic engineering, "solve the equation" is rarely an isolated algebra exercise. It appears everywhere:

- finding the operating point of a nonlinear diode or transistor model
- locating resonance or cutoff conditions in a design equation
- solving characteristic equations that define poles and stability
- computing parameter values where a specification is exactly met

The lecture notes for this week make an important shift. In the previous lesson, you learned the language of convergence and asymptotic behavior in general. Here, those ideas are attached to concrete algorithms:

- **Graphical methods** tell you where a root probably lives
- **Bisection** gives a safe, guaranteed way to trap a real root
- **Newton-Raphson and secant** trade some safety for speed
- **Fixed-point iteration** reframes root-finding as repeated self-mapping
- **Higher-order methods** show how Taylor expansion can produce even faster updates

## The Core Tension

Every equation-solving method lives inside the same engineering trade-off:

| Method family | Main strength | Main weakness |
|---------------|---------------|---------------|
| **Graphical** | Builds intuition, reveals multiple roots | Accuracy limited by plotting resolution |
| **Bracketing** | Guaranteed for sign-changing continuous roots | Only linear convergence |
| **Open methods** | Very fast near the solution | Can diverge from a poor initial guess |
| **Fixed-point** | Flexible theoretical framework | Sensitive to the choice of iteration function |
| **Higher-order** | Excellent local convergence | Needs more derivatives and more algebra |

That trade-off is the heart of computational methods. There is no universally best solver. There is only the method whose assumptions match the equation in front of you.

## The Running Example

The lecturer uses the simple but powerful example

$$
f(x) = x^2 - 2
$$

because it lets you see the whole process in a compact way:

- the root is known exactly: $x^\ast = \sqrt{2}$
- the graph is simple enough to visualize
- every method can be tested on the same target
- the convergence behavior becomes easy to compare

As you work through the lesson, keep asking one question:

> **Key Insight**: What information is each method using that the others are not?

That question will help you see why bisection needs only signs, Newton needs derivatives, secant approximates the derivative from data, and fixed-point iteration depends on the geometry of $g(x)$ against the line $y=x$.

## What to Watch For

By the end of this lesson, you should be comfortable with all of the following:

- turning a root-finding problem into a visual search
- explaining why $1 / |f(x)|$ highlights zeros so effectively
- deriving Newton-Raphson from Taylor expansion
- understanding why secant removes the derivative but keeps the same spirit
- checking a fixed-point iteration using slope and interval-mapping ideas
- connecting convergence order to practical speed

The ideas here may look procedural at first, but they are actually very deep. Once you understand them, you will start recognizing the same structure inside circuit simulators, nonlinear equation solvers, optimization routines, and even machine-learning training updates.
