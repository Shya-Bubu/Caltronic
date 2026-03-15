## Integrability and Stability

The note then adds another condition based directly on the impulse response itself.

If

$$
\int_0^\infty |h(t)|\,dt \le C
$$

for some finite constant $C$, then $h(t)$ is absolutely integrable.

[[visual:integrability-note-gallery]]

The lecture first states that if $h(t)$ is absolutely integrable, then

$$
\lim_{t\to\infty} h(t)=0
$$

so the system is stable.

## BIBO Stability

After that, the note introduces bounded-input bounded-output stability and starts from the convolution integral

$$
y(t)=\int_0^\infty h(\tau)x(t-\tau)\,d\tau
$$

Taking absolute values gives

$$
|y(t)|\le \int_0^\infty |h(\tau)x(t-\tau)|\,d\tau
$$

and then

$$
|y(t)|\le \int_0^\infty |h(\tau)|\,|x(t-\tau)|\,d\tau
$$

[[visual:absolute-integrability-comparison]]

Now if the input is bounded, the note writes

$$
|x(t)|\le M
$$

for some finite value $M$. Then

$$
|x(t-\tau)|\le M
$$

and therefore

$$
|y(t)|\le M\int_0^\infty |h(\tau)|\,d\tau
$$

## Final Result

If $h(t)$ is absolutely integrable, the integral on the right is finite, so the output is bounded.

That is the conclusion written at the end of the note:

if $h(t)$ is absolutely integrable, a system is BIBO stable.

[[visual:bibo-bound-illustration]]

So the condition you should retain is

$$
\int_0^\infty |h(t)|\,dt < \infty
$$

because the note uses it both as a stability indicator for $h(t)$ and as the key step in the BIBO proof.

[[visual:lesson-note-page-19]]
