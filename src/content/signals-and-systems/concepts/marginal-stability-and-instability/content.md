## Marginal Stability and Instability

The note next separates the cases where the response is bounded from the cases where it becomes unbounded.

[[visual:lesson-note-page-18-marginal]]

## Marginal Stability

The lecture defines marginal stability by bounded impulse response:

$$
|h(t)| \le C \quad \text{for all } t
$$

for some finite constant $C$.

This means the response stays finite, but it does not have to go to zero.

For marginal stability, the note gives these pole conditions:

- all poles satisfy $\operatorname{Re}(p_i)\le 0$
- any poles on the imaginary axis are non-repeated
- repeated poles must lie strictly in the left half plane

[[visual:classification-responses]]

## Why Repetition Matters

If an imaginary-axis pole is simple, the response can stay as a bounded oscillation.

If that pole is repeated, terms such as

$$
t\cos(\omega t+\theta)
$$

or

$$
t\sin(\omega t+\theta)
$$

appear, and the response becomes unbounded.

## Unstable Case

The note classifies the system as unstable when $h(t)$ is unbounded. This happens if

- at least one pole has $\operatorname{Re}(p_i)>0$, or
- an imaginary-axis pole is repeated

[[visual:pole-classification-map]]

So the full classification is:

- all poles in the left half plane: asymptotically stable
- poles in the closed left half plane, with only simple imaginary-axis poles: marginally stable
- any right-half-plane pole, or repeated imaginary-axis pole: unstable

[[visual:repeated-pole-growth]]
