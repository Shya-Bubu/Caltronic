# Stability of Systems - Synthesis

The note builds one consistent story.

First, poles determine the terms that appear in $h(t)$. If every pole has negative real part, those terms decay and the system is asymptotically stable. If poles stay in the closed left half plane but the only poles on the imaginary axis are simple, then the response stays bounded and the system is marginally stable. If any pole has positive real part, or if an imaginary-axis pole is repeated, then the response becomes unbounded and the system is unstable.

The series RLC example confirms that rule in a concrete case. Its poles are

$$
p_{1,2}=-\frac{R}{2L}\pm\sqrt{\left(\frac{R}{2L}\right)^2-\frac{1}{LC}}
$$

and for positive $R$ and $L$, the real part remains negative in every case, so the circuit is stable.

The lesson then ends with the input-output view:

$$
\int_0^\infty |h(t)|\,dt < \infty
$$

If this integral is finite, $h(t)$ is absolutely integrable, and the note shows through convolution that every bounded input gives a bounded output. That is the BIBO result you should carry forward from Lesson 10.
