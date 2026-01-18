# Exam Preparation: What is Computational Engineering?

## Common Question Types

### Type 1: Conceptual Understanding

**Q:** Explain when computational methods are preferred over analytical methods.

**A:** Computational methods are preferred when:
1. No closed-form analytical solution exists
2. Problem geometry is too complex (irregular shapes)
3. System has many degrees of freedom (large matrices)
4. Need to explore parameter variations quickly
5. Problem involves nonlinear or coupled phenomena

### Type 2: Compare and Contrast

**Q:** Compare the forward difference and central difference approximations for derivatives.

**A:**

| Property | Forward Difference | Central Difference |
|----------|-------------------|-------------------|
| Formula | $(f(x+h) - f(x))/h$ | $(f(x+h) - f(x-h))/(2h)$ |
| Accuracy | $O(h)$ - First order | $O(h^2)$ - Second order |
| Points needed | 2 | 3 |
| Boundary issues | Works at left boundary | Needs points on both sides |

### Type 3: Short Calculations

**Q:** Estimate $f'(2)$ for $f(x) = x^3$ using central difference with $h = 0.1$.

**A:**
$$f'(2) \approx \frac{f(2.1) - f(1.9)}{2(0.1)} = \frac{9.261 - 6.859}{0.2} = \frac{2.402}{0.2} = 12.01$$

**Exact:** $f'(x) = 3x^2 \Rightarrow f'(2) = 12$

Error = |12 - 12.01| = 0.01 (very small!)

### Type 4: Workflow Questions

**Q:** Describe the computational pipeline for solving a heat conduction problem.

**A:**
1. **Model:** Heat equation $\frac{\partial T}{\partial t} = \alpha \nabla^2 T$
2. **Discretize:** Finite difference grid in space and time
3. **Algorithm:** Explicit or implicit time-stepping scheme
4. **Implement:** Matrix assembly and linear solve
5. **Validate:** Check against known analytical solutions
6. **Compute:** Run for desired conditions

## Key Points to Remember

1. Computational ≠ Computer Programming
   - It's about mathematical algorithms, not just coding

2. Discretization introduces error
   - Finer grids = more accuracy but more computation

3. Every numerical method has trade-offs
   - Speed vs. accuracy vs. memory

4. Validation is essential
   - Always test against known cases

## Practice Problems

1. Calculate $\int_0^1 x^2 dx$ using the trapezoidal rule with $n = 4$ intervals.

2. Explain why solving $Ax = b$ for a 1000×1000 matrix is computationally challenging.

3. Give an example of an engineering problem that requires computational methods.
