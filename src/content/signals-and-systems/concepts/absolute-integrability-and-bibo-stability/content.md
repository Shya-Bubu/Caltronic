## From Internal Decay to Input-Output Safety

So far, stability has been discussed in terms of the impulse response and pole locations. That already tells you a lot. But in engineering practice we often ask a more operational question:

> If the input is bounded, can the output still blow up?

That question leads to **BIBO stability**, which stands for **Bounded-Input Bounded-Output stability**.

The note connects BIBO stability to one very useful condition:

$$
\int_0^\infty |h(t)|\,dt \le C
$$

for some finite constant $C$.

If that integral is finite, the impulse response is called **absolutely integrable**. The note then uses convolution to show that this guarantees BIBO stability.

[[visual:integrability-note-gallery]]

## Why Absolute Integrability Matters

For a causal LTI system,

$$
y(t) = \int_0^\infty h(\tau)x(t-\tau)\,d\tau
$$

Take absolute values:

$$
|y(t)| \le \int_0^\infty |h(\tau)x(t-\tau)|\,d\tau
$$

and use the basic inequality $|ab| = |a||b|$:

$$
|y(t)| \le \int_0^\infty |h(\tau)|\,|x(t-\tau)|\,d\tau
$$

Now suppose the input is bounded, meaning

$$
|x(t)| \le M
$$

for some finite constant $M$. Then every shifted copy also satisfies

$$
|x(t-\tau)| \le M
$$

so

$$
|y(t)| \le M \int_0^\infty |h(\tau)|\,d\tau
$$

If the integral is finite, then the right-hand side is finite. Therefore the output is bounded.

That is the whole BIBO argument.

## The Result in Plain Language

If the total area under $|h(t)|$ is finite, the system cannot amplify a bounded input into an infinite output. The convolution integral only accumulates a finite weighted amount of input history.

This is one of those results that looks technical but is actually very intuitive. If the impulse response keeps enough "mass" forever, then the system keeps too strong a memory of the past and can accumulate unbounded effects. If the impulse response is absolutely integrable, that memory is limited.

[[visual:absolute-integrability-comparison]]

## BIBO Stability Is a Different Lens

It is important not to blur every kind of stability into one sentence. Asymptotic stability talks about whether the natural response dies away. BIBO stability talks about whether bounded inputs stay safe at the output.

For the finite-dimensional systems in this course, these ideas are strongly connected. But the BIBO test is especially useful because it is phrased directly in the language of system behaviour:

- bounded input
- bounded output
- guaranteed by absolute integrability of $h(t)$

That makes it a practical criterion when you are thinking about filters and signal-processing blocks rather than just pole maps.

## Two Contrasting Examples

### Example 1: Stable exponential impulse response

Let

$$
h(t) = e^{-t}u(t)
$$

Then

$$
\int_0^\infty |h(t)|\,dt = \int_0^\infty e^{-t}\,dt = 1
$$

which is finite. So the system is BIBO stable.

### Example 2: Non-integrable impulse response

Now imagine

$$
h(t) = u(t)
$$

Then

$$
\int_0^\infty |h(t)|\,dt = \int_0^\infty 1\,dt
$$

which diverges. The system keeps accumulating the past forever. That violates the absolute integrability condition and should immediately make you suspicious about BIBO behaviour.

[[visual:bibo-bound-illustration]]

## Connecting This Back to Poles

Everything in this lesson is really saying the same thing from different angles.

- pole location tells you what modes appear
- those modes tell you whether $h(t)$ decays or grows
- the overall shape of $h(t)$ tells you whether $|h(t)|$ is integrable
- absolute integrability tells you whether bounded inputs remain bounded

So BIBO stability is not a separate universe. It is the input-output face of the same underlying system dynamics.

## Why the Proof Matters

You might be tempted to memorize only the final line:

$$
h(t) \text{ absolutely integrable } \Rightarrow \text{ BIBO stable}
$$

Please do memorize that line, but also keep the proof idea in your head. It is just an inequality argument inside convolution. That makes it reliable. If you ever forget the exact theorem statement, you can reconstruct it from first principles:

1. write the convolution integral
2. take absolute values
3. bound the input by $M$
4. factor $M$ out
5. ask whether the remaining integral is finite

That is an exam-safe way to rebuild the result under pressure.

[[visual:lesson-note-page-19]]

## The Engineering Takeaway

BIBO stability gives you a clean promise about system behaviour: if the excitation stays under control, the response stays under control too.

That is exactly the kind of promise engineers need. It tells you that the system is not hiding some dangerous amplification mechanism that only appears after enough time has passed.

So when you look at an impulse response, ask two questions:

- does it decay?
- is its absolute area finite?

If the answer to the second question is yes, you have one of the strongest practical stability guarantees in the course.
