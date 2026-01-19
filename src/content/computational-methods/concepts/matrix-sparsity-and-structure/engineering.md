# Matrix Sparsity and Structure - Engineering Perspective

## Sparse Matrix Storage Formats

### Coordinate (COO) Format

Store each non-zero as (row, column, value):

```python
# Matrix:
# [4 0 0 2]
# [0 5 0 0]
# [0 0 6 0]
# [1 0 0 3]

row = [0, 0, 1, 2, 3, 3]
col = [0, 3, 1, 2, 0, 3]
val = [4, 2, 5, 6, 1, 3]
```

**Pros**: Easy to construct
**Cons**: Random access is slow

### Compressed Sparse Row (CSR) Format

Most common format for circuit simulation:

```python
# Same matrix in CSR:
values   = [4, 2, 5, 6, 1, 3]      # Non-zeros in row order
col_idx  = [0, 3, 1, 2, 0, 3]      # Column index for each value
row_ptr  = [0, 2, 3, 4, 6]         # Start of each row in values

# Row 0: values[0:2] = [4, 2] at columns [0, 3]
# Row 1: values[2:3] = [5] at column [1]
# Row 2: values[3:4] = [6] at column [2]
# Row 3: values[4:6] = [1, 3] at columns [0, 3]
```

**Storage**: O(nnz + n) instead of O(n²)

### CSR Matrix-Vector Multiply

```python
def csr_matvec(values, col_idx, row_ptr, x):
    n = len(row_ptr) - 1
    y = np.zeros(n)
    for i in range(n):
        for j in range(row_ptr[i], row_ptr[i+1]):
            y[i] += values[j] * x[col_idx[j]]
    return y
```

Complexity: O(nnz) operations

---

## SPICE Sparse Matrix Handling

### Matrix Stamping with Sparse Matrices

SPICE builds matrices incrementally:

```python
class SparseMatrix:
    def __init__(self, n):
        self.data = {}  # Dictionary: (i,j) -> value
        self.n = n
    
    def add(self, i, j, value):
        if (i, j) in self.data:
            self.data[(i, j)] += value
        else:
            self.data[(i, j)] = value
    
    def stamp_resistor(self, n1, n2, G):
        # Resistor between nodes n1 and n2
        if n1 > 0:
            self.add(n1-1, n1-1, G)
            if n2 > 0:
                self.add(n1-1, n2-1, -G)
        if n2 > 0:
            self.add(n2-1, n2-1, G)
            if n1 > 0:
                self.add(n2-1, n1-1, -G)
```

### Symbolic vs Numeric Factorization

SPICE separates factorization into two phases:

**1. Symbolic Analysis (done once)**
- Determine fill-in pattern
- Allocate memory for L and U
- Store elimination order

**2. Numeric Factorization (done repeatedly)**
- Compute actual values of L and U
- Uses pre-allocated structure

This separation is crucial for:
- Transient analysis (same structure, different values)
- AC analysis (same structure, different RHS)
- Newton iterations (same Jacobian structure)

---

## Matrix Ordering in Practice

### Minimum Degree Algorithm

```python
def minimum_degree_ordering(graph):
    n = len(graph)
    ordering = []
    degree = [len(graph[i]) for i in range(n)]
    eliminated = [False] * n
    
    for _ in range(n):
        # Find minimum degree node
        min_deg = float('inf')
        min_node = -1
        for i in range(n):
            if not eliminated[i] and degree[i] < min_deg:
                min_deg = degree[i]
                min_node = i
        
        # Eliminate it
        ordering.append(min_node)
        eliminated[min_node] = True
        
        # Update degrees of neighbors (simplified)
        for neighbor in graph[min_node]:
            if not eliminated[neighbor]:
                # Update degree accounting for new edges
                pass
    
    return ordering
```

### AMD (Approximate Minimum Degree)

Real implementations use approximations for speed:
- Don't compute exact degrees
- Use supernodes (groups of nodes with identical structure)
- Available in libraries: SuiteSparse AMD, METIS

### Nested Dissection

For very large matrices (>100,000 nodes):

1. Find a separator that splits graph roughly in half
2. Recursively order each half
3. Put separator nodes last

```
┌─────────┬───┬─────────┐
│         │ S │         │
│   A     │ E │    B    │
│         │ P │         │
└─────────┴───┴─────────┘

Order: A nodes, B nodes, Separator nodes
```

This creates block structure that minimizes fill-in.

---

## Fill-in Analysis

### Predicting Fill-in

Fill-in depends on:
1. Original sparsity pattern
2. Elimination ordering

**Upper bound**: Original nnz + potential fill-in from elimination graph

### Graph Model of Elimination

For symmetric matrices:
- Original matrix corresponds to a graph
- Fill-in edges appear when two nodes share an eliminated neighbor

```
Original:    After eliminating 1:
  1                    
 /|\                 
2-3-4    →    2═══3═══4  (fill-in edge 2-4)
```

### Fill-in for Common Structures

| Structure | Optimal Ordering | Fill-in |
|-----------|------------------|---------|
| Diagonal | Any | 0 |
| Tridiagonal | Natural | 0 |
| Dense | Any | 0 (already dense) |
| Star (n-1 leaves) | Leaves first | n-1 |
| Grid (√n × √n) | Nested dissection | O(n log n) |
| Random sparse | AMD | Varies |

---

## Practical Guidelines

### When to Use Sparse vs Dense

| Matrix Size | Sparsity | Recommendation |
|-------------|----------|----------------|
| n < 100 | Any | Dense (simple) |
| n < 1000 | > 10% dense | Dense |
| n < 1000 | < 10% dense | Sparse |
| n > 1000 | Any typical circuit | Sparse |

### Library Choices

| Library | Language | Notes |
|---------|----------|-------|
| SuiteSparse | C | Industry standard, includes UMFPACK, CHOLMOD |
| scipy.sparse | Python | Good for prototyping |
| Eigen | C++ | Header-only, good for embedding |
| Intel MKL PARDISO | C/Fortran | Highly optimized, parallel |

### Best Practices

1. **Profile first**: Measure where time is spent
2. **Use established libraries**: Don't write your own sparse solver
3. **Order once**: Symbolic factorization is reusable
4. **Monitor fill-in**: If fill-in explodes, try different ordering
5. **Consider structure**: Symmetric? Positive definite? Use appropriate solver

---

## Example: SPICE Matrix for Op-Amp

A simple 741 op-amp model (~30 transistors):

```
Matrix dimension: ~100 nodes
Original non-zeros: ~400
Fill-in (AMD ordering): ~600
Fill-in (poor ordering): ~2000
```

Even for this "small" circuit, ordering matters 3×!

For a 10,000-transistor circuit:
- Good ordering: Fill-in ~50,000
- Poor ordering: Fill-in ~5,000,000 (100× worse)

---

## Summary: Engineering Guidelines

| Aspect | Recommendation |
|--------|----------------|
| Storage | Always use sparse format for n > 100 |
| Format | CSR for solving, COO for construction |
| Ordering | AMD for general, nested dissection for very large |
| Libraries | Use established libraries (SuiteSparse, MKL) |
| Reuse | Separate symbolic/numeric for repeated solves |
