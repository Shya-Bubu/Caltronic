# Engineering Applications of Continuous Convolution

## RC Circuit Step Response

The classic first-order RC circuit has impulse response:
$$h(t) = \frac{1}{RC}e^{-t/RC}u(t)$$

Convolving with step input gives:
$$y(t) = (1 - e^{-t/RC})u(t)$$

This is the charging curve you've seen in lab!

## Control Systems

The step response of a system is:
$$s(t) = u(t) * h(t)$$

Engineers measure step response experimentally to characterize systems.

## MATLAB Implementation

```matlab
% Define signals
t = 0:0.01:10;
x = ones(size(t));           % Step input
h = exp(-t);                  % Exponential impulse response

% Convolution
y = conv(x, h) * 0.01;        % Scale by dt

% First t samples
y = y(1:length(t));
plot(t, y);
```

## Practical Considerations

- **Numerical integration**: Use Simpson's rule or trapezoidal
- **FFT method**: For long signals, FFT convolution is faster
- **Real-time**: Overlap-add/overlap-save methods
