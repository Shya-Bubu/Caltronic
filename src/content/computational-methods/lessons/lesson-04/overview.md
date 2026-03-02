# Complexity Analysis and Convergence

> **What you're about to learn**: How to predict whether your algorithm will finish in seconds or centuries — and whether your iterative method will give you 3 correct digits or 15. This lesson teaches you the language of computational complexity (Big-O notation) and convergence analysis, the two fundamental tools for analyzing the cost and accuracy of any numerical method.

## Why This Lesson Matters

In Lessons 01–03, you learned *what* to compute (models) and *how* to compute (approximation, discretization, etc.). Now you learn *how expensive* the computation is and *how accurate* the result will be. These questions are inseparable from the methods themselves:

- A matrix multiplication is $O(N^3)$ — **doubling** the matrix size means **8× more work**
- The Taylor series error for $e^x$ is $O(x^{k+1})$ — each additional term dramatically improves accuracy

## Three Key Topics

1. **Asymptotic Growth & Big-O**: How memory and FLOPs scale with problem size $N$. The Big-O notation strips away constants to capture the *order of magnitude* behavior.

2. **Convergence & Error Analysis**: How approximation error decreases as you add terms or iterate. The difference between *order* of convergence ($O(x^{k+1})$ as $x \to 0$) and *rate* of convergence (linear vs. quadratic as $k \to \infty$).

3. **Landau Symbols**: The complete family of asymptotic notations — Big-O, Big-Ω, Big-Θ, little-o, little-ω, Soft-O, and asymptotic equivalence — each serving a specific purpose in analysis.
