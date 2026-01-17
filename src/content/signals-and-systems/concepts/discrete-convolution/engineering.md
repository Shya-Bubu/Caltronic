# Engineering Applications of Discrete Convolution

## Digital Filter Implementation

Every FIR (Finite Impulse Response) filter is implemented using convolution:

```python
import numpy as np
from scipy import signal

# Low-pass filter (moving average)
h = np.ones(5) / 5  # 5-point averaging filter

# Input signal with noise
x = np.sin(0.1 * np.arange(100)) + 0.5 * np.random.randn(100)

# Filter output via convolution
y = np.convolve(x, h, mode='same')
```

## Audio Processing

### Reverb Effect
```python
# Room impulse response (recorded or synthesized)
room_ir = load_audio("room_impulse.wav")

# Dry audio
dry_signal = load_audio("voice.wav")

# Reverb = convolution
wet_signal = np.convolve(dry_signal, room_ir)
```

### Echo Effect
Simple echo is convolution with delayed impulse:
```python
h_echo = np.zeros(44100)  # 1 second at 44.1kHz
h_echo[0] = 1.0           # Direct sound
h_echo[22050] = 0.5       # Echo at 0.5s with 50% amplitude
```

## Computational Considerations

| Method | Complexity | Use Case |
|--------|------------|----------|
| Direct convolution | O(N×M) | Short filters |
| FFT convolution | O(N log N) | Long signals |
| Overlap-add | O(N log N) | Real-time streaming |
