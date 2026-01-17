# Engineering Applications of LTI System Response

## Real-World System Characterization

### Measuring Room Acoustics

In audio engineering, we find the impulse response of a room by:
1. Playing a very short loud sound (pistol shot, balloon pop)
2. Recording the result → that's h(t)!
3. Now we can predict how any audio will sound in that room

**Convolution reverb** uses this technique in music production.

### Filter Design

Every digital filter is defined by its impulse response:
- **Low-pass filter h[n]**: Smooth impulse response
- **High-pass filter h[n]**: Oscillating impulse response
- **FIR filter**: Finite-length h[n] (easy to design)
- **IIR filter**: Infinite-length h[n] (more efficient)

## MATLAB/Python Implementation

```python
import numpy as np
from scipy import signal

# Define impulse response (simple averaging filter)
h = np.array([0.25, 0.5, 0.25])

# Create impulse
delta = np.zeros(20)
delta[0] = 1

# Get impulse response
impulse_response = signal.convolve(delta, h)[:20]
```

## Design Considerations

1. **Causal systems**: h[n] = 0 for n < 0 (can't respond before input)
2. **Stable systems**: h[n] must be absolutely summable
3. **Memory**: Non-zero width of h[n] indicates system memory
