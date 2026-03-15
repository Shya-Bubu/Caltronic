## When the Response Does Not Go to Zero

After giving the left-half-plane condition for asymptotic stability, the note moves to the two remaining cases: marginal stability and instability.

[[visual:lesson-note-page-18-marginal]]

The lecture defines a system as marginally stable if

$$
h(t)\ \text{is bounded}
$$

that is,

$$
|h(t)|\le C \quad \text{for all } t
$$

for some positive finite constant $C$.

This is weaker than asymptotic stability. The response is allowed to remain present, as long as it stays finite.

## Pole Conditions for Marginal Stability

The note writes the conditions in two parts.

For non-repeated poles,

$$
\operatorname{Re}(p_i)\le 0
$$

is acceptable.

For repeated poles,

$$
\operatorname{Re}(p_i)<0
$$

is required.

[[visual:classification-responses]]

That distinction comes from the time-domain forms. A simple pole on the imaginary axis gives an oscillation with constant amplitude. A repeated pole on the imaginary axis introduces factors of $t$, and those factors make the response grow without bound.

So the note summarizes the marginally stable case like this:

- all poles must be in the left half plane or on the imaginary axis
- any poles on the imaginary axis must be non-repeated

## When the System Is Unstable

The lecture then defines instability by unbounded response:

$$
t\to\infty \quad h(t)\to\infty
$$

and says this occurs when

- $\operatorname{Re}(p_i)>0$ for any $i$, or
- $\operatorname{Re}(p_i)=0$ in the case of a repeated pole

[[visual:pole-classification-map]]

This is the important boundary case many students miss. A pole on the imaginary axis is not automatically acceptable. You still have to check whether it is repeated.

## Final Classification

So the three classes from the note are:

- all poles strictly in the left half plane: asymptotically stable
- poles in the closed left half plane, with only non-repeated imaginary-axis poles: marginally stable
- any right-half-plane pole, or any repeated imaginary-axis pole: unstable

[[visual:repeated-pole-growth]]
