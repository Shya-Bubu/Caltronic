## Series RLC Stability Example

The note uses a series RLC circuit with input $v(t)$ and output current $i(t)$.

[[visual:rlc-note-gallery]]

Its transfer function is written as

$$
H(s)=\frac{I(s)}{V(s)}=\frac{1}{R+Ls+\frac{1}{Cs}}
$$

Multiplying by $Cs$ gives

$$
H(s)=\frac{Cs}{LCs^2+RCs+1}
$$

and the denominator becomes

$$
s^2+\frac{R}{L}s+\frac{1}{LC}
$$

## Pole Calculation

The poles satisfy

$$
s^2+\frac{R}{L}s+\frac{1}{LC}=0
$$

so

$$
p_{1,2}=-\frac{R}{2L}\pm \sqrt{\left(\frac{R}{2L}\right)^2-\frac{1}{LC}}
$$

If the poles are complex, the note writes them as

$$
p_{1,2}=-\frac{R}{2L}\pm j\sqrt{\frac{1}{LC}-\left(\frac{R}{2L}\right)^2}
$$

In both forms, the real part is

$$
\operatorname{Re}(p_{1,2})=-\frac{R}{2L}
$$

[[visual:rlc-pole-map]]

## Stability Conclusion

For positive $R$ and $L$, the real part is negative. So the poles stay in the left half plane.

The discriminant

$$
\left(\frac{R}{2L}\right)^2-\frac{1}{LC}
$$

may give:

- two real poles
- a repeated real pole
- a complex-conjugate pole pair

but the note's conclusion is the same in every case:

> The circuit is stable in any case.

[[visual:rlc-response-cases]]

So this example shows that the waveform type may change, but the stability result still comes from the pole real parts.

[[visual:series-rlc-note-page]]
