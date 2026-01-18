# Engineering Applications: Algorithm Efficiency

## Real-Time Systems: Complexity Budgets

In embedded systems running at 1 kHz:
- Loop time budget: 1 ms
- Must complete all computations in < 1 ms
- O(n²) algorithm with n=100 might exceed budget

**Design approach:**
1. Profile the critical path
2. Choose algorithms that fit the time budget
3. Pre-compute what you can

[[visual:v5]]

## Python: Comparing Algorithm Performance

```python
import numpy as np
import time

# Compare O(n²) vs O(n log n) for various n
def measure_time(func, n, trials=5):
    times = []
    for _ in range(trials):
        x = np.random.rand(n)
        start = time.time()
        func(x)
        times.append(time.time() - start)
    return np.median(times)

# O(n²) bubble sort vs O(n log n) merge sort
def bubble_sort(arr):
    arr = arr.copy()
    n = len(arr)
    for i in range(n):
        for j in range(n-1-i):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

# Built-in sort is O(n log n)
sizes = [100, 500, 1000, 2000]
for n in sizes:
    t_bubble = measure_time(bubble_sort, n)
    t_builtin = measure_time(sorted, n)
    print(f"n={n:5d}: Bubble={t_bubble:.4f}s, Built-in={t_builtin:.6f}s")
```

## FFT in Practice

```python
import numpy as np
import time

# Compare direct DFT vs FFT
def direct_dft(x):
    N = len(x)
    X = np.zeros(N, dtype=complex)
    for k in range(N):
        for n in range(N):
            X[k] += x[n] * np.exp(-2j * np.pi * k * n / N)
    return X

# Timing comparison
for N in [128, 512, 2048]:
    x = np.random.rand(N)
    
    t0 = time.time()
    direct_dft(x)
    t_direct = time.time() - t0
    
    t0 = time.time()
    np.fft.fft(x)
    t_fft = time.time() - t0
    
    print(f"N={N:4d}: Direct={t_direct:.4f}s, FFT={t_fft:.6f}s, Speedup={t_direct/t_fft:.0f}×")
```

## Algorithm Selection Guide

| Problem | Small Scale | Large Scale |
|---------|------------|-------------|
| Sort | Any works | O(n log n) required |
| Search | Linear OK | Binary search |
| Matrix solve | Gaussian | Iterative for sparse |
| FFT | Direct OK | FFT essential |
| Optimization | Grid search | Gradient methods |

## Memory-Efficient Techniques

### Sparse Matrix Storage

Instead of storing full n×n matrix:
```python
# Dense: O(n²) memory
A = np.zeros((10000, 10000))  # 800 MB!

# Sparse: O(nnz) memory
from scipy.sparse import csr_matrix
A_sparse = csr_matrix((data, (row, col)))  # Much smaller
```

### Streaming Algorithms

Process data without loading it all into memory:
```python
# Instead of: mean = np.mean(huge_array)
# Use online/streaming mean:
def streaming_mean(data_generator):
    total = 0
    count = 0
    for x in data_generator:
        total += x
        count += 1
    return total / count
```

## Profiling Your Code

Always profile before optimizing:
```python
import cProfile

def my_algorithm(n):
    # ... your code ...
    pass

cProfile.run('my_algorithm(1000)')
```

Focus optimization on the bottleneck, not everywhere!
