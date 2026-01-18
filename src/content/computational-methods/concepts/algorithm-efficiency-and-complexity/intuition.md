# Algorithm Efficiency and Complexity

## Time is Money (and Memory)

Not all algorithms are created equal. The same problem can be solved in milliseconds or millennia depending on your choice of algorithm.

[[visual:v1]]

## Big-O Notation: The Language of Efficiency

Big-O describes how runtime grows with input size n:

| Notation | Name | Example Operation |
|----------|------|------------------|
| O(1) | Constant | Array lookup |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Single loop |
| O(n log n) | Linearithmic | FFT, merge sort |
| O(n²) | Quadratic | Nested loops |
| O(n³) | Cubic | Matrix multiplication |
| O(2ⁿ) | Exponential | Brute-force combinatorics |

> **Rule of thumb:** Anything worse than O(n²) is suspicious for large n.

[[visual:v2]]

## Why Complexity Matters

Consider solving a linear system $Ax = b$ with n equations:

| Method | Complexity | n = 1000 | n = 10000 |
|--------|-----------|----------|-----------|
| Gaussian elimination | O(n³) | ~1 second | ~15 minutes |
| Iterative (sparse) | O(kn) | ~0.01 s | ~0.1 s |

For large sparse systems, iterative methods are orders of magnitude faster!

## Real Example: FFT vs. Direct DFT

Computing the Discrete Fourier Transform:

**Direct computation:**
$$X[k] = \sum_{n=0}^{N-1} x[n] e^{-j2\pi kn/N}$$

For each k: N operations. Total: N × N = O(N²)

**Fast Fourier Transform (FFT):**
Uses divide-and-conquer: O(N log N)

[[visual:v3]]

| N | Direct (N²) | FFT (N log N) | Speedup |
|---|-------------|---------------|---------|
| 1,000 | 1,000,000 | 10,000 | 100× |
| 1,000,000 | 10¹² | 20,000,000 | 50,000× |

## Space Complexity

Memory usage also matters:
- **O(1):** Constant memory
- **O(n):** Linear (store one copy of data)
- **O(n²):** Quadratic (dense matrix storage)

For a 10,000 × 10,000 matrix in double precision:
$$10^8 \times 8 \text{ bytes} = 800 \text{ MB}$$

## Trading Off

Often there's a trade-off:
- **Speed vs. Memory:** Faster algorithms may use more memory
- **Speed vs. Accuracy:** Quick estimates vs. precise solutions
- **Development time vs. Runtime:** Simple O(n²) code might be faster to write

## Choosing the Right Algorithm

For linear systems:
- **Dense, small (n < 1000):** Gaussian elimination O(n³)
- **Dense, large:** LU decomposition (still O(n³) but with constants)
- **Sparse:** Iterative methods (CG, GMRES) O(kn)
- **Special structure:** Exploit it! (e.g., tridiagonal O(n))

[[visual:v4]]
