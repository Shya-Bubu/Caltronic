## Absolute Integrability and BIBO Stability

The note then introduces BIBO stability: bounded input should give bounded output.

The condition used in the lecture is

$$
\int_0^\infty |h(t)|\,dt \le C
$$

for some finite constant $C$. This means $h(t)$ is absolutely integrable.

[[visual:integrability-note-gallery]]

## Proof from Convolution

For a causal LTI system,

$$
y(t)=\int_0^\infty h(\tau)x(t-\tau)\,d\tau
$$

Taking absolute values,

$$
|y(t)|\le \int_0^\infty |h(\tau)|\,|x(t-\tau)|\,d\tau
$$

If the input is bounded, then

$$
|x(t)|\le M
$$

for some finite $M$, so

$$
|x(t-\tau)|\le M
$$

and therefore

$$
|y(t)|\le M\int_0^\infty |h(\tau)|\,d\tau
$$

If the integral is finite, then the output is bounded.

[[visual:absolute-integrability-comparison]]

So the lecture result is

$$
h(t)\ \text{absolutely integrable} \Rightarrow \text{BIBO stable}
$$

## What to Remember

The steps in the note are:

1. write convolution
2. take absolute values
3. bound the input by $M$
4. use the finite integral of $|h(t)|$

This gives the bounded-output conclusion directly.

[[visual:bibo-bound-illustration]]

The final criterion to remember is

$$
\int_0^\infty |h(t)|\,dt < \infty
$$

[[visual:lesson-note-page-19]]
