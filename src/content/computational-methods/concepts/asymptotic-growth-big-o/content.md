# Asymptotic Growth and Big-O Notation

> **Why This Matters**: When you write code to multiply two matrices or solve a system of equations, the question isn't "does it work?" — the question is "will it finish before I graduate?" For small problems ($N = 10$), everything is fast. But for real engineering problems ($N = 10{,}000$), the difference between $O(N^2)$ and $O(N^3)$ is the difference between a coffee break and a camping trip. Big-O notation gives you the language to predict computational cost *before* you ever run the code.

## Prototype Growth Functions: EEE Examples

Let's build intuition through concrete examples from EEE — each demonstrates a different growth rate.

### Array Lookup — $O(1)$ Constant Time

Reading an element from an indexed array takes a **fixed** number of clock cycles, regardless of the array size. Whether your array has 10 elements or 10 million, the computer calculates the memory address directly: `base_address + index × element_size`.

[[visual:growth-functions-plot]]

$$\text{Memory: } 8 \text{ bytes (one IEEE 64-bit double)}, \quad \text{FLOPs: } 0$$

This is the fastest operation possible — you can't do better than constant time.

### Array Addition — $O(N)$ Linear

Adding two $N$-element arrays requires visiting every element exactly once. You need three arrays in memory ($24N$ bytes) and $N$ floating-point additions:

$$\boxed{\text{FLOPs} = N = O(N)}$$

Doubling $N$ doubles the work. Linear scaling is the gold standard — most algorithms aspire to be at least close to $O(N)$.

### Matrix-Vector Multiplication — $O(N^2)$ Quadratic

Multiplying an $N \times N$ matrix by an $N \times 1$ vector produces an $N \times 1$ result. Each output element is a dot product of $N$ multiplications plus $N-1$ additions:

$$\text{Memory: } 8N^2 + 16N \text{ bytes}$$

$$\text{Multiplications: } N^2, \quad \text{Additions: } N^2 - N$$

$$\boxed{\text{Total FLOPs} = 2N^2 - N = O(N^2)}$$

[[visual:operations-comparison-table]]

Doubling $N$ quadruples the work. At $N = 1000$, that's $\sim 2$ million FLOPs — done in under a millisecond on a modern CPU.

### Matrix-Matrix Multiplication — $O(N^3)$ Cubic

This is where things get interesting. Two $N \times N$ matrices produce an $N \times N$ result. Each of the $N^2$ output elements requires a dot product of length $N$:

$$\text{Memory: } 24N^2 \text{ bytes (three } N \times N \text{ matrices)}$$

$$\text{Multiplications: } N^3, \quad \text{Additions: } N^3 - N^2$$

$$\boxed{\text{Total FLOPs} = 2N^3 - N^2 = O(N^3)}$$

[[visual:cubic-scaling-demo]]

Doubling $N$ means **8× more work**. The lecture notes point out: $N = 100$ requires $\sim 10^6$ FLOPs (millions), while $N = 1000$ requires $\sim 10^9$ FLOPs (billions). That's the difference between 1 millisecond and 1 second.

<details>
<summary><strong>Pause & Think</strong>: Matrix multiplication at N = 100 takes 1 ms. How long at N = 1000? At N = 10,000?</summary>

Since the algorithm is $O(N^3)$:
- $N = 1000$: $(1000/100)^3 = 10^3 = 1000\times$ longer = **1 second**
- $N = 10{,}000$: $(10000/100)^3 = 10^6\times$ longer = **1000 seconds ≈ 17 minutes**

This dramatic scaling is why fast matrix multiplication algorithms (like Strassen's $O(N^{2.807})$) and GPU parallelization are such important research areas.

</details>

## The Formal Definition of Big-O

Now let's make this precise. The informal idea is "drop constants and lower-order terms." The formal definition:

> **Definition**: $f(z) = O(\alpha(z))$ if there exists a constant $C > 0$ such that $|f(z)| \leq C|\alpha(z)|$ as $z \to \infty$ (for growth analysis) or as $z \to 0$ (for error analysis).

[[visual:big-o-definition-visual]]

Let's prove the matrix multiplication result formally. We have $F(N) = 2N^3 - N^2$:

$$|F(N)| = |2N^3 - N^2|$$

Using the triangle inequality:

$$|2N^3 - N^2| \leq |2N^3| + |N^2| = 2N^3 + N^2$$

For $N \geq 1$, we know $N^2 \leq N^3$, so:

$$2N^3 + N^2 \leq 2N^3 + N^3 = 3N^3$$

$$\boxed{|F(N)| \leq 3|N^3| \quad \text{for all } N \geq 1}$$

Therefore $F(N) = O(N^3)$ with $C = 3$.

> **Key Insight**: Big-O strips away the "noise" — the constant factor 2 and the $N^2$ term — to reveal the fundamental scaling behavior. Whether the exact count is $2N^3 - N^2$ or $5N^3 + 100N^2$ doesn't change the story: it's $O(N^3)$, meaning cubic scaling dominates for large $N$.

[[visual:big-o-constant-irrelevance]]

<details>
<summary><strong>Pause & Think</strong>: Is $5N^2 + 3N + 7 = O(N^2)$? Prove it.</summary>

Yes! For $N \geq 1$:

$|5N^2 + 3N + 7| \leq 5N^2 + 3N^2 + 7N^2 = 15N^2$

(because $N \leq N^2$ and $7 \leq 7N^2$ for $N \geq 1$)

So $C = 15$ works: $|f(N)| \leq 15N^2$ for all $N \geq 1$. Therefore $f(N) = O(N^2)$.

The general principle: for any polynomial $a_k N^k + a_{k-1}N^{k-1} + \cdots + a_0$, the result is always $O(N^k)$ — the highest power dominates.

</details>

## The Complexity Classes: A Complete Reference

[[visual:complexity-classes-hierarchy]]

Here's the complete hierarchy of complexity classes, with practical time estimates for a modern CPU processing $10^9$ operations per second:

| Notation | Name | $N = 10^6$ | ECE Example |
|----------|------|-----------|-------------|
| $O(1)$ | Constant | 1 ns | Array lookup, hash table access |
| $O(\log N)$ | Logarithmic | 20 ns | Binary search in sorted array |
| $O(N)$ | Linear | 1 ms | Array addition, FIR filter (one output) |
| $O(N \log N)$ | Linearithmic | 20 ms | FFT, merge sort |
| $O(N^2)$ | Quadratic | 17 min | Matrix-vector multiply, naive DFT |
| $O(N^3)$ | Cubic | 32 years | Matrix-matrix multiply, Gauss elimination |
| $O(2^N)$ | Exponential | Heat death of universe | Brute-force SAT, subset enumeration |
| $O(N!)$ | Factorial | Beyond comprehension | Permutation enumeration |

[[visual:exponential-vs-polynomial]]

The jump from polynomial ($N^3$) to exponential ($2^N$) is the most important boundary in all of computer science. Below the line: tractable problems. Above the line: generally intractable without clever algorithms.

> **Watch Out**: The notation $O(N^3)$ doesn't tell you the constant factor. Algorithm A at $O(N^3)$ with $C = 0.001$ beats Algorithm B at $O(N^2)$ with $C = 1000$ for $N < 1000$. Big-O tells you about asymptotic behavior — what happens as $N$ gets very large — not small-problem performance.

<details>
<summary><strong>Pause & Think</strong>: The FFT computes the DFT in O(N log N) instead of O(N²). For N = 10⁶, how many times faster is the FFT?</summary>

**Naive DFT**: $O(N^2) = (10^6)^2 = 10^{12}$ operations
**FFT**: $O(N \log N) = 10^6 \times 20 = 2 \times 10^7$ operations

Speedup: $10^{12} / (2 \times 10^7) = 5 \times 10^4$ — the FFT is **50,000× faster**!

At $10^9$ ops/sec: DFT takes $\sim 1000$ seconds (17 minutes). FFT takes $\sim 0.02$ seconds (20 ms). This is why the FFT is considered one of the most important algorithms of the 20th century — it made real-time signal processing practical.

</details>

[[visual:fft-speedup]]

## Summary

Let's consolidate the key ideas:

- **Big-O notation** describes how computational cost scales with problem size — dropping constants and lower-order terms to capture the essential behavior
- The ECE examples show a clear hierarchy: array lookup $O(1)$, array addition $O(N)$, matrix-vector $O(N^2)$, matrix multiply $O(N^3)$
- Formal definition: $f(z) = O(\alpha(z))$ iff $\exists\, C > 0$ such that $|f(z)| \leq C|\alpha(z)|$ for sufficiently large $z$
- Each FLOP count uses IEEE 64-bit double precision (8 bytes per number)
- The polynomial/exponential boundary is the most important dividing line in computational feasibility
- **Doubling $N$ multiplies cost** by 2 (linear), 4 (quadratic), 8 (cubic), or squares it (exponential)

> **You're building a critical skill** — the ability to look at an algorithm and immediately know whether it's practical for your problem size. This saves hours of wasted computation and guides you toward efficient numerical methods.
