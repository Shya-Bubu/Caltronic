## Exam Focus

In an exam, this example is usually where you are expected to move confidently from the transfer function to the frequency-response curves.

You should be able to start with

$$
H(s)=\frac{K}{s+B}
$$

and write

$$
H(\omega)=\frac{K}{j\omega+B}
$$

followed by

$$
|H(\omega)|=\frac{K}{\sqrt{\omega^2+B^2}},
\qquad
\angle H(\omega)=-\tan^{-1}\!\left(\frac{\omega}{B}\right)
$$

After writing those expressions, you should evaluate the response at:

- $\omega=0$
- $\omega=B$
- $\omega \to \infty$

That is the quickest path to the correct sketch and interpretation.

You should also know the 3 dB result:

$$
|H(B)|=\frac{1}{\sqrt{2}}\frac{K}{B}
$$

which means the magnitude at $\omega=B$ is 3 dB below the low-frequency value. If the examiner asks for bandwidth, this is the key statement.

Common mistakes include:

- forgetting to replace $s$ by $j\omega$
- dropping the square root in the magnitude
- giving the wrong sign for the phase
- calling the system high-pass when the magnitude actually decreases with frequency

If a sketch is required, always label the starting magnitude, the 3 dB point, and the limiting phase values. Those labels usually matter more than artistic accuracy.
