# Algorithm Complexity Fundamentals

## The Waiting Game

You run a circuit simulation. It takes 1 second for a 100-node circuit. You need to simulate a 10,000-node chip. How long will it take?

The answer could be:
- **100 seconds** (if algorithm is O(n))
- **10,000 seconds = 2.8 hours** (if algorithm is O(n²))
- **1,000,000 seconds = 11.6 days** (if algorithm is O(n³))

**Understanding algorithm complexity lets you predict which answer is correct.**

---

## The Restaurant Analogy

Imagine three different restaurant systems:

### Restaurant A: O(n) - One Waiter Per Table

Each table gets its own waiter. Adding more tables adds more waiters proportionally.

```
10 tables → 10 waiters → 10 minutes to serve all
100 tables → 100 waiters → 10 minutes to serve all (same!)
```

**Scales linearly**—10× more tables = 10× more resources but same time.

### Restaurant B: O(n²) - One Waiter, Every Pair Must Talk

One waiter must coordinate with every pair of tables.

```
10 tables → 45 pairs → 45 minutes
100 tables → 4,950 pairs → 4,950 minutes!
```

**Scales quadratically**—10× more tables = 100× more time.

### Restaurant C: O(n³) - Committee Decisions

Every combination of three tables must agree on dessert.

```
10 tables → 120 combinations → 2 hours
100 tables → 161,700 combinations → 27 days!
```

**Scales cubically**—10× more tables = 1000× more time.

---

## Big-O Notation: The Language of Growth

Big-O tells you how an algorithm's resource usage grows as input size n increases.

### Key Insight

> Big-O **ignores constants** and **focuses on the dominant term**.

Why? Because for large n, the dominant term overwhelms everything else.

**Example**:
- Algorithm takes 3n² + 100n + 5000 operations
- For n = 1,000: 3,000,000 + 100,000 + 5000 = 3,105,000
- The n² term dominates!
- We say this is **O(n²)**

### Common Complexity Classes

| Big-O | Name | Example (n = 1,000) | Scaling |
|-------|------|---------------------|---------|
| O(1) | Constant | 1 op | Perfect |
| O(log n) | Logarithmic | 10 ops | Excellent |
| O(n) | Linear | 1,000 ops | Good |
| O(n log n) | Linearithmic | 10,000 ops | Good |
| O(n²) | Quadratic | 1,000,000 ops | Problematic |
| O(n³) | Cubic | 1,000,000,000 ops | Only small n |
| O(2ⁿ) | Exponential | 10³⁰⁰ ops | Intractable |

---

## Visualizing Growth

```
Operations
    ↑
    │                                              ╱ O(n³)
    │                                            ╱
    │                                          ╱
    │                                        ╱
    │                               ╱────────── O(n²)
    │                          ╱───
    │                     ╱────
    │               ╱─────
    │          ╱────────────────────────────────── O(n log n)
    │     ╱──────────────────────────────────────── O(n)
    │ ╱──────────────────────────────────────────── O(log n)
    ├──────────────────────────────────────────── O(1)
    └─────────────────────────────────────────────────→ n (problem size)
```

**Key observation**: For small n, all algorithms look similar. The differences only become dramatic at large n.

---

## Time Complexity vs Space Complexity

### Time Complexity

How many operations as a function of n?

```
for i = 1 to n:         ← O(n) iterations
    print(i)            ← O(1) per iteration
                        ← Total: O(n)
```

### Space Complexity

How much memory as a function of n?

```
Create array of size n  ← O(n) space
Fill with zeros         ← Still O(n) space
```

**Both matter!** An O(n) algorithm that needs O(n²) memory might be unusable for large n.

---

## How to Analyze Complexity

### Rule 1: Loops Multiply

```
for i = 1 to n:         ← O(n)
    for j = 1 to n:     ← × O(n)
        work()          ← × O(1)
                        ← Total: O(n²)
```

### Rule 2: Sequential Steps Add

```
for i = 1 to n:         ← O(n)
    work()

for j = 1 to n:         ← + O(n)
    more_work()
                        ← Total: O(n) + O(n) = O(n)
```

### Rule 3: Keep Only Dominant Term

```
O(n²) + O(n) = O(n²)
O(n³) + O(n²) + O(n) = O(n³)
O(n log n) + O(n) = O(n log n)
```

### Rule 4: Ignore Constants

```
O(5n²) = O(n²)
O(100n) = O(n)
O(1000) = O(1)
```

---

## Examples in Circuit Simulation

### Example 1: Summing Currents at a Node (KCL)

```python
def sum_currents(node, branches):
    total = 0                    # O(1)
    for branch in branches:      # O(b) where b = branches at node
        total += current[branch] # O(1)
    return total                 # O(1)
```

**Complexity**: O(b) where b is number of branches at node
**For typical circuits**: b ≈ 3-4, so effectively O(1) per node

### Example 2: Building the MNA Matrix

```python
def build_MNA(nodes, elements):
    G = zeros(nodes, nodes)       # O(n²) space
    for element in elements:      # O(m) elements
        stamp_element(G, element) # O(1) per element
    return G
```

**Complexity**: O(m) time, O(n²) space
**For circuits**: m ≈ 2n to 5n, so O(n) time, O(n²) space

### Example 3: Dense Matrix Solve (Naive)

```python
def solve(A, b):
    # Gaussian elimination
    for k = 1 to n:                # O(n)
        for i = k+1 to n:          # O(n)
            factor = A[i,k]/A[k,k] # O(1)
            for j = k+1 to n:      # O(n)
                A[i,j] -= factor*A[k,j]  # O(1)
    # Back substitution: O(n²)
    return x
```

**Complexity**: O(n³) time, O(n²) space

---

## Why O(n³) Is Devastating

Consider simulating circuits of different sizes:

| Nodes | O(n) | O(n²) | O(n³) |
|-------|------|-------|-------|
| 100 | 0.1 ms | 10 ms | 1 s |
| 1,000 | 1 ms | 1 s | 17 min |
| 10,000 | 10 ms | 100 s | 12 days |
| 100,000 | 100 ms | 2.8 hr | 31.7 years |

**This is why naive Gaussian elimination fails for large circuits!**

---

## The Saving Grace: Sparsity

Circuit matrices are **sparse** (mostly zeros). A 10,000-node circuit might have:
- Dense: 10,000 × 10,000 = 100,000,000 entries
- Sparse: Only ~50,000 non-zero entries (0.05%!)

**Exploiting sparsity changes everything**—this is the next concept.

---

## Summary

| Concept | Key Point |
|---------|-----------|
| Big-O notation | Describes growth rate, ignoring constants |
| Dominant term | The fastest-growing term determines complexity |
| O(n³) problem | Dense matrix operations—impractical for large n |
| Why it matters | Predicts simulation time, guides algorithm choice |

> **Bottom line**: Before implementing any algorithm, analyze its complexity. An O(n²) algorithm might seem fine for n=100 but become a nightmare at n=10,000.
