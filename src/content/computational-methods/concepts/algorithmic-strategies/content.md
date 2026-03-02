# Algorithmic Strategies

> **Why This Matters**: Once you've represented a problem in tractable form (using the foundations from the previous concept), you need a *strategy* for solving it. This concept introduces five fundamental strategies that underlie nearly every algorithm you'll encounter: procedural, iterative, recursive, divide-and-conquer, and greedy. Recognizing which strategy an algorithm uses helps you understand its behavior, predict its performance, and adapt it to new problems.

## Procedural Algorithms — Step by Step

The simplest algorithmic strategy is the **procedural** (or direct) algorithm: a finite sequence of well-defined, deterministic steps that always terminates with an exact answer.

[[visual:gaussian-elimination-steps]]

The classic example is **Gaussian elimination** for solving a linear system $Ax = b$:

1. **Forward elimination**: Transform $A$ into upper triangular form by eliminating elements below the diagonal
2. **Back substitution**: Solve for $x$ starting from the last equation and working upward

Each step is completely determined by the current state — there are no choices, no randomness, no iteration. You start, you follow the recipe, you finish.

$$\boxed{\text{Procedural: Fixed steps } \rightarrow \text{ Exact answer } \rightarrow \text{ Terminates in finite time}}$$

> **Key Insight**: Procedural algorithms are predictable and reliable, but they can be expensive. Gaussian elimination takes $O(n^3)$ operations for an $n \times n$ system. For very large systems, this may be too slow — and that's when you turn to iterative methods.

## Iterative Algorithms — Converging to a Solution

An **iterative algorithm** generates a sequence of improving approximate solutions. You start with an initial guess and repeatedly refine it until you're close enough to the true answer.

[[visual:newton-raphson-convergence]]

The paradigm example is the **Newton-Raphson method** for finding a root of $f(x) = 0$:

$$\boxed{x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}}$$

Starting from an initial guess $x_0$, each iteration uses the function value and its derivative to compute a better approximation. Under good conditions, Newton-Raphson converges **quadratically** — the number of correct digits roughly doubles with each iteration.

[[visual:newton-raphson-iteration-trace]]

This is fundamentally different from a procedural algorithm:
- There is **no fixed number of steps** — you iterate until a convergence criterion is met (e.g., $|x_{n+1} - x_n| < \epsilon$)
- The result is **approximate**, not exact
- The method may **fail to converge** if the initial guess is poor or the function is ill-behaved

| Property | Procedural | Iterative |
|----------|-----------|-----------|
| Number of steps | Fixed, predetermined | Variable, depends on convergence |
| Result | Exact (up to roundoff) | Approximate (within tolerance) |
| Failure mode | Numerical instability | Non-convergence or divergence |
| Typical use | Small-to-medium problems | Large or nonlinear problems |

<details>
<summary><strong>Pause & Think</strong>: In SPICE circuit simulation, Newton-Raphson is used at every time step to solve nonlinear circuit equations. Why iterative instead of procedural?</summary>

Nonlinear equations don't have closed-form solutions in general. You can't write a formula for the operating point of a circuit with diodes and transistors — there's no "Gaussian elimination" for nonlinear systems. Iteration is the only practical approach: guess a solution, check it against the circuit equations, refine, repeat.

</details>

## Recursion — Calling Yourself

A **recursive** algorithm solves a problem by calling itself with progressively simpler inputs until it reaches a trivial **base case**.

[[visual:fft-recursion-tree]]

The most famous recursive algorithm in ECE is the **Fast Fourier Transform (FFT)**. The Discrete Fourier Transform (DFT) of an $N$-point sequence is:

$$X[k] = \sum_{n=0}^{N-1} x[n] \cdot e^{-j2\pi kn/N}$$

Computing this directly requires $O(N^2)$ multiplications. The FFT exploits symmetry: it splits the $N$-point DFT into two $N/2$-point DFTs, each of which is split further, recursively:

$$\boxed{\text{FFT: } O(N^2) \rightarrow O(N \log N)}$$

For $N = 1024$: direct DFT needs $\sim 10^6$ operations; FFT needs only $\sim 10^4$. That's a 100× speedup — the difference between feasible and infeasible for real-time signal processing.

[[visual:fft-complexity-comparison]]

> **Key Insight**: Recursion is most powerful when the problem has **self-similar structure** — when the sub-problems look like smaller copies of the original. If you can express the solution in terms of solutions to smaller instances, recursion is your tool.

## Divide and Conquer — Split, Solve, Combine

**Divide and conquer** is a strategy closely related to recursion, but with a specific three-phase structure:

1. **Divide**: Split the problem into smaller sub-problems of the same type
2. **Conquer**: Solve each sub-problem (recursively or directly)
3. **Combine**: Merge the sub-problem solutions into the overall solution

[[visual:merge-sort-visualization]]

The textbook example is **merge sort** for sorting sensor data:

- **Divide**: Split the array into two halves
- **Conquer**: Recursively sort each half
- **Combine**: Merge the two sorted halves into one sorted array

$$\boxed{\text{Merge sort: } O(n \log n) \text{ vs. } O(n^2) \text{ for naive sorting}}$$

The FFT is also a divide-and-conquer algorithm — the "divide" is splitting the DFT into even-indexed and odd-indexed sub-DFTs, the "conquer" is computing each sub-DFT recursively, and the "combine" is the butterfly operation.

[[visual:divide-conquer-structure]]

<details>
<summary><strong>Pause & Think</strong>: Not every problem can be efficiently solved by divide and conquer. What property must the problem have?</summary>

The sub-problems must be **independent** (or nearly so) and the **combine step must be efficient**. If the sub-problems overlap heavily (like in dynamic programming problems), pure divide-and-conquer wastes work by solving the same sub-problem multiple times. And if combining is as expensive as the original problem, you gain nothing from splitting.

</details>

## Greedy Algorithms — Locally Optimal Choices

A **greedy algorithm** makes the **locally optimal choice** at each step, hoping that the sequence of local choices leads to a global optimum.

[[visual:huffman-coding-tree]]

The canonical example is **Huffman coding** for lossless data compression:

1. **Build** a frequency table of symbols in the data
2. **Repeatedly** combine the two least frequent symbols into a single node
3. **Assign** shorter binary codes to more frequent symbols

This greedy strategy — always merging the two least frequent elements — provably produces an **optimal prefix code** for the given symbol frequencies.

$$\boxed{\text{Greedy: Optimal for Huffman coding — but NOT for all problems!}}$$

[[visual:greedy-vs-optimal-path]]

> **Watch Out**: Greedy algorithms don't always find the global optimum. For many problems (like the traveling salesman problem), the locally best choice at each step can lead to a terrible overall solution. Greedy works when the problem has the **greedy choice property** — when local optimality guarantees global optimality.

## Choosing the Right Strategy

[[visual:strategy-decision-flowchart]]

| Strategy | Best when... | Example |
|----------|-------------|---------|
| **Procedural** | Exact solution exists and problem is small enough | Gaussian elimination ($Ax = b$) |
| **Iterative** | Problem is nonlinear or too large for direct methods | Newton-Raphson, SPICE simulation |
| **Recursive** | Problem has self-similar structure | FFT, tree traversal |
| **Divide & Conquer** | Problem can be split into independent sub-problems | Merge sort, FFT |
| **Greedy** | Local optimality implies global optimality | Huffman coding, Dijkstra's algorithm |

Many real-world algorithms combine strategies. The FFT is recursive AND divide-and-conquer. Newton-Raphson is iterative but uses a procedural step (solving a linear system) at each iteration. Knowing the building blocks helps you understand — and build — hybrid approaches.

## Summary

- **Procedural** algorithms follow fixed steps to an exact answer (Gaussian elimination)
- **Iterative** algorithms repeatedly refine an approximation until convergence (Newton-Raphson: $x_{n+1} = x_n - f(x_n)/f'(x_n)$)
- **Recursive** algorithms solve problems by calling themselves with simpler inputs (FFT: $O(N^2) \rightarrow O(N \log N)$)
- **Divide and Conquer** splits, solves independently, then combines (merge sort: $O(n \log n)$)
- **Greedy** algorithms make locally optimal choices at each step (Huffman coding)
- Real algorithms often **combine** multiple strategies
