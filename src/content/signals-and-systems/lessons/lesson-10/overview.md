# Stability of Systems - Overview

This lesson is still about transfer functions, but the note now uses them for a different purpose: deciding what happens to the output as time goes on.

The pages begin with finite-dimensional continuous-time systems, define poles and zeros, and then connect pole locations to the form of the impulse response $h(t)$. From there, the note separates three cases:

- asymptotic stability
- marginal stability
- instability

After that, the lecture gives one worked example using a series RLC circuit, and then closes with the absolute-integrability condition that leads to BIBO stability.

So the lesson really has two linked viewpoints:

$$
H(s) \rightarrow \text{poles} \rightarrow h(t) \rightarrow \text{stability}
$$

and

$$
h(t) \rightarrow \int_0^\infty |h(t)|\,dt \rightarrow \text{BIBO stability}
$$

If you keep those two chains in mind, the whole lesson stays organized.
