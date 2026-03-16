## From Steady-State Response to Frequency Response

The note begins by carrying forward the result of the previous lesson. If the input is

$$
x(t)=C\cos(\omega_0 t), \qquad t \ge 0
$$

then the steady-state response of a stable system is written as

$$
y_{ss}(t)=C|H(\omega_0)|\cos\!\bigl(\omega_0 t+\angle H(\omega_0)\bigr), \qquad t \ge 0
$$

The important step on the first page is conceptual. Instead of fixing one frequency $\omega_0$, the note says: let $\omega_0$ take any value. Once you do that, the system response is described by the frequency response

$$
H(\omega)=H(s)\big|_{s=j\omega}
$$

[[visual:frequency-response-note]]

This is the bridge between the Laplace-domain transfer function and the sinusoidal steady-state behavior. The transfer function is not being abandoned. It is being evaluated along the imaginary axis because that is where steady sinusoidal inputs live.

## The Two Pieces: Magnitude and Phase

The note then separates $H(\omega)$ into two parts:

$$
|H(\omega)|
$$

and

$$
\angle H(\omega)
$$

The first is the amplitude response. It tells you how much the sinusoid is scaled at each frequency. The second is the phase response. It tells you how much the output sinusoid is shifted relative to the input.

[[visual:magnitude-phase-split]]

This matters because two systems can attenuate a frequency by the same amount but produce completely different phase shifts. In other words, amplitude information alone does not fully describe the response to a sinusoidal input.

## Decibels and Bode Description

The note next rewrites the magnitude on a logarithmic scale:

$$
|H(\omega)|_{\text{dB}}=20\log_{10}|H(\omega)|
$$

That is the usual dB representation used in Bode plots.

[[visual:db-scale-map]]

The note adds a direct interpretation:

- if $|H(\omega)|_{\text{dB}} > 0$, the system amplifies
- if $|H(\omega)|_{\text{dB}} < 0$, the system attenuates

So the dB scale is not a new physical quantity. It is a convenient way to represent gain over a wide frequency range.

## What a Bode Plot Is Really Showing

The note labels the magnitude and phase diagrams as Bode plots and draws the usual block description

$$
x(\omega) \rightarrow H(\omega) \rightarrow y(\omega)
$$

[[visual:block-diagram]]

In practice, a Bode plot is simply a record of how the system treats sinusoids of different frequency. One graph shows the magnitude response as a function of $\omega$, and the other graph shows the phase response as a function of $\omega$.

The note also emphasizes that these curves can be obtained experimentally. You apply sinusoidal inputs at different frequencies, measure the output amplitude and phase shift, and then plot the results.

[[visual:experimental-bode-idea]]

That point is important because it ties the mathematics back to measurement. A Bode plot is not only something you derive from algebra. It is also something you can build from laboratory data.

## What You Should Retain

This first concept is mostly vocabulary, but it is essential vocabulary.

- $H(\omega)=H(s)|_{s=j\omega}$ is the frequency response
- $|H(\omega)|$ is the amplitude response
- $\angle H(\omega)$ is the phase response
- $20\log_{10}|H(\omega)|$ is the dB magnitude used in Bode plots

Once those definitions are in place, the rest of the lesson becomes a matter of applying them to particular transfer functions and reading what the poles and zeros do to the curves.
